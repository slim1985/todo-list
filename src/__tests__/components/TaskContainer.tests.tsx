import { render } from '@testing-library/react';
import { TaskContainer } from '../../components/TaskContainerComponent/TaskContainer';
import { Task, TaskStates } from '../../types/task';
import { StateStatus } from '../../types/stateStatus';

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

const stateStatus = StateStatus.IDLE;
const hideTaskForm = jest.fn();
const createTask = jest.fn();
const updateTask = jest.fn();
const deleteTask = jest.fn();
const openTask = jest.fn();

describe('TaskContainer', () => {
    it('TaskContainer renders correctly without showTaskForm', () => {
        // Arrange.
        // Act.
        const { asFragment } = render(
            <TaskContainer
                taskList={taskList}
                stateStatus={stateStatus}
                showTaskForm={false}
                selectedTask={null}
                hideTaskForm={hideTaskForm}
                createTask={createTask}
                updateTask={updateTask}
                deleteTask={deleteTask}
                openTask={openTask}
            />,
        );

        // Assert.
        expect(asFragment()).toMatchSnapshot();
    });

    it('TaskContainer renders correctly with showTaskForm', () => {
        // Arrange.
        const task: Task = {
            id: '1',
            title: 'Task 1',
            description: 'Task 1 description',
            status: TaskStates.NEW,
        };

        // Act.
        const { asFragment } = render(
            <TaskContainer
                taskList={taskList}
                stateStatus={stateStatus}
                showTaskForm={true}
                selectedTask={task}
                hideTaskForm={hideTaskForm}
                createTask={createTask}
                updateTask={updateTask}
                deleteTask={deleteTask}
                openTask={openTask}
            />,
        );

        // Assert.
        expect(asFragment()).toMatchSnapshot();
    });
});
