import { TaskListMemo } from '../TaskListComponent/TaskList';
import { TaskForm } from '../TaskFormComponent/TaskForm';
import { useTasks } from '../../hooks/useTasks';

export function TaskContainer(): JSX.Element {
    const [
        taskList,
        stateStatus,
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
                    stateStatus={stateStatus}
                    hideTaskForm={hideTaskForm}
                    createTask={createTask}
                    updateTask={updateTask}
                    deleteTask={deleteTask}
                />
            )}
        </div>
    );
}
