import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuth } from './hooks/useAuth';
import { LoginForm } from './components/LoginFormComponent/LoginForm';
import { AppContainer } from './components/AppContainerComponent/AppContainer';

export default function App(): JSX.Element {
    const { isAuthenticated, user, authenticate, signOut } = useAuth();
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            {isAuthenticated ? (
                <AppContainer user={user} signOut={signOut} />
            ) : (
                <LoginForm authenticate={authenticate} />
            )}
        </QueryClientProvider>
    );
}
