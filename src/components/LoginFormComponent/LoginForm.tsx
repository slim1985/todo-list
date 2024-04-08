export interface LoginFormProps {
    authenticate: () => void;
}

export function LoginForm({ authenticate }: LoginFormProps): JSX.Element {
    return (
        <div>
            <h1 className="text-center text-2xl retina:text-7xl mt-7 retina:mt-16 text-gray-600">
                Please Sign-In
            </h1>
            <div className="flex w-full justify-center mt-14 retina:mt-28">
                <button
                    className="border-solid border-gray-400 border-2 retina:border-4 py-2 retina:py-6 px-2 retina:px-6 rounded-lg retina:rounded-3xl retina:text-7xl"
                    onClick={authenticate}
                >
                    Sign-in by Google
                </button>
            </div>
        </div>
    );
}
