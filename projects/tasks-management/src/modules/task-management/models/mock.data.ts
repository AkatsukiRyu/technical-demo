import { TaskType } from "../../../../../d-library/src/tasks-management/enums/task-types";
import { TaskModel } from "../../../../../d-library/src/tasks-management/models/tasks-mangement.model";

export const tasksMock: TaskModel[] = [
    {
        id: 1,
        title: '',
        comment: 'comment for task 1',
        createdDate: new Date(),
        createdBy: 'khangnguyen0318@gmail.com',
        type: TaskType.Todos
    },
    {
        id: 2,
        title: '',
        comment: 'comment for task 2',
        createdDate: new Date(),
        createdBy: 'khangnguyen0318@gmail.com',
        type: TaskType.Todos
    },
    {
        id: 3,
        title: 'some title to verify',
        comment: 'comment for task 3',
        createdDate: new Date(),
        createdBy: 'khangnguyen0318@gmail.com',
        type: TaskType.Todos
    },
    {
        id: 4,
        title: '',
        comment: 'comment for task 4',
        createdDate: new Date(),
        createdBy: 'khangnguyen0318@gmail.com',
        type: TaskType.Todos
    },
    {
        id: 5,
        title: '',
        comment: 'comment for task 5',
        createdDate: new Date(),
        createdBy: 'khangnguyen0318@gmail.com',
        type: TaskType.Todos
    },
    {
        id: 6,
        title: 'title for task 6',
        comment: 'comment for task 6',
        createdDate: new Date(),
        createdBy: 'khangnguyen0318@gmail.com',
        type: TaskType.Todos
    },
    {
        id: 7,
        title: '',
        comment: 'comment for task 7',
        createdDate: new Date(),
        createdBy: 'khangnguyen0318@gmail.com',
        type: TaskType.Todos
    },
    {
        id: 8,
        title: 'title for task 9',
        comment: 'comment for task 9',
        createdDate: new Date(),
        createdBy: 'khangnguyen0318@gmail.com',
        type: TaskType.Todos
    },
];