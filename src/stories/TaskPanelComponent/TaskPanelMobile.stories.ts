import type { Meta, StoryObj } from '@storybook/react';
import { TaskPanel } from '../../components/TaskPanelComponent/TaskPanel';

type Story = StoryObj<typeof meta>;

const meta: Meta<typeof TaskPanel> = {
    component: TaskPanel,
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
        },
    },
};

export default meta;

export const TaskPanelEmpty: Story = {
    name: 'Empty',
    args: {
        user: null,
    },
};

export const TaskPanelFilled: Story = {
    name: 'Filled',
    args: {
        user: {
            id: '1',
            displayName: 'John Doe',
            email: 'john.doe@gmail.com',
        },
    },
};
