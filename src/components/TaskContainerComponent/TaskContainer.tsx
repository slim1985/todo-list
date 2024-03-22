import { User } from '../../types/user';
import { TaskListMemo } from '../TaskListComponent/TaskList';
import { TaskForm } from '../TaskFormComponent/TaskForm';
import { useTasks } from '../../hooks/useTasks';

export interface TaskContainerProps {
    user: User | null;
    signOut: () => void;
}

export function TaskContainer({
    user,
    signOut,
}: TaskContainerProps): JSX.Element {
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
        clearTaskList,
    ] = useTasks();

    return (
        <div className="flex">
            <TaskListMemo
                taskList={taskList}
                user={user}
                signOut={signOut}
                openTask={openTask}
                clearTaskList={clearTaskList}
            />
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
