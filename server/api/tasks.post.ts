import { createTaskWithStageId } from '@server/utils/db';
import { defineEventHandler, readBody, setResponseHeader, setResponseStatus } from 'h3';

interface TaskBody {
  title: string;
  description?: string;
  stageId: string;
}

export default defineEventHandler(async (event) => {
  const body = await readBody<TaskBody>(event);
  const createStageTask = createTaskWithStageId(body.stageId);
  createStageTask(body.title, body.description);

  setResponseStatus(event, 201, 'Created');
  setResponseHeader(event, 'HX-Trigger', 'taskCreated');
  return '';
});
