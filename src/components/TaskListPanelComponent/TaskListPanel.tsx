import React from 'react';
import { Task } from '../../types/task';
import { TaskActions } from '../TaskActionsComponent/TaskActions';
import { TaskList } from '../TaskListComponent/TaskList';

export interface TaskListPanelProps {
    tasks: Task[];
    setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
    setShowTaskView: React.Dispatch<React.SetStateAction<string>>;
}

export function TaskListPanel({
    tasks,
    setTaskList,
    setShowTaskView,
}: TaskListPanelProps): JSX.Element {
    return (
        <div>
            <TaskActions
                tasks={tasks}
                setTaskList={setTaskList}
                setShowTaskView={setShowTaskView}
            />
            <TaskList tasks={tasks} setShowTaskView={setShowTaskView} />
        </div>
    );
}
