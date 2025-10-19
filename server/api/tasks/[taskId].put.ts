import { defineEventHandler, getRouterParam, readBody, setResponseHeader, setResponseStatus } from 'h3';
import { updateTask } from '../../utils/db';

interface TaskBody {
  title: string;
  description?: string;
  stageId: string;
}

export default defineEventHandler(async (event) => {
  const taskId = getRouterParam(event, 'taskId');
  if (!taskId) {
    setResponseStatus(event, 400, 'Bad Request');
    return;
  }

  const body = await readBody<TaskBody>(event);
  updateTask(taskId, body);
  setResponseHeader(event, 'HX-Trigger', 'taskUpdated');
  return '';
});
