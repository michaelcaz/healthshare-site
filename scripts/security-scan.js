#!/usr/bin/env node

/**
 * This is a simple security scanning script for the Healthshare Plan Finder application.
 * It performs basic checks for security issues in the codebase.
 * 
 * Usage:
 * node scripts/security-scan.js
 */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { execSync } = require('child_process');

// Define security patterns to check for
const securityPatterns = [
  {
    name: 'Hardcoded API Keys',
    pattern: /(api[_-]?key|api[_-]?secret|access[_-]?token|auth[_-]?token|client[_-]?secret|password|DATABASE_URL)[\s]*[:=][\s]*['"`][A-Za-z0-9_\-\.=]{16,}['"`]/g,
    description: 'Potential hardcoded API key or secret',
    severity: 'HIGH',
  },
  {
    name: 'Insecure Direct Object Reference',
    pattern: /\.(findOne|findById|findByPk)\s*\(\s*req\.params\./g,
    description: 'Potential Insecure Direct Object Reference (IDOR)',
    severity: 'HIGH',
  },
  {
    name: 'SQL Injection',
    pattern: /db\.query\s*\(\s*['"`].*\$\{(?!.*\?\?|.*\?).*\}.*['"`]/g,
    description: 'Potential SQL injection vulnerability',
    severity: 'HIGH',
  },
  {
    name: 'Cross-Site Scripting (XSS)',
    pattern: /dangerouslySetInnerHTML|innerHTML\s*=|document\.write\(|eval\(|setTimeout\(\s*['"`]/g,
    description: 'Potential XSS vulnerability',
    severity: 'MEDIUM',
  },
  {
    name: 'Insecure Cookies',
    pattern: /cookie.*{(?!.*secure.*httpOnly|.*httpOnly.*secure).*}/g,
    description: 'Cookies without secure and httpOnly flags',
    severity: 'MEDIUM',
  },
  {
    name: 'Outdated Dependencies',
    pattern: null, // Special case handled separately
    description: 'Outdated dependencies with security vulnerabilities',
    severity: 'MEDIUM',
  }
];

const filesToIgnore = [
  'node_modules',
  '.next',
  '.git',
  'build',
  'dist',
  'package-lock.json'
];

const extensionsToCheck = [
  '.js',
  '.jsx',
  '.ts',
  '.tsx',
  '.mjs'
];

let issuesFound = 0;
const issuesList = [];

// Scan for security patterns in file
function scanFile(filePath, content) {
  securityPatterns.forEach(pattern => {
    if (!pattern.pattern) return; // Skip special cases
    
    const matches = content.match(pattern.pattern);
    if (matches) {
      matches.forEach(match => {
        issuesFound++;
        const lineNumber = getLineNumber(content, match);
        issuesList.push({
          file: filePath,
          line: lineNumber,
          pattern: pattern.name,
          description: pattern.description,
          severity: pattern.severity,
        });
        
        console.log(chalk.red(`[${pattern.severity}] ${pattern.name}`));
        console.log(chalk.yellow(`  File: ${filePath}:${lineNumber}`));
        console.log(chalk.gray(`  Description: ${pattern.description}`));
        console.log(chalk.gray(`  Match: ${match.trim().substring(0, 100)}`));
        console.log();
      });
    }
  });
}

// Find the line number for a match
function getLineNumber(content, match) {
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(match.trim())) {
      return i + 1;
    }
  }
  return 0;
}

// Recursively scan directory
function scanDirectory(dir) {
  try {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      
      // Skip ignored directories and files
      if (filesToIgnore.some(ignore => filePath.includes(ignore))) {
        continue;
      }
      
      const stats = fs.statSync(filePath);
      
      if (stats.isDirectory()) {
        scanDirectory(filePath);
      } else if (stats.isFile() && extensionsToCheck.includes(path.extname(filePath))) {
        const content = fs.readFileSync(filePath, 'utf8');
        scanFile(filePath, content);
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dir}:`, error);
  }
}

// Check for outdated dependencies
function checkDependencies() {
  console.log(chalk.blue('Scanning for outdated dependencies...'));
  
  try {
    const output = execSync('npm audit --json', { stdio: ['pipe', 'pipe', 'ignore'] });
    const auditResults = JSON.parse(output.toString());
    
    if (auditResults.vulnerabilities) {
      const totalVulnerabilities = Object.values(auditResults.vulnerabilities).reduce((sum, v) => sum + v.length, 0);
      
      if (totalVulnerabilities > 0) {
        issuesFound += totalVulnerabilities;
        console.log(chalk.red(`[MEDIUM] Outdated Dependencies`));
        console.log(chalk.yellow(`  Found ${totalVulnerabilities} vulnerabilities in dependencies`));
        console.log(chalk.gray(`  Run 'npm audit' for details`));
        console.log();
        
        issuesList.push({
          file: 'package.json',
          line: 0,
          pattern: 'Outdated Dependencies',
          description: `Found ${totalVulnerabilities} vulnerabilities in dependencies`,
          severity: 'MEDIUM',
        });
      }
    }
  } catch (error) {
    console.log(chalk.yellow('Could not check dependencies. Skipping this check.'));
  }
}

// Check for insecure configurations
function checkConfigurations() {
  // Check for CORS configuration
  console.log(chalk.blue('Checking security configurations...'));
  
  const configFiles = [
    'next.config.js',
    'next.config.mjs',
    'next.config.ts',
    'middleware.ts',
    'middleware.js'
  ];
  
  configFiles.forEach(configFile => {
    if (fs.existsSync(configFile)) {
      const content = fs.readFileSync(configFile, 'utf8');
      
      // Check for overly permissive CORS
      if (content.includes('Access-Control-Allow-Origin') && content.includes('*')) {
        issuesFound++;
        issuesList.push({
          file: configFile,
          line: getLineNumber(content, 'Access-Control-Allow-Origin'),
          pattern: 'Overly Permissive CORS',
          description: 'CORS is configured to allow any origin (*)',
          severity: 'MEDIUM',
        });
        
        console.log(chalk.red(`[MEDIUM] Overly Permissive CORS`));
        console.log(chalk.yellow(`  File: ${configFile}`));
        console.log(chalk.gray(`  Description: CORS is configured to allow any origin (*)`));
        console.log();
      }
      
      // Check for missing CSP
      if (!content.includes('Content-Security-Policy')) {
        issuesFound++;
        issuesList.push({
          file: configFile,
          line: 0,
          pattern: 'Missing CSP',
          description: 'Content Security Policy is not configured',
          severity: 'MEDIUM',
        });
        
        console.log(chalk.red(`[MEDIUM] Missing CSP`));
        console.log(chalk.yellow(`  File: ${configFile}`));
        console.log(chalk.gray(`  Description: Content Security Policy is not configured`));
        console.log();
      }
    }
  });
}

// Main execution
console.log(chalk.blue('Starting security scan...'));
const startTime = Date.now();

// Scan codebase
scanDirectory('.');

// Check dependencies
checkDependencies();

// Check configurations
checkConfigurations();

const endTime = Date.now();
const duration = ((endTime - startTime) / 1000).toFixed(2);

// Print summary
console.log(chalk.blue(`Security scan completed in ${duration} seconds`));
if (issuesFound > 0) {
  console.log(chalk.red(`Found ${issuesFound} potential security issues`));
  
  // Group by severity
  const high = issuesList.filter(issue => issue.severity === 'HIGH').length;
  const medium = issuesList.filter(issue => issue.severity === 'MEDIUM').length;
  const low = issuesList.filter(issue => issue.severity === 'LOW').length;
  
  console.log(chalk.red(`  HIGH: ${high}`));
  console.log(chalk.yellow(`  MEDIUM: ${medium}`));
  console.log(chalk.gray(`  LOW: ${low}`));
  
  // Write report to file
  const report = {
    scanTime: new Date().toISOString(),
    duration,
    issuesCount: issuesFound,
    severityCounts: { high, medium, low },
    issues: issuesList,
  };
  
  fs.writeFileSync('security-scan-report.json', JSON.stringify(report, null, 2));
  console.log(chalk.blue('Report saved to security-scan-report.json'));
  
  // Exit with error code if high severity issues found
  if (high > 0) {
    process.exit(1);
  }
} else {
  console.log(chalk.green('No security issues found'));
} 