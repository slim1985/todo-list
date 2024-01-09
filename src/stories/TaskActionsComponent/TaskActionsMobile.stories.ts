import type { Meta, StoryObj } from '@storybook/react';
import { TaskActions } from '../../components/TaskActionsComponent/TaskActions';
import { Task } from '../../types/task';
import tasks from '../../mocks/data-mock.json';

type Story = StoryObj<typeof meta>;

const meta: Meta<typeof TaskActions> = {
    component: TaskActions,
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
        },
    },
};

const taskList = JSON.parse(JSON.stringify(tasks)) as Task[];

export default meta;

export const Simple: Story = {
    name: 'TaskActions',
    args: {
        tasks: taskList,
    },
};
