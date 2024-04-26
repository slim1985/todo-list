import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LoginForm } from '../../components/LoginFormComponent/LoginForm';

const authenticate = jest.fn();

describe('LoginForm', () => {
    it('LoginForm renders correctly', () => {
        // Arrange.
        // Act.
        const { asFragment } = render(
            <LoginForm authenticate={authenticate} />,
        );

        // Assert.
        expect(asFragment()).toMatchSnapshot();
    });

    it('LoginForm authenticate event is called', () => {
        // Arrange.
        // Act.
        render(<LoginForm authenticate={authenticate} />);
        screen.getByText('Sign-in by Google').click();

        // Assert.
        expect(authenticate).toHaveBeenCalledTimes(1);
    });
});
