import React from "react";

import Layout from "./Components/Layout";
import GlobalStyle from "./styles/global";
import { ThemeProviderContext } from "./Context/ThemeContext";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <ThemeProviderContext>
        <GlobalStyle />
        <Layout />
      </ThemeProviderContext>
    </BrowserRouter>
  );
}

export default App;
