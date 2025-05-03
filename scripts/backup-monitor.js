#!/usr/bin/env node

/**
 * This script monitors the status of backups for the Healthshare Plan Finder application.
 * It checks if backups are created according to the schedule and sends alerts if issues are detected.
 * 
 * Usage:
 * node scripts/backup-monitor.js
 * 
 * Configure this script to run as a cron job to regularly check backup status.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const config = {
  backupMonitoringEnabled: process.env.BACKUP_MONITORING_ENABLED === 'true',
  backupDirectory: process.env.BACKUP_DIRECTORY || './backups',
  databaseBackupPrefix: 'db_backup_',
  contentBackupPrefix: 'content_backup_',
  alertEmail: process.env.ALERT_EMAIL,
  alertSlackWebhook: process.env.ALERT_SLACK_WEBHOOK,
  
  // Thresholds (in hours)
  databaseBackupMaxAge: 24, // Database backups should be no older than 24 hours
  contentBackupMaxAge: 48, // Content backups should be no older than 48 hours
  
  // For local development, use these mock values
  mockMode: process.env.NODE_ENV !== 'production',
  mockBackups: [
    { name: 'db_backup_20230501.sql', timestamp: Date.now() - 12 * 60 * 60 * 1000 }, // 12 hours ago
    { name: 'content_backup_20230501.tar.gz', timestamp: Date.now() - 36 * 60 * 60 * 1000 }, // 36 hours ago
  ]
};

// Create backup directory if it doesn't exist
if (!config.mockMode && !fs.existsSync(config.backupDirectory)) {
  fs.mkdirSync(config.backupDirectory, { recursive: true });
}

function getCurrentTimestamp() {
  return new Date().toISOString().replace(/[:.]/g, '-');
}

function logMessage(message, type = 'info') {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] [${type.toUpperCase()}] ${message}\n`;
  
  // Print to console
  console.log(logEntry);
  
  // Log to file
  const logFile = path.join(config.backupDirectory, 'backup-monitor.log');
  fs.appendFileSync(logFile, logEntry);
}

function sendAlert(message, critical = false) {
  logMessage(message, critical ? 'critical' : 'warning');
  
  // In production, send actual alerts
  if (!config.mockMode) {
    // Send email alert if configured
    if (config.alertEmail) {
      // This is a simple example - in a real system, you'd use a proper email service
      try {
        execSync(`echo "${message}" | mail -s "${critical ? 'CRITICAL' : 'WARNING'} Backup Monitor Alert" ${config.alertEmail}`);
        logMessage(`Email alert sent to ${config.alertEmail}`, 'info');
      } catch (error) {
        logMessage(`Failed to send email alert: ${error.message}`, 'error');
      }
    }
    
    // Send Slack alert if configured
    if (config.alertSlackWebhook) {
      try {
        const payload = {
          text: `${critical ? '🚨 *CRITICAL ALERT*' : '⚠️ *WARNING*'}: ${message}`,
        };
        
        execSync(`curl -X POST -H 'Content-type: application/json' --data '${JSON.stringify(payload)}' ${config.alertSlackWebhook}`);
        logMessage('Slack alert sent', 'info');
      } catch (error) {
        logMessage(`Failed to send Slack alert: ${error.message}`, 'error');
      }
    }
  } else {
    logMessage('MOCK MODE: Alert would be sent in production', 'info');
  }
}

function getBackups() {
  if (config.mockMode) {
    return config.mockBackups;
  }
  
  // Get real backups from the backup directory
  const files = fs.readdirSync(config.backupDirectory);
  
  return files
    .filter(file => 
      file.startsWith(config.databaseBackupPrefix) || 
      file.startsWith(config.contentBackupPrefix)
    )
    .map(file => {
      const stats = fs.statSync(path.join(config.backupDirectory, file));
      return {
        name: file,
        timestamp: stats.mtime.getTime()
      };
    });
}

function checkBackupAge(backups, prefix, maxAgeHours) {
  // Filter backups by prefix
  const filteredBackups = backups.filter(backup => backup.name.startsWith(prefix));
  
  if (filteredBackups.length === 0) {
    sendAlert(`No ${prefix} backups found`, true);
    return false;
  }
  
  // Find the most recent backup
  const mostRecent = filteredBackups.reduce((prev, current) => 
    (current.timestamp > prev.timestamp) ? current : prev
  );
  
  // Calculate age in hours
  const ageHours = (Date.now() - mostRecent.timestamp) / (1000 * 60 * 60);
  
  if (ageHours > maxAgeHours) {
    sendAlert(`Most recent ${prefix} backup is ${Math.round(ageHours)} hours old (older than threshold of ${maxAgeHours} hours)`, true);
    return false;
  }
  
  logMessage(`Most recent ${prefix} backup is ${Math.round(ageHours)} hours old (within threshold of ${maxAgeHours} hours)`, 'info');
  return true;
}

function generateBackupReport(backups) {
  // Group backups by type
  const dbBackups = backups.filter(b => b.name.startsWith(config.databaseBackupPrefix));
  const contentBackups = backups.filter(b => b.name.startsWith(config.contentBackupPrefix));
  
  // Generate report
  let report = '# Backup Status Report\n';
  report += `Generated: ${new Date().toISOString()}\n\n`;
  
  report += '## Database Backups\n';
  if (dbBackups.length === 0) {
    report += 'No database backups found\n';
  } else {
    report += `Total backups: ${dbBackups.length}\n`;
    report += `Most recent: ${new Date(Math.max(...dbBackups.map(b => b.timestamp))).toISOString()}\n`;
  }
  
  report += '\n## Content Backups\n';
  if (contentBackups.length === 0) {
    report += 'No content backups found\n';
  } else {
    report += `Total backups: ${contentBackups.length}\n`;
    report += `Most recent: ${new Date(Math.max(...contentBackups.map(b => b.timestamp))).toISOString()}\n`;
  }
  
  // Save report
  const reportPath = path.join(config.backupDirectory, `backup-report-${getCurrentTimestamp()}.md`);
  fs.writeFileSync(reportPath, report);
  logMessage(`Backup report generated: ${reportPath}`, 'info');
  
  return report;
}

function monitorBackups() {
  logMessage('Starting backup monitoring', 'info');
  
  if (!config.backupMonitoringEnabled && !config.mockMode) {
    logMessage('Backup monitoring is disabled. Set BACKUP_MONITORING_ENABLED=true to enable.', 'warning');
    return;
  }
  
  const backups = getBackups();
  logMessage(`Found ${backups.length} backups`, 'info');
  
  // Check database backups
  const dbBackupOk = checkBackupAge(backups, config.databaseBackupPrefix, config.databaseBackupMaxAge);
  
  // Check content backups
  const contentBackupOk = checkBackupAge(backups, config.contentBackupPrefix, config.contentBackupMaxAge);
  
  // Generate report
  const report = generateBackupReport(backups);
  
  // Summary
  if (dbBackupOk && contentBackupOk) {
    logMessage('All backup checks passed', 'info');
  } else {
    sendAlert('One or more backup checks failed. Check the log for details.', !dbBackupOk);
  }
  
  logMessage('Backup monitoring completed', 'info');
}

// Run the monitor
monitorBackups(); 