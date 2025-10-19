import { defineEventHandler, readBody, setResponseHeader, setResponseStatus } from 'h3';
import { getProject } from '../../utils/db';

export default defineEventHandler(async (event) => {
  const body = await readBody<{ projectId: string }>(event);
  const project = getProject(body.projectId);
  if (!project) {
    setResponseStatus(event, 404, 'Not Found');
    return;
  }
  setResponseHeader(event, 'HX-Redirect', `/project/${body.projectId}`);
  return; // 204
});
