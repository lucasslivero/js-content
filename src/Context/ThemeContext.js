import React, { createContext } from "react";
import useThemeStorage from "./../hooks/useThemeStorage";
import themes from "./../styles/themes";
import { ThemeProvider } from "styled-components";

export const ThemeContext = createContext();
export function ThemeProviderContext(props) {
  const [theme, setTheme] = useThemeStorage();

  function handleToggleTheme() {
    setTheme((prevState) => (prevState === "dark" ? "light" : "dark"));
  }

  return (
    <ThemeProvider theme={themes[theme]}>
      <ThemeContext.Provider
        value={{
          theme,
          handleToggleTheme,
        }}
      >
        {props.children}
      </ThemeContext.Provider>
    </ThemeProvider>
  );
}
