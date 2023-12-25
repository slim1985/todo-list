export interface Task {
    id: string;
    title: string;
    description: string;
    state: TaskStates;
}

export enum TaskStates {
    new = 'new',
    active = 'active',
    completed = 'completed',
}
