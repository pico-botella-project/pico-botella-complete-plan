/**
 * export_to_jira.js
 * Simple Node script to export backlog_planning Sprint 1 user stories to a CSV
 * suitable for Jira CSV import (Summary, Description, Acceptance Criteria, Assignee, Epic, Story Points, Sprint, Labels)
 * Usage: node scripts/export_to_jira.js
 */

const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/backlog_planning.js');
let backlog;
try {
  backlog = require(dataPath);
  // If module exports object with BACKLOG_PLANNING
  if (backlog && backlog.BACKLOG_PLANNING) backlog = backlog.BACKLOG_PLANNING;
} catch (err) {
  console.error('No se pudo cargar backlog_planning.js:', err.message);
  process.exit(1);
}

const stories = (backlog.sprint1 && backlog.sprint1.userStories) || [];
if (!stories.length) {
  console.error('No se encontraron historias en backlog_planning.sprint1.userStories');
  process.exit(1);
}

const rows = [];
// Header for Jira CSV
rows.push(['Summary', 'Description', 'Acceptance Criteria', 'Assignee', 'Epic Link', 'Story Points', 'Sprint', 'Labels'].join(','));

stories.forEach((s) => {
  const summary = (s.title || '').replace(/,/g, '');
  const description = (s.description || '').replace(/\n/g, ' ').replace(/,/g, '');
  const acceptance = (Array.isArray(s.acceptanceCriteria) ? s.acceptanceCriteria.join('; ') : '').replace(/,/g, '');
  const assignee = (s.assignedTo || '').replace(/,/g, '');
  const epic = s.epic || '';
  const points = s.points || '';
  const sprint = s.sprint || '';
  const labels = (s.labels || []).join(';');

  rows.push([summary, description, acceptance, assignee, epic, points, sprint, labels].join(','));
});

const outFile = path.join(__dirname, '../data/backlog_jira_export.csv');
fs.writeFileSync(outFile, rows.join('\n'), 'utf8');
console.log('CSV export generado en:', outFile);
