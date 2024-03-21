import { useAuth } from './hooks/useAuth';
import { Authentication } from './components/AuthenticationComponent/Authentication';
import { TaskContainer } from './components/TaskContainerComponent/TaskContainer';
import './index.css';

export default function App(): JSX.Element {
    const { isAuthenticated, userName, authenticate, signOut } = useAuth();

    if (!isAuthenticated) {
        return <Authentication authenticate={authenticate} />;
    } else {
        return <TaskContainer userName={userName} signOut={signOut} />;
    }
}
