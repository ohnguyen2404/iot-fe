import React, { useState, useEffect } from "react";
import {
  Table,
} from "antd";

const TableSelect = (props) => {
  //const dataArray = devices.map((device, index) => {
  //  return {
  //    key: index,
  //    id: device.id,
  //    name: device.name,
  //    label: device.label,
  //  };
  //});

  const columns = [
    {
      title: "Last update time",
      dataIndex: "ts",
      key: "ts",
    },
    {
      title: "Key",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
    },
  ];

  return (
    <div className="custom-table">
      <Table
        columns={columns}
        //dataSource={dataArray}
      />
    </div>
  );
};

export default TableSelect;
