import { DialogContainer } from '@server/templates/components/dialog-container';
import { TaskForm } from '@server/templates/components/task-form';
import { getLinkedProject, getTask } from '@server/utils/db';
import { defineEventHandler, getRouterParam, setResponseStatus } from 'h3';

export default defineEventHandler((event) => {
  const projectId = getRouterParam(event, 'projectId');
  if (!projectId) {
    setResponseStatus(event, 400, 'Bad Request');
    return '';
  }

  const project = getLinkedProject(projectId);
  if (!project) {
    setResponseStatus(event, 404, 'Not Found');
    return '';
  }

  const taskId = getRouterParam(event, 'taskId');
  if (!taskId) {
    setResponseStatus(event, 400, 'Bad Request');
    return '';
  }

  const task = getTask(taskId);
  if (!task) {
    setResponseStatus(event, 404, 'Not Found');
    return '';
  }

  const stages = project.stages.map(({ id, title }) => ({ key: id, value: title }));

  return DialogContainer({
    title: 'Edit Task',
    subTitle: 'Lorem ipsum dolor sit amet',
    withHeader: 'rounded',
    content: TaskForm({
      mode: 'edition',
      taskId,
      title: task.title,
      description: task.description,
      stages
    })
  });
});
