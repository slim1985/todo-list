import React from 'react';
import { Task, TaskStates } from '../../types/task';

export interface TaskActionsProps {
    tasks: Task[];
    setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
    setActualTaskId: React.Dispatch<React.SetStateAction<string>>;
}

export function TaskActions({
    tasks,
    setTaskList,
    setActualTaskId,
}: TaskActionsProps): JSX.Element {
    function createTask(): void {
        const newTask: Task = {
            id: (tasks.length + 1).toString(),
            title: 'Title',
            description: 'Description',
            status: TaskStates.NEW,
        };

        setTaskList([...tasks, newTask]);
        setActualTaskId(newTask.id);
    }
    return (
        <div className="flex justify-end space-x-3">
            <button
                onClick={() => createTask()}
                className="size-14 my-2 mr-2 p-1 bg-green-400 rounded-md"
            >
                Create
            </button>
        </div>
    );
}
