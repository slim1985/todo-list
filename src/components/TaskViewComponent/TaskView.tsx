import React from 'react';
import { Task, TaskStates } from '../../types/task';

export interface TaskViewProps {
    task: Task;
    taskList: Task[];
    setActualTaskId: React.Dispatch<React.SetStateAction<string>>;
    setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
}

export function TaskView({
    task,
    taskList,
    setActualTaskId,
    setTaskList,
}: TaskViewProps): JSX.Element {
    const {
        status: initialStatus,
        title: initialTitle,
        description: initialDescription,
    } = task;
    const [status, setSelectedStatus] =
        React.useState<TaskStates>(initialStatus);
    const [title, setTitle] = React.useState<string>(initialTitle);
    const [description, setDescription] =
        React.useState<string>(initialDescription);

    function onChangeStatus(event: React.ChangeEvent<HTMLSelectElement>): void {
        setSelectedStatus(
            event.target.value as React.SetStateAction<TaskStates>,
        );
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

    function saveTask(): void {
        const tasks = [...taskList];
        const index = tasks.findIndex((f) => f.id === task.id);

        tasks[index].status = status;
        tasks[index].title = title;
        tasks[index].description = description;

        setTaskList(tasks);
        setActualTaskId('');
    }

    function deleteTask(): void {
        const tasks = [...taskList];

        setTaskList(tasks.filter((f) => f.id !== task.id));
        setActualTaskId('');
    }

    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-col h-full self-stretch">
                <textarea
                    className="h-1/6 border-solid border-2 border-yellow-400 rounded m-1 p-1"
                    value={title}
                    onChange={(e) => onTitleChange(e)}
                ></textarea>
                <textarea
                    className="h-5/6 border-solid border-2 border-yellow-400 rounded m-1 p-1"
                    value={description}
                    onChange={(e) => onDescriptionChange(e)}
                ></textarea>
                <label className="m-1">
                    State:
                    <select value={status} onChange={(e) => onChangeStatus(e)}>
                        {Object.keys(TaskStates).map((state, index) => (
                            <option key={index} value={state}>
                                {Object.values(TaskStates)[index]}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <div className="flex self-stretch self-end justify-center my-5 space-x-3">
                <button
                    onClick={() => saveTask()}
                    className="my-2 p-1 bg-green-400 rounded-md"
                >
                    Save
                </button>
                <button
                    onClick={() => setActualTaskId('')}
                    className="my-2 p-1 bg-yellow-400 rounded-md"
                >
                    Cancel
                </button>
                <button
                    onClick={() => deleteTask()}
                    className="my-2 p-1 bg-red-400 rounded-md"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
