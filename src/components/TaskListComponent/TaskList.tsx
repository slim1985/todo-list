import { memo } from 'react';
import { Task } from '../../types/task';
import { TaskCardMemo } from '../TaskCardComponent/TaskCard';

export interface TaskListPanelProps {
    taskList: Task[];
    userName: string;
    openTask: (taskId: string | null) => void;
    signOut: () => void;
}

export function TaskList({
    taskList,
    userName,
    openTask,
    signOut,
}: TaskListPanelProps): JSX.Element {
    return (
        <div>
            <div className="flex w-screen justify-start sticky top-0 space-x-3 bg-white solid border-gray-400 border-b-2">
                <div className='flex w-2/4 justify-start items-center float-left'>
                    <div className='ml-2'>
                        <p className='font-semibold'>{userName}</p>
                        <button onClick={() => signOut()} className='mt-2'>Sign Out</button>
                    </div>
                </div>
                <div className='flex w-2/4 justify-end'>
                    <button
                        onClick={() => openTask(null)}
                        className="size-20 my-2 mr-2 p-1 bg-gray-300 rounded-md"
                    >
                        Create
                    </button>
                </div>
            </div>
            <div className="flex flex-wrap justify-center mt-3">
                {taskList.map((task: Task) => (
                    <TaskCardMemo
                        key={task.id}
                        task={task}
                        onClick={openTask}
                    />
                ))}
            </div>
        </div>
    );
}

export const TaskListMemo = memo(TaskList, (prevProps, nextProps) => {
    return prevProps.taskList === nextProps.taskList && prevProps.userName === nextProps.userName;
});
