import { Task } from '../../types/task';
import { TaskCardMemo } from '../TaskCardComponent/TaskCard';

export interface TaskListPanelProps {
    taskList: Task[];
    openTask: (taskId: string | null) => void;
}

export function TaskList({
    taskList,
    openTask,
}: TaskListPanelProps): JSX.Element {
    return (
        <div>
            <div className="flex justify-end sticky top-0 space-x-3 bg-white solid border-gray-400 border-b-2">
                <button
                    onClick={() => openTask(null)}
                    className="size-20 my-2 mr-2 p-1 bg-gray-300 rounded-md"
                >
                    Create
                </button>
            </div>
            <div className="flex flex-wrap justify-center mt-3">
                {taskList.map((task: Task, index: number) => (
                    <TaskCardMemo key={index} task={task} onClick={openTask} />
                ))}
            </div>
        </div>
    );
}
