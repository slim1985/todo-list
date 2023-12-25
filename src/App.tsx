import React from 'react';
import { useState } from 'react';
import tasks from './mocks/data-mock.json';
import { Task } from './types/task';
import { TaskListPanel } from './components/TaskListPanelComponent/TaskListPanel';
import { TaskView } from './components/TaskViewComponent/TaskView';
import './index.css';

export default function App(): JSX.Element {
    const taskList: Task[] = ImportTasks();
    const [showTaskView, setShowTaskView] = useState('');

    return (
        <div className="p-2">
            {showTaskView === '' ? (
                <TaskListPanel
                    tasks={taskList}
                    setShowTaskView={setShowTaskView}
                />
            ) : (
                <TaskView
                    task={taskList.find((f) => f.id == showTaskView)!}
                    setShowTaskView={setShowTaskView}
                />
            )}
        </div>
    );
}

function ImportTasks(): Task[] {
    return JSON.parse(JSON.stringify(tasks));
}
