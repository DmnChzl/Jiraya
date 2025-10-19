import type { BaseStage } from './stage';

export class StageBuilder {
  private _id: string;
  private _projectId: string;
  private _title: string;
  private _position: number;
  private _hexColor?: string;

  constructor() {
    this._id = Math.random().toString(32).substring(2, 12);
    this._projectId = '';
    this._title = '';
    this._position = 0;
  }

  withId(id: string) {
    this._id = id;
    return this;
  }

  withProjectId(projectId: string) {
    this._projectId = projectId;
    return this;
  }

  withTitle(title: string) {
    this._title = title;
    return this;
  }

  withPosition(position: number) {
    this._position = position;
    return this;
  }

  withHexColor(hexColor?: string) {
    this._hexColor = hexColor;
    return this;
  }

  build(): BaseStage {
    return {
      id: this._id,
      projectId: this._projectId,
      title: this._title,
      position: this._position,
      hexColor: this._hexColor
    };
  }
}
