import { createEntityAdapter } from '@reduxjs/toolkit';
import { createTaskSlice } from './createTaskSlice';
import { StateStatus } from './stateStatus';
import { Task } from '../types/task';
import mockedTasks from '../mocks/data-mock.json';
import { RootState } from './store';
import { TaskService } from '../services/taskService';

export interface TaskState {
    status: StateStatus;
}

const tasks = JSON.parse(JSON.stringify(mockedTasks)) as Task[];

const defaultState: TaskState = {
    status: StateStatus.IDLE,
};

const taskAdapter = createEntityAdapter<Task>({
    sortComparer: (a, b) => a.id.localeCompare(b.id),
});

const initialState = taskAdapter.addMany(
    taskAdapter.getInitialState(defaultState),
    tasks,
);

const taskService = TaskService.getInstance();

export const taskSlice = createTaskSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: (create) => ({
        createTaskAsync: create.asyncThunk(
            async (task: Task) => {
                return await taskService.createTask(task);
            },
            {
                pending: (state) => {
                    state.status = StateStatus.LOADING;
                },
                fulfilled: (state, action) => {
                    state.status = StateStatus.IDLE;
                    taskAdapter.addOne(state, action.payload);
                },
                rejected: (state) => {
                    state.status = StateStatus.FAILED;
                },
            },
        ),

        updateTaskAsync: create.asyncThunk(
            async (task: Task) => {
                return await taskService.updateTask(task);
            },
            {
                pending: (state) => {
                    state.status = StateStatus.LOADING;
                },
                fulfilled: (state, action) => {
                    state.status = StateStatus.IDLE;
                    taskAdapter.updateOne(state, {
                        id: action.payload.id,
                        changes: action.payload,
                    });
                },
                rejected: (state) => {
                    state.status = StateStatus.FAILED;
                },
            },
        ),

        deleteTaskAsync: create.asyncThunk(
            async (taskId: string) => {
                return await taskService.deleteTask(taskId);
            },
            {
                pending: (state) => {
                    state.status = StateStatus.LOADING;
                },
                fulfilled: (state, action) => {
                    state.status = StateStatus.IDLE;
                    taskAdapter.removeOne(state, action.payload);
                },
                rejected: (state) => {
                    state.status = StateStatus.FAILED;
                },
            },
        ),
    }),
});

export const { createTaskAsync, updateTaskAsync, deleteTaskAsync } =
    taskSlice.actions;
export const { selectAll: selectAllTasks } =
    taskAdapter.getSelectors<RootState>((state) => state.taskState);
export default taskSlice.reducer;
