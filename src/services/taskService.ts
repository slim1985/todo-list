import { Task } from '../types/task';
import { firebaseDb } from './firebaseDb';

export class TaskService {
    public async getTasks(): Promise<Task[]> {
        return await firebaseDb.getTasks();
    }

    public async createTask(task: Task): Promise<Task> {
        return await firebaseDb.createTask(task);
    }

    public async updateTask(task: Task): Promise<Task> {
        return await firebaseDb.updateTask(task);
    }

    public async deleteTask(taskId: string): Promise<string> {
        return await firebaseDb.deleteTaskAsync(taskId);
    }

    public clearTasks(): Task[] {
        return [];
    }
}

export const taskService = new TaskService();
