import React from 'react';
import { Task } from '../../types/task';
import { TaskActions } from '../TaskActionsComponent/TaskActions';
import { TaskList } from '../TaskListComponent/TaskList';

export interface TaskListPanelProps {
    tasks: Task[];
    setShowTaskView: React.Dispatch<React.SetStateAction<string>>;
}

export function TaskListPanel({
    tasks,
    setShowTaskView,
}: TaskListPanelProps): JSX.Element {
    return (
        <div>
            <TaskActions />
            <TaskList tasks={tasks} setShowTaskView={setShowTaskView} />
        </div>
    );
}
