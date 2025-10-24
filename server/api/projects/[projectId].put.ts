import { updateProject } from '@server/utils/db';
import { defineEventHandler, getRouterParam, readBody, setResponseHeader, setResponseStatus } from 'h3';

interface ProjectBody {
  title: string;
  description?: string;
}

export default defineEventHandler(async (event) => {
  const projectId = getRouterParam(event, 'projectId');
  if (!projectId) {
    setResponseStatus(event, 400, 'Bad Request');
    return;
  }

  const body = await readBody<ProjectBody>(event);
  updateProject(projectId, body);
  setResponseHeader(event, 'HX-Trigger', 'projectUpdated');
  return '';
});
