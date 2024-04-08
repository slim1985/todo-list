import { memo } from 'react';
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
            className="flex flex-col flex-nowrap w-64 md:w-96 retina:w-4/12 h-48 md:h-64 retina:h-192 m-1 retina:m-4 p-2 retina:p-8 items-stretch justify-left cursor-pointer border-solid border-2 retina:border-4 border-gray-400 rounded-lg retina:rounded-3xl"
        >
            <h2 className="w-full font-bold retina:text-6xl">{title}</h2>
            <p className="w-full h-screen py-2 retina:py-8 overflow-hidden text-ellipsis text-sm retina:text-6xl">
                {description}
            </p>
            <p className="w-full font-bold retina:text-6xl">
                Task state:{' '}
                <span className={TaskStateColors[status]}>
                    {TaskStateLabels[status]}
                </span>
            </p>
        </div>
    );
}

export const TaskCardMemo = memo(TaskCard, (prevProps, nextProps) => {
    if (
        prevProps.task.id === nextProps.task.id &&
        prevProps.task.status === nextProps.task.status &&
        prevProps.task.title === nextProps.task.title &&
        prevProps.task.description === nextProps.task.description
    ) {
        return true;
    }

    return false;
});
