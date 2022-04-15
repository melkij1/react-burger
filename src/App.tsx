import React from "react";
import AppHeader from "./components/AppHeader/AppHeader";

import Main from "./components/Main/Main";
import { data } from "./utils/data";
function App() {
  return (
    <div className="App">
      <AppHeader />
      <Main items={data} />
    </div>
  );
}

export default App;
