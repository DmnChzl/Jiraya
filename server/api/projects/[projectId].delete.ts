import { deleteLinkedProject } from '@server/utils/db';
import { defineEventHandler, getRouterParam, setResponseHeader, setResponseStatus } from 'h3';

export default defineEventHandler((event) => {
  const projectId = getRouterParam(event, 'projectId');
  if (!projectId) {
    setResponseStatus(event, 400, 'Bad Request');
    return;
  }

  const hasBeenDeleted = deleteLinkedProject(projectId);
  if (!hasBeenDeleted) {
    setResponseStatus(event, 404, 'Not Found');
    return;
  }

  setResponseHeader(event, 'HX-Redirect', '/');
  return; // 204
});
