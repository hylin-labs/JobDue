# Backup Guide

JobDue saves your jobs in the browser on the device you are using.

Backups are important because browser data can be cleared, devices can be replaced, and different browsers do not automatically share data.

## The Important Rule

Use **Export Backup** to create a restore file.

The backup file ends in `.json`.

This is the file you need if you want to recover jobs later or move JobDue data to another browser or device.

Do not rely on private/incognito mode for real work. Those windows may clear saved jobs when closed.

## Export A Backup

1. Open JobDue.
2. Go to the **Data** tab.
3. Click **Export Backup**.
4. Keep the downloaded `.json` file somewhere safe.

Good places to keep a backup:

- Downloads folder
- Email to yourself
- Google Drive
- iCloud Drive
- OneDrive
- USB drive

These places store the backup file only. They do not create live sync inside JobDue.

## Import A Backup

1. Open JobDue in the browser or device where you want the data.
2. Go to the **Data** tab.
3. Click **Import Backup**.
4. Choose your `.json` backup file.
5. Review the preview.
6. Confirm only when you are ready to replace the jobs currently saved in that browser.

Import Backup replaces the current jobs saved in that browser.

JobDue V1 does not merge two backups together.

## CSV Export Is Different

CSV export is for spreadsheet review and reporting.

Use CSV when you want to open job rows in Excel, Google Sheets, or Numbers.

CSV files cannot restore JobDue.

For restore or device transfer, use **Export Backup**, not CSV.

## Backup File Privacy

Your `.json` backup may contain client names, phone numbers, email addresses, service addresses, job notes, invoice amounts, and payment status.

Do not share a backup file publicly.

If you contact support, describe the problem first and include your device and browser. Only send a backup file if support specifically asks for it.

## When To Export A Backup

Recommended:

- After your first setup
- After adding a batch of jobs
- After collecting payments
- Before clearing browser history or site data
- Before switching computers, phones, tablets, or browsers
- At least once a week if you use JobDue regularly

JobDue may remind you after several changes or after enough time has passed since your last backup.

## If You Use Multiple Devices

JobDue does not automatically sync.

To move data manually:

1. Export Backup from the device with the newest data.
2. Move the `.json` file to the other device.
3. Import Backup on the other device.

Only do this when you are comfortable replacing the jobs saved on the second device.

## Before You Reset Or Load Sample Data

Export a backup first if you want to keep your current jobs.

**Load Sample Data** replaces the jobs saved in that browser with demo jobs.

**Erase All Saved Data** removes the jobs saved in that browser.
