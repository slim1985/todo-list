import { useState } from 'react';
import { Task, TaskStates } from '../../types/task';
import { TaskCardMemo } from '../TaskCardComponent/TaskCard';
import { TaskForm } from '../TaskFormComponent/TaskForm';

export interface TaskListPanelProps {
    taskList: Task[];
    saveTask: (
        id: string,
        title: string,
        description: string,
        status: TaskStates,
    ) => void;
    deleteTask: (taskId: string) => void;
}

export function TaskList({
    taskList,
    saveTask,
    deleteTask,
}: TaskListPanelProps): JSX.Element {
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task>();

    function openTaskDetails(id: string): void {
        const task = taskList.find((task) => task.id === id)!;
        setSelectedTask(task);
        setShowTaskForm(true);
    }

    function createTask(): void {
        const newTask: Task = {
            id: '',
            title: 'Title',
            description: 'Description',
            status: TaskStates.NEW,
        };

        setSelectedTask(newTask);
        setShowTaskForm(true);
    }

    return (
        <>
            <div>
                <div className="flex justify-end sticky top-0 space-x-3 bg-white solid border-gray-400 border-b-2">
                    <button
                        onClick={() => createTask()}
                        className="size-20 my-2 mr-2 p-1 bg-gray-300 rounded-md"
                    >
                        Create
                    </button>
                </div>
                <div className="flex flex-wrap justify-center mt-3">
                    {taskList.map((task: Task, index: number) => (
                        <TaskCardMemo
                            key={index}
                            task={task}
                            onClick={openTaskDetails}
                        />
                    ))}
                </div>
            </div>
            {showTaskForm && (
                <TaskForm
                    task={selectedTask!}
                    setShowTaskForm={setShowTaskForm}
                    saveTask={saveTask}
                    deleteTask={deleteTask}
                />
            )}
        </>
    );
}
