import { useState } from 'react';
import mockedTasks from '../mocks/data-mock.json';
import { Task, TaskStates } from '../types/task';

export function useTasks(): [
    taskList: Task[],
    showTaskForm: boolean,
    selectedTask: Task | null,
    hideTaskForm: () => void,
    createTask: (
        title: string,
        description: string,
        status: TaskStates,
    ) => void,
    updateTask: (
        id: string,
        title: string,
        description: string,
        status: TaskStates,
    ) => void,
    deleteTask: (taskId: string) => void,
    openTask: (taskId: string | null) => void,
] {
    const [taskList, setTaskList] = useState<Task[]>(
        JSON.parse(JSON.stringify(mockedTasks)) as Task[],
    );
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    function hideTaskForm(): void {
        setShowTaskForm(false);
    }

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

    function openTask(taskId: string | null): void {
        const task = taskList.find((task) => task.id === taskId) ?? null;
        setSelectedTask(task);
        setShowTaskForm(true);
    }

    return [
        taskList,
        showTaskForm,
        selectedTask,
        hideTaskForm,
        createTask,
        updateTask,
        deleteTask,
        openTask,
    ] as const;
}
