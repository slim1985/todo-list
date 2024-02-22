import { TaskContainer } from './components/TaskContainerComponent/TaskContainer';
import { useTaskDispatch } from './store/useTaskDispatch';
import { getTasksAsync } from './store/taskSlice';
import './index.css';

export default function App(): JSX.Element {
    const dispatch = useTaskDispatch();
    dispatch(getTasksAsync(null));

    return <TaskContainer />;
}
