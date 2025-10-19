import { type UnlinkedTask } from '../../models/task';
import { html } from '../../utils/render';
import { TaskCard } from './task-card';

interface ColumnViewProps {
  projectId: string;
  stageId: string;
  hexColor?: string;
  title: string;
  tasks: UnlinkedTask[];
}

export const ColumnView = ({ projectId, stageId, hexColor, title, tasks }: ColumnViewProps) => {
  const tasksCount = tasks.length;

  return html`
    <div class="min-w-[308px] flex flex-col bg-neutral-50 rounded-lg">
      <div class="p-4 flex gap-x-2 items-center">
        <span class="size-[8px] rounded-full" style="background-color: ${hexColor};"></span>
        <span class="font-medium text-sm text-neutral-700 uppercase">${title}</span>
        <span class="px-2 font-medium text-sm text-neutral-500 bg-white rounded-full">${tasksCount}</span>
      </div>

      <ul
        class="px-2 pb-2 h-full flex flex-col gap-y-2 overflow-y-auto"
        data-stage-id="${stageId}"
        data-droppable="true">
        ${tasks.map((task) => html`
          <li
            data-task-id="${task.id}"
            draggable="true"
            hx-get="/api/dialog/project/${projectId}/task/${task.id}"
            hx-target="#dialog-container"
            hx-trigger="dblclick">
            ${TaskCard({
              id: task.id,
              title: task.title,
              description: task.description ?? '',
              modifiedAt: task.modifiedAt
            })}
          </li>
        `)}
      </ul>
    </div>
  `;
};
