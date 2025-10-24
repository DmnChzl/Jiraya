import { TaskCardSkeleton } from '@server/templates/components/task-card';
import { PlusIcon } from '@server/templates/icons';
import { BaseLayout } from '@server/templates/layouts/base';
import { HeaderLayout } from '@server/templates/layouts/header';
import { getProject } from '@server/utils/db';
import { html } from '@server/utils/render';
import { defineEventHandler, getRouterParam } from 'h3';

const ProjectNotFound = () => html`
  <main class="w-full max-w-[1280px] h-[calc(100%-74px)] mx-auto px-4 xl:px-0 py-4 flex flex-col gap-y-4 overflow-y-auto">
    <div class="flex flex-col">
      <h1 class="font-medium text-[24px]">Project Not Found</h1>
      <p class="text-neutral-500">Lorem ipsum dolor sit amet</p>
    </div>
  </main>
`;

export default defineEventHandler((event) => {
  const projectId = getRouterParam(event, 'projectId');
  if (!projectId) {
    return BaseLayout({
      title: 'Not Found - Jiraya',
      content: html` ${HeaderLayout()} ${ProjectNotFound()} `
    });
  }

  const project = getProject(projectId);
  if (!project) {
    return BaseLayout({
      title: 'Not Found - Jiraya',
      content: html` ${HeaderLayout()} ${ProjectNotFound()} `
    });
  }

  const content = html`
    ${HeaderLayout()}

    <main id="dashboard" class="w-full max-w-[1280px] h-[calc(100%-74px)] mx-auto px-4 xl:px-0 py-4 flex flex-col gap-y-4 overflow-y-auto">
      <div class="flex justify-between">
        <div
          class="flex flex-col"
          hx-get="/api/projects/${project.id}"
          hx-trigger="projectUpdated from:body"
          hx-swap="innerHTML">
          <h1 class="font-medium text-[24px]">${project.title}</h1>
          ${project.description ? `<p class="text-neutral-500">${project.description}</p>` : ''}
        </div>

        <div class="my-auto flex gap-x-4">
          <button
            class="flex gap-x-2 p-2 items-center text-white bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 rounded-lg"
            type="button"
            hx-get="/api/dialog/project/${project.id}/task"
            hx-target="#dialog-container"
            hx-swap="innerHTML">
            ${PlusIcon({})}
            <span>Add Task</span>
          </button>
          <button
            class="p-2 text-neutral-700 border border-gray-200 hover:border-neutral-700 focus:border-blue-700 focus:text-blue-700 rounded-[8px]"
            type="button"
            hx-get="/api/dialog/project/${project.id}"
            hx-target="#dialog-container"
            hx-swap="innerHTML">
            Edit Board
          </button>
        </div>
      </div>

      <div
        class="flex gap-x-4 h-full overflow-x-auto"
        hx-get="/api/projects/${project.id}/stages"
        hx-trigger="load, taskCreated from:body, taskUpdated from:body, taskDeleted from:body"
        hx-swap="innerHTML">
        <div class="min-w-[308px] flex flex-col bg-neutral-50 rounded-lg">
          <ul class="py-2 h-full flex flex-col gap-y-2 overflow-y-auto">
            <li>${TaskCardSkeleton()}</li>
            <li>${TaskCardSkeleton()}</li>
            <li>${TaskCardSkeleton()}</li>
          </ul>
        </div>
        <div class="min-w-[308px] flex flex-col bg-neutral-50 rounded-lg">
          <ul class="py-2 h-full flex flex-col gap-y-2 overflow-y-auto">
            <li>${TaskCardSkeleton()}</li>
            <li>${TaskCardSkeleton()}</li>
          </ul>
        </div>
        <div class="min-w-[308px] flex flex-col bg-neutral-50 rounded-lg">
          <ul class="py-2 h-full flex flex-col gap-y-2 overflow-y-auto">
            <li>${TaskCardSkeleton()}</li>
          </ul>
        </div>
        <div class="min-w-[308px] flex flex-col bg-neutral-50 rounded-lg"></div>
      </div>
    </main>
  `;

  return BaseLayout({
    title: 'Scrum Learning - Jiraya',
    content,
    scripts: [{ src: '/dragDropHandler.js', type: 'text/javascript' }]
  });
});
