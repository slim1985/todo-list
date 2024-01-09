export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStates;
}

export enum TaskStates {
    NEW = 'new',
    ACTIVE = 'active',
    COMPLETED = 'completed',
}
