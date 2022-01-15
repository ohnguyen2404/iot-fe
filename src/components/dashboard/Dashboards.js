import React, { useState } from "react";
import { Button, Card, Col, Row } from "antd";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import CreateDashboardModal from "./CreateDashboardModal";
import DashboardListTable from "./DashboardListTable";
import DesignLayout from "./DesignLayout";

const Dashboards = (props) => {
  const [openCreateDashboard, setOpenCreateDashboard] = useState(false);
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const { openDashboard } = useSelector((state) => state.dashboards);
  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  const userRoles = user && user.authorities.map((auth) => auth.authority);
  const isAdmin = userRoles.includes("ADMIN");
  const isTenant = userRoles.includes("TENANT");

  const handleOpenCreateDashboard = (value) => {
    setOpenCreateDashboard(value);
  };

  return openDashboard.isOpen ? (
    <DesignLayout />
  ) : (
    <Row gutter={16}>
      <CreateDashboardModal
        openCreateDashboard={openCreateDashboard}
        handleOpenCreateDashboard={handleOpenCreateDashboard}
      />
      <Col span={24}>
        {isAdmin ||
          (isTenant && (
            <Card
              bordered={false}
              title={<p>Dashboard Table</p>}
              bodyStyle={{ padding: "10px 20px" }}
              extra={
                <Button
                  type="primary"
                  shape="circle"
                  icon="plus"
                  onClick={() => handleOpenCreateDashboard(true)}
                />
              }
            >
              <DashboardListTable />
            </Card>
          ))}
      </Col>
    </Row>
  );
};

export default Dashboards;
