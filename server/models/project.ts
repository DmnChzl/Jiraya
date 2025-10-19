import type { Stage, UnlinkedStage } from './stage';
import type { UnlinkedTask } from './task';

export interface BaseProject {
  id: string;
  title: string;
  description?: string;
  createdAt: number;
  modifiedAt: number;
}

export interface Project extends BaseProject {
  stages: Stage[];
}

export type UnlinkedProject = Omit<Project, 'stages'>;

// prettier-ignore
export type LinkedProject = UnlinkedProject & {
  stages: Array<UnlinkedStage & {
    tasks: UnlinkedTask[];
  }>;
};
