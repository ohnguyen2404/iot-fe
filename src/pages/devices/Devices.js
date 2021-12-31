import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "antd";
import Layouts from "../../components/layout/Layouts";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import CreateDeviceModal from "../../components/device/CreateDeviceModal";
import DeviceListTable from "../../components/device/DeviceListTable";

const Customers = (props) => {
  const [openCreateDevice, setOpenCreateDevice] = useState(false);
  const [reloadDevices, setReloadDevices] = useState(false);
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  const userRoles = user && user.authorities.map((auth) => auth.authority);
  const isAdmin = userRoles.includes("ADMIN");
  const isTenant = userRoles.includes("TENANT");

  const handleOpenCreateDevice = (value) => {
    setReloadDevices(!reloadDevices);
    setOpenCreateDevice(value);
  };

  return (
    <Layouts title="devices">
      <Row gutter={16} className="m-t-15">
        <CreateDeviceModal
          openCreateDevice={openCreateDevice}
          handleOpenCreateDevice={handleOpenCreateDevice}
        />
        <Col span={24}>
          <Card
            bordered={false}
            title={<p>Device Table </p>}
            bodyStyle={{ padding: "10px 20px" }}
            extra={
              isAdmin ||
              (isTenant && (
                <Button
                  type="primary"
                  shape="circle"
                  icon="plus"
                  onClick={() => handleOpenCreateDevice(true)}
                />
              ))
            }
          >
            <DeviceListTable
              reloadDevices={reloadDevices}
              setReloadDevices={setReloadDevices}
            />
          </Card>
        </Col>
      </Row>
    </Layouts>
  );
};

export default Customers;
