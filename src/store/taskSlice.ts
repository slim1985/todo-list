import { createTaskSlice } from './createTaskSlice';
import { Task } from '../types/task';
import mockedTasks from '../mocks/data-mock.json';

const sleep = (ms: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, ms));

export interface TaskState {
    tasks: Task[];
    status: StateStatus;
}

const tasks = JSON.parse(JSON.stringify(mockedTasks)) as Task[];

const initialState: TaskState = {
    tasks: tasks,
    status: 'idle',
};

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
                    state.tasks.push(action.payload);
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
                    const task = state.tasks.find(
                        (t) => t.id === action.payload.id,
                    );
                    if (task) {
                        task.title = action.payload.title;
                        task.description = action.payload.description;
                        task.status = action.payload.status;
                    }
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
                    state.tasks = state.tasks.filter(
                        (t) => t.id !== action.payload,
                    );
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
export default taskSlice.reducer;
