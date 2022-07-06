import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { WS_USER_CONNECTION_START } from '../../services/actions/ws/types';
export const ProfileOrder = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: WS_USER_CONNECTION_START });
  }, []);

  return (
    <div>
      <div className="">ProfileOrder</div>
    </div>
  );
};
