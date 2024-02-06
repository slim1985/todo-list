import type { Meta, StoryObj } from '@storybook/react';
import { TaskList } from '../../components/TaskListComponent/TaskList';
import { Task } from '../../types/task';
import tasks from '../../mocks/data-mock.json';

type Story = StoryObj<typeof meta>;

const meta: Meta<typeof TaskList> = {
    component: TaskList,
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
        taskList: taskList,
    },
};
