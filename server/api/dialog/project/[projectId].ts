import { DialogContainer } from '@server/templates/components/dialog-container';
import { ProjectForm } from '@server/templates/components/project-form';
import { getProject } from '@server/utils/db';
import { defineEventHandler, getRouterParam, setResponseStatus } from 'h3';

export default defineEventHandler((event) => {
  const projectId = getRouterParam(event, 'projectId');
  if (!projectId) {
    setResponseStatus(event, 400, 'Bad Request');
    return '';
  }

  const project = getProject(projectId);
  if (!project) {
    setResponseStatus(event, 404, 'Not Found');
    return '';
  }

  return DialogContainer({
    title: 'Edit Project',
    subTitle: 'Lorem ipsum dolor sit amet',
    withHeader: 'sqrt',
    content: ProjectForm({
      mode: 'edition',
      projectId,
      title: project.title,
      description: project.description
    })
  });
});
