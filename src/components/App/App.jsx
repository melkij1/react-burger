import React, { useEffect, useCallback } from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useActions } from "../../hooks/useActions";
import AppHeader from "../AppHeader/AppHeader";
import AppMain from "../AppMain/AppMain";
function App() {
  const dispatch = useDispatch();
  const { getIngredients} = useActions();
  const { error, ingredientSelect } = useSelector(
    store => store.ingredientsState
  );
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
