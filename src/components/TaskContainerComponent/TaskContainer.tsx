import { useState } from 'react';
import mockedTasks from '../../mocks/data-mock.json';
import { Task, TaskStates } from '../../types/task';
import { TaskList } from '../TaskListComponent/TaskList';

export function TaskContainer(): JSX.Element {
    const [taskList, setTaskList] = useState<Task[]>(
        JSON.parse(JSON.stringify(mockedTasks)) as Task[],
    );

    function createTask(
        title: string,
        description: string,
        status: TaskStates,
    ): void {
        // Find new unique id.
        let id: number = taskList.length + 1;
        while (taskList.find((f) => f.id === id.toString())) {
            id++;
        }

        setTaskList([
            ...taskList.map((task) => ({ ...task })),
            {
                id: id.toString(),
                title,
                description,
                status,
            },
        ]);
    }

    function updateTask(
        id: string,
        title: string,
        description: string,
        status: TaskStates,
    ): void {
        const newTaskList = [...taskList].map((task) => ({ ...task }));
        const index = newTaskList.findIndex((f) => f.id === id);

        newTaskList[index].title = title;
        newTaskList[index].description = description;
        newTaskList[index].status = status;

        setTaskList(newTaskList);
    }

    function deleteTask(taskId: string): void {
        const newTaskList = [...taskList];
        setTaskList(newTaskList.filter((f) => f.id !== taskId));
    }

    return (
        <div className="flex">
            <TaskList
                taskList={taskList}
                createTask={createTask}
                updateTask={updateTask}
                deleteTask={deleteTask}
            />
        </div>
    );
}
