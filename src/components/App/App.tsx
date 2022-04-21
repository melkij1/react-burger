import React from "react";
import AppHeader from "../AppHeader/AppHeader";

import { useEffect, useState, useCallback } from "react";
import Main from "../Main/Main";
// import { data } from "../../utils/data";
// import { dataOrder } from "../../utils/mock-order";
import { fetchRequest } from "../../api/index";
import { ingredientType } from "../../types/index";
function App() {
  const [data, setData] = useState<typeof ingredientType[]>([]);
  const [error, setError] = useState(false);
  const fetchData = useCallback(async () => {
    const res = await fetchRequest("/ingredients");
    if (res && res.data) {
      setData([...data, ...res.data]);
    } else {
      setError(true);
    }
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App">
      {error ? (
        <div className="error-App">
          <p className="text text_type_main-large">
            Произошла ошибка, при получении данных
          </p>
        </div>
      ) : (
        <>
          <AppHeader />
          <Main items={data} orders={data} />
        </>
      )}
    </div>
  );
}

export default App;
