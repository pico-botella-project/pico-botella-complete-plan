/**
 * export_to_jira.js
 * Exports Pico Botella backlog data to a Jira-compatible CSV with hierarchy.
 * Usage: node scripts/export_to_jira.js
 */

const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/backlog_planning.js');
let backlog;
try {
  backlog = require(dataPath);
  if (backlog && backlog.BACKLOG_PLANNING) backlog = backlog.BACKLOG_PLANNING;
} catch (err) {
  console.error('No se pudo cargar backlog_planning.js:', err.message);
  process.exit(1);
}

function csvEscape(value) {
  return '"' + String(value ?? '').replace(/"/g, '""') + '"';
}

function getAssigneeEmail(name) {
  const assigneeMap = {
    'Ivan Ausecha': 'ivan.ausecha@correounivalle.edu.co',
    'Juan Francesco Garcia': 'juan.francesco.garcia@correounivalle.edu.co',
    'José Martínez': 'jose.armando.martinez@correounivalle.edu.co',
    'Adolfo Andrey Quiceno': 'adolfo.quiceno@correounivalle.edu.co',
    'Dylan Morales': 'dylan.morales@correounivalle.edu.co',
  };
  return assigneeMap[name] || '';
}

function derivePriority(points) {
  if (points >= 8) return 'High';
  if (points >= 5) return 'Medium';
  if (points >= 2) return 'Low';
  return 'Lowest';
}

function buildCsv(sourceBacklog) {
  const rows = [];
  rows.push([
    'Issue Type',
    'Issue ID',
    'Parent',
    'Summary',
    'Description',
    'Assignee',
    'Priority',
    'Labels',
    'Story Points',
    'Acceptance Criteria',
    'Definition of Done',
  ].join(','));

  const sprint = sourceBacklog.sprint1 || {};
  const epics = Array.isArray(sprint.epics) ? sprint.epics : [];
  const stories = Array.isArray(sprint.userStories) ? sprint.userStories : [];

  epics.forEach((epic) => {
    const epicId = `tmp-epic-${epic.id}`;
    const epicLead = stories.find((story) => story.epic === epic.id);
    const epicAssignee = epicLead ? epicLead.assignedTo : 'Adolfo Andrey Quiceno';
    rows.push([
      csvEscape('Epic'),
      csvEscape(epicId),
      csvEscape(''),
      csvEscape(epic.title || epic.name || epic.id),
      csvEscape(epic.description || 'Epic del Sprint 1'),
      csvEscape(getAssigneeEmail(epicAssignee)),
      csvEscape('Medium'),
      csvEscape(['picobotella', 'sprint1', epic.id].filter(Boolean).join(';')),
      csvEscape(''),
      csvEscape(''),
      csvEscape(''),
    ].join(','));
  });

  stories.forEach((story) => {
    const storyId = `tmp-story-${story.code}`;
    const parentId = `tmp-epic-${story.epic}`;
    const labels = ['picobotella', 'sprint1', story.epic, story.sprint].filter(Boolean).join(';');

    rows.push([
      csvEscape('Story'),
      csvEscape(storyId),
      csvEscape(parentId),
      csvEscape(story.title || ''),
      csvEscape(story.description || ''),
      csvEscape(getAssigneeEmail(story.assignedTo || '')),
      csvEscape(derivePriority(story.points || 0)),
      csvEscape(labels),
      csvEscape(story.points || 0),
      csvEscape(Array.isArray(story.acceptanceCriteria) ? story.acceptanceCriteria.join('; ') : ''),
      csvEscape(Array.isArray(story.definitionOfDone) ? story.definitionOfDone.join('; ') : ''),
    ].join(','));

    (story.tasks || []).forEach((task) => {
      const taskId = `tmp-task-${task.id}`;
      rows.push([
        csvEscape('Sub-task'),
        csvEscape(taskId),
        csvEscape(storyId),
        csvEscape(task.title || ''),
        csvEscape(task.description || task.role || ''),
        csvEscape(getAssigneeEmail(task.assignedTo || '')),
        csvEscape('Medium'),
        csvEscape(['picobotella', 'sprint1', task.role, story.epic].filter(Boolean).join(';')),
        csvEscape(''),
        csvEscape(''),
        csvEscape(''),
      ].join(','));
    });
  });

  return rows.join('\r\n');
}

const rows = buildCsv(backlog);
const outFile = path.join(__dirname, '../data/backlog_jira_export.csv');
fs.writeFileSync(outFile, rows, 'utf8');
console.log('CSV export generado en:', outFile);
