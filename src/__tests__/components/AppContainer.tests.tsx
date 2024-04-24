import { render } from '@testing-library/react';
import { AppContainer } from '../../components/AppContainerComponent/AppContainer';
import { Task, TaskStates } from '../../types/task';
import { StateStatus } from '../../types/stateStatus';
import { User } from '../../types/user';

const user: User = {
    id: '1',
    displayName: 'Test User',
    email: 'user@user.com',
};

const taskList: Task[] = [
    {
        id: '1',
        title: 'Task 1',
        description: 'Task 1 description',
        status: TaskStates.NEW,
    },
    {
        id: '2',
        title: 'Task 2',
        description: 'Task 2 description',
        status: TaskStates.ACTIVE,
    },
    {
        id: '3',
        title: 'Task 3',
        description: 'Task 3 description',
        status: TaskStates.COMPLETED,
    },
];

const signOut = jest.fn();

jest.mock('../../store/taskSlice', () => ({
    getTasksAsync: jest.fn(),
    createTaskAsync: jest.fn(),
    updateTaskAsync: jest.fn(),
    deleteTaskAsync: jest.fn(),
    selectAllTasks: jest.fn(),
    clearTasks: jest.fn(),
}));

jest.mock('../../store/useTaskSelector', () => ({
    useTaskSelector: jest.fn(),
}));

jest.mock('../../store/useTaskDispatch', () => ({
    useTaskDispatch: jest.fn(),
}));

jest.mock('../../store/store', () => ({
    RootState: jest.fn(),
    store: {
        getState: jest.fn(),
    },
}));

jest.mock('../../hooks/useTasks', () => ({
    useTasks: (): useTasksType => getUseTasksMocks(false),
}));

describe('AppContainer', () => {
    it('AppContainer renders correctly without showTaskForm', () => {
        // Arrange.
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        jest.spyOn(require('../../hooks/useTasks'), 'useTasks').mockReturnValue(
            getUseTasksMocks(false),
        );

        // Act.
        const { asFragment } = render(
            <AppContainer user={user} signOut={signOut} />,
        );

        // Assert.
        expect(asFragment()).toMatchSnapshot();
    });

    it('AppContainer renders correctly with showTaskForm', () => {
        // Arrange.
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        jest.spyOn(require('../../hooks/useTasks'), 'useTasks').mockReturnValue(
            getUseTasksMocks(true),
        );

        // Act.
        const { asFragment } = render(
            <AppContainer user={user} signOut={signOut} />,
        );

        // Assert.
        expect(asFragment()).toMatchSnapshot();
    });
});

function getUseTasksMocks(showTaskForm: boolean): useTasksType {
    return [
        taskList,
        StateStatus.IDLE,
        showTaskForm,
        showTaskForm ? taskList[0] : null,
        jest.fn(),
        jest.fn(),
        jest.fn(),
        jest.fn(),
        jest.fn(),
        jest.fn(),
    ];
}

type useTasksType = [
    taskList: Task[],
    stateStatus: StateStatus,
    showTaskForm: boolean,
    selectedTask: Task | null,
    hideTaskForm: () => void,
    createTask: (
        title: string,
        description: string,
        status: TaskStates,
    ) => void,
    updateTask: (
        id: string,
        title: string,
        description: string,
        status: TaskStates,
    ) => void,
    deleteTask: (taskId: string) => void,
    openTask: (taskId: string | null) => void,
    clearTaskList: () => void,
];
