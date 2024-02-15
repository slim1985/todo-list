import { useState } from 'react';
import { useTaskSelector } from './useTaskSelector';
import { useTaskDispatch } from './useTaskDispatch';
import { Task, TaskStates } from '../types/task';
import {
    createTaskAsync,
    updateTaskAsync,
    deleteTaskAsync,
    StateStatus,
    selectAllTasks,
} from '../store/taskSlice';
import { RootState, store } from '../store/store';

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
        onActionSuccess: () => void,
    ) => void,
    updateTask: (
        id: string,
        title: string,
        description: string,
        status: TaskStates,
        onActionSuccess: () => void,
    ) => void,
    deleteTask: (taskId: string, onActionSuccess: () => void) => void,
    openTask: (taskId: string | null) => void,
] {
    const [showTaskForm, setShowTaskForm] = useState<boolean>(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const dispatch = useTaskDispatch();
    const stateStatus = useTaskSelector(
        (state: RootState) => state.taskState.status,
    );
    const taskList = selectAllTasks(store.getState());

    function hideTaskForm(): void {
        setShowTaskForm(false);
    }

    function createTask(
        title: string,
        description: string,
        status: TaskStates,
        onActionSuccess: () => void,
    ): void {
        // Find new unique id.
        let id: number = taskList.length + 1;
        while (taskList.find((f) => f.id === id.toString())) {
            id++;
        }

        const promise = dispatch(
            createTaskAsync({ id: id.toString(), title, description, status }),
        );
        promise.then((action) => {
            if (action.meta.requestStatus === 'fulfilled') {
                onActionSuccess();
            }
        });
    }

    function updateTask(
        id: string,
        title: string,
        description: string,
        status: TaskStates,
        onActionSuccess: () => void,
    ): void {
        const promise = dispatch(
            updateTaskAsync({ id, title, description, status }),
        );
        promise.then((action) => {
            if (action.meta.requestStatus === 'fulfilled') {
                onActionSuccess();
            }
        });
    }

    function deleteTask(taskId: string, onActionSuccess: () => void): void {
        const promise = dispatch(deleteTaskAsync(taskId));
        promise.then((action) => {
            if (action.meta.requestStatus === 'fulfilled') {
                onActionSuccess();
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
