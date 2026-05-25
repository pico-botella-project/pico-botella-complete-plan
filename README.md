# Planning Template

This repository is a reusable software planning template. It is structured so the site can be adapted to another project by changing the contents of the `data/` modules without rewriting the HTML shell.

## Purpose

The current example project is Pico Botella, a mobile course project used to demonstrate how a planning site can organize:
- project overview
- Sprint 1 backlog
- team profiles and workload distribution
- quality guidelines
- design patterns and ISO 25010 notes
- exportable Jira-ready planning data

## How it is organized

- `data/` holds the source of truth for visible content.
- `views/` contains reusable HTML shells.
- `scripts/` renders each page from the corresponding data module.
- `styles/` keeps the visual system shared across the site.
- `docs/guidelines/` stores the source documents used to build the plan.

## Editing the template

If you need to adapt the plan to another project, update the data modules first:
- `data/config.data.js` for global project metadata.
- `data/backlog_planning.js` for the sprint backlog.
- `data/team_data.js` for task distribution.
- `data/project_data.js`, `data/iso_25010_data.js`, `data/design_patterns_data.js` and `data/lineamientos_data.js` for supporting sections.

After changing the data, the pages will reflect the new project without large changes to the HTML structure.

## Export

The backlog can be exported to Jira-compatible CSV with:

```bash
node scripts/export_to_jira.js
```

## Current scope

The active example focuses on Sprint 1 of Pico Botella and keeps the database section as a minimal local-storage plan.
