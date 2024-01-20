import React from 'react';
import { Task } from '../../types/task';
import { TaskHelper } from '../../helpers/taskHelper';

export interface TaskCardProps {
    task: Task;
    onClick: (id: string) => void;
}

export function TaskCard({
    task: { id, title, description, status },
    onClick,
}: TaskCardProps): JSX.Element {
    return (
        <div
            onClick={() => onClick(id)}
            className="flex flex-col flex-nowrap w-64 h-48 m-1 p-2 items-stretch justify-left cursor-pointer border-solid border-2 border-gray-400 rounded-lg"
        >
            <div className="w-full font-bold">{title}</div>
            <div className="w-full h-screen py-2 overflow-hidden text-ellipsis text-sm">
                {description}
            </div>
            <div className="w-full text-center font-bold">
                {TaskHelper.getTaskStateLabel(status)}
            </div>
        </div>
    );
}
