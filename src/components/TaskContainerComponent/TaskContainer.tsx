import { TaskListMemo } from '../TaskListComponent/TaskList';
import { TaskForm } from '../TaskFormComponent/TaskForm';
import { useTasks } from '../../hooks/useTasks';

export interface TaskContainerProps {
    userName: string;
    signOut: () => void;
}

export function TaskContainer({
    userName,
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
    ] = useTasks();

    return (
        <div className="flex">
            <TaskListMemo
                taskList={taskList}
                userName={userName}
                signOut={signOut}
                openTask={openTask}
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
