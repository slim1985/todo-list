import { User } from '../../types/user';
import { TaskList } from '../TaskListComponent/TaskList';
import { TaskForm } from '../TaskFormComponent/TaskForm';
import { TaskPanel } from '../TaskPanelComponent/TaskPanel';
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
            <div>
                <TaskPanel
                    user={user}
                    signOut={signOut}
                    clearTaskList={clearTaskList}
                    openTask={openTask}
                />
                <TaskList taskList={taskList} openTask={openTask} />
            </div>
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
