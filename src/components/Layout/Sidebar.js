import logo200Image from "../../assets/img/logo/logo_200.png";
import sidebarBgImage from "../../assets/img/logo/logo_200.png";
import React from "react";
import { MdDashboard, MdPortrait, MdMonetizationOn } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { Nav, Navbar, NavItem, NavLink as BSNavLink } from "reactstrap";
import bn from "../../utils/bemnames";
import styled from "styled-components";
import { onLogOut } from "../../services";
import { useAdminCheckerQuery } from "../../hooks/useAminCheckerQuery";

const sidebarBackground = {
  backgroundImage: `url("${sidebarBgImage}")`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
};

const navItems = [
  { to: "/", name: "dashboard", exact: true, Icon: MdDashboard },
  { to: "/users", name: "Utilisateurs", exact: false, Icon: MdPortrait },
  { to: "/paries", name: "Paries", exact: false, Icon: MdMonetizationOn },
];

const bem = bn.create("sidebar");

const LogOut = styled.div`
  padding: 1rem;
  &:hover {
    cursor: pointer;
  }
`;

const Sidebar = () => {
  const { data: adminData } = useAdminCheckerQuery();
  const onLogOutFunc = () => {
    onLogOut();
  };

  return (
    <aside className={bem.b()} data-image={sidebarBgImage}>
      <div className={bem.e("background")} style={sidebarBackground} />
      <div className={bem.e("content")}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "1rem",
          }}
        >
          <img
            src={logo200Image}
            width="60"
            height="50"
            // className="pr-2"
            alt=""
          />
          <span className="text-white ">LUMIX</span>
        </div>
        <Nav vertical>
          {adminData?.ref?.id &&
            navItems.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e("nav-item")}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  className="text-uppercase"
                  tag={NavLink}
                  to={to}
                >
                  <Icon className={bem.e("nav-item-icon")} />
                  <span className="">{name}</span>
                </BSNavLink>
              </NavItem>
            ))}
          <NavItem
            className={bem.e("nav-item")}
            style={{ marginTop: "1rem" }}
            onClick={onLogOutFunc}
          >
            <LogOut>
              <p>Se deconnecter</p>
            </LogOut>
          </NavItem>
        </Nav>
      </div>
    </aside>
  );
};

export default Sidebar;
