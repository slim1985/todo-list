import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TaskPanel } from '../../components/TaskPanelComponent/TaskPanel';
import { User } from '../../types/user';

const user: User = {
    id: '1',
    displayName: 'Test User',
    email: 'user@user.com',
};

const signOut = jest.fn();
const clearTaskList = jest.fn();
const openTask = jest.fn();

describe('TaskPanel', () => {
    it('TaskPanel renders correctly with user', () => {
        // Arrange.
        // Act.
        const { asFragment } = render(
            <TaskPanel
                user={user}
                signOut={signOut}
                clearTaskList={clearTaskList}
                openTask={openTask}
            />,
        );

        // Assert.
        expect(asFragment()).toMatchSnapshot();
    });

    it('TaskPanel renders correctly without user', () => {
        // Arrange.
        // Act.
        const { asFragment } = render(
            <TaskPanel
                user={null}
                signOut={signOut}
                clearTaskList={clearTaskList}
                openTask={openTask}
            />,
        );

        // Assert.
        expect(asFragment()).toMatchSnapshot();
    });

    it('TaskPanel user data renders correctly', () => {
        // Arrange.
        // Act.
        render(
            <TaskPanel
                user={user}
                signOut={signOut}
                clearTaskList={clearTaskList}
                openTask={openTask}
            />,
        );

        // Assert.
        expect(screen.getByText(user.displayName)).toBeInTheDocument();
        expect(screen.getByText(user.email)).toBeInTheDocument();
    });

    it('TaskPanel signOut event is called', () => {
        // Arrange.
        // Act.
        render(
            <TaskPanel
                user={user}
                signOut={signOut}
                clearTaskList={clearTaskList}
                openTask={openTask}
            />,
        );

        screen.getByText('Sign Out').click();

        // Assert.
        expect(signOut).toHaveBeenCalledTimes(1);
        expect(clearTaskList).toHaveBeenCalledTimes(1);
    });

    it('TaskPanel openTask event is called', () => {
        // Arrange.
        // Act.
        render(
            <TaskPanel
                user={user}
                signOut={signOut}
                clearTaskList={clearTaskList}
                openTask={openTask}
            />,
        );

        screen.getByText('Create').click();

        // Assert.
        expect(openTask).toHaveBeenCalledTimes(1);
    });
});
