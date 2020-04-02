import React, { useState } from "react";
import styled from "styled-components";

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
`;

const List = styled.ul`
  display: flex;
`;

const ListItem = styled.li`
  &:not(:last-child) {
    margin-right: 16px;
  }
`;

const Link = styled.a`
  text-transform: uppercase;
  color: ${props => props.theme.darkBlueColor};
  font-weight: 600;
`;

const Copyright = styled.span`
  color: ${props => props.theme.darkGeryColor};
`;

export default () => (
  <Footer>
    <List>
      <ListItem>
        <Link href="#">ABOUT US</Link>
      </ListItem>
      <ListItem>
        <Link href="#">SUPPORT</Link>
      </ListItem>
      <ListItem>
        <Link href="#">PRESS</Link>
      </ListItem>
      <ListItem>
        <Link href="#">API</Link>
      </ListItem>
      <ListItem>
        <Link href="#">JOBS</Link>
      </ListItem>
      <ListItem>
        <Link href="#">PRIVACY</Link>
      </ListItem>
      <ListItem>
        <Link href="#">TERMS</Link>
      </ListItem>
      <ListItem>
        <Link href="#">DIRECTORY</Link>
      </ListItem>
      <ListItem>
        <Link href="#">PROFILES</Link>
      </ListItem>
      <ListItem>
        <Link href="#">HASHTAGS</Link>
      </ListItem>
      <ListItem>
        <Link href="#">LANGUAGE</Link>
      </ListItem>
    </List>
    <Copyright>clone {new Date().getFullYear()} &copy;</Copyright>
  </Footer>
);
