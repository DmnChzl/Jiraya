import { DialogContainer } from '@server/templates/components/dialog-container';
import { ProjectForm } from '@server/templates/components/project-form';
import { MessageSquarePlusIcon } from '@server/templates/icons';
import { defineEventHandler } from 'h3';

export default defineEventHandler((_event) => {
  return DialogContainer({
    title: 'New Project',
    subTitle: 'Lorem ipsum dolor sit amet',
    withHeader: 'sqrt',
    customIcon: MessageSquarePlusIcon({ width: 36, height: 36, strokeWidth: 1.5 }),
    content: ProjectForm({ mode: 'creation' })
  });
});
