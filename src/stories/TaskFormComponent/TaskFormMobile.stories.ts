import type { Meta, StoryObj } from '@storybook/react';
import { TaskForm } from '../../components/TaskFormComponent/TaskForm';
import { Task, TaskStates } from '../../types/task';
import tasks from '../../mocks/data-mock.json';

type Story = StoryObj<typeof meta>;

const meta: Meta<typeof TaskForm> = {
    component: TaskForm,
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
        },
    },
};

const taskList = JSON.parse(JSON.stringify(tasks)) as Task[];

export default meta;

export const TaskFormEmpty: Story = {
    name: 'Empty',
    args: {
        task: {
            id: '',
            title: '',
            description: '',
            status: TaskStates.NEW,
        },
    },
};

export const TaskFormPartialFilled: Story = {
    name: 'Partial Filled',
    args: {
        task: taskList[1],
    },
};

export const TaskFormFullFilled: Story = {
    name: 'Full Filled',
    args: {
        task: {
            ...taskList[0],
            description:
                'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit voluptate velit esse cillum dolore fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum',
            status: TaskStates.COMPLETED,
        },
    },
};
