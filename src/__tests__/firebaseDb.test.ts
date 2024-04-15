import { DocumentData } from 'firebase/firestore/lite';
import { firebaseDb } from '../services/firebaseDb';
import { QuerySnapshot } from 'firebase/firestore';

jest.mock('../services/authService', () => {
    return {
        authService: {
            currentUserId: '1',
        },
    };
});

jest.mock('../services/firebaseApp', () => {
    return {
        firebaseApp: {},
    };
});

jest.mock('firebase/firestore/lite', () => {
    return {
        getFirestore: jest.fn(() => {
            return {};
        }),
        collection: jest.fn(),
        doc: jest.fn().mockReturnValue({
            id: '1',
            data: jest.fn(),
        }),
        getDocs: jest.fn().mockResolvedValue({
            docs: [
                {
                    id: '1',
                    data: (): DocumentData => {
                        return {
                            title: 'Task 1',
                            description: 'Description 1',
                            status: '1',
                        };
                    },
                },
                {
                    id: '2',
                    data: (): DocumentData => {
                        return {
                            title: 'Task 2',
                            description: 'Description 2',
                            status: '2',
                        };
                    },
                },
            ],
        } as QuerySnapshot<DocumentData, DocumentData>),
        addDoc: jest.fn().mockResolvedValue({
            id: '1',
            data: (): DocumentData => {
                return {
                    title: 'Task 1',
                    description: 'Description 1',
                    status: '1',
                };
            },
        }),
        getDoc: jest.fn().mockResolvedValue({
            data: (): DocumentData => {
                return {
                    title: 'Task 1',
                    description: 'Description 1',
                    status: '1',
                };
            },
        }),
        setDoc: jest.fn().mockResolvedValue({}),
        deleteDoc: jest.fn().mockResolvedValue({}),
    };
});

describe('firebaseDb', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('getManyAsync', async () => {
        // Arrange
        // Act
        const result = await firebaseDb.getManyAsync('1');

        // Assert
        expect(result).toEqual([
            {
                id: '1',
                data: {
                    title: 'Task 1',
                    description: 'Description 1',
                    status: '1',
                },
            },
            {
                id: '2',
                data: {
                    title: 'Task 2',
                    description: 'Description 2',
                    status: '2',
                },
            },
        ]);
    });

    it('createOneAsync', async () => {
        // Arrange
        const document = {
            title: 'Task 1',
            description: 'Description 1',
            status: '1',
        };

        // Act
        const result = await firebaseDb.createOneAsync('1', document);

        // Assert
        expect(result).toEqual({
            id: '1',
            data: {
                title: 'Task 1',
                description: 'Description 1',
                status: '1',
            },
        });
    });

    it('updateOneAsync', async () => {
        // Arrange
        const document = {
            title: 'Task 1',
            description: 'Description 1',
            status: '1',
        };

        // Act
        const result = await firebaseDb.updateOneAsync('1', '1', document);

        // Assert
        expect(result).toEqual({
            id: '1',
            data: {
                title: 'Task 1',
                description: 'Description 1',
                status: '1',
            },
        });
    });

    it('deleteOneAsync', async () => {
        // Arrange
        // Act
        const result = await firebaseDb.deleteOneAsync('1', '1');

        // Assert
        expect(result).toEqual('1');
    });
});
