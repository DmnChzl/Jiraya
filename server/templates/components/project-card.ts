import { html } from '../../utils/render';
import { CalendarIcon } from '../icons';

interface ProjectCardProps {
  href: string;
  id: string;
  title: string;
  tasksCount: number;
  modifiedAt: number;
}

export const ProjectCard = ({ href, id, title, tasksCount, modifiedAt }: ProjectCardProps) => {
  const modifiedDate = new Date(modifiedAt);
  const [modifiedDateStr] = modifiedDate.toISOString().split('T');

  return html`
    <a href="${href}" class="p-4 flex flex-col gap-y-2 bg-white hover:bg-neutral-50 rounded-lg shadow hover:shadow-md">
      <span class="font-medium text-sm text-neutral-500">${id}</span>
      <span class="text-neutral-900">${title}</span>
      <div class="flex items-center justify-between">
        <span class="text-sm text-neutral-500">Total Tasks&nbsp;:</span>
        <span class="px-2 text-sm text-blue-700 bg-blue-100 rounded-full">${tasksCount}</span>
      </div>
      <span class="flex gap-x-2 items-center text-neutral-500">
        ${CalendarIcon({ className: 'text-neutral-400 shrink-0' })}
        <span class="font-medium text-xs">${modifiedDateStr}</span>
      </span>
    </a>
  `;
};

export const ProjectCardSkeleton = () => html`
  <div class="p-4 flex flex-col gap-y-2 bg-white rounded-lg shadow">
    <!-- ID -->
    <div class="h-4 w-12 bg-neutral-200 rounded animate-pulse"></div>
    <!-- Title -->
    <div class="h-4 mt-[4px] w-3/4 bg-neutral-200 rounded animate-pulse"></div>
    <!-- Tasks Count -->
    <div class="flex items-center justify-between">
      <div class="h-4 w-24 bg-neutral-200 rounded animate-pulse"></div>
      <div class="size-6 bg-blue-100 rounded-full animate-pulse"></div>
    </div>
    <!-- Date -->
    <div class="flex gap-x-2 items-center">
      <div class="size-6 bg-neutral-200 rounded-full shrink-0 animate-pulse"></div>
      <div class="h-4 w-28 bg-neutral-200 rounded animate-pulse"></div>
    </div>
  </div>
`;
