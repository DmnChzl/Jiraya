import { DoubleTagIcon, TagIcon, TrashIcon } from '@server/templates/icons';
import { html } from '@server/utils/render';

interface ProjectFormProps {
  mode: 'creation' | 'edition';
  projectId?: string;
  title?: string;
  description?: string;
}

export const ProjectForm = ({ mode, projectId, title = '', description = '' }: ProjectFormProps) => {
  const isEdition = mode === 'edition';
  const httpMethod = isEdition ? 'put' : 'post';
  const httpUrl = isEdition ? `/api/projects/${projectId}` : '/api/projects';

  return html`
    <form
      class="flex flex-col gap-y-4 px-4 pb-4"
      hx-${httpMethod}="${httpUrl}"
      hx-target="#dialog-container"
      hx-swap="innerHTML">
      <div class="flex flex-col gap-y-[2px]">
        <label class="text-[14px] text-neutral-700" for="project-title">Title</label>
        <div class="flex gap-x-2 items-center p-2 border border-neutral-200 rounded-[8px] focus-within:border-blue-600">
          ${TagIcon({ className: 'text-neutral-500 shrink-0', width: 20, height: 20 })}
          <input
            class="w-full placeholder:text-neutral-500 text-neutral-900 appearance-none bg-transparent outline-none"
            id="project-title"
            name="title"
            placeholder="My Awesome Project"
            value="${title}"
            required></input>
        </div>
      </div>

      <div class="flex flex-col gap-y-[2px]">
        <label class="text-[14px] text-neutral-700" for="project-description">Description</label>
        <div class="flex gap-x-2 items-center p-2 border border-neutral-200 rounded-[8px] focus-within:border-blue-600">
          ${DoubleTagIcon({ className: 'text-neutral-500 shrink-0', width: 20, height: 20 })}
          <input
            class="w-full placeholder:text-neutral-500 text-neutral-900 appearance-none bg-transparent outline-none"
            id="project-description"
            name="description"
            placeholder="Lorem ipsum projekt sit amet..."
            value="${description}"></input>
        </div>
      </div>

      <hr class="h-px" style="color:#e5e5e5;"></hr>

      <div id="dialog__actions" class="flex gap-x-2">
        ${isEdition ? html`
          <button
            class="flex space-x-2 items-center p-2 text-red-500 border border-transparent bg-red-100 hover:bg-red-200 focus:border-red-500 rounded-[8px]"
            type="button"
            hx-delete="/api/projects/${projectId}"
            hx-swap="none">
            ${TrashIcon({ width: 20, height: 20 })}
            <span>Delete</span>
          </button>
        ` : ''}

        <button
          class="ml-auto p-2 text-neutral-700 border border-gray-200 hover:border-neutral-700 focus:border-blue-700 focus:text-blue-700 rounded-[8px]"
          type="button"
          onclick="document.getElementById('dialog-container').innerHTML = ''">
          Cancel
        </button>
        <button class="p-2 text-white border border-transparent bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 rounded-[8px]" type="submit">
          Submit
        </button>
      </div>
    </form>
  `;
};
