import { taskService } from '../../services/taskService';
import { Task, TaskStates } from '../../types/task';

jest.mock('../../services/firebaseDb', () => {
    return {
        firebaseDb: {
            getManyAsync: jest.fn(() => {
                return [
                    {
                        id: '1',
                        data: {
                            title: 'Task 1',
                            description: 'Description 1',
                            status: TaskStates.NEW,
                        },
                    },
                    {
                        id: '2',
                        data: {
                            title: 'Task 2',
                            description: 'Description 2',
                            status: TaskStates.ACTIVE,
                        },
                    },
                ];
            }),
            createOneAsync: jest.fn(() => {
                return {
                    id: '111',
                    data: {
                        title: 'Task 1',
                        description: 'Description 1',
                        status: '1',
                    },
                };
            }),
            updateOneAsync: jest.fn(() => {
                return {
                    id: '1',
                    data: {
                        title: 'Task 2',
                        description: 'Description 2',
                        status: TaskStates.ACTIVE,
                    },
                };
            }),
            deleteOneAsync: jest.fn((docId: string) => Promise.resolve(docId)),
        },
    };
});

jest.mock('../../services/authService', () => {
    return {
        authService: {
            currentUserId: '1',
        },
    };
});

jest.mock('../../services/firebaseApp', () => {
    return {
        firebaseApp: {},
    };
});

describe('taskService', () => {
    it('should get tasks', async () => {
        // Arrange
        // Act
        const tasks = await taskService.getTasks();

        // Assert
        expect(tasks).toEqual([
            {
                id: '1',
                title: 'Task 1',
                description: 'Description 1',
                status: TaskStates.NEW,
            },
            {
                id: '2',
                title: 'Task 2',
                description: 'Description 2',
                status: TaskStates.ACTIVE,
            },
        ]);
    });

    it('should create a task', async () => {
        // Arrange
        const task: Task = {
            id: '',
            title: 'Task 1',
            description: 'Description 1',
            status: TaskStates.ACTIVE,
        };

        // Act
        const createdTask = await taskService.createTask(task);

        // Assert
        expect(createdTask).toEqual({
            id: '111',
            title: 'Task 1',
            description: 'Description 1',
            status: TaskStates.ACTIVE,
        });
    });

    it('should update a task', async () => {
        // Arrange
        const task: Task = {
            id: '1',
            title: 'Task 1',
            description: 'Description 1',
            status: TaskStates.ACTIVE,
        };

        // Act
        const updatedTask = await taskService.updateTask(task);

        // Assert
        expect(updatedTask).toEqual({
            id: '1',
            title: 'Task 2',
            description: 'Description 2',
            status: TaskStates.ACTIVE,
        });
    });

    it('should delete a task', async () => {
        // Arrange
        const taskId = '1';

        // Act
        const deletedTaskId = await taskService.deleteTask(taskId);

        // Assert
        expect(deletedTaskId).toEqual(taskId);
    });

    it('should clear tasks', () => {
        // Act
        const clearedTasks = taskService.clearTasks();

        // Assert
        expect(clearedTasks).toEqual([]);
    });
});
