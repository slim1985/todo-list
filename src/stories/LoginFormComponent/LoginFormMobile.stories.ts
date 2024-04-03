import type { Meta, StoryObj } from '@storybook/react';
import { LoginForm } from '../../components/LoginFormComponent/LoginForm';

type Story = StoryObj<typeof meta>;

const meta: Meta<typeof LoginForm> = {
    component: LoginForm,
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
        },
    },
};

export const LoginFormSimple: Story = {
    name: 'Simple',
};

export default meta;
