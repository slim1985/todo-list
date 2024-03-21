export interface AuthenticationProps {
    authenticate: () => void;
}

export function Authentication({
    authenticate,
}: AuthenticationProps): JSX.Element {
    return (
        <div>
            <h1 className="text-center text-2xl mt-7 text-gray-600">
                Please Sign-In
            </h1>
            <div className="flex w-screen justify-center mt-14">
                <button
                    className="border-solid border-gray-400 border-2 py-2 px-2 rounded-lg"
                    onClick={authenticate}
                >
                    Sign-in by Google
                </button>
            </div>
        </div>
    );
}
