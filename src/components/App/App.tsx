import React from "react";
import AppHeader from "../AppHeader/AppHeader";

import Main from "../Main/Main";
import { data } from "../../utils/data";
import { dataOrder } from "../../utils/mock-order";
function App() {
  return (
    <div className="App">
      <AppHeader />
      <Main items={data} orders={dataOrder} />
    </div>
  );
}

export default App;
