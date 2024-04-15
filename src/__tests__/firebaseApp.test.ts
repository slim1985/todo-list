import { FirebaseApp, FirebaseOptions } from 'firebase/app';

const firebaseAppFake: FirebaseApp = {
    name: 'firebaseApp',
    options: {},
    automaticDataCollectionEnabled: false,
};

jest.mock('firebase/app', () => {
    return {
        initializeApp: jest.fn().mockImplementation(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            (options: FirebaseOptions, name?: string): FirebaseApp => {
                return firebaseAppFake;
            },
        ),
    };
});

describe('firebaseApp', () => {
    it('should initialize the app', () => {
        // Arrange
        // Act

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { firebaseApp } = require('../services/firebaseApp');

        // Assert
        expect(firebaseApp).toBeDefined();
        expect(firebaseApp).toEqual(firebaseAppFake);
    });
});
