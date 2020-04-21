import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Avatar from "./Avatar";
import FatText from "./FatText";
import Button from "./Button";

// props -> styles.Theme.js

const Card = styled.div`
  ${(props) => props.theme.whiteBox}
  display:flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const UserCard = ({ username, isFollowing, url, isSelf }) => (
  <Card>
    <Avatar url={url} size={"md"} />
    <FatText text={username} />
    {!isSelf && <Button text={isFollowing ? "Unfollow" : "Follow"} />}
  </Card>
);

UserCard.propTypes = {
  username: PropTypes.string.isRequired,
  isSelf: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired,
};

export default UserCard;
