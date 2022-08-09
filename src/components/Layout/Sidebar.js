import logo200Image from "../../assets/img/logo/logo_200.png";
import sidebarBgImage from "../../assets/img/logo/logo_200.png";
import React from "react";
import { MdDashboard, MdPortrait } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { Nav, Navbar, NavItem, NavLink as BSNavLink } from "reactstrap";
import bn from "../../utils/bemnames";
import styled from "styled-components";
import { onLogOut } from "../../services";

const sidebarBackground = {
  backgroundImage: `url("${sidebarBgImage}")`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
};

const navItems = [
  { to: "/", name: "dashboard", exact: true, Icon: MdDashboard },
  { to: "/users", name: "Utilisateurs", exact: false, Icon: MdPortrait },
  { to: "/challengers", name: "Challengeurs", exact: false, Icon: MdPortrait },
  { to: "/paries", name: "Paries", exact: false, Icon: MdPortrait },
];

const bem = bn.create("sidebar");

const LogOut = styled.div`
  padding: 1rem;
  &:hover {
    cursor: pointer;
  }
`;

class Sidebar extends React.Component {
  state = {
    isOpenComponents: true,
    isOpenContents: true,
    isOpenPages: true,
  };

  handleClick = (name) => () => {
    this.setState((prevState) => {
      const isOpen = prevState[`isOpen${name}`];

      return {
        [`isOpen${name}`]: !isOpen,
      };
    });
  };

  LogOut = () => {
    onLogOut();
  };

  render() {
    return (
      <aside className={bem.b()} data-image={sidebarBgImage}>
        <div className={bem.e("background")} style={sidebarBackground} />
        <div className={bem.e("content")}>
          <Navbar>
            <img
              src={logo200Image}
              width="40"
              height="30"
              className="pr-2"
              alt=""
            />
            <span className="text-white">LUMIX</span>
          </Navbar>
          <Nav vertical>
            {navItems.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e("nav-item")}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  className="text-uppercase"
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}
                >
                  <Icon className={bem.e("nav-item-icon")} />
                  <span className="">{name}</span>
                </BSNavLink>
              </NavItem>
            ))}
            <NavItem
              className={bem.e("nav-item")}
              style={{ marginTop: "1rem" }}
              onClick={this.LogOut}
            >
              <LogOut>
                <p>Se deconnecter</p>
              </LogOut>
            </NavItem>
          </Nav>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
