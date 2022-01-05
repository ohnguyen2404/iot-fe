import React, { useEffect } from "react";
import { Table } from "antd";
import moment from "moment";
import { useSelector } from "react-redux";
import { uniqBy, sortBy } from "lodash";

const LatestTelemetry = (props) => {
  const { telemetries } = useSelector((state) => state.telemetries);
  const unique_kvs = uniqBy(telemetries, "key");
  let dataArray = [];
  dataArray = unique_kvs.map((tv, index) => {
    return {
      key: index,
      _key: tv.key,
      value: tv.value,
      ts: moment(tv.ts).format("YYYY-MM-DD HH:mm:ss"),
    };
  });

  const columns = [
    {
      title: "Last update time",
      dataIndex: "ts",
    },
    {
      title: "Key",
      dataIndex: "_key",
    },
    {
      title: "Value",
      dataIndex: "value",
    },
  ];

  return (
    <div className="custom-table">
      <Table columns={columns} dataSource={dataArray} />
    </div>
  );
};

export default LatestTelemetry;
