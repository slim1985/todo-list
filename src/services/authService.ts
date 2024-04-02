import {
    Auth,
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
} from 'firebase/auth';
import { firebaseApp } from '../services/firebaseApp';

export class AuthService {
    public get firebaseAuth(): Auth {
        return this._firebaseAuth;
    }

    private _firebaseAuth: Auth;
    private googleAuthProvider: GoogleAuthProvider;

    public get currentUserId(): string | null {
        return this.firebaseAuth.currentUser?.uid || null;
    }

    constructor() {
        this._firebaseAuth = getAuth(firebaseApp);
        this.googleAuthProvider = new GoogleAuthProvider();
    }

    authenticate(): void {
        if (this.firebaseAuth.currentUser) {
            console.warn('Already authenticated. Please sign out first.');
            return;
        }

        signInWithPopup(this.firebaseAuth, this.googleAuthProvider).catch(
            (error) => {
                console.error(`Authentication error: ${error}`);
            },
        );
    }

    signOut(): void {
        if (!this.firebaseAuth.currentUser) {
            console.warn('Already signed out. Please authenticate first.');
            return;
        }

        signOut(this.firebaseAuth).catch((error) => {
            console.error(`Sign-out error: ${error}`);
        });
    }
}

export const authService = new AuthService();
