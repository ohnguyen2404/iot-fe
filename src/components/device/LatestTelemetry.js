import React from "react";
import {Table,} from "antd";

const LatestTelemetry = (props) => {
    const {tvs} = props
    const dataArray = tvs.map((tv, index) => {
        return {
            key: index,
            _key: tv.key,
            value: tv.value,
            ts: tv.ts
        }
    })

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
            <Table
                columns={columns}
                dataSource={dataArray}
            />
        </div>
    );
};

export default LatestTelemetry;
