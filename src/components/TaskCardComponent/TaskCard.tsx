import { memo } from 'react';
import isEqual from 'lodash.isequal';
import { Task, TaskStateLabels, TaskStateColors } from '../../types/task';

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
            <h2 className="w-full font-bold">{title}</h2>
            <p className="w-full h-screen py-2 overflow-hidden text-ellipsis text-sm">
                {description}
            </p>
            <p className="w-full font-bold">
                Task state:{' '}
                <span className={TaskStateColors[status]}>
                    {TaskStateLabels[status]}
                </span>
            </p>
        </div>
    );
}

export const TaskCardMemo = memo(TaskCard, (prevProps, nextProps) => {
    return isEqual(prevProps.task, nextProps.task);
});
