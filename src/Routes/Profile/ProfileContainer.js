import React from "react";
import { gql } from "apollo-boost";
import withRouter from "react-router-dom/withRouter";
import { useQuery } from "react-apollo-hooks";
import ProfilePresenter from "./ProfilePresenter";
import { useMutation } from "@apollo/react-hooks";

const GET_USER = gql`
  query seeUser($username: String!) {
    seeUser(username: $username) {
      id
      avatar
      username
      fullName
      isFollowing
      isSelf
      bio
      followingCount
      followersCount
      postsCount
      posts {
        id
        files {
          url
        }
        likeCount
        commentCount
      }
    }
  }
`;

export const LOG_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;

export default withRouter(
  ({
    match: {
      params: { username },
    },
  }) => {
    //{ skip: true } url스킵하는 이유는 props에서 user를 가져오기 때문
    //const { data, loading } = useQuery(GET_USER, { skip: true });
    const { data, loading } = useQuery(GET_USER, { variables: { username } });
    //console.log(props); props.match.params.username
    // console에 찍히는 부분은 routes에서 15번째줄 username이 들어 있음,
    const logOut = useMutation(LOG_OUT);
    return <ProfilePresenter loading={loading} logOut={logOut} data={data} />;
  }
);
