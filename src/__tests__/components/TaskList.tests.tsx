import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TaskList } from '../../components/TaskListComponent/TaskList';
import { Task, TaskStates, TaskStateLabels } from '../../types/task';

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

const openTask = jest.fn();

describe('TaskList', () => {
    it('TaskList renders correctly', () => {
        // Arrange.
        // Act.
        const { asFragment } = render(
            <TaskList taskList={taskList} openTask={openTask} />,
        );

        // Assert.
        expect(asFragment()).toMatchSnapshot();
    });

    it('TaskList data renders correctly', () => {
        // Arrange.
        // Act.
        render(<TaskList taskList={taskList} openTask={openTask} />);

        // Assert.
        taskList.forEach((task) => {
            expect(screen.getByText(task.title)).toBeInTheDocument();
            expect(screen.getByText(task.description)).toBeInTheDocument();
            expect(
                screen.getByText(TaskStateLabels[task.status]),
            ).toBeInTheDocument();
        });
    });

    it('TaskList openTask event is called', () => {
        // Arrange.
        // Act.
        render(<TaskList taskList={taskList} openTask={openTask} />);
        screen.getByText(taskList[0].title).click();

        // Assert.
        expect(openTask).toHaveBeenCalledTimes(1);
    });
});
