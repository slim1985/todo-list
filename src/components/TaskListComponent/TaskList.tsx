import { Task } from '../../types/task';
import { TaskCardMemo } from '../TaskCardComponent/TaskCard';

export interface TaskListProps {
    taskList: Task[];
    openTask: (taskId: string | null) => void;
}

export function TaskList({ taskList, openTask }: TaskListProps): JSX.Element {
    return (
        <div className="flex flex-wrap justify-center mt-3">
            {taskList.map((task: Task) => (
                <TaskCardMemo key={task.id} task={task} onClick={openTask} />
            ))}
        </div>
    );
}
