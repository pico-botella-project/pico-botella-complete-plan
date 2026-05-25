Project configuration

- Main config file in `data/config.data.js` defines `PROJECT_CONFIG` used by views and scripts.
- Update `version` in `data/config.data.js` and `VERSION` when releasing a new version.
- `backlog_planning.js` contains sprint and user story data; views should load it to present user stories.
- `EMBEDDED_DATA` is provided in `backlog_planning.js` for backward compatibility with existing viewer scripts.
