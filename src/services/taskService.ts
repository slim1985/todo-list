import { Task } from '../types/task';

export class TaskService {
    private static instance: TaskService;

    private constructor() {}

    public static getInstance(): TaskService {
        if (!TaskService.instance) {
            TaskService.instance = new TaskService();
        }

        return TaskService.instance;
    }

    public async createTask(task: Task): Promise<Task> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(task);
            }, 3000);
        });
    }

    public async updateTask(task: Task): Promise<Task> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(task);
            }, 3000);
        });
    }

    public async deleteTask(taskId: string): Promise<string> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(taskId);
            }, 3000);
        });
    }
}
