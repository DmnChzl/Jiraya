import type { UnlinkedProject } from './project';
import type { Task, UnlinkedTask } from './task';

export interface BaseStage {
  id: string;
  projectId: string;
  title: string;
  position: number;
  hexColor?: string;
}

export interface Stage extends BaseStage {
  tasks: Task[];
}

export type UnlinkedStage = Omit<Stage, 'projectId' | 'tasks'>;

export type LinkedStage = UnlinkedStage & {
  project: UnlinkedProject;
  tasks: UnlinkedTask[];
};

export const mapBaseToUnlinkedStage = ({ projectId: _projectId, ...stage }: BaseStage): UnlinkedStage => stage;
