import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "antd";
import Layouts from "../../components/layout/Layouts";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import CreateCustomerModal from "../../components/customer/CreateCustomerModal";
import CustomerListTable from "../../components/customer/CustomerListTable";

const Customers = (props) => {
  const [openCreateCustomer, setOpenCreateCustomer] = useState(false);
  const [reloadCustomers, setReloadCustomers] = useState(false);

  const { user, isLoggedIn } = useSelector((state) => state.auth);
  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  const userRoles = user && user.authorities.map((auth) => auth.authority);
  const isAdmin = userRoles.includes("ADMIN");
  const isTenant = userRoles.includes("TENANT");

  const handleOpenCreateCustomer = (value) => {
    setReloadCustomers(!reloadCustomers)
    setOpenCreateCustomer(value);
  };
  return (
    <Layouts title="customers">
      <Row gutter={16} className="m-t-15">
        <CreateCustomerModal
          openCreateCustomer={openCreateCustomer}
          handleOpenCreateCustomer={handleOpenCreateCustomer}
        />
        <Col span={24}>
          {isAdmin ||
            (isTenant && (
              <Card
                bordered={false}
                title={<p>Customer Table</p>}
                bodyStyle={{ padding: "10px 20px" }}
                extra={
                  <Button
                    type="primary"
                    shape="circle"
                    icon="plus"
                    onClick={() => handleOpenCreateCustomer(true)}
                  />
                }
              >
                <CustomerListTable 
                  reloadCustomers={reloadCustomers}
                  setReloadCustomers={setReloadCustomers}/>
              </Card>
            ))}
        </Col>
      </Row>
    </Layouts>
  )
};

export default Customers;
