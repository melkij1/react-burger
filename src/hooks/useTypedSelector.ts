import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../services/reducers';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
