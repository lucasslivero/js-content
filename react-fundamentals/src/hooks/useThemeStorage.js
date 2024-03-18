import { useState } from "react";

function useThemeStorage(initialValue = "dark") {
  const [state, setState] = useState(() => {
    const item = localStorage.getItem("theme");
    return item ? item : initialValue;
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(state) : value;
      setState(valueToStore);
      localStorage.setItem("theme", valueToStore);
    } catch (error) {
      console.error(error);
    }
  };

  return [state, setValue];
}

export default useThemeStorage;
