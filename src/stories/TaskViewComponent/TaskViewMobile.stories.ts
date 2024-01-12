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
        taskList: taskList,
    },
};

export const TaskFormNonEmpty: Story = {
    name: 'Non empty',
    args: {
        task: taskList[0],
        taskList: taskList,
    },
};
