describe('authService', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    it('should return currentUserId', () => {
        // Arrange
        jest.doMock('firebase/auth', () => {
            return {
                getAuth: jest.fn().mockReturnValue({
                    currentUser: {
                        uid: '1',
                    },
                }),
                GoogleAuthProvider: jest.fn(),
            };
        });

        // Act
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { authService } = require('../services/authService');

        // Assert
        expect(authService.currentUserId).toBe('1');
    });

    it('should authenticate', () => {
        // Arrange
        const signInWithPopup = jest.fn().mockResolvedValue({});
        jest.doMock('firebase/auth', () => {
            return {
                getAuth: jest.fn().mockReturnValue({
                    currentUser: null,
                }),
                GoogleAuthProvider: jest.fn(),
                signInWithPopup: signInWithPopup,
            };
        });

        // Act
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { authService } = require('../services/authService');
        authService.authenticate();

        // Assert
        expect(signInWithPopup).toHaveBeenCalled();
    });

    it('should sign out', () => {
        // Arrange
        const signOut = jest.fn().mockResolvedValue({});
        jest.doMock('firebase/auth', () => {
            return {
                getAuth: jest.fn().mockReturnValue({
                    currentUser: {
                        uid: '1',
                    },
                }),
                GoogleAuthProvider: jest.fn(),
                signOut: signOut,
            };
        });

        // Act
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { authService } = require('../services/authService');
        authService.signOut();

        // Assert
        expect(signOut).toHaveBeenCalled();
    });
});
