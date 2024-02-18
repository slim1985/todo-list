import { useState, useEffect } from 'react';
import { useTaskSelector } from '../store/useTaskSelector';
import { useTaskDispatch } from '../store/useTaskDispatch';
import { Task, TaskStates } from '../types/task';
import {
    createTaskAsync,
    updateTaskAsync,
    deleteTaskAsync,
    selectAllTasks,
} from '../store/taskSlice';
import { StateStatus } from '../store/stateStatus';
import { RootState, store } from '../store/store';

export function useTasks(): [
    taskList: Task[],
    stateStatus: StateStatus,
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
    const [showTaskForm, setShowTaskForm] = useState<boolean>(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const dispatch = useTaskDispatch();
    const stateStatus = useTaskSelector(
        (state: RootState) => state.taskState.status,
    );
    const taskList = selectAllTasks(store.getState());
    useEffect(() => {
        if (showTaskForm) {
            setShowTaskForm(false);
        }
    }, [taskList]);

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
        dispatch(
            createTaskAsync({ id: id.toString(), title, description, status }),
        );
    }

    function updateTask(
        id: string,
        title: string,
        description: string,
        status: TaskStates,
    ): void {
        dispatch(updateTaskAsync({ id, title, description, status }));
    }

    function deleteTask(taskId: string): void {
        dispatch(deleteTaskAsync(taskId));
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
