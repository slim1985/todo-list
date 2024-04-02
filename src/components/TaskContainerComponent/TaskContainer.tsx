import { TaskForm } from '../TaskFormComponent/TaskForm';
import { TaskList } from '../TaskListComponent/TaskList';
import { StateStatus } from '../../types/stateStatus';
import { Task } from '../../types/task';
import { TaskStates } from '../../types/task';

export interface TaskContainerProps {
    taskList: Task[];
    stateStatus: StateStatus;
    showTaskForm: boolean;
    selectedTask: Task | null;
    hideTaskForm: () => void;
    createTask: (
        title: string,
        description: string,
        status: TaskStates,
    ) => void;
    updateTask: (
        id: string,
        title: string,
        description: string,
        status: TaskStates,
    ) => void;
    deleteTask: (taskId: string) => void;
    openTask: (taskId: string | null) => void;
}

export function TaskContainer({
    taskList,
    stateStatus,
    showTaskForm,
    selectedTask,
    hideTaskForm,
    createTask,
    updateTask,
    deleteTask,
    openTask,
}: TaskContainerProps): JSX.Element {
    return (
        <div className="flex justify-center">
            <div>
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
