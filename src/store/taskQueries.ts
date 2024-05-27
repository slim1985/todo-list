import { useQuery } from '@tanstack/react-query';
import { taskService } from '../services/taskService';
import { Task } from '../types/task';
//import { StateStatus } from '../types/stateStatus';

//const queryClient = useQueryClient();

function getTasksAsync(): Task[] {
    const query = useQuery({
        queryKey: ['getTasks'],
        queryFn: () => taskService.getTasks(),
    });

    return query.data ?? [];
}

export { getTasksAsync };
