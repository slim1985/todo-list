import { Provider } from 'react-redux';
import { store } from './store/store';
import { useAuth } from './hooks/useAuth';
import { LoginForm } from './components/LoginFormComponent/LoginForm';
import { AppContainer } from './components/AppContainerComponent/AppContainer';

export default function App(): JSX.Element {
    const { isAuthenticated, user, authenticate, signOut } = useAuth();

    return (
        <Provider store={store}>
            {isAuthenticated ? (
                <AppContainer user={user} signOut={signOut} />
            ) : (
                <LoginForm authenticate={authenticate} />
            )}
        </Provider>
    );
}
