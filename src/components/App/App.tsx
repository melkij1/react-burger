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
  const fetchData = useCallback(async () => {
    const res = await fetchRequest("/ingredients");
    if (res) {
      setData([...data, ...res.data]);
    }
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App">
      <AppHeader />
      <Main items={data} orders={data} />
    </div>
  );
}

export default App;
