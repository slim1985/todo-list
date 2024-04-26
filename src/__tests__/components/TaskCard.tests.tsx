import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
    TaskCard,
    TaskCardMemo,
} from '../../components/TaskCardComponent/TaskCard';
import { Task, TaskStates, TaskStateLabels } from '../../types/task';

const task: Task = {
    id: '1',
    title: 'Task 1',
    description: 'Task 1 description',
    status: TaskStates.NEW,
};

const onClick = jest.fn();

describe('TaskCard', () => {
    it('TaskCard renders correctly', () => {
        // Arrange.
        // Act.
        const { asFragment } = render(
            <TaskCard task={task} onClick={onClick} />,
        );

        // Assert.
        expect(asFragment()).toMatchSnapshot();
    });

    it('Task data renders correctly', () => {
        // Arrange.
        // Act.
        render(<TaskCard task={task} onClick={onClick} />);

        // Assert.
        expect(screen.getByText(task.title)).toBeInTheDocument();
        expect(screen.getByText(task.description)).toBeInTheDocument();
        expect(
            screen.getByText(TaskStateLabels[task.status]),
        ).toBeInTheDocument();
    });

    it('TaskCard onClick event is called', () => {
        // Arrange.
        // Act.
        render(<TaskCard task={task} onClick={onClick} />);
        screen.getByText(task.title).click();

        // Assert.
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('TaskCard memoization works correctly', () => {
        // Arrange.
        // Act.
        const { rerender, asFragment } = render(
            <TaskCardMemo task={task} onClick={jest.fn()} />,
        );
        rerender(<TaskCardMemo task={task} onClick={jest.fn()} />);

        // Assert.
        expect(asFragment()).toMatchSnapshot();
    });
});
