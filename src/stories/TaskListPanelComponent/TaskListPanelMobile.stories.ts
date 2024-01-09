import type { Meta, StoryObj } from '@storybook/react';
import { TaskListPanel } from '../../components/TaskListPanelComponent/TaskListPanel';
import { Task } from '../../types/task';
import tasks from '../../mocks/data-mock.json';

type Story = StoryObj<typeof meta>;

const meta: Meta<typeof TaskListPanel> = {
    component: TaskListPanel,
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
        },
    },
};

const taskList = JSON.parse(JSON.stringify(tasks)) as Task[];

export default meta;

export const Simple: Story = {
    name: 'TaskListPanel',
    args: {
        tasks: taskList,
    },
};
