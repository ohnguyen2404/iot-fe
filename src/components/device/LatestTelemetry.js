import React from "react";
import {Table,} from "antd";
import moment from "moment";

const LatestTelemetry = (props) => {
    const {tvs} = props
    const dataArray = tvs.map((tv, index) => {
        return {
            key: index,
            _key: tv.key,
            value: tv.value,
            ts: moment(tv.ts).format("YYYY-MM-DD HH:mm:ss")
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
