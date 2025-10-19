import type { BaseProject, LinkedProject } from '../models/project';
import { ProjectBuilder } from '../models/project.builder';
import { type BaseStage, type LinkedStage, mapBaseToUnlinkedStage } from '../models/stage';
import { StageBuilder } from '../models/stage.builder';
import { type BaseTask, type LinkedTask, mapBaseToUnlinkedTask } from '../models/task';
import { TaskBuilder } from '../models/task.builder';

const db = {
  projects: new Map<string, BaseProject>(),
  stages: new Map<string, BaseStage>(),
  tasks: new Map<string, BaseTask>()
};

export const createProject = (title: string, description?: string) => {
  const project = new ProjectBuilder()
    .withTitle(title)
    .withDescription(description)
    .build();
  db.projects.set(project.id, project);
  return project.id;
};

export const getProject = (id: string): BaseProject | null => {
  return db.projects.get(id) ?? null;
};

export const getAllProjects = (): BaseProject[] => {
  return Array.from(db.projects.values());
};

export const updateProject = (id: string, partialProject: Partial<BaseProject>): BaseProject | null => {
  const project = db.projects.get(id);
  if (!project) return null;
  const updated = { ...project, ...partialProject, modifiedAt: Date.now() };
  db.projects.set(id, updated);
  return updated;
};

export const deleteProject = (id: string): boolean => {
  return db.projects.delete(id);
};

export const createStage = (title: string) => {
  const stage = new StageBuilder().withTitle(title).build();
  db.stages.set(stage.id, stage);
  return stage.id;
};

export const createStageWithProjectId = (projectId: string) => (title: string, position = 0, hexColor?: string) => {
  const stage = new StageBuilder()
    .withProjectId(projectId)
    .withTitle(title)
    .withPosition(position)
    .withHexColor(hexColor)
    .build();
  db.stages.set(stage.id, stage);
  return stage.id;
};

export const getStage = (id: string): BaseStage | null => {
  return db.stages.get(id) ?? null;
};

export const getAllStages = (): BaseStage[] => {
  return Array.from(db.stages.values());
};

export const updateStage = (id: string, partialStage: Partial<BaseStage>): BaseStage | null => {
  const stage = db.stages.get(id);
  if (!stage) return null;
  const updated = { ...stage, ...partialStage };
  db.stages.set(id, updated);
  return updated;
};

export const deleteStage = (id: string): boolean => {
  return db.stages.delete(id);
};

export const createTask = (title: string) => {
  const task = new TaskBuilder().withTitle(title).build();
  db.tasks.set(task.id, task);
  return task.id;
};

export const createTaskWithStageId = (stageId: string) => (title: string, description?: string) => {
  const task = new TaskBuilder()
    .withStageId(stageId)
    .withTitle(title)
    .withDescription(description)
    .build();
  db.tasks.set(task.id, task);
  return task.id;
};

export const getTask = (id: string): BaseTask | null => {
  return db.tasks.get(id) ?? null;
};

export const getAllTasks = (): BaseTask[] => {
  return Array.from(db.tasks.values());
};

export const updateTask = (id: string, partialTask: Partial<BaseTask>): BaseTask | null => {
  const task = db.tasks.get(id);
  if (!task) return null;
  const updated = { ...task, ...partialTask, modifiedAt: Date.now() };
  db.tasks.set(id, updated);
  return updated;
};

export const deleteTask = (id: string): boolean => {
  return db.tasks.delete(id);
};

const getStagesByProjectId = (id: string): BaseStage[] => {
  return getAllStages().filter((stage) => stage.projectId === id);
};

const getTasksByStageId = (id: string): BaseTask[] => {
  return getAllTasks().filter((task) => task.stageId === id);
};

export const getLinkedProject = (id: string): LinkedProject | null => {
  const project = db.projects.get(id);
  if (!project) return null;

  const stages = getStagesByProjectId(id).map((stage) => {
    const tasks = getTasksByStageId(stage.id).map(mapBaseToUnlinkedTask);

    return {
      ...mapBaseToUnlinkedStage(stage),
      tasks
    };
  });

  return {
    ...project,
    stages
  };
};

export const deleteLinkedProject = (id: string) => {
  const stages = getStagesByProjectId(id);
  stages.forEach((stage) => {
    const tasks = getTasksByStageId(stage.id);
    tasks.forEach((task) => db.tasks.delete(task.id));
    db.stages.delete(stage.id);
  });
  return db.projects.delete(id);
};

export const getLinkedStage = (id: string): LinkedStage | null => {
  const stage = db.stages.get(id);
  if (!stage) return null;

  const project = db.projects.get(stage.projectId);
  if (!project) return null;

  const tasks = getTasksByStageId(stage.id).map(mapBaseToUnlinkedTask);

  return {
    ...stage,
    project,
    tasks
  };
};

export const deleteLinkedStage = (id: string) => {
  const tasks = getTasksByStageId(id);
  tasks.forEach((task) => db.tasks.delete(task.id));
  return db.stages.delete(id);
};

export const getLinkedTask = (id: string): LinkedTask | null => {
  const task = db.tasks.get(id);
  if (!task) return null;

  const stage = db.stages.get(task.stageId);
  if (!stage) return null;

  const project = db.projects.get(stage.projectId);
  if (!project) return null;

  return {
    ...task,
    stage: {
      ...stage,
      project
    }
  };
};

(() => {
  const scrumProject = new ProjectBuilder()
    .withId('l34rn1ng')
    .withTitle('Learning Scrum')
    .withDescription('Lorem ipsum dolor sit amet')
    .build();
  db.projects.set(scrumProject.id, scrumProject);

  const todoStage = new StageBuilder()
    .withProjectId(scrumProject.id)
    .withTitle('Doing')
    .withPosition(0)
    .withHexColor('#22c55e')
    .build();
  db.stages.set(todoStage.id, todoStage);
  const wipStage = new StageBuilder()
    .withProjectId(scrumProject.id)
    .withTitle('In Progress')
    .withPosition(1)
    .withHexColor('#eab308')
    .build();
  db.stages.set(wipStage.id, wipStage);
  const reviewStage = new StageBuilder()
    .withProjectId(scrumProject.id)
    .withTitle('In Review')
    .withPosition(2)
    .withHexColor('#f97316')
    .build();
  db.stages.set(reviewStage.id, reviewStage);
  const doneStage = new StageBuilder()
    .withProjectId(scrumProject.id)
    .withTitle('Done')
    .withPosition(3)
    .withHexColor('#737373')
    .build();
  db.stages.set(doneStage.id, doneStage);

  const task1 = new TaskBuilder()
    .withId('001')
    .withStageId(wipStage.id)
    .withTitle('What is Scrum')
    .withDescription('Lorem ipsum dolor sit amet')
    .addTag('scrum')
    .addTag('master')
    .build();
  db.tasks.set(task1.id, task1);
  const task2 = new TaskBuilder()
    .withId('002')
    .withStageId(wipStage.id)
    .withTitle('Who is Product Owner')
    .withDescription('Lorem ipsum dolor sit amet')
    .addTag('product')
    .addTag('owner')
    .build();
  db.tasks.set(task2.id, task2);
  const task3 = new TaskBuilder()
    .withId('003')
    .withStageId(wipStage.id)
    .withTitle('Where is Developer Team')
    .withDescription('Lorem ipsum dolor sit amet')
    .addTag('developer')
    .addTag('experience')
    .build();
  db.tasks.set(task3.id, task3);
  const task4 = new TaskBuilder()
    .withId('004')
    .withStageId(todoStage.id)
    .withTitle('Explain me Product Backlog')
    .addTag('product')
    .addTag('backlog')
    .build();
  db.tasks.set(task4.id, task4);
  const task5 = new TaskBuilder()
    .withId('005')
    .withStageId(todoStage.id)
    .withTitle('Explain me Product Spring')
    .addTag('product')
    .addTag('sprint')
    .build();
  db.tasks.set(task5.id, task5);
  const task6 = new TaskBuilder()
    .withId('006')
    .withStageId(reviewStage.id)
    .withTitle('DoD / DoR !?')
    .build();
  db.tasks.set(task6.id, task6);
})();
