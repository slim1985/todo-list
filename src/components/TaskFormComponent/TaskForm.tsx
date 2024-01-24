import React from 'react';
import { Task, TaskStates } from '../../types/task';
import { TaskHelper } from '../../helpers/taskHelper';

export interface TaskFormProps {
    task: Task;
    setShowTaskForm: React.Dispatch<React.SetStateAction<boolean>>;
    saveTask: (
        id: string,
        title: string,
        description: string,
        status: TaskStates,
    ) => void;
    deleteTask: (taskId: string) => void;
}

export function TaskForm({
    task,
    setShowTaskForm,
    saveTask,
    deleteTask,
}: TaskFormProps): JSX.Element {
    const {
        status: initialStatus,
        title: initialTitle,
        description: initialDescription,
    } = task;
    const [status, setSelectedStatus] = React.useState(initialStatus);
    const [title, setTitle] = React.useState<string>(initialTitle);
    const [description, setDescription] =
        React.useState<string>(initialDescription);

    function onChangeStatus(event: React.ChangeEvent<HTMLSelectElement>): void {
        setSelectedStatus(+event.target.value);
    }

    function onTitleChange(
        event: React.ChangeEvent<HTMLTextAreaElement>,
    ): void {
        setTitle(event.target.value);
    }

    function onDescriptionChange(
        event: React.ChangeEvent<HTMLTextAreaElement>,
    ): void {
        setDescription(event.target.value);
    }

    function onSaveClick(): void {
        setShowTaskForm(false);
        saveTask(task.id, title, description, status);
    }

    function onDeleteTaskClick(): void {
        deleteTask(task.id);
        setShowTaskForm(false);
    }

    return (
        <div className="flex justify-center items-center z-10 fixed h-full w-full overflow-hidden bg-black/[.5]">
            <div className="task-form flex flex-col flex-nowrap bg-white bg-gray-300 rounded-md">
                <select
                    className="text-3xl m-1"
                    value={status}
                    onChange={(e) => onChangeStatus(e)}
                >
                    {Object.keys(TaskStates).map((state, index) => (
                        <option key={index} value={state}>
                            {TaskHelper.getTaskStateLabel(index)}
                        </option>
                    ))}
                </select>
                <textarea
                    className="h-24 border-solid border-2 border-yellow-200 rounded m-1 p-1"
                    value={title}
                    onChange={(e) => onTitleChange(e)}
                ></textarea>
                <textarea
                    className="h-full border-solid border-2 border-yellow-200 rounded m-1 p-1"
                    value={description}
                    onChange={(e) => onDescriptionChange(e)}
                ></textarea>
                <div className="flex justify-center my-5 mx-3 space-x-7">
                    <button
                        onClick={() => onSaveClick()}
                        className="size-20 p-1 bg-green-300 rounded-md"
                    >
                        Save
                    </button>
                    <button
                        onClick={() => setShowTaskForm(false)}
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
