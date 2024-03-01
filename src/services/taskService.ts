import { Task } from '../types/task';
import mockedTasks from '../mocks/data-mock.json';

export class TaskService {
    public async getTasks(): Promise<Task[]> {
        const tasks = JSON.parse(JSON.stringify(mockedTasks)) as Task[];
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(tasks);
            }, 3000);
        });
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

export const taskService = new TaskService();
