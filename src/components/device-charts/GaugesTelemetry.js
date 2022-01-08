import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {head} from "lodash";
import * as CanvasGauges from "canvas-gauges"

const {LinearGauge} = CanvasGauges

const GaugesTelemetry = (props) => {
    const {latestTelemetries} = useSelector((state) => state.telemetries);
    const latestTelemetry = head(latestTelemetries)

    const [linearGauge, setLinearGauge] = useState(null)

    useEffect(() => {
        const initGauge = new LinearGauge({
            renderTo: 'canvas-id',
            title: latestTelemetry ? latestTelemetry.key.charAt(0).toUpperCase() + latestTelemetry.key.slice(1) : "",
            colorTitle: "#000000",
            value: latestTelemetry ? latestTelemetry.value : 0,
            width: 800,
            height: 160,
            borderRadius: 20,
            valueBoxBorderRadius: 0,
            valueTextShadow: false,
            borders: 0,
            minValue: -60,
            maxValue: 100,
            minorTicks: 20,
            majorTicks: [-60, -40, -20, 0, 20, 40, 60, 80, 100],
            units: "°C",
            colorUnits: "#f00",
            animationRule: "linear",
            animationDuration: 700,
            highlights: [
                {from: -60, to: -40, color: "#87C6FB"},
                {from: -40, to: -20, color: "#B1DAFC"},
                {from: -20, to: 0, color: "#D7EDFE"},
                {from: 0, to: 20, color: "#FFD5D6"},
                {from: 20, to: 40, color: "#FFAAAD"},
                {from: 40, to: 60, color: "#FF7C83"},
                {from: 60, to: 80, color: "#FF4458"},
                {from: 80, to: 100, color: "#FF002A"},
            ],

        }).draw();
        setLinearGauge(initGauge);
    }, [])

    useEffect(() => {
        if (linearGauge !== null) {
            linearGauge.title = latestTelemetry.title
            linearGauge.value = latestTelemetry.value
            setLinearGauge(linearGauge)
        }
    }, [latestTelemetry])

    return (
        <div style={{overflow: "scroll"}}>
            <div style={{minWidth: "500px"}}>
                <canvas id={"canvas-id"}/>
            </div>
        </div>
    );
};

export default GaugesTelemetry;
