import * as React from "react";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,} from "recharts";
import {useSelector} from "react-redux";
import moment from "moment";
import {groupBy, sortBy, uniqBy} from "lodash";

const randomColor = () => {
    return Math.floor(Math.random() * 16777215).toString(16);
};

const data = []
const avg = {}
const maxSizeChart = 50
const DeviceLineChart = (props) => {
    const {telemetries} = useSelector((state) => state.telemetries);
    const uniqueKeys = uniqBy(telemetries, "key").map(({key}) => key);
    const groupedTsArray = groupBy(
        sortBy(telemetries, "ts"),
        "ts"
    );

    uniqueKeys.forEach((key) => {
        avg[key] = 0
    })
    for (const [key, value] of Object.entries(groupedTsArray)) {
        const kv = {
            ts: moment(parseInt(key)).format("HH:mm:ss"),
        };
        value.forEach((v) => {
            if (uniqueKeys.includes(v.key)) {
                kv[v.key] = v.value;
                avg[v.key] += parseInt(v.value)
            }
        });
        data.push(kv);
        if (data.length > maxSizeChart) {
            data.shift()
        }
    }

    const renderColorfulLegendText = (value, entry) => {
        const {color} = entry;

        return <span style={{color}}>{value} (Avg: {(avg[value] / data.length).toFixed(1)})</span>
    };

    return (
        <div style={{overflow: "scroll"}}>
            <div style={{minWidth: "500px"}}>
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="ts" minTickGap={50} tickLine={false}/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend formatter={renderColorfulLegendText}/>
                        {uniqueKeys.map((k) => (
                            <Line
                                type="monotone"
                                dataKey={k}
                                stroke={`#${randomColor()}`}
                                activeDot={{r: 6}}
                            />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default DeviceLineChart;
