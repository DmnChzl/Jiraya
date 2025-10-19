import { html } from '../../utils/render';
import { ChevronUpDownIcon, DoubleTagIcon, TagIcon, TrashIcon } from '../icons';

interface TaskFormProps {
  mode: 'creation' | 'edition';
  taskId?: string;
  title?: string;
  description?: string;
  stages?: {
    key: string;
    value: string;
  }[];
}

export const TaskForm = ({ mode, taskId, title = '', description = '', stages = [] }: TaskFormProps) => {
  const isEdition = mode === 'edition';
  const httpMethod = isEdition ? 'put' : 'post';
  const httpUrl = isEdition ? `/api/tasks/${taskId}` : '/api/tasks';

  return html`
    <form
      class="flex flex-col gap-y-4 px-4 pb-4"
      hx-${httpMethod}="${httpUrl}"
      hx-target="#dialog-container"
      hx-swap="innerHTML">
      <div class="flex flex-col gap-y-[2px]">
        <label class="text-[14px] text-neutral-700" for="task-title">Title</label>
        <div class="flex gap-x-2 items-center p-2 border border-neutral-200 rounded-[8px] focus-within:border-blue-600">
          ${TagIcon({ className: 'text-neutral-500 shrink-0', width: 20, height: 20 })}
          <input
            class="w-full placeholder:text-neutral-500 text-neutral-900 appearance-none bg-transparent outline-none"
            id="task-title"
            name="title"
            placeholder="Another One"
            value="${title}"
            required></input>
        </div>
      </div>

      <div class="flex flex-col gap-y-[2px]">
        <label class="text-[14px] text-neutral-700" for="task-description">Description</label>
        <div class="flex gap-x-2 items-center p-2 border border-neutral-200 rounded-[8px] focus-within:border-blue-600">
          ${DoubleTagIcon({ className: 'text-neutral-500 shrink-0', width: 20, height: 20 })}
          <input
            class="w-full placeholder:text-neutral-500 text-neutral-900 appearance-none bg-transparent outline-none"
            id="task-description"
            name="description"
            placeholder="Lorem ipsum dolor sittask"
            value="${description}"></input>
        </div>
      </div>

      ${stages.length > 0 ? html`
        <div class="flex flex-col gap-y-[2px]">
          <label class="text-[14px] text-neutral-700" for="stage-id">Stage</label>
          <div class="flex gap-x-2 items-center p-2 border border-neutral-200 rounded-[8px] focus-within:border-blue-600">
            ${ChevronUpDownIcon({ className: 'text-neutral-500 shrink-0', width: 20, height: 20 })}
            <select
              class="w-full text-neutral-900 bg-transparent outline-none appearance-none cursor-pointer"
              id="stage-id"
              name="stageId">
              ${stages.map((stage) => html`<option value="${stage.key}" class="text-neutral-900">${stage.value}</option>`)}
            </select>
          </div>
        </div>
      ` : ''}

      <hr class="h-px" style="color:#e5e5e5;"></hr>

      <div id="dialog__actions" class="flex gap-x-2">
        ${isEdition ? html`
          <button
            class="flex gap-x-2 items-center p-2 text-red-500 border border-transparent bg-red-100 hover:bg-red-200 focus:border-red-500 rounded-[8px]"
            type="button"
            hx-delete="/api/tasks/${taskId}"
            hx-target="#dialog-container"
            hx-swap="innerHTML">
            ${TrashIcon({ width: 20, height: 20 })}
            <span>Delete</span>
          </button>
        ` : ''}

        <button class="ml-auto p-2 text-neutral-700 border border-gray-200 hover:border-neutral-700 focus:border-blue-700 focus:text-blue-700 rounded-[8px]" type="button" onclick="document.getElementById('dialog-container').innerHTML = ''">
          Cancel
        </button>
        <button class="p-2 text-white border border-transparent bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 rounded-[8px]" type="submit">
          Submit
        </button>
      </div>
    </form>
  `;
};
