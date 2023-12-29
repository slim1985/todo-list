import { useState } from 'react';
import tasks from '../../mocks/data-mock.json';
import { Task } from '../../types/task';
import { TaskListPanel } from '../../components/TaskListPanelComponent/TaskListPanel';
import { TaskView } from '../../components/TaskViewComponent/TaskView';

export function Container(): JSX.Element {
    const [taskList, setTaskList] = useState(
        JSON.parse(JSON.stringify(tasks)) as Task[],
    );
    const [showTaskView, setShowTaskView] = useState('');

    return (
        <div className="p-2">
            {showTaskView === '' ? (
                <TaskListPanel
                    tasks={taskList}
                    setTaskList={setTaskList}
                    setShowTaskView={setShowTaskView}
                />
            ) : (
                <TaskView
                    task={taskList.find((f) => f.id == showTaskView)!}
                    taskList={taskList}
                    setShowTaskView={setShowTaskView}
                    setTaskList={setTaskList}
                />
            )}
        </div>
    );
}
