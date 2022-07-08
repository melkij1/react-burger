import React, { useEffect, useCallback } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useActions } from '../../hooks/useActions';
import AppHeader from '../AppHeader/AppHeader';
import AppMain from '../AppMain/AppMain';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Cookies from 'js-cookie';
function App() {
  const { getIngredients, setUserAuth } = useActions();
  const { error } = useTypedSelector((store) => store.ingredientsState);
  const fetchData = useCallback(async () => {
    await getIngredients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    fetchData();
    //react-hooks/exhaustive-deps
    if (Cookies.get('accessToken')) {
      setUserAuth(true);
    }
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
