import { useState, useEffect } from 'react';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { User } from '../types/user';
import { firebaseApp } from '../services/firebaseApp';
import { authService } from '../services/authService';

export function useAuth(): {
    isAuthenticated: boolean;
    user: User | null;
    authenticate: () => void;
    signOut: () => void;
} {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const auth = getAuth(firebaseApp);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
                setUser({
                    id: user.uid,
                    displayName: user.displayName || '',
                    email: user.email || '',
                });
            } else {
                setUser(null);
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

    return { isAuthenticated, user, authenticate, signOut };
}
