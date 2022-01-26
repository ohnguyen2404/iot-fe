import React, {useEffect} from "react"
import Dashboards from "../../components/dashboard/Dashboards"
import LayoutEntity from "../../components/layout/LayoutEntity"
import {useDispatch} from "react-redux"
import {loadDashboards, openDashboard} from "../../actions/dashboards"
import {loadWidgetTypes} from "../../actions/widgetTypes"
import {loadWidgetsBundles} from "../../actions/widgetsBundles"

const DashboardsPage = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadWidgetsBundles())
        dispatch(loadWidgetTypes())
        dispatch(loadDashboards())
        dispatch(openDashboard({isOpen: false}))
    }, [])

    return (
        <LayoutEntity>
            <Dashboards />
        </LayoutEntity>
    )
}

export default DashboardsPage
