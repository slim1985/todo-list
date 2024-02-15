import { useState } from 'react';
import { useTaskSelector } from './useTaskSelector';
import { useTaskDispatch } from './useTaskDispatch';
import { Task, TaskStates } from '../types/task';
import {
    createTaskAsync,
    updateTaskAsync,
    deleteTaskAsync,
    StateStatus,
} from '../store/taskSlice';
import { RootState } from '../store/store';

export function useTasks(): [
    taskList: Task[],
    asyncStatus: StateStatus,
    showTaskForm: boolean,
    selectedTask: Task | null,
    hideTaskForm: () => void,
    createTask: (
        title: string,
        description: string,
        status: TaskStates,
        hideForm: boolean,
    ) => void,
    updateTask: (
        id: string,
        title: string,
        description: string,
        status: TaskStates,
        hideForm: boolean,
    ) => void,
    deleteTask: (taskId: string, hideForm: boolean) => void,
    openTask: (taskId: string | null) => void,
] {
    const [showTaskForm, setShowTaskForm] = useState<boolean>(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const dispatch = useTaskDispatch();
    const taskList = useTaskSelector(
        (state: RootState) => state.taskState.tasks,
    );
    const stateStatus = useTaskSelector(
        (state: RootState) => state.taskState.status,
    );

    function hideTaskForm(): void {
        setShowTaskForm(false);
    }

    function createTask(
        title: string,
        description: string,
        status: TaskStates,
        hideForm: boolean,
    ): void {
        // Find new unique id.
        let id: number = taskList.length + 1;
        while (taskList.find((f) => f.id === id.toString())) {
            id++;
        }

        const result = dispatch(
            createTaskAsync({ id: id.toString(), title, description, status }),
        );
        result.then((action) => {
            if (hideForm && action.meta.requestStatus === 'fulfilled') {
                setShowTaskForm(false);
            }
        });
    }

    function updateTask(
        id: string,
        title: string,
        description: string,
        status: TaskStates,
        hideForm: boolean,
    ): void {
        const result = dispatch(
            updateTaskAsync({ id, title, description, status }),
        );
        result.then((action) => {
            if (hideForm && action.meta.requestStatus === 'fulfilled') {
                setShowTaskForm(false);
            }
        });
    }

    function deleteTask(taskId: string, hideForm: boolean): void {
        const result = dispatch(deleteTaskAsync(taskId));
        result.then((action) => {
            if (hideForm && action.meta.requestStatus === 'fulfilled') {
                setShowTaskForm(false);
            }
        });
    }

    function openTask(taskId: string | null): void {
        const task = taskList.find((task) => task.id === taskId) ?? null;
        setSelectedTask(task);
        setShowTaskForm(true);
    }

    return [
        taskList,
        stateStatus,
        showTaskForm,
        selectedTask,
        hideTaskForm,
        createTask,
        updateTask,
        deleteTask,
        openTask,
    ] as const;
}
