import { html } from '../../utils/render';
import { MessageCircleIcon, MessageSquareIcon } from '../icons';

interface DialogHeader {
  icon?: string;
}

const RoundedDialogHeader = ({
  icon = MessageCircleIcon({ width: 36, height: 36, strokeWidth: 1.5 })
}: DialogHeader) => html`
  <div class="relative h-[72px] bg-blue-500 w-full rounded-t-[8px] mb-[36px]">
    <div class="absolute size-[72px] flex justify-center items-center bg-blue-500 text-white border-2 border-white rounded-full transform left-1/2 -translate-x-1/2 translate-y-1/2">
      ${icon}
    </div>
  </div>
`;

const SqrtDialogHeader = ({
  icon = MessageSquareIcon({ width: 36, height: 36, strokeWidth: 1.5 })
}: DialogHeader) => html`
  <div class="relative h-[72px] bg-blue-500 w-full rounded-t-[8px] mb-[36px]">
    <div class="absolute size-[72px] flex justify-center items-center bg-blue-500 text-white border-2 border-white rounded-[16px] transform left-1/2 -translate-x-1/2 translate-y-1/2">
      ${icon}
    </div>
  </div>
`;

interface DialogContainerProps {
  title: string;
  subTitle?: string;
  withHeader?: 'rounded' | 'sqrt';
  customIcon?: string;
  content: string;
}

export const DialogContainer = ({ title, subTitle, withHeader, customIcon, content }: DialogContainerProps) => {
  const header = (() => {
    if (withHeader === 'rounded') return RoundedDialogHeader({ icon: customIcon });
    if (withHeader === 'sqrt') return SqrtDialogHeader({ icon: customIcon });
    return '';
  })();

  return html`
    <div id="dialog__background" class="fixed inset-0 size-full flex bg-black/25 z-10">
      <div id="dialog" class="m-auto w-[384px] sm:w-[512px] bg-white shadow rounded-[8px]">
        ${header}
        <div id="dialog__body" class="flex flex-col p-4">
          <h1 class="mx-auto text-[24px] text-neutral-900">${title}</h1>
          ${subTitle ? html`<p class="mx-auto pb-4 text-[12px] text-neutral-500">${subTitle}</p>` : ''}
          ${content}
        </div>
      </div>
    </div>
  `;
};
