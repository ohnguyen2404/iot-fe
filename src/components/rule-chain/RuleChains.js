import React, { useState } from "react";
import { Button, Card, Col, Row } from "antd";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import CreateRuleChainModal from "./CreateRuleChainModal";
import RuleChainListTable from "./RuleChainListTable";

const RuleChains = (props) => {
  const [openCreateRuleChain, setOpenCreateRuleChain] = useState(false);

  const { user, isLoggedIn } = useSelector((state) => state.auth);
  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  const userRoles = user && user.authorities.map((auth) => auth.authority);
  const isAdmin = userRoles.includes("ADMIN");
  const isTenant = userRoles.includes("TENANT");

  const handleOpenCreateRuleChain = (value) => {
    setOpenCreateRuleChain(value);
  };

  return (
    <Row gutter={16}>
      <CreateRuleChainModal
        openCreateRuleChain={openCreateRuleChain}
        handleOpenCreateRuleChain={handleOpenCreateRuleChain}
      />
      <Col span={24}>
        {isAdmin ||
          (isTenant && (
            <Card
              bordered={false}
              title={<p>Rule Chains</p>}
              bodyStyle={{ padding: "10px 20px" }}
              extra={
                <Button
                  type="primary"
                  shape="circle"
                  icon="plus"
                  onClick={() => handleOpenCreateRuleChain(true)}
                />
              }
            >
              <RuleChainListTable />
            </Card>
          ))}
      </Col>
    </Row>
  );
};

export default RuleChains;
