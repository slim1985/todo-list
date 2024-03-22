import {
    getFirestore,
    collection,
    getDocs,
    Firestore,
    addDoc,
    getDoc,
    deleteDoc,
    doc,
    setDoc,
} from 'firebase/firestore/lite';
import { firebaseApp } from './firebaseApp';
import { authService } from './authService';
import { Task } from '../types/task';

export class FirebaseDb {
    private firestore: Firestore;

    public constructor() {
        this.firestore = getFirestore(firebaseApp);
    }

    public async getTasks(): Promise<Task[]> {
        const tasksSnapshot = await getDocs(
            collection(this.firestore, this.getUserId()),
        );
        const tasks = tasksSnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                title: data.title,
                description: data.description,
                status: data.status,
            };
        });

        return tasks;
    }

    public async createTask(task: Task): Promise<Task> {
        const docRef = await addDoc(
            collection(this.firestore, this.getUserId()),
            {
                title: task.title,
                description: task.description,
                status: task.status,
            },
        );
        const newDoc = await getDoc(docRef);
        const newTask: Task = {
            id: docRef.id,
            title: newDoc.data()!.title,
            description: newDoc.data()!.description,
            status: newDoc.data()!.status,
        };

        return newTask;
    }

    public async updateTask(task: Task): Promise<Task> {
        const docRef = doc(this.firestore, this.getUserId(), task.id);
        await setDoc(docRef, {
            title: task.title,
            description: task.description,
            status: task.status,
        });

        const docData = await getDoc(docRef);
        const updatedTask: Task = {
            id: docData.id,
            title: docData.data()!.title,
            description: docData.data()!.description,
            status: docData.data()!.status,
        };

        return updatedTask;
    }

    public async deleteTaskAsync(taskId: string): Promise<string> {
        const docRef = doc(
            collection(this.firestore, this.getUserId()),
            taskId,
        );
        await deleteDoc(docRef);
        return taskId;
    }

    private getUserId(): string {
        const userId = authService.getCurrentUserId();
        if (!userId) {
            throw new Error('User is not authenticated');
        }

        return userId;
    }
}

export const firebaseDb = new FirebaseDb();
