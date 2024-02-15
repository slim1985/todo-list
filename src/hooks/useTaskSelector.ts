import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export const useTaskSelector = useSelector.withTypes<RootState>();
