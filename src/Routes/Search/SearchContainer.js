import React from "react";
import { withRouter } from "react-router-dom"; // url 얻기위함, serach="";
import SearchPresenter from "./SearchPresenter";
import { useQuery } from "@apollo/react-hooks";
import { SEARCH } from "./SearchQueries";

export default withRouter(({ location: { search } }) => {
  const term = search.split("=")[1];
  const { data, loading } = useQuery(SEARCH, {
    skip: term === undefined,
    variables: {
      term,
    },
  });
  console.log(data); // 서버와 통신한 data 찾기
  return <SearchPresenter searchTerm={term} loading={loading} data={data} />;
});
