import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TaskForm } from '../../components/TaskFormComponent/TaskForm';
import { Task, TaskStateLabels, TaskStates } from '../../types/task';
import { StateStatus } from '../../types/stateStatus';

const task: Task = {
    id: '1',
    title: 'Task 1',
    description: 'Task 1 description',
    status: TaskStates.NEW,
};

const stateStatus = StateStatus.IDLE;
const hideTaskForm = jest.fn();
const createTask = jest.fn();
const updateTask = jest.fn();
const deleteTask = jest.fn();

describe('TaskForm', () => {
    it('TaskForm renders correctly with idle state', () => {
        // Arrange.
        // Act.
        const { asFragment } = render(
            <TaskForm
                task={task}
                stateStatus={stateStatus}
                hideTaskForm={hideTaskForm}
                createTask={createTask}
                updateTask={updateTask}
                deleteTask={deleteTask}
            />,
        );

        // Assert.
        expect(asFragment()).toMatchSnapshot();
    });

    it('TaskForm renders correctly with loading state', () => {
        // Arrange.
        // Act.
        const { asFragment } = render(
            <TaskForm
                task={task}
                stateStatus={StateStatus.LOADING}
                hideTaskForm={hideTaskForm}
                createTask={createTask}
                updateTask={updateTask}
                deleteTask={deleteTask}
            />,
        );

        // Assert.
        expect(asFragment()).toMatchSnapshot();
    });

    it('TaskForm renders correctly with failed state', () => {
        // Arrange.
        // Act.
        const { asFragment } = render(
            <TaskForm
                task={task}
                stateStatus={StateStatus.FAILED}
                hideTaskForm={hideTaskForm}
                createTask={createTask}
                updateTask={updateTask}
                deleteTask={deleteTask}
            />,
        );

        // Assert.
        expect(asFragment()).toMatchSnapshot();
    });

    it('TaskForm data renders correctly', () => {
        // Arrange.
        // Act.
        const { getByText } = render(
            <TaskForm
                task={task}
                stateStatus={stateStatus}
                hideTaskForm={hideTaskForm}
                createTask={createTask}
                updateTask={updateTask}
                deleteTask={deleteTask}
            />,
        );

        // Assert.
        expect(getByText(task.title)).toBeInTheDocument();
        expect(getByText(task.description)).toBeInTheDocument();
        expect(getByText(TaskStateLabels[task.status])).toBeInTheDocument();
    });

    it('TaskForm Save calls createTask', () => {
        // Arrange.
        // Act.
        render(
            <TaskForm
                task={null}
                stateStatus={stateStatus}
                hideTaskForm={hideTaskForm}
                createTask={createTask}
                updateTask={updateTask}
                deleteTask={deleteTask}
            />,
        );

        screen.getByText('Save').click();

        // Assert.
        expect(createTask).toHaveBeenCalledTimes(1);
    });

    it('TaskForm Save calls updateTask', () => {
        // Arrange.
        // Act.
        render(
            <TaskForm
                task={task}
                stateStatus={stateStatus}
                hideTaskForm={hideTaskForm}
                createTask={createTask}
                updateTask={updateTask}
                deleteTask={deleteTask}
            />,
        );

        screen.getByText('Save').click();

        // Assert.
        expect(updateTask).toHaveBeenCalledTimes(1);
    });

    it('TaskForm Delete calls deleteTask', () => {
        // Arrange.
        // Act.
        render(
            <TaskForm
                task={task}
                stateStatus={stateStatus}
                hideTaskForm={hideTaskForm}
                createTask={createTask}
                updateTask={updateTask}
                deleteTask={deleteTask}
            />,
        );

        screen.getByText('Delete').click();

        // Assert.
        expect(deleteTask).toHaveBeenCalledTimes(1);
    });

    it('TaskForm Cancel calls hideTaskForm', () => {
        // Arrange.
        // Act.
        render(
            <TaskForm
                task={task}
                stateStatus={stateStatus}
                hideTaskForm={hideTaskForm}
                createTask={createTask}
                updateTask={updateTask}
                deleteTask={deleteTask}
            />,
        );

        screen.getByText('Cancel').click();

        // Assert.
        expect(hideTaskForm).toHaveBeenCalledTimes(1);
    });

    it('TaskForm onTaskChange updates currentTask', () => {
        // Arrange.
        const newTitle = 'New Title';
        const newDescription = 'New Description';

        // Act.
        render(
            <TaskForm
                task={task}
                stateStatus={stateStatus}
                hideTaskForm={hideTaskForm}
                createTask={createTask}
                updateTask={updateTask}
                deleteTask={deleteTask}
            />,
        );

        fireEvent.change(screen.getByText(task.title), {
            target: { name: 'title', value: newTitle },
        });
        fireEvent.change(screen.getByText(task.description), {
            target: { name: 'description', value: newDescription },
        });
        fireEvent.change(screen.getByRole('combobox'), {
            target: { name: 'status', value: TaskStates.COMPLETED },
        });

        // Assert.
        expect(screen.getByText(newTitle)).toBeInTheDocument();
        expect(screen.getByText(newTitle)).toBeInTheDocument();
        expect(
            screen.getByText(TaskStateLabels[TaskStates.COMPLETED]),
        ).toBeInTheDocument();
    });
});
