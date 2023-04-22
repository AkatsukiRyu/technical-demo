import { TaskType } from "../enums/task-types";

export interface TaskModel {
    id: number;
    title?: string;
    comment: string;
    type: TaskType;
    createdBy: string;
    createdDate: Date;
}
