import React from "react";

import Layout from "./Components/Layout";
import GlobalStyle from "./styles/global";
import { ThemeProviderContext } from "./Context/ThemeContext";

function App() {
  return (
    <>
      <ThemeProviderContext>
        <GlobalStyle />
        <Layout />
      </ThemeProviderContext>
    </>
  );
}

export default App;
