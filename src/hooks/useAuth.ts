import { useState, useEffect } from 'react';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { firebaseApp } from '../services/firebaseApp';
import { authService } from '../services/authService';

export function useAuth(): {
    isAuthenticated: boolean,
    userName: string,
    authenticate: () => void,
    signOut: () => void,
} {
    const [userName, setUserName] = useState<string>('');
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const auth = getAuth(firebaseApp);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserName(user.displayName!);
                setIsAuthenticated(true);
            } else {
                setUserName('');
                setIsAuthenticated(false);
            }
        });
    }, []);

    function authenticate(): void {
        authService.authenticate();
    }

    function signOut(): void {
        authService.signOut();
    }

    return { isAuthenticated, userName, authenticate, signOut };
}
