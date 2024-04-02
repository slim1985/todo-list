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
    WithFieldValue,
    DocumentData,
    connectFirestoreEmulator,
} from 'firebase/firestore/lite';
import { firebaseApp } from './firebaseApp';
import { modes } from '../utils/constants';

export interface FirebaseDocument {
    id: string;
    data: DocumentData;
}

export class FirebaseDb {
    private firestore: Firestore;

    public constructor() {
        this.firestore = getFirestore(firebaseApp);

        if (process.env.NODE_ENV === modes.DEVELOPMENT) {
            connectFirestoreEmulator(this.firestore, '127.0.0.1', 8080);
        }
    }

    public async getManyAsync(
        collectionName: string,
    ): Promise<FirebaseDocument[]> {
        const tasksSnapshot = await getDocs(
            collection(this.firestore, collectionName),
        );

        return tasksSnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                data: data,
            };
        });
    }

    public async createOneAsync<T extends DocumentData>(
        collectionName: string,
        document: T,
    ): Promise<FirebaseDocument> {
        const docData: WithFieldValue<DocumentData> = {
            ...document,
        };

        const docRef = await addDoc(
            collection(this.firestore, collectionName),
            docData,
        );
        const newDoc = await getDoc(docRef);
        const newDocData = newDoc.data();

        if (!newDocData) {
            throw new Error('Failed to create document');
        }

        return {
            id: docRef.id,
            data: newDocData,
        };
    }

    public async updateOneAsync<T extends DocumentData>(
        collectionName: string,
        docId: string,
        document: T,
    ): Promise<FirebaseDocument> {
        const docData: WithFieldValue<DocumentData> = {
            ...document,
        };
        const docRef = doc(this.firestore, collectionName, docId);

        await setDoc(docRef, docData);
        const newDoc = await getDoc(docRef);
        const newDocData = newDoc.data();

        if (!newDocData) {
            throw new Error('Failed to create document');
        }

        return {
            id: docRef.id,
            data: newDocData,
        };
    }

    public async deleteOneAsync(
        collectionName: string,
        docId: string,
    ): Promise<string> {
        const docRef = doc(collection(this.firestore, collectionName), docId);
        await deleteDoc(docRef);
        return docId;
    }
}

export const firebaseDb = new FirebaseDb();
