import { TaskStates } from '../types/task';

export class TaskHelper {
    static getTaskStateLabel(taskState: TaskStates): string {
        switch (taskState) {
            case TaskStates.NEW:
                return 'New';
            case TaskStates.ACTIVE:
                return 'Active';
            case TaskStates.COMPLETED:
                return 'Completed';
            default:
                return '';
        }
    }

    static getTaskStateColor(taskState: TaskStates): string {
        switch (taskState) {
            case TaskStates.NEW:
                return 'text-green-700';
            case TaskStates.ACTIVE:
                return 'text-blue-700';
            case TaskStates.COMPLETED:
                return 'text-gray-700';
            default:
                return 'text-black';
        }
    }
}
