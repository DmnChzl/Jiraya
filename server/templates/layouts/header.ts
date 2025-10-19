import { html } from '../../utils/render';
import { GridPlusIcon, MoonIcon, SearchIcon, SunIcon } from '../icons';

export const HeaderLayout = () => html`
  <header class="p-4 bg-white shadow z-5">
    <div class="w-full max-w-[1280px] mx-auto grid grid-cols-4 items-center justify-between">
      <a href="/" class="flex gap-x-2 items-center">
        <img width="36" height="36" src="/sqrt.svg" alt="Logo" />
        <span class="font-semibold text-neutral-900">Jiraya</span>
      </a>

      <div class="col-span-2 flex gap-x-4">
        <button
          class="flex gap-x-2 p-2 items-center text-white bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 rounded-lg whitespace-nowrap"
          type="button"
          hx-get="/api/dialog/project"
          hx-target="#dialog-container"
          hx-swap="innerHTML">
          ${GridPlusIcon({})}
          <span>New Project</span>
        </button>
        <form class="flex gap-x-4 w-full" 
          hx-post="/api/projects/join"
          hx-swap="none">
          <div class="w-full flex gap-x-2 items-center p-2 bg-neutral-100 focus-within:bg-white border border-neutral-100 focus-within:border-neutral-200 rounded-lg">
            ${SearchIcon({ className: 'text-neutral-400 shrink-0', width: 20, height: 20 })}
            <input
              class="w-full text-neutral-900 placeholder:text-neutral-400 bg-transparent outline-none" placeholder="Project ID"
              id="projectId"
              name="projectId"
              required>
            </input>
          </div>
          <button class="p-2 text-blue-500 hover:text-blue-600 focus:text-blue-700 bg-white border border-blue-500 hover:border-blue-600 focus:border-blue-700 rounded-lg" type="submit">Join</button>
        </form>
      </div>

      <div id="toggle-theme" class="flex justify-end">
        <button class="p-2 text-neutral-900 hover:text-neutral-700 bg-neutral-100 hover:bg-white rounded-l-lg" type="button" onclick="console.log('Light');">
          ${SunIcon({})}
        </button>
        <button class="p-2 text-neutral-700 hover:text-neutral-900 bg-white hover:bg-neutral-100 rounded-r-lg" type="button" onclick="console.log('Dark');">
          ${MoonIcon({})}
        </button>
      </div>
    </div>
  </header>
`;
