import type { Meta, StoryObj } from '@storybook/react';
import { TaskView } from '../../components/TaskViewComponent/TaskView';
import { Task, TaskStates } from '../../types/task';
import tasks from '../../mocks/data-mock.json';

type Story = StoryObj<typeof meta>;

const meta: Meta<typeof TaskView> = {
    component: TaskView,
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
        },
    },
};

const taskList = JSON.parse(JSON.stringify(tasks)) as Task[];

export default meta;

export const TaskViewEmpty: Story = {
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

export const TaskViewNonEmpty: Story = {
    name: 'Non empty',
    args: {
        task: taskList[0],
        taskList: taskList,
    },
};
