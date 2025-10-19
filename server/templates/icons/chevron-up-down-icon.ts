import { html } from '../../utils/render';

interface IconProps {
  className?: string;
  width?: number;
  height?: number;
  strokeWidth?: number;
}

export const ChevronUpDownIcon = ({ className, width = 24, height = 24, strokeWidth = 2 }: IconProps) => html`
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="${width}"
    height="${height}"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="${strokeWidth}"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide lucide-chevrons-up-down-icon lucide-chevrons-up-down${className ? ` ${className}` : ''}">
    <path d="m7 15 5 5 5-5" />
    <path d="m7 9 5-5 5 5" />
  </svg>
`;
