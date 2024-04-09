export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStates;
}

export enum TaskStates {
    NEW = '0',
    ACTIVE = '1',
    COMPLETED = '2',
}

export const TaskStateLabels = {
    [TaskStates.NEW]: 'New',
    [TaskStates.ACTIVE]: 'Active',
    [TaskStates.COMPLETED]: 'Completed',
};

export const TaskStateColors = {
    [TaskStates.NEW]: 'text-green-700',
    [TaskStates.ACTIVE]: 'text-blue-700',
    [TaskStates.COMPLETED]: 'text-gray-700',
};

export type TaskData = Omit<Task, 'id'>;
