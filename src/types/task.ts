export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStates;
}

export enum TaskStates {
    new = 'new',
    active = 'active',
    completed = 'completed',
}
