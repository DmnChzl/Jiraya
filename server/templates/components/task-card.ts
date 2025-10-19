import { html } from '../../utils/render';
import { CalendarIcon } from '../icons';

interface TaskCardProps {
  id: string;
  title: string;
  description: string;
  modifiedAt: number;
}

export const TaskCard = ({ id, title, description, modifiedAt }: TaskCardProps) => {
  const modifiedDate = new Date(modifiedAt);
  const [modifiedDateStr] = modifiedDate.toISOString().split('T');

  return html`
    <div class="p-4 flex flex-col gap-y-2 bg-white rounded-lg shadow hover:shadow-md cursor-grab">
      <span class="font-medium text-sm text-neutral-500">#${id}</span>
      <span class="text-neutral-900">${title}</span>
      <span class="text-sm text-neutral-500 line-clamp-3">${description}</span>
      <span class="flex gap-x-2 items-center text-neutral-500">
        ${CalendarIcon({ className: 'text-neutral-400 shrink-0' })}
        <span class="font-medium text-xs">${modifiedDateStr}</span>
      </span>
    </div>
  `;
};

export const TaskCardSkeleton = () => html`
  <div class="mx-2 p-4 flex flex-col gap-y-2 bg-white rounded-lg shadow">
    <!-- ID -->
    <div class="h-4 w-12 bg-neutral-200 rounded animate-pulse"></div>
    <!-- Title -->
    <div class="h-4 my-[4px] w-24 bg-neutral-200 rounded animate-pulse"></div>
    <!-- Description -->
    <div class="h-4 w-3/4 bg-neutral-200 rounded animate-pulse"></div>
    <!-- Date -->
    <div class="flex gap-x-2 items-center">
      <div class="size-6 bg-neutral-200 rounded-full shrink-0 animate-pulse"></div>
      <div class="h-4 w-28 bg-neutral-200 rounded animate-pulse"></div>
    </div>
  </div>
`;
