import { createProject, createStageWithProjectId } from '@server/utils/db';
import { defineEventHandler, readBody, setResponseHeader, setResponseStatus } from 'h3';

interface ProjectBody {
  title: string;
  description?: string;
}

export default defineEventHandler(async (event) => {
  const body = await readBody<ProjectBody>(event);
  const projectId = createProject(body.title, body.description);
  const createProjectStage = createStageWithProjectId(projectId);

  createProjectStage('Doing', 0, '#22c55e');
  createProjectStage('In Progress', 1, '#eab308');
  createProjectStage('In Review', 2, '#f97316');
  createProjectStage('Done', 3, '#737373');

  setResponseStatus(event, 201, 'Created');
  setResponseHeader(event, 'HX-Redirect', `/project/${projectId}`);
  return;
});
