import React from 'react';
import { Task, TaskStates } from '../../types/task';

export interface TaskViewProps {
    task: Task;
    taskList: Task[];
    setShowTaskView: React.Dispatch<React.SetStateAction<string>>;
    setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
}

export function TaskView({
    task,
    taskList,
    setShowTaskView,
    setTaskList,
}: TaskViewProps): JSX.Element {
    const [selectedStatus, setSelectedStatus] = React.useState<TaskStates>(
        task.status,
    );
    const [title, setTitle] = React.useState<string>(task.title);
    const [description, setDescription] = React.useState<string>(
        task.description,
    );

    function onChangeStatus(event: React.ChangeEvent<HTMLSelectElement>): void {
        setSelectedStatus(
            TaskStates[
                event.target.value.toString() as keyof typeof TaskStates
            ],
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
        const tasks = taskList.map((obj) => ({ ...obj }));
        const index = tasks.findIndex((f) => f.id === task.id);

        tasks[index].status = selectedStatus;
        tasks[index].title = title;
        tasks[index].description = description;

        setTaskList(tasks);
        setShowTaskView('');
    }

    function deleteTask(): void {
        const tasks = taskList.map((obj) => ({ ...obj }));

        setTaskList(tasks.filter((f) => f.id !== task.id));
        setShowTaskView('');
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
                    <select
                        value={selectedStatus}
                        onChange={(e) => onChangeStatus(e)}
                    >
                        {Object.keys(TaskStates).map((state, index) => (
                            <option key={index} value={state}>
                                {state}
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
                    onClick={() => setShowTaskView('')}
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
