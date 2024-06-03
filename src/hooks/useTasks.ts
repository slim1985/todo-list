import { useState, useEffect } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { taskService } from '../services/taskService';
import { Task, TaskStates } from '../types/task';
import { StateStatus } from '../types/stateStatus';

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
    clearTaskList: () => void,
] {
    const queryClient = useQueryClient();
    const [showTaskForm, setShowTaskForm] = useState<boolean>(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [stateStatus, setStateStatus] = useState<StateStatus>(
        StateStatus.IDLE,
    );

    const { data: taskList } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => await taskService.getTasks(),
        initialData: [],
    });

    const updateTaskMutation = useMutation({
        mutationFn: async (task: Task) => {
            setStateStatus(StateStatus.LOADING);
            return await taskService.updateTask(task);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            setStateStatus(StateStatus.IDLE);
            setShowTaskForm(false);
        },
        onError: () => {
            setStateStatus(StateStatus.FAILED);
        },
    });

    const createTaskMutation = useMutation({
        mutationFn: async (task: Task) => {
            setStateStatus(StateStatus.LOADING);
            return await taskService.createTask(task);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            setStateStatus(StateStatus.IDLE);
            setShowTaskForm(false);
        },
        onError: () => {
            setStateStatus(StateStatus.FAILED);
        },
    });

    const deleteTaskMutation = useMutation({
        mutationFn: async (taskId: string) => {
            setStateStatus(StateStatus.LOADING);
            return await taskService.deleteTask(taskId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            setStateStatus(StateStatus.IDLE);
        },
        onError: () => {
            setStateStatus(StateStatus.FAILED);
        },
    });

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
        const id = '';
        createTaskMutation.mutate({ id, title, description, status });
    }

    function updateTask(
        id: string,
        title: string,
        description: string,
        status: TaskStates,
    ): void {
        updateTaskMutation.mutate({ id, title, description, status });
    }

    function deleteTask(taskId: string): void {
        deleteTaskMutation.mutate(taskId);
    }

    function openTask(taskId: string | null): void {
        const task = taskList.find((task) => task.id === taskId) ?? null;

        setSelectedTask(task);
        setShowTaskForm(true);
    }

    function clearTaskList(): void {
        queryClient.clear();
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
        clearTaskList,
    ] as const;
}
