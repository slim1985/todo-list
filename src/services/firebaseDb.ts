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
} from 'firebase/firestore/lite';
import { firebaseApp } from './firebaseApp';

export interface FirebaseDocument {
    id: string;
    data: DocumentData;
}

export class FirebaseDb {
    private firestore: Firestore;

    public constructor() {
        this.firestore = getFirestore(firebaseApp);
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

        return {
            id: docRef.id,
            data: newDoc.data()!,
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
        const newDocData = await getDoc(docRef);

        return {
            id: docRef.id,
            data: newDocData.data()!,
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
