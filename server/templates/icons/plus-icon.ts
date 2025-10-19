import { html } from '../../utils/render';

interface IconProps {
  className?: string;
  width?: number;
  height?: number;
  strokeWidth?: number;
}

export const PlusIcon = ({ className, width = 24, height = 24, strokeWidth = 2 }: IconProps) => html`
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
    class="lucide lucide-plus-icon lucide-plus${className ? ` ${className}` : ''}">
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
`;
