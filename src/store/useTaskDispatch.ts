import { useDispatch } from 'react-redux';
import { AppDispatch } from './store';

export const useTaskDispatch = useDispatch.withTypes<AppDispatch>();
