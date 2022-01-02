import React, { useState } from "react";
import HeaderDiv from "../../components/header/HeaderDiv";
import { Icon, Layout, Menu } from "antd";
import Dashboard from "../../pages/dashboard/Dashboard";
import Profile from "../../pages/profile/Profile"
import Tenants from "../../pages/tenants/Tenants"
import Customers from "../../pages/customers/Customers"
import Devices from "../../pages/devices/Devices"
import { useSelector } from "react-redux";
import { Redirect } from "react-router";

const { Header, Sider, Content } = Layout;

const Layouts = (props) => {
  const [currentTab, setCurrentTab] = useState(1);

  const { user, isLoggedIn } = useSelector((state) => state.auth);
  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }

  const renderTab = () => {
    switch (Number(currentTab)) {
      case 1:
        return (<Dashboard/>)
      case 2:
        return (<Profile/>) 
      case 3:
        return (<Devices/>)
      case 4:
        return (<Tenants/>)
      case 5:
        return (<Customers/>)
    }
  };

  const onChangeTab = (tab) => {
    setCurrentTab(tab.key);
  };

  return (
    <Layout className={`${props.classname}`}>
      <Sider style={{ background: "#fff" }} className="sidebar-left">
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[currentTab]}
          onSelect={onChangeTab}
        >
          <Menu.Item key="1">
              <div>
                <Icon type="dashboard" />
                <span>Dashboard</span>
              </div>
          </Menu.Item>
          <Menu.Item key="2">
              <div>
                <Icon type="profile" />
                <span>Profile</span>
              </div>
          </Menu.Item>
          <Menu.Item key="3">
              <div>
                <Icon type="sliders" />
                <span>Devices</span>
              </div>
          </Menu.Item>
          <Menu.Item key="4">
              <div>
                <Icon type="apartment" />
                <span>Tenants</span>
              </div>
          </Menu.Item>
          <Menu.Item key="5">
              <div>
                <Icon type="user" />
                <span>Customers</span>
              </div>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className="headerTop">
          <HeaderDiv />
        </Header>
        <Content
          style={{
            padding: 24,
            minHeight: "100vh",
          }}
          className={"mainContent"}
        >
          <Layout>
            {renderTab()}
          </Layout>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Layouts;
