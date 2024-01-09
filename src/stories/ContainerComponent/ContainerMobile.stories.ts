import type { Meta, StoryObj } from '@storybook/react';
import { Container } from '../../components/ContainerComponent/Container';

type Story = StoryObj<typeof meta>;

const meta: Meta<typeof Container> = {
    component: Container,
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
        },
    },
};

export default meta;

export const Simple: Story = {
    name: 'Container',
};
