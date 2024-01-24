import type { Meta, StoryObj } from '@storybook/react';
import { TaskContainer } from '../../components/TaskContainerComponent/TaskContainer';

type Story = StoryObj<typeof meta>;

const meta: Meta<typeof TaskContainer> = {
    component: TaskContainer,
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
        },
    },
};

export default meta;

export const Simple: Story = {
    name: 'TaskContainer',
};
