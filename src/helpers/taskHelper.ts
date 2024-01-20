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
}
