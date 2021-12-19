import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, } from "antd";
import Layouts from "../../components/layout/Layouts";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import CreateTenantModal from "../../components/tenant/CreateTenantModal";
import TenantListTable from "../../components/tenant/TenantListTable";

const Customers = (props) => {
  const [openCreateTenant, setOpenCreateTenant] = useState(false);

  const { user, isLoggedIn } = useSelector((state) => state.auth);
  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  const userRoles = user && user.authorities.map((auth) => auth.authority);
  const isAdmin = userRoles.includes("ADMIN");
  const isTenant = userRoles.includes("TENANT");

  const handleOpenCreateTenant = (value) => {
    setOpenCreateTenant(value);
  };

  return (
    <Layouts title="tenants">
            <Row gutter={16} className="m-t-15">
        <CreateTenantModal
          openCreateTenant={openCreateTenant}
          handleOpenCreateTenant={handleOpenCreateTenant}
        />
        <Col span={24}>
          {isAdmin ||
            (isTenant && (
              <Card
                bordered={false}
                title={<p>Tenant Table </p>}
                bodyStyle={{ padding: "10px 20px" }}
                extra={
                  <Button
                    type="primary"
                    shape="circle"
                    icon="plus"
                    onClick={() => handleOpenCreateTenant(true)}
                  />
                }
              >
                <TenantListTable />
              </Card>
            ))}
        </Col>
      </Row>
    </Layouts>
  )
};

export default Customers;
