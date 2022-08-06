import React from 'react';

import { Navbar, Nav, NavItem } from 'reactstrap';

import SourceLink from '../SourceLink';

const Footer = () => {
  return (
    <Navbar>
      <Nav navbar>
        <NavItem>
          2018 By Alien Moore, <SourceLink>View</SourceLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Footer;
