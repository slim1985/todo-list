export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStates;
}

export enum TaskStates {
    NEW = 0,
    ACTIVE = 1,
    COMPLETED = 2,
}
