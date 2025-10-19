import { html } from '../../utils/render';
import { Helmet, type HelmetScript } from '../components/helmet';

interface BaseLayoutProps {
  title: string;
  content: string;
  scripts?: HelmetScript[];
}

export const BaseLayout = ({ title, content, scripts = [] }: BaseLayoutProps) => html`
  <!DOCTYPE html>
  <html lang="en">
    ${Helmet({
      title,
      favicon: '/rounded.svg',
      scripts: [
        { src: 'https://cdn.jsdelivr.net/npm/htmx.org@2.0.5/dist/htmx.min.js' },
        { src: 'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4' },
        ...scripts
      ],
      links: [{ rel: 'stylesheet', href: '/fonts.css' }],
      styles: `
        body {
          display: flex;
          flex-direction: column;
          height: 100vh;
          background-color: #fff;
          font-family: 'Geist', sans-serif;
          position: relative;
        }

        button:not(disabled) {
          cursor: pointer;
          outline: none;
        }
      `
    })}
    <body>
      ${content}
      <div id="dialog-container"></div>
    </body>
  </html>
`;
