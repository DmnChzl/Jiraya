import { deleteTask } from '@server/utils/db';
import { defineEventHandler, getRouterParam, setResponseHeader, setResponseStatus } from 'h3';

export default defineEventHandler(async (event) => {
  const taskId = getRouterParam(event, 'taskId');
  if (!taskId) {
    setResponseStatus(event, 400, 'Bad Request');
    return;
  }

  const hasBeenDeleted = deleteTask(taskId);
  if (!hasBeenDeleted) {
    setResponseStatus(event, 404, 'Not Found');
    return;
  }

  setResponseHeader(event, 'HX-Trigger', 'taskDeleted');
  return '';
});
