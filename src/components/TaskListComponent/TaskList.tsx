import { memo } from 'react';
import { Task } from '../../types/task';
import { User } from '../../types/user';
import { TaskCardMemo } from '../TaskCardComponent/TaskCard';

export interface TaskListPanelProps {
    taskList: Task[];
    user: User | null;
    openTask: (taskId: string | null) => void;
    signOut: () => void;
    clearTaskList: () => void;
}

export function TaskList({
    taskList,
    user,
    openTask,
    signOut,
    clearTaskList,
}: TaskListPanelProps): JSX.Element {
    function signOutUser(): void {
        signOut();
        clearTaskList();
    }

    return (
        <div>
            <div className="flex w-screen justify-start sticky top-0 space-x-3 bg-white solid border-gray-400 border-b-2">
                <div className="flex w-2/4 justify-start items-center float-left">
                    <div className="ml-2">
                        <p className="font-semibold">{user?.displayName}</p>
                        <p className="text-sm">{user?.email}</p>
                        <button onClick={() => signOutUser()} className="mt-2">
                            Sign Out
                        </button>
                    </div>
                </div>
                <div className="flex w-2/4 justify-end">
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
    return (
        prevProps.taskList === nextProps.taskList &&
        prevProps.user === nextProps.user
    );
});
