import React, {useEffect, useRef} from "react"
import SockJS from "sockjs-client"
import Stomp from "stompjs"
import {TRANSPORT_API_URL} from "../../config/setting"
import {getItem} from "../../local-storage"

import Devices from "../../components/device/Devices"
import LayoutEntity from "../../components/layout/LayoutEntity"
import {useDispatch, useSelector} from "react-redux"

import {loadDevices} from "../../actions/devices"
import {updateTelemetries} from "../../actions/telemetry"
import {loadRuleChains, loadRuleNodeDescriptors} from "../../actions/ruleChains"

const DevicesPage = () => {
    const dispatch = useDispatch()

    const {user} = useSelector((state) => state.auth)
    const stompClient = useRef()

    useEffect(() => {
        dispatch(loadDevices())
        dispatch(loadRuleChains())
        dispatch(loadRuleNodeDescriptors())

        const connect = () => {
            const url = `${TRANSPORT_API_URL}/ws?token=${getItem("accessToken")}`

            const socket = new SockJS(url)
            stompClient.current = Stomp.over(socket)
            stompClient.current.debug = null
            stompClient.current.connect("", "", onConnected, onError)
        }

        function onConnected() {
            // Subscribe to the Public Topic
            console.log("Connected to WebSocket")
            stompClient.current.subscribe(`/topic/telemetry-${user.id}`, onMessageReceived)
            stompClient.current.reconnect_relay = 10000
        }

        const onMessageReceived = (payload) => {
            const message = JSON.parse(payload.body)
            const newTelemetries = message.kvs.map((kv) => {
                return {
                    entityId: message.entityId,
                    ...kv,
                }
            })
            dispatch(updateTelemetries(newTelemetries))
        }

        const onError = (err) => {
            console.log("STOMP: " + err)
            setTimeout(connect, 10000)
            console.log("STOMP: Reconnecting in 10 seconds")
        }

        connect()
    }, [user.id])

    return (
        <LayoutEntity>
            <Devices />
        </LayoutEntity>
    )
}

export default DevicesPage
