import { defineEventHandler, getRouterParam } from 'h3';
import { ColumnView } from '../../../templates/components/column-view';
import { getLinkedProject } from '../../../utils/db';
import { html } from '../../../utils/render';

// prettier-ignore
const sortBy = <T>(key: keyof T) => (a: T, b: T) => a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0;

export default defineEventHandler((event) => {
  const projectId = getRouterParam(event, 'projectId');
  if (!projectId) return '';
  const project = getLinkedProject(projectId);
  if (!project) return '';

  return html`${project.stages.sort(sortBy('position')).map((stage) =>
    ColumnView({
      projectId,
      stageId: stage.id,
      hexColor: stage.hexColor,
      title: stage.title,
      tasks: stage.tasks
    })
  )}`;
});
