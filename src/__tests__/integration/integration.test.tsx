import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { getAuth, User } from 'firebase/auth';
import App from '../../App';
import { TaskData, TaskStates } from '../../types/task';
import { FirebaseDocument } from '../../services/firebaseDb';
import { ElementsNames } from '../../types/elementsNames';

jest.mock('../../services/firebaseDb', () => {
    const tasks: FirebaseDocument[] = [
        {
            id: '1',
            data: {
                title: 'Task 1',
                description: 'Description 1',
                status: '0',
            },
        },
        {
            id: '2',
            data: {
                title: 'Task 2',
                description: 'Description 2',
                status: '1',
            },
        },
    ];

    return {
        firebaseDb: {
            getManyAsync: jest.fn(() => {
                return tasks;
            }),
            createOneAsync: jest.fn(
                (collectionName: string, data: TaskData) => {
                    let lastId: number = 1;
                    let found = false;
                    while (!found) {
                        found = true;
                        tasks.forEach((task) => {
                            const id = parseInt(task.id);
                            if (id === lastId) {
                                lastId++;
                                found = false;
                            }
                        });
                    }

                    const length = tasks.push({
                        id: lastId.toString(),
                        data: data,
                    });

                    return tasks[length - 1];
                },
            ),
            updateOneAsync: jest.fn(
                (collectionName: string, docId: string, data: TaskData) => {
                    const taskIndex = tasks.findIndex(
                        (task) => task.id === docId,
                    );
                    tasks[taskIndex].data = data;

                    return tasks[taskIndex];
                },
            ),
            deleteOneAsync: jest.fn((collectionName: string, docId: string) => {
                const taskIndex = tasks.findIndex((task) => task.id === docId);
                tasks.splice(taskIndex, 1);

                return docId;
            }),
        },
    };
});

jest.mock('firebase/auth', () => {
    type callbackType = (user: User | null) => void;

    const authInstance = {
        currentUser: null as User | null,
        updateCurrentUser: jest.fn((user: User | null) => {
            authInstance.currentUser = user;
        }),
    };

    const authCallBacks: callbackType[] = [];

    return {
        getAuth: jest.fn(() => authInstance),

        onAuthStateChanged: jest.fn((auth, callback) => {
            authCallBacks.push(callback);
        }),

        signInWithPopup: jest.fn(() => {
            const user = {
                uid: '1',
                displayName: 'Test',
                email: 'test@test.com',
            } as User;
            authInstance.updateCurrentUser(user);
            authCallBacks.forEach((callback) => {
                callback(user);
            });

            return Promise.resolve();
        }),

        signOut: jest.fn(() => {
            authInstance.updateCurrentUser(null);
            authCallBacks.forEach((callback) => {
                callback(null);
            });

            return Promise.resolve();
        }),

        GoogleAuthProvider: jest.fn(() => {
            return {};
        }),
    };
});

jest.mock('../../services/firebaseApp', () => {
    return {
        firebaseApp: {},
    };
});

describe('Integration tests', () => {
    it('integration test', async () => {
        // Arrange
        getAuth().updateCurrentUser(null);

        // Act 1. Render the authentication page.
        const { asFragment, getByText, getByTestId } = render(<App />);
        expect(asFragment()).toMatchSnapshot('1. Authentication page');

        // Act 2. Sign-in by Google.
        await waitFor(() => getByText('Sign-in by Google').click());
        expect(asFragment()).toMatchSnapshot('2. Tasks page');

        // Act 3. Open task.
        await waitFor(() => getByText('Task 1').click());
        expect(asFragment()).toMatchSnapshot('3. Task page');

        // Act 4. Update task.
        await waitFor(() => {
            const selctElement = getByTestId(
                ElementsNames.STATUS_SELECT,
            ) as HTMLSelectElement;
            fireEvent.change(selctElement, {
                target: { value: TaskStates.COMPLETED },
            });

            const titleTextArea = getByTestId(
                ElementsNames.TITLE_TEXT_AREA,
            ) as HTMLTextAreaElement;
            fireEvent.change(titleTextArea, {
                target: { value: 'Task 1 updated' },
            });

            const descriptionTextArea = getByTestId(
                ElementsNames.DESCRIPTION_TEXT_AREA,
            ) as HTMLTextAreaElement;
            fireEvent.change(descriptionTextArea, {
                target: { value: 'Description 1 updated' },
            });
        });
        expect(asFragment()).toMatchSnapshot('4. Task page changed');

        // Act 5. Save updated task.
        await waitFor(() => getByText('Save').click());
        expect(asFragment()).toMatchSnapshot('5. Task page saved');

        // Act 6. Create and save task.
        await waitFor(() => getByText('Create').click());
        await waitFor(() => getByText('Save').click());
        expect(asFragment()).toMatchSnapshot('6. Task page created and saved');

        // Act 7. Open and close task form.
        await waitFor(() => getByText('Title').click());
        await waitFor(() => getByText('Cancel').click());
        expect(asFragment()).toMatchSnapshot('7. Task page open and close');

        // Act 8. Delete task.
        await waitFor(() => getByText('Title').click());
        await waitFor(() => getByText('Delete').click());
        expect(asFragment()).toMatchSnapshot('8. Delete task');

        // Act 9. Sign-out.
        await waitFor(() => getByText('Sign Out').click());
        expect(asFragment()).toMatchSnapshot('8. Sign out');
    });
});
