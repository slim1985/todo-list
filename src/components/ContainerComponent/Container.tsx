import mockedTasks from '../../mocks/data-mock.json';
import { Task } from '../../types/task';
import { TaskList } from '../TaskListComponent/TaskList';

export function Container(): JSX.Element {
    const tasks = JSON.parse(JSON.stringify(mockedTasks)) as Task[];

    return (
        <div className="flex">
            <TaskList tasks={tasks} />
        </div>
    );
}
