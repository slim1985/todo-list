import React from 'react';
import { Task, TaskStates } from '../../types/task';

export interface TaskActionsProps {
    tasks: Task[];
    setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
    setShowTaskView: React.Dispatch<React.SetStateAction<string>>;
}

export function TaskActions({
    tasks,
    setTaskList,
    setShowTaskView,
}: TaskActionsProps): JSX.Element {
    function createTask(): void {
        const newTaskList = tasks.map((obj) => ({ ...obj }));
        const newTask: Task = {
            id: (newTaskList.length + 1).toString(),
            title: 'Title',
            description: 'Description',
            status: TaskStates.new,
        };

        newTaskList.push(newTask);

        setTaskList(newTaskList);
        setShowTaskView(newTask.id);
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
