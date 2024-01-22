import { useState } from 'react';
import { Task, TaskStates } from '../../types/task';
import { TaskCard } from '../TaskCardComponent/TaskCard';
import { TaskForm } from '../TaskFormComponent/TaskForm';

export interface TaskListPanelProps {
    tasks: Task[];
}

export function TaskList({ tasks }: TaskListPanelProps): JSX.Element {
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task>();
    const [taskList, setTaskList] = useState<Task[]>([...tasks]);

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

    function openTaskDetails(id: string): void {
        const task = taskList.find((task) => task.id === id)!;
        setSelectedTask(task);
        setShowTaskForm(true);
    }

    function saveTask(task: Task): void {
        const newTaskList = [...taskList].map((task) => ({ ...task }));

        if (!task.id) {
            let id: number = newTaskList.length + 1;
            while (newTaskList.find((f) => f.id === id.toString())) {
                id++;
            }
            task.id = id.toString();
            newTaskList.push(task);
        } else {
            const index = newTaskList.findIndex((f) => f.id === task.id);

            newTaskList[index].title = task.title;
            newTaskList[index].description = task.description;
            newTaskList[index].status = task.status;
        }

        setTaskList(newTaskList);
    }

    function deleteTask(taskId: string): void {
        const newTaskList = [...taskList];
        setTaskList(newTaskList.filter((f) => f.id !== taskId));
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
                        <TaskCard
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
