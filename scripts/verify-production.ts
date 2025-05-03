#!/usr/bin/env ts-node

import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import chalk from 'chalk';

// Required environment variables
const REQUIRED_ENV_VARS = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'NEXT_PUBLIC_SANITY_PROJECT_ID',
  'NEXT_PUBLIC_SANITY_DATASET',
  'NEXT_PUBLIC_SENTRY_DSN',
];

// Load environment variables from .env.production
dotenv.config({ path: '.env.production' });

/**
 * Verification class for production deployment
 */
class ProductionVerifier {
  hasErrors = false;
  hasWarnings = false;

  constructor() {}

  log(message: string): void {
    console.log(message);
  }

  success(message: string): void {
    this.log(chalk.green(`✓ ${message}`));
  }

  error(message: string): void {
    this.hasErrors = true;
    this.log(chalk.red(`✗ ${message}`));
  }

  warning(message: string): void {
    this.hasWarnings = true;
    this.log(chalk.yellow(`⚠ ${message}`));
  }

  info(message: string): void {
    this.log(chalk.blue(`ℹ ${message}`));
  }

  header(message: string): void {
    this.log('\n' + chalk.bold(message));
    this.log(chalk.dim('═'.repeat(message.length)) + '\n');
  }

  /**
   * Verify environment variables
   */
  verifyEnvironmentVariables(): void {
    this.header('Environment Variables');

    for (const envVar of REQUIRED_ENV_VARS) {
      if (!process.env[envVar]) {
        this.error(`Missing required environment variable: ${envVar}`);
      } else {
        this.success(`${envVar} is set`);
        
        // Additional validation for specific env vars
        if (envVar === 'NEXT_PUBLIC_SUPABASE_URL' && !process.env[envVar]?.includes('supabase.co')) {
          this.warning(`${envVar} might not be a valid Supabase URL`);
        }
      }
    }
  }

  /**
   * Verify Next.js config
   */
  verifyNextConfig(): void {
    this.header('Next.js Configuration');

    const nextConfigPath = path.join(process.cwd(), 'next.config.mjs');
    if (!fs.existsSync(nextConfigPath)) {
      this.error('next.config.mjs not found');
      return;
    }

    const configContent = fs.readFileSync(nextConfigPath, 'utf8');
    
    // Check for important production settings
    if (!configContent.includes('swcMinify')) {
      this.warning('SWC minify not explicitly enabled');
    }

    if (!configContent.includes('poweredByHeader')) {
      this.warning('X-Powered-By header not explicitly disabled');
    }

    if (configContent.includes('reactStrictMode: false')) {
      this.warning('React strict mode is disabled');
    }

    if (configContent.includes('@sentry/nextjs')) {
      this.success('Sentry integration detected');
    } else {
      this.warning('Sentry integration not detected in Next.js config');
    }
  }

  /**
   * Check for security headers
   */
  verifySecurityHeaders(): void {
    this.header('Security Headers');

    const nextConfigPath = path.join(process.cwd(), 'next.config.mjs');
    if (!fs.existsSync(nextConfigPath)) {
      this.error('next.config.mjs not found');
      return;
    }

    const configContent = fs.readFileSync(nextConfigPath, 'utf8');
    
    const securityHeaderChecks = [
      { name: 'Content-Security-Policy', regex: /Content-Security-Policy/i },
      { name: 'X-Content-Type-Options', regex: /X-Content-Type-Options/i },
      { name: 'X-Frame-Options', regex: /X-Frame-Options/i },
      { name: 'X-XSS-Protection', regex: /X-XSS-Protection/i },
      { name: 'Referrer-Policy', regex: /Referrer-Policy/i },
      { name: 'Strict-Transport-Security', regex: /Strict-Transport-Security/i },
    ];

    for (const header of securityHeaderChecks) {
      if (header.regex.test(configContent)) {
        this.success(`${header.name} header is configured`);
      } else {
        this.warning(`${header.name} header is not configured`);
      }
    }
  }

  /**
   * Verify TypeScript configuration
   */
  verifyTypeScriptConfig(): void {
    this.header('TypeScript Configuration');

    const tsConfigPath = path.join(process.cwd(), 'tsconfig.json');
    if (!fs.existsSync(tsConfigPath)) {
      this.error('tsconfig.json not found');
      return;
    }

    try {
      const tsConfig = JSON.parse(fs.readFileSync(tsConfigPath, 'utf8'));
      
      // Check for strict mode
      if (tsConfig.compilerOptions?.strict === true) {
        this.success('TypeScript strict mode is enabled');
      } else {
        this.warning('TypeScript strict mode is not enabled');
      }
      
      // Check for other important flags
      const strictFlags = [
        'noImplicitAny',
        'strictNullChecks',
        'strictFunctionTypes',
        'strictBindCallApply',
      ];
      
      for (const flag of strictFlags) {
        if (tsConfig.compilerOptions?.[flag] === true) {
          this.success(`TypeScript ${flag} is enabled`);
        } else if (tsConfig.compilerOptions?.strict !== true) {
          this.warning(`TypeScript ${flag} is not explicitly enabled`);
        }
      }
    } catch (error) {
      this.error(`Error parsing tsconfig.json: ${error}`);
    }
  }

  /**
   * Run all verifications and provide summary
   */
  async runAllChecks(): Promise<void> {
    console.log(chalk.bold('\n🔍 PRODUCTION VERIFICATION\n'));
    
    this.verifyEnvironmentVariables();
    this.verifyNextConfig();
    this.verifySecurityHeaders();
    this.verifyTypeScriptConfig();
    
    // Print summary
    this.header('Summary');
    
    if (this.hasErrors) {
      this.error('Verification found errors that must be fixed before deployment');
    } else if (this.hasWarnings) {
      this.warning('Verification completed with warnings');
    } else {
      this.success('All verification checks passed!');
    }
    
    // Exit with error code if there are errors
    if (this.hasErrors) {
      process.exit(1);
    }
  }
}

// Run the verification
const verifier = new ProductionVerifier();
verifier.runAllChecks().catch(err => {
  console.error(chalk.red('Error running verification:'), err);
  process.exit(1);
}); 