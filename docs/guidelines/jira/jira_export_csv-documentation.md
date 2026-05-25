Prepare a CSV file for import
Comma-separated value (CSV) files are text files that represent tabulated data and are supported by most systems that handle tabulated data, such as spreadsheets and databases. You can base the structure of your CSV file on the default Microsoft Excel CSV format.

Here are a few tips to help you prepare your CSV file in order to move data using the new import experience.

You need to be an organization, site, or Jira administrator to use the new import experience. 

In addition to administrators, users with permission to create team-managed spaces can create and import data into team-managed business spaces but won’t be able to move users. Instead, user fields in the new space will be unassigned and user tags in comments will appear as plain text.

Read about Jira’s global permissions

Tips for preparing your CSV
When creating a CSV file that can be imported into Jira, make sure all fields are separated by commas and that all pieces of content (including commas and new lines) are enclosed in quotes. 

Include a heading row with a summary field
When importing a file, the summary field is always required. It provides an overview of the work item.

The summary field is a short description of a work item that is used to provide a quick overview of what the work item is about. It is typically the first piece of information you’ll see when browsing work items. The field should be concise and descriptive and should provide enough information to understand the nature of the work item.

The CSV importer uses the file header row to determine how to map data from the file's second row and beyond to fields in Jira.

Assign users to work items
Use email addresses when adding people as assignees, reporters, or creators to your CSV file. This will help us map them to the space and work items created. Read about importing CSV data into Jira fields

If a CSV file doesn’t contain email addresses in user fields, you can manually add email addresses to the relevant user IDs during the import. 

Avoid punctuation in the header row
To prevent inaccuracies in your imports, avoid including any punctuation in the header row (apart from the commas separating each column).

Mention users in the description or comments of a work item
To use mentions in the description or comment fields of a work item, replace the user mention in your data with the following email-based mention format: [~email:user@example.com] 
Once imported, the mention will be linked to the user associated with the provided email address.

Structure data for comments within a work item
To ensure your comments are imported correctly, structure data in comments in this manner:

createdDate;Creator;commentBody
If the data isn’t structured in this format, the comment creator’s name will display as Anonymous.

Treat special characters literally
Use double-quote marks (") around a section of text to treat any special characters in that section literally. Once this data is imported, these special characters will be stored as part of Jira's field data. Examples of special characters include carriage returns/enter characters, commas, etc.

To treat a double quote mark literally, you can add another double quote mark character:

"Clicking the ""Add"" button results in a page not found error"
...which, once imported, will be stored in Jira as:

Clicking the "Add" button results in a page not found error 
Aggregate multiple values into single fields
You can import multiple values into a single Jira field that accepts multiple values (e.g. Watchers, Component, Labels). To do this, your CSV file must specify the same column name for each value you wish to import to the same field. The number of column names specified must match the maximum number of values to be aggregated into the mapped field.

For example:

WorkType, Summary, Label, Label, Label, Component, Component
bug, "First work item", v1, , , Component1,
bug, "Second work item", v2, , , Component1, Component2
bug, "Third work item", v1, v2, v3, Component1,
In the above example, the Label and Component fields in the first work item and the Component field of the third work item will generate multiple values in the relevant field after importing.

Include work item ID and parent columns to import hierarchies
If you’d like to import work types and parent-child relationships between work items, along with the work type column, include the work item ID and parent columns in your CSV file. 

Work item ID helps identify each work item. Parent helps identify the parent relationship and is simply the work item ID of the parent work item. The IDs help establish dependencies and connect related work. Make sure that the IDs are unique to each work item to ensure that the hierarchies are imported. Here is an example CSV layout:

Work type

Status

Summary

Work item ID

Parent

Theme

To Do

UI content for screen 1

1

 

Initiative

To Do

Review for screen 1

2

1

Epic

To Do

Test screen 1

3

2

Epic

To Do

UI content for screen 2

4

 

Story

To Do

UI content for screen 3

5

 

Keep the organization names less than or equal to 200 characters 
While importing a CSV file into a Jira Service Management space, keep the names of your organization equal to or less than 200 characters. If the organization name is greater than 200 characters, you will see an error while mapping your data for import.

Add reporters column to your CSV file for a service space
Service spaces have request types attached to the work items. These request types are dependent upon the reporters column in the service space.

While importing data from your CSV file, add the reporters column to ensure a smooth import of your work items.

Assign work types to request types in service spaces
While importing data from a CSV file into a service space, each work type is mapped to a request type and status.

Make sure to change the work types in the CSV file based on the request type you’d like to assign to. If the work type is TASK, SUBTASK or any other value, the request type will default to NO REQUEST TYPE. If the work type is GENERAL REQUEST, the default request type EMAILED REQUESTwill be assigned.

If there is no default status assigned, work types will be assigned IN PROGRESS status.

Handle custom fields
When importing data into your business or software space you can choose to create new custom fields. Custom fields allow you to add information specific to your team's needs. You can also import data to a variety of existing custom fields created previously within your instance.