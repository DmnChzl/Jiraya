import type { BaseProject } from './project';

export class ProjectBuilder {
  private _id: string;
  private _title: string;
  private _description?: string;
  private _createdAt: number;
  private _modifiedAt: number;

  constructor() {
    this._id = Math.random().toString(32).substring(2, 12);
    this._title = '';
    this._createdAt = Date.now();
    this._modifiedAt = Date.now();
  }

  withId(id: string) {
    this._id = id;
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

  withCreatedAt(createdAt: number) {
    this._createdAt = createdAt;
    return this;
  }

  withModifiedAt(modifiedAt: number) {
    this._modifiedAt = modifiedAt;
    return this;
  }

  build(): BaseProject {
    return {
      id: this._id,
      title: this._title,
      description: this._description,
      createdAt: this._createdAt,
      modifiedAt: this._modifiedAt
    };
  }
}
