export class Task {
  id: number;
  title: string;
  description: string;
  deleted: number;
  dueDate: Date;

  constructor(
    id: number,
    title: string,
    description: string,
    deleted: number,
    dueDate: Date
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.deleted = deleted;
    this.dueDate = dueDate;
  }

  public getTitle(): string {
    return this.title;
  }

  public setTitle(_title: string) {
    this.title = _title;
  }

  public getDescription(): string {
    return this.description;
  }

  public setDescription(_description: string) {
    this.description = _description;
  }

  public getDueDate(): Date {
    return this.dueDate;
  }

  public setDueDate(_dueDate: Date) {
    this.dueDate = _dueDate;
  }
}
