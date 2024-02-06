import { TaskListMemo } from '../TaskListComponent/TaskList';
import { TaskForm } from '../TaskFormComponent/TaskForm';
import { useTasks } from '../../hooks/useTasks';

export function TaskContainer(): JSX.Element {
    const [
        taskList,
        showTaskForm,
        selectedTask,
        hideTaskForm,
        createTask,
        updateTask,
        deleteTask,
        openTask,
    ] = useTasks();

    return (
        <div className="flex">
            <TaskListMemo taskList={taskList} openTask={openTask} />
            {showTaskForm && (
                <TaskForm
                    task={selectedTask}
                    hideTaskForm={hideTaskForm}
                    createTask={createTask}
                    updateTask={updateTask}
                    deleteTask={deleteTask}
                />
            )}
        </div>
    );
}
