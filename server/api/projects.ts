import { defineEventHandler } from 'h3';
import { ProjectCard } from '../templates/components/project-card';
import { PlusIcon } from '../templates/icons';
import { getAllProjects, getLinkedProject } from '../utils/db';
import { html } from '../utils/render';

export default defineEventHandler((_event) => {
  const projects = getAllProjects()
    .map(({ id }) => getLinkedProject(id))
    .filter((project) => !!project);

  const projectCards = projects.map((project) => {
    const tasksCount = project.stages.reduce((acc, stage) => (acc += stage.tasks.length), 0);

    return ProjectCard({
      href: `/project/${project.id}`,
      id: project.id,
      title: project.title,
      tasksCount,
      modifiedAt: project.modifiedAt
    });
  });

  return html`
    ${projectCards}
    <li>
      <button
        class="p-4 min-h-[70px] sm:min-h-[140px] w-full flex sm:flex-col items-center justify-center gap-2 text-neutral-500 hover:text-neutral-600 focus:text-neutral-700 bg-white hover:bg-neutral-50 focus:bg-neutral-100 border border-dashed border-neutral-500 hover:border-neutral-600 focus:border-neutral-700 rounded-lg"
        type="button"
        hx-get="/api/dialog/project"
        hx-target="#dialog-container"
        hx-swap="innerHTML">
        ${PlusIcon({})}
        <span>Add Project</span>
      </button>
    </li>
  `;
});
