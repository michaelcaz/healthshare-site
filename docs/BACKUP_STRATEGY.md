# Healthshare Plan Finder Backup Strategy

## Overview

This document outlines the backup strategy for the Healthshare Plan Finder application. The strategy ensures data integrity, business continuity, and disaster recovery capabilities.

## Backup Components

Our backup strategy covers the following components:

1. **Supabase Database**: All structured data
2. **Sanity.io Content**: CMS content, blog posts, and media
3. **Application Code**: Source code and configuration
4. **Environment Variables**: Critical configuration settings
5. **User-generated Content**: Uploaded files and media

## Backup Schedules

| Component | Frequency | Retention Period | Storage |
|-----------|-----------|------------------|---------|
| Supabase Database | Daily | 30 days | Primary: Supabase Backups<br>Secondary: AWS S3 |
| Sanity.io Content | Daily | 90 days | Sanity.io Cloud + GitHub |
| Application Code | On each commit | Indefinite | GitHub + Local Backups |
| Environment Variables | Weekly | 1 year | Encrypted Vault + Password Manager |
| User-generated Content | Daily | 90 days | Supabase Storage + AWS S3 |

## Supabase Database Backup

### Automated Backups

Supabase provides automated daily backups for all projects on the Pro plan and above. These backups are:

- Taken daily at 00:00 UTC
- Retained for 30 days
- Point-in-time recovery (PITR) available for up to 7 days

### Manual Backups

In addition to Supabase's automated backups, we perform weekly manual backups:

1. Using the Supabase CLI to dump the database:

```bash
supabase db dump -f backup_$(date +%Y%m%d).sql
```

2. The backup is encrypted and stored in AWS S3:

```bash
gpg --symmetric --cipher-algo AES256 backup_$(date +%Y%m%d).sql
aws s3 cp backup_$(date +%Y%m%d).sql.gpg s3://healthshare-backups/database/
```

### Restoration Process

To restore a Supabase database:

1. For Supabase-managed backups:
   - Use the Supabase dashboard to restore a point-in-time backup
   - Select the desired backup date and time
   - Confirm the restoration

2. For manual backups:
   - Download the encrypted backup from S3
   - Decrypt the backup file
   - Restore to a staging database first for verification
   - Once verified, restore to production

## Sanity.io Content Backup

### Automated Backups

Sanity.io maintains continuous backups of all content as part of their service. Additionally, we implement:

1. Weekly exports of all content using the Sanity CLI:

```bash
sanity dataset export production backups/sanity_$(date +%Y%m%d).tar.gz
```

2. Storage of these exports in a separate backup repository

### Restoration Process

To restore Sanity content:

1. For recent content changes:
   - Use Sanity.io's built-in versioning system to roll back specific documents

2. For full dataset restoration:
   - Create a temporary dataset for verification
   - Import the backup into the temporary dataset
   - Verify the content
   - Import into the production dataset if needed

## Application Code Backup

### GitHub Repository

All application code is stored in a private GitHub repository with:

- Branch protection rules for `main`
- Required code reviews before merging
- CI/CD checks before merge
- Regular tagging of stable versions

### Local Backups

In addition to GitHub:

1. Weekly local clones of the repository on secure devices
2. Encrypted archives of these clones stored offsite

## Environment Variables

### Secure Storage

Environment variables are stored in:

1. Vercel project settings (for production deployments)
2. 1Password secure vault (as backup)
3. Encrypted local file on team lead devices

### Backup Process

1. Weekly export of all environment variables from all environments
2. Encrypted storage in a secure vault
3. Access limited to authorized team members

## User-generated Content

### Supabase Storage

User-uploaded content is stored in Supabase Storage buckets, which are backed up:

1. Daily snapshots of all storage buckets
2. Retention of 90 days for all backups
3. Replication to AWS S3 for redundancy

### Restoration Process

To restore user-generated content:

1. Identify the affected files from storage logs
2. Restore from the appropriate backup snapshot
3. Verify file integrity

## Disaster Recovery

### Recovery Time Objectives (RTO)

| Component | RTO |
|-----------|-----|
| Website Functionality | < 2 hours |
| Database | < 4 hours |
| User Content | < 8 hours |
| Full System | < 24 hours |

### Recovery Point Objectives (RPO)

| Component | RPO |
|-----------|-----|
| Database | < 24 hours |
| User Content | < 24 hours |
| CMS Content | < 24 hours |

### Recovery Procedures

1. **Application Outage**:
   - Deploy from the last stable tag
   - Restore environment variables
   - Verify application functionality

2. **Database Corruption**:
   - Identify the time of corruption
   - Restore database to the point before corruption
   - Verify data integrity

3. **Complete System Failure**:
   - Deploy application code to new infrastructure
   - Restore database from latest backup
   - Restore environment variables
   - Restore user content
   - Verify all connections and functionality

## Testing Backup Procedures

To ensure our backup strategy is effective:

1. Monthly tests of database restoration to a test environment
2. Quarterly full disaster recovery drills
3. Documentation of all test results and improvements to processes

## Responsibilities

| Task | Responsible Party | Frequency |
|------|-------------------|-----------|
| Database Backups | DevOps Lead | Daily (automated), Weekly (manual) |
| Sanity.io Exports | Content Manager | Weekly |
| Code Backups | Lead Developer | On commit (automated) |
| Environment Variable Backups | DevOps Lead | Weekly |
| Backup Verification | QA Team | Monthly |
| Disaster Recovery Tests | DevOps + Development Team | Quarterly |

## Monitoring and Alerting

The backup system is monitored with:

1. Automated alerts for failed backups
2. Weekly backup status reports
3. Monthly backup size and integrity reports

## Security Measures

All backups implement the following security measures:

1. Encryption at rest and in transit
2. Access control with least privilege principle
3. Regular rotation of access credentials
4. Audit logging of all backup and restore operations

## Documentation and Training

1. Detailed documentation of all backup and restore procedures
2. Regular training for team members on backup procedures
3. Assignment of backup responsibilities to specific team members
4. Quarterly review and updates to this backup strategy document 