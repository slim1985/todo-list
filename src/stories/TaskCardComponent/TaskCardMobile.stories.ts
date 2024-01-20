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
            status: TaskStates.NEW,
        },
    },
};

export const TaskCardNonEmpty: Story = {
    name: 'Non empty',
    args: {
        task: taskList[0],
    },
};
