import React from 'react';
import { Spinner } from '../SpinnerComponent/Spinner';
import { Task, TaskStates, TaskStateLabels } from '../../types/task';
import { StateStatus } from '../../store/stateStatus';

enum ControlNames {
    Title = 'title',
    Description = 'description',
    Status = 'status',
}

export interface TaskFormProps {
    task: Task | null;
    stateStatus: StateStatus;
    hideTaskForm: () => void;
    createTask: (
        title: string,
        description: string,
        status: TaskStates,
    ) => void;
    updateTask: (
        id: string,
        title: string,
        description: string,
        status: TaskStates,
    ) => void;
    deleteTask: (taskId: string) => void;
}

export function TaskForm({
    task,
    stateStatus,
    hideTaskForm,
    createTask,
    updateTask,
    deleteTask,
}: TaskFormProps): JSX.Element {
    const [currentTask, setCurrentTask] = React.useState<Task>({
        id: task?.id ?? '',
        status: task?.status ?? TaskStates.NEW,
        title: task?.title ?? 'Title',
        description: task?.description ?? 'Description',
    });

    function onTaskChange(
        event:
            | React.ChangeEvent<HTMLSelectElement>
            | React.ChangeEvent<HTMLTextAreaElement>,
    ): void {
        const { name, value } = event.target;

        setCurrentTask({
            ...currentTask,
            [name]: value,
        });
    }

    function onSaveClick(): void {
        if (!currentTask.id) {
            createTask(
                currentTask.title,
                currentTask.description,
                currentTask.status,
            );
        } else {
            updateTask(
                currentTask.id,
                currentTask.title,
                currentTask.description,
                currentTask.status,
            );
        }
    }

    function onDeleteTaskClick(): void {
        deleteTask(currentTask.id);
    }

    return (
        <div className="flex justify-center items-center z-10 fixed h-full w-full overflow-hidden bg-black/[.5]">
            {stateStatus === StateStatus.LOADING && <Spinner />}
            <div className="task-form flex flex-col flex-nowrap bg-white bg-gray-300 rounded-md">
                {stateStatus === StateStatus.FAILED && (
                    <div className="text-center text-3xl m-1 text-red-500">
                        Failed to save task. Check internet connection and try
                        it again.
                    </div>
                )}
                <select
                    className="text-3xl m-1"
                    name={ControlNames.Status}
                    value={currentTask.status}
                    onChange={(e) => onTaskChange(e)}
                >
                    {Object.keys(TaskStates).map((state, index) => (
                        <option key={index} value={index}>
                            {TaskStateLabels[Object.values(TaskStates)[index]]}
                        </option>
                    ))}
                </select>
                <textarea
                    className="h-24 border-solid border-2 border-yellow-200 rounded m-1 p-1"
                    name={ControlNames.Title}
                    value={currentTask.title}
                    onChange={(e) => onTaskChange(e)}
                ></textarea>
                <textarea
                    className="h-full border-solid border-2 border-yellow-200 rounded m-1 p-1"
                    name={ControlNames.Description}
                    value={currentTask.description}
                    onChange={(e) => onTaskChange(e)}
                ></textarea>
                <div className="flex justify-center my-5 mx-3 space-x-7">
                    <button
                        onClick={() => onSaveClick()}
                        className="size-20 p-1 bg-green-300 rounded-md"
                    >
                        Save
                    </button>
                    <button
                        onClick={() => hideTaskForm()}
                        className="size-20 p-1 bg-yellow-300 rounded-md"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onDeleteTaskClick()}
                        className="size-20 p-1 bg-red-300 rounded-md"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
