import { Task } from '../../types/task';

export interface TaskListProps {
    tasks: Task[];
    setShowTaskView: React.Dispatch<React.SetStateAction<string>>;
}

export function TaskList({
    tasks,
    setShowTaskView,
}: TaskListProps): JSX.Element {
    return (
        <div className="flex flex-wrap justify-center mt-3">
            {tasks.map((task: Task) => (
                <div
                    key={task.id}
                    onClick={() => setShowTaskView(task.id)}
                    className="flex size-36 m-1 p-2 justify-center items-center bg-orange-200 rounded-lg"
                >
                    {task.title}
                </div>
            ))}
        </div>
    );
}
