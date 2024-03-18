import React, { useContext } from "react";

import { Container } from "./styles";
import { ThemeContext } from "../../Context/ThemeContext";

export default function Footer() {
  const { handleToggleTheme, theme } = useContext(ThemeContext);

  return (
    <Container>
      <span>JStack's Blog. Todos os direitos reservados.</span>
      <button type="button" onClick={handleToggleTheme}>
        {theme === "dark" ? "🌑" : "☀️"}
      </button>
    </Container>
  );
}
