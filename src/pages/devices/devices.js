import React, {useEffect} from "react"
import {useDispatch} from "react-redux"

import Devices from "../../components/device/Devices"
import LayoutEntity from "../../components/layout/LayoutEntity"

import {loadDevices} from "../../actions/devices"
import {loadRuleChains, loadRuleNodeDescriptors} from "../../actions/ruleChains"

const DevicesPage = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadDevices())
        dispatch(loadRuleChains())
        dispatch(loadRuleNodeDescriptors())
    }, [])

    return (
        <LayoutEntity>
            <Devices />
        </LayoutEntity>
    )
}

export default DevicesPage
