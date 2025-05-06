#!/usr/bin/env node

/**
 * CSS Build Analysis Script
 * 
 * This script analyzes CSS files in the production build to identify potential issues
 * that could cause styling differences between development and production.
 * 
 * Usage:
 *   node scripts/analyze-css-build.js
 */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const postcss = require('postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');

// Configuration
const CONFIG = {
  // Build output directory
  buildDir: path.join(__dirname, '../.next'),
  // Output file for report
  outputFile: path.join(__dirname, '../css-build-analysis.md'),
  // CSS file patterns to look for (adjustable)
  cssPatterns: [
    // Chunk CSS files
    /chunks\/.*\.css$/,
    // Page CSS files
    /pages\/.*\.css$/,
    // Static CSS files
    /static\/css\/.*\.css$/
  ]
};

// Find all CSS files in the build directory
function findCssFiles(directory, patterns, files = []) {
  const items = fs.readdirSync(directory, { withFileTypes: true });
  
  for (const item of items) {
    const itemPath = path.join(directory, item.name);
    
    if (item.isDirectory()) {
      findCssFiles(itemPath, patterns, files);
    } else if (patterns.some(pattern => pattern.test(itemPath))) {
      files.push(itemPath);
    }
  }
  
  return files;
}

// Generate a summary of a CSS file
async function analyzeCssFile(filePath) {
  const css = fs.readFileSync(filePath, 'utf8');
  const fileSize = Buffer.byteLength(css, 'utf8');
  
  // Parse the CSS using PostCSS
  const result = await postcss([]).process(css, { from: filePath });
  const root = result.root;
  
  // Count various CSS elements
  let selectors = 0;
  let mediaQueries = 0;
  let fontFaces = 0;
  let importantDeclarations = 0;
  let varDeclarations = 0;
  let cssVars = 0;
  let unusedSelectors = 0; // Placeholder (hard to determine without runtime analysis)
  let potentialDuplicates = new Set();
  
  // Create a map for rules to check for duplicates
  const ruleMap = new Map();
  
  root.walkRules(rule => {
    selectors += rule.selectors.length;
    
    // Check for potential duplicates
    const ruleKey = rule.selector;
    if (ruleMap.has(ruleKey)) {
      potentialDuplicates.add(ruleKey);
    } else {
      ruleMap.set(ruleKey, true);
    }
    
    // Check for !important declarations
    rule.walkDecls(decl => {
      if (decl.important) {
        importantDeclarations++;
      }
      
      // Check for CSS variables
      if (decl.prop.startsWith('--')) {
        cssVars++;
      }
      
      if (decl.value.includes('var(--')) {
        varDeclarations++;
      }
    });
  });
  
  // Count media queries
  root.walkAtRules('media', () => {
    mediaQueries++;
  });
  
  // Count font-face rules
  root.walkAtRules('font-face', () => {
    fontFaces++;
  });
  
  // Simulate minification to check for potential issues
  const minificationResult = await postcss([
    cssnano({ preset: 'default' }),
    autoprefixer
  ]).process(css, { from: filePath });
  
  const minifiedCss = minificationResult.css;
  const minifiedSize = Buffer.byteLength(minifiedCss, 'utf8');
  const compressionRatio = ((fileSize - minifiedSize) / fileSize * 100).toFixed(2);
  
  // Detect potential issues
  const potentialIssues = [];
  
  // Check for potential whitespace dependency
  if (css.includes('white-space:') || css.includes('white-space:pre')) {
    potentialIssues.push('Contains whitespace-dependent styling that might be affected by minification');
  }
  
  // Check for calc() expressions that might cause differences
  if (css.includes('calc(')) {
    potentialIssues.push('Contains calc() expressions that might be evaluated differently in production');
  }
  
  // Check for lots of !important declarations
  if (importantDeclarations > 20) {
    potentialIssues.push(`High number of !important declarations (${importantDeclarations}) may cause specificity conflicts`);
  }
  
  // Check for vendor prefixes that might be handled differently
  if (css.includes('-webkit-') || css.includes('-moz-') || css.includes('-ms-')) {
    potentialIssues.push('Contains vendor prefixes which might be added/removed by autoprefixer');
  }
  
  // Check for CSS variables
  if (cssVars > 0) {
    potentialIssues.push(`Contains ${cssVars} CSS variables which might be resolved differently in production`);
  }
  
  // Check for potentially inconsistent media queries
  const breakpointPatterns = [
    { pattern: /max-width/g, count: 0 },
    { pattern: /min-width/g, count: 0 }
  ];
  
  breakpointPatterns.forEach(bp => {
    bp.count = (css.match(bp.pattern) || []).length;
  });
  
  if (breakpointPatterns.some(bp => bp.count > 10)) {
    potentialIssues.push('High number of media queries might cause responsive layout inconsistencies');
  }
  
  // Check potential duplicate selectors
  if (potentialDuplicates.size > 0) {
    potentialIssues.push(`Found ${potentialDuplicates.size} potentially duplicate selectors which might have different outcomes in production`);
  }
  
  return {
    filePath: path.relative(__dirname, filePath),
    fileSize: formatSize(fileSize),
    minifiedSize: formatSize(minifiedSize),
    compressionRatio: `${compressionRatio}%`,
    selectors,
    mediaQueries,
    fontFaces,
    importantDeclarations,
    varDeclarations,
    cssVars,
    potentialDuplicates: potentialDuplicates.size,
    potentialIssues
  };
}

// Format file size for display
function formatSize(bytes) {
  if (bytes < 1024) {
    return `${bytes} B`;
  } else if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(2)} KB`;
  } else {
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }
}

// Generate markdown report
function generateReport(cssAnalyses) {
  let report = `# CSS Build Analysis Report
  
Generated on: ${new Date().toLocaleString()}

## Summary

- **Total CSS Files Analyzed**: ${cssAnalyses.length}
- **Total Size (Unminified)**: ${formatSize(cssAnalyses.reduce((total, analysis) => total + parseSize(analysis.fileSize), 0))}
- **Total Size (Minified)**: ${formatSize(cssAnalyses.reduce((total, analysis) => total + parseSize(analysis.minifiedSize), 0))}
- **Average Compression Ratio**: ${(cssAnalyses.reduce((total, analysis) => total + parseFloat(analysis.compressionRatio), 0) / cssAnalyses.length).toFixed(2)}%
- **Total Selectors**: ${cssAnalyses.reduce((total, analysis) => total + analysis.selectors, 0)}
- **Total Media Queries**: ${cssAnalyses.reduce((total, analysis) => total + analysis.mediaQueries, 0)}
- **Total Font-Face Rules**: ${cssAnalyses.reduce((total, analysis) => total + analysis.fontFaces, 0)}
- **Total !important Declarations**: ${cssAnalyses.reduce((total, analysis) => total + analysis.importantDeclarations, 0)}
- **Total CSS Variable Usage**: ${cssAnalyses.reduce((total, analysis) => total + analysis.varDeclarations, 0)}
- **Total CSS Variables Defined**: ${cssAnalyses.reduce((total, analysis) => total + analysis.cssVars, 0)}
- **Total Potential Duplicate Selectors**: ${cssAnalyses.reduce((total, analysis) => total + analysis.potentialDuplicates, 0)}

## Critical Issues to Address

${generateCriticalIssuesList(cssAnalyses)}

## Detailed Analysis per File

${cssAnalyses.map(analysis => `
### ${analysis.filePath}

- **File Size (Unminified)**: ${analysis.fileSize}
- **File Size (Minified)**: ${analysis.minifiedSize}
- **Compression Ratio**: ${analysis.compressionRatio}
- **Selectors**: ${analysis.selectors}
- **Media Queries**: ${analysis.mediaQueries}
- **Font-Face Rules**: ${analysis.fontFaces}
- **!important Declarations**: ${analysis.importantDeclarations}
- **CSS Variable Usages**: ${analysis.varDeclarations}
- **CSS Variables Defined**: ${analysis.cssVars}
- **Potential Duplicate Selectors**: ${analysis.potentialDuplicates}

${analysis.potentialIssues.length > 0 ? `**Potential Issues**:
${analysis.potentialIssues.map(issue => `- ${issue}`).join('\n')}` : '**No potential issues detected**'}
`).join('\n')}

## Recommendations

${generateRecommendations(cssAnalyses)}

## Optimizations for Consistent Rendering

1. **Use CSS Variables Consistently**: Ensure CSS variables are defined in the same place across environments.
2. **Avoid Excessive !important**: Replace with more specific selectors.
3. **Check Media Query Order**: Ensure consistent ordering in production and development.
4. **Fix Duplicate Selectors**: Consolidate duplicate selectors to avoid different outcomes in production.
5. **Handle Whitespace Consistently**: Be careful with styles that depend on whitespace preservation.
6. **Standardize Font Loading**: Ensure fonts load consistently across environments.
7. **Test Responsive Breakpoints**: Verify media queries behave the same in both environments.
8. **Guard Against CSS Custom Properties Fallbacks**: Provide fallback values for browsers that don't support CSS variables.

`;

  return report;
}

// Helper to parse size strings back to bytes for calculations
function parseSize(sizeStr) {
  const [value, unit] = sizeStr.split(' ');
  const numValue = parseFloat(value);
  
  switch (unit) {
    case 'B': return numValue;
    case 'KB': return numValue * 1024;
    case 'MB': return numValue * 1024 * 1024;
    default: return numValue;
  }
}

// Generate a list of critical issues to address
function generateCriticalIssuesList(analyses) {
  // Aggregate and categorize issues
  const issueCategories = {
    'minification': [],
    'variables': [],
    'specificity': [],
    'media-queries': [],
    'duplicates': [],
    'vendor-prefixes': [],
    'other': []
  };
  
  analyses.forEach(analysis => {
    analysis.potentialIssues.forEach(issue => {
      const file = analysis.filePath;
      
      if (issue.includes('minification') || issue.includes('whitespace')) {
        issueCategories['minification'].push({ file, issue });
      } else if (issue.includes('variable')) {
        issueCategories['variables'].push({ file, issue });
      } else if (issue.includes('!important')) {
        issueCategories['specificity'].push({ file, issue });
      } else if (issue.includes('media queries')) {
        issueCategories['media-queries'].push({ file, issue });
      } else if (issue.includes('duplicate')) {
        issueCategories['duplicates'].push({ file, issue });
      } else if (issue.includes('vendor prefixes')) {
        issueCategories['vendor-prefixes'].push({ file, issue });
      } else {
        issueCategories['other'].push({ file, issue });
      }
    });
  });
  
  // Generate markdown list
  let criticalIssuesMd = '';
  
  Object.entries(issueCategories).forEach(([category, issues]) => {
    if (issues.length === 0) return;
    
    criticalIssuesMd += `### ${category.charAt(0).toUpperCase() + category.slice(1)} Issues\n\n`;
    
    issues.forEach(({ file, issue }) => {
      criticalIssuesMd += `- **${file}**: ${issue}\n`;
    });
    
    criticalIssuesMd += '\n';
  });
  
  return criticalIssuesMd || 'No critical issues found.';
}

// Generate specific recommendations based on analyses
function generateRecommendations(analyses) {
  // Analyze results to make targeted recommendations
  const allIssues = analyses.flatMap(a => a.potentialIssues);
  let recommendations = '';
  
  // Check for CSS Variable issues
  if (allIssues.some(issue => issue.includes('CSS variables'))) {
    recommendations += `
### CSS Variables Consistency

1. Move all CSS variable definitions to a single file that's imported first
2. Ensure CSS variables are defined in `:root` and not within media queries
3. Provide fallback values for all variable usages: \`var(--color-primary, #default)\`
4. Consider adding inline styles for critical variables on the HTML element
`;
  }
  
  // Check for media query issues
  if (allIssues.some(issue => issue.includes('media queries'))) {
    recommendations += `
### Media Query Optimization

1. Standardize breakpoint values and use a consistent approach
2. Consider using a mobile-first approach consistently (min-width vs max-width)
3. Verify media queries are not being reordered during minification
4. Add a specific style for debugging media query application
`;
  }
  
  // Check for minification issues
  if (allIssues.some(issue => issue.includes('minification') || issue.includes('whitespace'))) {
    recommendations += `
### Minification Handling

1. Update your CSS to not rely on whitespace preservation
2. Test with both minified and unminified CSS in development
3. Use explicit calculation in calc() functions rather than relying on spacing
4. Consider disabling certain minification rules in your production build
`;
  }
  
  // Check for specificity issues
  if (allIssues.some(issue => issue.includes('!important'))) {
    recommendations += `
### Specificity and !important Usage

1. Refactor styles to avoid reliance on !important declarations
2. Increase selector specificity rather than using !important
3. Create a specificity inventory in your styles.css file
4. Structure CSS to minimize cascade conflicts
`;
  }
  
  return recommendations || 'No specific recommendations based on the analysis.';
}

// Main function to run the analysis
async function analyzeCSS() {
  console.log(chalk.blue('=== CSS Build Analysis ==='));
  
  // Check if build exists
  if (!fs.existsSync(CONFIG.buildDir)) {
    console.error(chalk.red('Error: Build directory not found. Run `npm run build` first.'));
    process.exit(1);
  }
  
  // Find CSS files
  console.log(chalk.cyan('Finding CSS files in build directory...'));
  const cssFiles = findCssFiles(CONFIG.buildDir, CONFIG.cssPatterns);
  console.log(chalk.green(`Found ${cssFiles.length} CSS files.`));
  
  if (cssFiles.length === 0) {
    console.warn(chalk.yellow('Warning: No CSS files found in build output. Check your build configuration.'));
    process.exit(0);
  }
  
  // Analyze each file
  console.log(chalk.cyan('Analyzing CSS files...'));
  const cssAnalyses = [];
  
  for (const file of cssFiles) {
    console.log(`Analyzing ${path.relative(__dirname, file)}...`);
    const analysis = await analyzeCssFile(file);
    cssAnalyses.push(analysis);
  }
  
  // Generate and save report
  console.log(chalk.cyan('Generating report...'));
  const report = generateReport(cssAnalyses);
  fs.writeFileSync(CONFIG.outputFile, report);
  
  console.log(chalk.green(`Analysis complete! Report saved to ${path.relative(__dirname, CONFIG.outputFile)}`));
  
  // Log summary
  console.log(chalk.yellow('\nSummary of potential issues:'));
  
  const allIssues = cssAnalyses.flatMap(a => 
    a.potentialIssues.map(issue => `${path.relative(__dirname, a.filePath)}: ${issue}`)
  );
  
  if (allIssues.length === 0) {
    console.log(chalk.green('No potential issues detected!'));
  } else {
    allIssues.forEach(issue => console.log(`- ${issue}`));
  }
}

// Execute the analysis
analyzeCSS().catch(error => {
  console.error(chalk.red(`Error running CSS analysis: ${error.message}`));
  console.error(error.stack);
  process.exit(1);
}); 