import { getTasksAsync } from '../../store/taskQueries';
import { useTasks } from '../../hooks/useTasks';
import { TaskContainer } from '../../components/TaskContainerComponent/TaskContainer';
import { TaskPanel } from '../../components/TaskPanelComponent/TaskPanel';
import { User } from '../../types/user';

export interface AppContainerProps {
    user: User | null;
    signOut: () => void;
}

export function AppContainer({
    user,
    signOut,
}: AppContainerProps): JSX.Element {
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

    console.log(taskList);
    const taskList1 = getTasksAsync();

    return (
        <div>
            {!showTaskForm && (
                <TaskPanel
                    user={user}
                    signOut={signOut}
                    clearTaskList={clearTaskList}
                    openTask={openTask}
                />
            )}
            <TaskContainer
                taskList={taskList1}
                stateStatus={stateStatus}
                showTaskForm={showTaskForm}
                selectedTask={selectedTask}
                hideTaskForm={hideTaskForm}
                createTask={createTask}
                updateTask={updateTask}
                deleteTask={deleteTask}
                openTask={openTask}
            />
        </div>
    );
}
