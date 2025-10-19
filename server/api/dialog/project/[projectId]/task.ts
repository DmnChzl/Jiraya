import { defineEventHandler, getRouterParam, setResponseStatus } from 'h3';
import { DialogContainer } from '../../../../templates/components/dialog-container';
import { TaskForm } from '../../../../templates/components/task-form';
import { MessageCirclePlusIcon } from '../../../../templates/icons';
import { getLinkedProject } from '../../../../utils/db';

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

  const stages = project.stages.map(({ id, title }) => ({ key: id, value: title }));

  return DialogContainer({
    title: 'New Task',
    subTitle: 'Lorem ipsum dolor sit amet',
    withHeader: 'rounded',
    customIcon: MessageCirclePlusIcon({ width: 36, height: 36, strokeWidth: 1.5 }),
    content: TaskForm({
      mode: 'creation',
      stages
    })
  });
});
