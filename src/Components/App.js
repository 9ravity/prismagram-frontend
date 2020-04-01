import React from "react";
import Theme from "../Styles/Theme";
import GlobalStyles from "../Styles/GlobalStyles";
import { gql } from "apollo-boost";

import { ThemeProvider } from "styled-components";
import Router from "./Router";
import { useQuery } from "react-apollo-hooks";

const QUERY = gql`
  {
    isLoggedIn @client
  }
`;

export default () => {
  const {
    data: { isLoggedIn }
  } = useQuery(QUERY);

  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <Router isLoggedIn={isLoggedIn} />
    </ThemeProvider>
  );
};
