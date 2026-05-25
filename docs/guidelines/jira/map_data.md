Atlassian Support
Jira Software
Resources
Set up Jira Cloud
Import data into Jira
Cloud

Data Center
Map column data to work types
In the new import experience, you can connect the information within a specific column from your CSV file to work types in Jira. Read about work types

Work types help build structure in your project planning and the default work types in Jira can vary based on the space you select. You can also establish hierarchies between work items. Jira has three levels of hierarchy by default:

Epic (level 1)

Task/Story/Bug (level 0)

Subtask (level -1)

Make sure to set up the work item hierarchy in your CSV file to match the structure in Jira. More about preparing your CSV file before import

Structure your hierarchy
Based on your Jira plan, you can either map to default Jira work types or create new work types during the import. Here are the import capabilities available for each Jira plan:

Jira plan

How the space is managed

Actions that can be performed 

Restrictions

Free or Standard

Company-managed space

Can map to work types at levels 1 (only epic), 0, and -1. 

Can create any number of work types at levels 0 and -1 during import.

Can't create new work types at level 1 and above during import.

Premium and Enterprise

Company-managed space

Can map to work types at levels 1 (only epic), 0, and -1.

Can create any number of work types at levels 0 and -1. 

Can configure more hierarchy levels (level 2 or level 3) before import and map values to these levels during import. The new work types appear as options in the Map values to work types screen.

You need to be an administrator to configure hierarchy levels. 

Can't create new work types at level 1 and above during import.

Any plan

Team-managed space

Can map to work types at levels 1 (only epic), 0, and -1 (only subtask).

Can create any number of work types at level 0 during import. 

Can't create new work types at level 1 and above during import.

Can't create new work types at level -1 during import.

Map CSV column to work type field
When importing data into Jira using a CSV file, each row of data from the CSV file will be imported as a work item into your new space in Jira. In the Map space fields screen, all the column headers from the CSV file are listed and will need to be mapped to Jira fields.

To import work types, you must map a column from the CSV file to the work type field in the Map space fields screen. If you’d like to establish hierarchy levels, map columns to work item ID and parent fields in addition to the work type field. The work item ID and parent information helps bring in the “parent” and “child” relationships among work items. The values within the column mapped to the work type field can be mapped to specific Jira work types in the next screen (Map values to work types).

Make sure to map the right columns to work item ID, parent, and work type fields. This information will establish the structure of your space. 

Map values to Jira work types
This step is only available for business and software space imports.

In the Map values to work types screen, values from the CSV column mapped to the work type field are listed. If there are duplicate values in the column, they will be combined as a single line item on this screen. You will need to map these values to different Jira work types. If you have more than 150 unique values, you will be notified to check if the right column from the CSV file is mapped to the work type field.

To map CSV column values to Jira work types:

Select the dropdown next to the CSV column value you want to map and choose an existing or suggested Jira work type or create a new work type.

If you select Create a new work type, you can create a custom work type in two levels: Standard (level 0) or Subtask (level -1).

Once you select a work type level, a custom work type will be created with the same name as the value from the CSV column.

Select Next once all the values are mapped to work types.

The screen currently doesn’t have an option to map values in bulk. However, any unmapped values will be mapped to Task (level 0) by default.

If the column values are incorrectly mapped to work types, you will see an error. This occurs when the hierarchies established among work items in the CSV file are disrupted. To fix the error, map column values to work types at the same level. For instance, a level 0 value can only be mapped to level 0 work types like task, bug, and story.

The number of work types in your new space will be displayed in the Review details screen. By default, any unmapped values will be mapped to Task (level 0). Once the data is imported, your work items will be assigned the selected work types, and the child work items will be displayed within parent work items.