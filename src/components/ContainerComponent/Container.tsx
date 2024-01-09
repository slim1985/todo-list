import { useState } from 'react';
import mockedTasks from '../../mocks/data-mock.json';
import { Task } from '../../types/task';
import { TaskListPanel } from '../../components/TaskListPanelComponent/TaskListPanel';
import { TaskView } from '../../components/TaskViewComponent/TaskView';

export function Container(): JSX.Element {
    const tasks = JSON.parse(JSON.stringify(mockedTasks)) as Task[];

    const [taskList, setTaskList] = useState([...tasks]);
    const [actualTaskId, setActualTaskId] = useState('');

    return (
        <div className="p-2">
            {actualTaskId === '' ? (
                <TaskListPanel
                    tasks={taskList}
                    setTaskList={setTaskList}
                    setActualTaskId={setActualTaskId}
                />
            ) : (
                <TaskView
                    task={taskList.find((f) => f.id == actualTaskId)!}
                    taskList={taskList}
                    setActualTaskId={setActualTaskId}
                    setTaskList={setTaskList}
                />
            )}
        </div>
    );
}
