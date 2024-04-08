import type { Meta, StoryObj } from '@storybook/react';
import { TaskCard } from '../../components/TaskCardComponent/TaskCard';
import { Task, TaskStates } from '../../types/task';
import tasks from '../../mocks/data-mock.json';

type Story = StoryObj<typeof meta>;

const meta: Meta<typeof TaskCard> = {
    component: TaskCard,
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
        },
    },
};

const taskList = JSON.parse(JSON.stringify(tasks)) as Task[];

export default meta;

export const TaskCardEmpty: Story = {
    name: 'Empty',
    args: {
        task: {
            id: '',
            title: '',
            description: '',
            status: TaskStates.ACTIVE,
        },
    },
};

export const TaskCardFullFilled: Story = {
    name: 'Full Filled',
    args: {
        task: taskList[0],
    },
};
export const TaskCardPartialFilled: Story = {
    name: 'Partial Filled',
    args: {
        task: taskList[2],
    },
};
