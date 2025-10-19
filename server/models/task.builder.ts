import type { BaseTask } from './task';

export class TaskBuilder {
  private _id: string;
  private _stageId: string;
  private _title: string;
  private _description?: string;
  private _position: number;
  private _createdAt: number;
  private _modifiedAt: number;
  private _tags: string[];

  constructor() {
    this._id = Math.random().toString(32).substring(2, 12);
    this._stageId = '';
    this._title = '';
    this._position = 0;
    this._createdAt = Date.now();
    this._modifiedAt = Date.now();
    this._tags = [];
  }

  withId(id: string) {
    this._id = id;
    return this;
  }

  withStageId(stageId: string) {
    this._stageId = stageId;
    return this;
  }

  withTitle(title: string) {
    this._title = title;
    return this;
  }

  withDescription(description?: string) {
    this._description = description;
    return this;
  }

  withPosition(position: number) {
    this._position = position;
    return this;
  }

  withCreatedAt(createdAt: number) {
    this._createdAt = createdAt;
    return this;
  }

  withModifiedAt(modifiedAt: number) {
    this._modifiedAt = modifiedAt;
    return this;
  }

  withTags(tags: string[]) {
    this._tags = tags;
    return this;
  }

  addTag(tag: string) {
    this._tags.push(tag);
    return this;
  }

  build(): BaseTask {
    return {
      id: this._id,
      stageId: this._stageId,
      title: this._title,
      description: this._description,
      position: this._position,
      createdAt: this._createdAt,
      modifiedAt: this._modifiedAt,
      tags: this._tags
    };
  }
}
