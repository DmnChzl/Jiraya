import type { UnlinkedProject } from './project';
import type { UnlinkedStage } from './stage';

export interface BaseTask {
  id: string;
  stageId: string;
  title: string;
  description?: string;
  position: number;
  createdAt: number;
  modifiedAt: number;
  tags: string[];
}

export interface Task extends BaseTask {}

export type UnlinkedTask = Omit<Task, 'stageId'>;

export type LinkedTask = UnlinkedTask & {
  stage: UnlinkedStage & {
    project: UnlinkedProject;
  };
};

export const mapBaseToUnlinkedTask = ({ stageId: _stageId, ...task }: BaseTask): UnlinkedTask => task;
