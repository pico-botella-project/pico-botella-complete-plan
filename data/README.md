# Data Files Guide

This folder contains the shared data modules used by the planning site.

- `config.data.js`: global project metadata used by shared views and headers.
- `index_data.js`: navigation cards and homepage content.
- `backlog_planning.js`: Sprint 1 backlog, epics, user stories, acceptance criteria, DoD and tasks.
- `team_data.js`: sprint distribution, task assignment and workload view.
- `team_members_data.js`: member profiles, skills and characteristics.
- `project_data.js`: project summary, scope and links.
- `iso_25010_data.js`: quality criteria summary for the project.
- `design_patterns_data.js`: design patterns summary for the project.
- `site_map_data.js`: site map content.
- `database_data.js`: database or local storage plan.
- `lineamientos_data.js`: sprint guidelines, quality criteria and delivery commitments.

The HTML pages and scripts consume these files directly so the plan can be adapted by changing the data layer only.
