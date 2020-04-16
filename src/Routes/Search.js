import React from "react";
import { withRouter } from "react-router-dom"; // url 얻기 위함
import styled from "styled-components";
import { gql } from "apollo-boost";

const Wrapper = styled.div`
  height: 50vh;
  text-align: center;
  font-size: 20px;
`;

const SEATCH_POSTS = gql`
    searchPost($term:String!){
        searchPost(term:$term){
            files{
                url
            }
            likeCount
        }
    }
`;

export default withRouter((props) => {
  console.log(props);
  const {
    location: { search },
  } = props;

  const searchTerm = search.split("=")[1];

  return (
    <Wrapper>
      {searchTerm === undefined && <FatText text={"Search for something"} />}
    </Wrapper>
  );
});
