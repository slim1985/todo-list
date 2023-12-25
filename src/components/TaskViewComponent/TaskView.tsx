import React from 'react';
import { Task, TaskStates } from '../../types/task';

export interface TaskViewProps {
    task: Task;
    setShowTaskView: React.Dispatch<React.SetStateAction<string>>;
}

export function TaskView({
    task,
    setShowTaskView,
}: TaskViewProps): JSX.Element {
    console.log(task);
    return (
        <form method="post" onSubmit={handleSubmit}>
            <div className="">
                <input type="text" value={task.title} />
                <textarea value={task.description}></textarea>
                <label>
                    State:
                    <select value={task.state}>
                        {Object.keys(TaskStates).map((state, index) => (
                            <option key={index} value={state}>
                                {state}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <div className="flex justify-center space-x-3">
                <button
                    onClick={() => console.log('Save pressed')}
                    className="my-2 p-1 bg-green-400 rounded-md"
                >
                    Save
                </button>
                <button
                    onClick={() => setShowTaskView('')}
                    className="my-2 p-1 bg-red-400 rounded-md"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}

function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    console.log(event);
}
