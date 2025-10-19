import { defineEventHandler } from 'h3';
import { ProjectCardSkeleton } from '../templates/components/project-card';
import { PlusIcon } from '../templates/icons';
import { BaseLayout } from '../templates/layouts/base';
import { HeaderLayout } from '../templates/layouts/header';
import { html } from '../utils/render';

const AbsoluteCloud = () => `
  <div class="absolute bottom-0 right-0 size-[144px] -z-5">
    <div class="absolute top-[96px] left-0 size-[48px] bg-blue-500 rounded-tl-full"></div>
    <div class="absolute top-[48px] left-[48px] size-[48px] bg-blue-500 rounded-tl-full"></div>
    <div class="absolute top-0 left-[96px] size-[48px] bg-blue-500 rounded-tl-full"></div>
    <div class="absolute top-[96px] left-[48px] size-[48px] bg-blue-500"></div>
    <div class="absolute top-[48px] left-[96px] size-[48px] bg-blue-500"></div>
    <div class="absolute top-[96px] left-[96px] size-[48px] bg-blue-500"></div>
    <div class="absolute bottom-0 right-0 size-[96px]">
      <div class="absolute top-[48px] left-0 size-[48px] bg-blue-300 rounded-tl-full"></div>
      <div class="absolute top-0 left-[48px] size-[48px] bg-blue-300 rounded-tl-full"></div>
      <div class="absolute top-[48px] left-[48px] size-[48px] bg-blue-300"></div>
    </div>
    <div class="absolute bottom-0 right-0 size-[48px] bg-blue-100 rounded-tl-full"></div>
  </div>
`;

// https://nitro.build/guide/routing
export default defineEventHandler((_event) => {
  const content = html`
    ${HeaderLayout()}

    <main id="dashboard" class="w-full max-w-[1280px] h-[calc(100%-74px)] mx-auto px-4 xl:px-0 py-4 flex flex-col gap-y-4 overflow-y-auto">
      <div class="flex flex-col">
        <h1 class="font-medium text-[24px]">Projects</h1>
        <p class="text-neutral-500">Lorem ipsum dolor sit amet</p>
      </div>

      <ul
        id="grid-view"
        class="grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        hx-get="/api/projects"
        hx-trigger="load"
        hx-swap="innerHTML">
        <li>${ProjectCardSkeleton()}</li>
        <li>${ProjectCardSkeleton()}</li>
        <li>${ProjectCardSkeleton()}</li>
        <li>
          <button
            class="p-4 min-h-[70px] sm:min-h-[140px] w-full flex sm:flex-col items-center justify-center gap-2 text-neutral-500 hover:text-neutral-600 focus:text-neutral-700 bg-white hover:bg-neutral-50 focus:bg-neutral-100 border border-dashed border-neutral-500 hover:border-neutral-600 focus:border-neutral-700 rounded-lg"
            type="button"
            hx-get="/api/modals/create-board"
            hx-target="#modal-container"
            hx-swap="innerHTML">
            ${PlusIcon({})}
            <span>Add Project</span>
          </button>
        </li>
      </ul>
    </main>

    ${AbsoluteCloud()}
  `;

  return BaseLayout({ title: 'Jiraya', content });
});
