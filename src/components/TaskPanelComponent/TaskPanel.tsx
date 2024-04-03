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
        <div className="flex w-screen justify-start sticky top-0 space-x-3 bg-white solid border-gray-400 border-b-2">
            {user && (
                <>
                    <div className="flex w-2/4 justify-start items-center float-left">
                        <div className="ml-2">
                            <p className="font-semibold">{user?.displayName}</p>
                            <p className="text-sm">{user?.email}</p>
                            <button
                                onClick={() => signOutUser()}
                                className="mt-2"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                    <div className="flex w-2/4 justify-end">
                        <button
                            onClick={() => openTask(null)}
                            className="size-20 my-2 mr-2 p-1 bg-gray-300 rounded-md"
                        >
                            Create
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
