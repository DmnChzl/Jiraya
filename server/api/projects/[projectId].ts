import { getProject } from '@server/utils/db';
import { html } from '@server/utils/render';
import { defineEventHandler, getRouterParam, setResponseStatus } from 'h3';

export default defineEventHandler((event) => {
  const projectId = getRouterParam(event, 'projectId');
  if (!projectId) {
    setResponseStatus(event, 400, 'Bad Request');
    return;
  }

  const project = getProject(projectId);
  if (!project) {
    setResponseStatus(event, 404, 'Not Found');
    return;
  }

  return html`
    <h1 class="font-medium text-[24px]">${project.title}</h1>
    ${project.description ? `<p class="text-neutral-500">${project.description}</p>` : ''}
  `;
});
