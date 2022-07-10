import React, { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { useAppDispatch } from '../services';
import { allActionCreators } from '../services/actions/index';

export const useActions = () => {
  const dispatch = useAppDispatch();
  const bindActions = useMemo(() => {
    return bindActionCreators(allActionCreators, dispatch);
  }, [dispatch]);
  return bindActions;
};
