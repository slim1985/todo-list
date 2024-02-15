import { createEntityAdapter } from '@reduxjs/toolkit';
import { createTaskSlice } from './createTaskSlice';
import { Task } from '../types/task';
import mockedTasks from '../mocks/data-mock.json';
import { RootState } from './store';

const sleep = (ms: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, ms));

export interface TaskState {
    status: StateStatus;
}

const tasks = JSON.parse(JSON.stringify(mockedTasks)) as Task[];

const defaultState: TaskState = {
    status: 'idle',
};

const taskAdapter = createEntityAdapter<Task>({
    sortComparer: (a, b) => a.id.localeCompare(b.id),
});

const initialState = taskAdapter.addMany(
    taskAdapter.getInitialState(defaultState),
    tasks,
);

export const taskSlice = createTaskSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: (create) => ({
        createTaskAsync: create.asyncThunk(
            async (task: Task) => {
                await sleep(3000);
                return task;
            },
            {
                pending: (state) => {
                    state.status = 'loading';
                },
                fulfilled: (state, action) => {
                    state.status = 'idle';
                    taskAdapter.addOne(state, action.payload);
                },
                rejected: (state) => {
                    state.status = 'failed';
                },
            },
        ),

        updateTaskAsync: create.asyncThunk(
            async (task: Task) => {
                await sleep(3000);
                return task;
            },
            {
                pending: (state) => {
                    state.status = 'loading';
                },
                fulfilled: (state, action) => {
                    state.status = 'idle';
                    taskAdapter.updateOne(state, {
                        id: action.payload.id,
                        changes: action.payload,
                    });
                },
                rejected: (state) => {
                    state.status = 'failed';
                },
            },
        ),

        deleteTaskAsync: create.asyncThunk(
            async (taskId: string) => {
                await sleep(3000);
                return taskId;
            },
            {
                pending: (state) => {
                    state.status = 'loading';
                },
                fulfilled: (state, action) => {
                    state.status = 'idle';
                    taskAdapter.removeOne(state, action.payload);
                },
                rejected: (state) => {
                    state.status = 'failed';
                },
            },
        ),
    }),
});

export type StateStatus = 'idle' | 'loading' | 'failed';
export const { createTaskAsync, updateTaskAsync, deleteTaskAsync } =
    taskSlice.actions;
export const { selectAll: selectAllTasks } =
    taskAdapter.getSelectors<RootState>((state) => state.taskState);
export default taskSlice.reducer;
