import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from '../../components/SpinnerComponent/Spinner';

type Story = StoryObj<typeof meta>;

const meta: Meta<typeof Spinner> = {
    component: Spinner,
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
        },
    },
};

export default meta;

export const Simple: Story = {
    name: 'Spinner',
};
