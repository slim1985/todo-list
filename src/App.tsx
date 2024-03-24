import { useAuth } from './hooks/useAuth';
import { LoginForm } from './components/LoginFormComponent/LoginForm';
import { TaskContainer } from './components/TaskContainerComponent/TaskContainer';
import './index.css';

export default function App(): JSX.Element {
    const { isAuthenticated, user, authenticate, signOut } = useAuth();

    if (!isAuthenticated) {
        return <LoginForm authenticate={authenticate} />;
    } else {
        return <TaskContainer user={user} signOut={signOut} />;
    }
}
