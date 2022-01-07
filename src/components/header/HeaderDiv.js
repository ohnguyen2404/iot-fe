import React, {useState} from "react";
import logo from "../../static/images/logo.png";
import avatar from "../../static/images/flat-avatar.png";

import {Link} from "react-router-dom";
import {logout} from "../../actions/auth";
import {useDispatch} from "react-redux";

import {Avatar, Input, Menu} from "antd";

const SubMenu = Menu.SubMenu;

const Search = Input.Search;

const HeaderDiv = (props) => {

  const dispatch = useDispatch();
  const [rtl, setRtl] = useState(true)

  const sidebarToggle = () => {
    setRtl(!rtl)
    var body = document.body;
    body.classList.toggle("rtl");
  };

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <Menu
      mode="horizontal"
      theme="dark"
      className="d-flex align-items-center custom-navigation"
    >
      <Menu.Item key="brand-logo" className="brand-logo">
        <Link to="/dashboard">
          <img src={logo} className="m-r-5" />
          <span>Ant Dashboard</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="search" className="custom-search auto">
        <Search onSearch={(value) => console.log(value)} />
      </Menu.Item>

      <Menu.Item key="sidebar-toggle" onClick={sidebarToggle}>
        <span>LTR/RTR</span>
      </Menu.Item>
      {/* <SubMenu
          title={
            <span className="submenu-title-wrapper">
              Language{' '}
            </span>
          }
          className="custom-dropdown language-list"
        >
          <Menu.Item key="setting:1">English</Menu.Item>
          <Menu.Item key="setting:2">Dutch</Menu.Item>
          <Menu.Item key="setting:3">Hindi</Menu.Item>
          <Menu.Item key="setting:4">Urdu</Menu.Item>
        </SubMenu> */}

      <SubMenu
        key="profile"
        title={
          <span>
            <Avatar size={24} src={avatar} />
            <span> Profile</span>
          </span>
        }
        className=""
      >
        <Menu.Item key="profile-view">
          <Link to="/profile">Profile</Link>
        </Menu.Item>
        <Menu.Item key="logout" onClick={handleLogout}>
          <Link to="/login">Logout</Link>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default HeaderDiv;
