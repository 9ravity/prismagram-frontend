import React from "react";
import Theme from "../Styles/Theme";
import GlobalStyles from "../Styles/GlobalStyles";

import { ThemeProvider } from "styled-components";
import Router from "./Router";

export default () => (
  <ThemeProvider theme={Theme}>
    <GlobalStyles />
    <Router isLoggedIn={true} />>
  </ThemeProvider>
);
