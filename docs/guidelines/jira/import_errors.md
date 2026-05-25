Fix errors in a space import
This is a troubleshooting guide for importing data into Jira. Refer to this page to resolve any errors you might come across while importing data using our new import experience.

If your import has failed or is partially complete, an error log will be sent to your email, or you should be able to download it at the end of the import. To find a solution to an error, use Ctrl+F or Command+F and enter the error code from the error log.

You need to be an organization, site, or Jira administrator to use the new import experience. 

In addition to administrators, users with permission to create team-managed spaces can create and import data into team-managed business spaces but won’t be able to move users. Instead, user fields in the new space will be unassigned and user tags in comments will appear as plain text.

Read about Jira’s global permissions

Import errors
Here’s how you can resolve errors you may encounter while importing data using a CSV file or while directly importing data from Asana, ClickUp, monday, and Trello.

Error code

Why does this error occur?

Solution

DT001

Locale, date, and time values don't match the selected format

Ensure that the locale, date, and time formats are consistent across your CSV file.

Upload the updated CSV file for import.

In the Preview mapped data screen, select Date and time format options.

Change the locale, date, and time formats to match the format in your CSV file.

DA002

Locale and dates don't match the format selected

Check if the locale and date formats are consistent across your CSV file.

Upload the updated CSV file for import.

In the Preview mapped data screen, select Date and time format options.

Change the locale and date format to match the format in your CSV file.

NU003

The number fields contain letters, special characters, or spaces

Remove special characters (e.g., commas, periods, or slashes), spaces, or letters from the number fields in your CSV file.

Number fields in your CSV file should only contain numbers from 0 to 9. 

CS004

The CSV file may contain the following issues:

Missing line break(s)

Missing data in rows and/or columns

Extra rows and/or columns

Check your CSV file for: 

Missing line break(s)

Missing data in rows and/or columns

Extra rows and/or columns

Contact support if you need assistance with this error.

EM005

The email addresses in the file aren't in the correct format

Check the email addresses in your CSV file. 

All email addresses should follow the format, username@domain.extension (e.g., xyz@company.com).

UR006

The URLs in the file aren't in the correct format

Check the URL formats in your CSV file. 

All URLs should follow the format, <scheme>://<authority><path>?<query>#<fragment> (e.g., https://www.atlassian.com).

IS007

One or more Summary fields are empty

Make sure Summary field isn't left empty in your CSV file. 

TE008

The Original time estimate, Remaining time estimate, and/or Time spent fields may contain the following issues:

The time data is not in seconds

The fields may contain letters, special characters, or spaces

Check and remove special characters (e.g., commas, periods, or slashes), spaces, or alphabets from the number fields in your CSV file.

The field must only contain numbers from 0 to 9. 

Make sure the time data is formatted in seconds (e.g., 1 hour should be 3600).

PA009

Invalid personal access token

Create a new personal access token from the third-party tool you’re importing the data. 

Run the import once again by entering the new personal access token. 

ON014

Organization name too long

Make sure that the organization names in your CSV file are not more than 200 characters. 