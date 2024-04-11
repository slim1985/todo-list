import { User } from '../../types/user';

export interface TaskPanelProps {
    user: User | null;
    signOut: () => void;
    clearTaskList: () => void;
    openTask: (taskId: string | null) => void;
}

export function TaskPanel({
    user,
    signOut,
    clearTaskList,
    openTask,
}: TaskPanelProps): JSX.Element {
    function signOutUser(): void {
        signOut();
        clearTaskList();
    }

    return (
        <div className="flex justify-start sticky top-0 space-x-3 bg-white solid border-gray-400 border-b-2 retina:border-b-4">
            {user && (
                <>
                    <div className="flex w-2/4 justify-start items-center float-left">
                        <div className="ml-2 retina:ml-6">
                            <p className="font-semibold retina:text-5xl">
                                {user?.displayName}
                            </p>
                            <p className="retina:mt-3 text-sm retina:text-5xl">
                                {user?.email}
                            </p>
                            <button
                                onClick={() => signOutUser()}
                                className="mt-2 retina:mt-5 retina:text-5xl"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                    <div className="flex w-2/4 justify-end">
                        <button
                            onClick={() => openTask(null)}
                            className="size-20 retina:size-52 my-2 retina:my-4 mr-2 retina:mr-5 p-1 retina:text-5xl bg-gray-300 rounded-md retina:rounded-3xl"
                        >
                            Create
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
