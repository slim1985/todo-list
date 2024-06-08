import { Task, TaskData } from '../types/task';
import { firebaseDb } from './firebaseDb';
import { authService } from './authService';

export class TaskService {
    public async getTasks(): Promise<Task[]> {
        return (await firebaseDb.getManyAsync(this.getUserId())).map((doc) => {
            return {
                id: doc.id,
                title: doc.data.title,
                description: doc.data.description,
                status: doc.data.status,
            };
        });
    }

    public async createTask(task: TaskData): Promise<Task> {
        const docData = await firebaseDb.createOneAsync(this.getUserId(), task);

        return {
            id: docData.id,
            title: docData.data.title,
            description: docData.data.description,
            status: docData.data.status,
        };
    }

    public async updateTask(task: Task): Promise<Task> {
        const docData = await firebaseDb.updateOneAsync(
            this.getUserId(),
            task.id,
            this.getTaskData(task),
        );

        return {
            id: docData.id,
            title: docData.data.title,
            description: docData.data.description,
            status: docData.data.status,
        };
    }

    public async deleteTask(taskId: string): Promise<string> {
        return await firebaseDb.deleteOneAsync(this.getUserId(), taskId);
    }

    public clearTasks(): Task[] {
        return [];
    }

    private getUserId(): string {
        const user = authService.currentUserId;
        if (user) {
            return user;
        } else {
            console.error('User is not logged in');
            throw new Error('User is not logged in');
        }
    }

    private getTaskData(task: Task): TaskData {
        return {
            title: task.title,
            description: task.description,
            status: task.status,
        };
    }
}

export const taskService = new TaskService();
