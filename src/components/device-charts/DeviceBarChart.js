import * as React from "react";
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis,} from "recharts";
import {useSelector} from "react-redux";
import moment from "moment";
import {groupBy, sortBy, uniqBy, drop} from "lodash";

const randomColor = () => {
  return Math.floor(Math.random() * 16777215).toString(16);
};

let data = [];
const maxSizeChart = 10;
const DeviceBarChart = (props) => {
  const { telemetries } = useSelector((state) => state.telemetries);
  const uniqueKeys = uniqBy(telemetries, "key").map(({ key }) => key);
  const groupedTsArray = groupBy(sortBy(telemetries, "ts"), "ts");

  for (const [key, value] of Object.entries(groupedTsArray)) {
    const kv = {
      ts: moment(parseInt(key)).format("HH:mm:ss"),
    };
    value.forEach((v) => {
      if (uniqueKeys.includes(v.key)) {
        kv[v.key] = v.value;
      }
    });
    data.push(kv);
    if (data.length > maxSizeChart) {
      data.shift()
    }
  }

  return (
    <div style={{ overflow: "scroll" }}>
      <div style={{ minWidth: "500px" }}>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="ts" minTickGap={100}/>
            <YAxis />
            <Tooltip />
            <Legend />
            {uniqueKeys.map((k) => (
              <Bar
                dataKey={k}
                fill={`#${randomColor()}`}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DeviceBarChart;
