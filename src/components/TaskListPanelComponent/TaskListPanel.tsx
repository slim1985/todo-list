import React from 'react';
import { Task } from '../../types/task';
import { TaskActions } from '../TaskActionsComponent/TaskActions';
import { TaskList } from '../TaskListComponent/TaskList';

export interface TaskListPanelProps {
    tasks: Task[];
    setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
    setActualTaskId: React.Dispatch<React.SetStateAction<string>>;
}

export function TaskListPanel({
    tasks,
    setTaskList,
    setActualTaskId,
}: TaskListPanelProps): JSX.Element {
    return (
        <div>
            <TaskActions
                tasks={tasks}
                setTaskList={setTaskList}
                setActualTaskId={setActualTaskId}
            />
            <TaskList tasks={tasks} setActualTaskId={setActualTaskId} />
        </div>
    );
}
