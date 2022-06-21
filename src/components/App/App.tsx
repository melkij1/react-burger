import React, { useEffect, useCallback } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useActions } from '../../hooks/useActions';
import AppHeader from '../AppHeader/AppHeader';
import AppMain from '../AppMain/AppMain';
import { useTypedSelector } from '../../hooks/useTypedSelector';
function App() {
  const dispatch = useDispatch();
  const { getIngredients } = useActions();
  const { error } = useTypedSelector((store) => store.ingredientsState);
  const fetchData = useCallback(async () => {
    await getIngredients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <Router>
        <AppHeader />
        {!error && <AppMain />}
      </Router>
    </div>
  );
}

export default App;
