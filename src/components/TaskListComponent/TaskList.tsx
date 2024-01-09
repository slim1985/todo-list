import { Task } from '../../types/task';

export interface TaskListProps {
    tasks: Task[];
    setActualTaskId: React.Dispatch<React.SetStateAction<string>>;
}

export function TaskList({
    tasks,
    setActualTaskId,
}: TaskListProps): JSX.Element {
    return (
        <div className="flex flex-wrap justify-center mt-3">
            {tasks.map(({ id, title }: Task) => (
                <div
                    key={id}
                    onClick={() => setActualTaskId(id)}
                    className="flex size-36 m-1 p-2 justify-center items-center bg-orange-200 rounded-lg"
                >
                    {title}
                </div>
            ))}
        </div>
    );
}
