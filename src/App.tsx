import { useAuth } from './hooks/useAuth';
import { LoginForm } from './components/LoginFormComponent/LoginForm';
import { AppContainer } from './components/AppContainerComponent/AppContainer';
import './index.css';

export default function App(): JSX.Element {
    const { isAuthenticated, user, authenticate, signOut } = useAuth();

    if (!isAuthenticated) {
        return <LoginForm authenticate={authenticate} />;
    } else {
        return <AppContainer user={user} signOut={signOut} />;
    }
}
