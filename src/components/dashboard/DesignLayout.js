import React, {useState} from "react"
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"
import GridLayout from "react-grid-layout"
import renderComponent from "./ComponentRenderer"
import {useSelector} from "react-redux"
import {saveChangesDashboard} from "../../actions/dashboards"
import DashboardService from "../../services/dashboard"
import {useDispatch} from "react-redux"
import styled from "styled-components"
import {Icon, message, Modal} from "antd"
import {Fab, Action} from "react-tiny-fab"
import "react-tiny-fab/dist/styles.css"
import AddWidgetModal from "./AddWidgetModal"
import {get, isEmpty} from "lodash"

const StyledAction = (props) => (
    <Action style={{backgroundColor: "orange"}} {...props}>
        {props.children}
    </Action>
)

const StyledDiv = styled.div`
    background-color: white;
    :hover {
        background-color: #f5f5f5;
    }
`

const {confirm} = Modal

const styleButton = {
    style: {borderRadius: "5px"},
    size: "large",
}

const removeStyle = {
    position: "absolute",
    right: 0,
    top: 0,
    marginTop: -8,
    cursor: "pointer",
}

const DesignLayout = () => {
    const dispatch = useDispatch()
    const {openedDashboard} = useSelector((state) => state.dashboards)

    const [currentLayout, setCurrentLayout] = useState([])
    const [openAddWidgetModal, setOpenAddWidgetModal] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [shouldReload, setShouldReload] = useState(false)

    const dashboardWidgets = get(openedDashboard, "dashboard.configuration.widgets", [])

    const layout = dashboardWidgets.map((widget, idx) => {
        const _id = widget.id ? widget.id : idx
        return {
            id: _id,
            x: widget.x,
            y: widget.y,
            w: widget.w,
            h: widget.h,
            typeAlias: widget.typeAlias,
        }
    })

    const children = React.useMemo(() => {
        return layout.map((val) => {
            return (
                <StyledDiv
                    key={val.typeAlias + val.id}
                    data-grid={{x: val.x, y: val.y, w: val.w, h: val.h}}
                >
                    {renderComponent(val.typeAlias)}
                    {isEdit && (
                        <span onClick={() => handleRemoveWidget(val)} style={removeStyle}>
                            x
                        </span>
                    )}
                </StyledDiv>
            )
        })
    }, [shouldReload])

    const handleLayoutChange = (layout) => {
        setCurrentLayout(layout)
    }

    const handleSaveChanges = async () => {
        const formattedLayout = currentLayout.map((l, idx) => {
            const formattedTypeAlias = l.i.replace(/[0-9]/g, "") // remove all number, remain char
            let _id = l.i.replace(/^\D+/g, "") // remove all char, remain number
            if (isEmpty(_id)) {
                _id = idx
            }
            return {
                id: _id,
                typeAlias: formattedTypeAlias,
                x: l.x,
                y: l.y,
                w: l.w,
                h: l.h,
            }
        })
        const data = {
            dashboardId: get(openedDashboard, "dashboard.id"),
            widgets: formattedLayout,
        }

        const str_widgets = JSON.stringify({widgets: data.widgets})

        try {
            await DashboardService.updateConfiguration(data.dashboardId, str_widgets)
            dispatch(saveChangesDashboard(data))
        } catch (e) {
            message.error(e.response.data.message)
            return
        }
        message.success("Update dashboard successfully")
        setIsEdit(false)
    }

    const handleOpenAddWidgetModal = (value) => {
        setIsEdit(true)
        setOpenAddWidgetModal(value)
    }

    const handleRemoveWidget = (removedWidget) => {
        confirm({
            title: "Are you sure to remove widget?",
            centered: true,

            okText: "Yes",
            okButtonProps: {
                ...styleButton,
                icon: "check",
            },
            onOk() {
                const curWidgets = get(openedDashboard, "dashboard.configuration.widgets", [])

                const newWidgets = curWidgets.filter((widget) => widget.id !== removedWidget.id)

                const data = {
                    dashboardId: get(openedDashboard, "dashboard.id"),
                    widgets: newWidgets,
                }

                dispatch(saveChangesDashboard(data))
                triggerShouldReload()
            },

            cancelButtonProps: styleButton,
            onCancel() {},
        })
    }

    const triggerShouldReload = () => {
        setShouldReload(!shouldReload)
    }

    return (
        <div>
            <AddWidgetModal
                openAddWidgetModal={openAddWidgetModal}
                handleOpenAddWidgetModal={handleOpenAddWidgetModal}
                triggerShouldReload={triggerShouldReload}
            />
            <GridLayout
                isDraggable={isEdit}
                isResizable={isEdit}
                className="layout"
                cols={12}
                rowHeight={100}
                autoSize={true}
                width={1500}
                onLayoutChange={handleLayoutChange}
            >
                {children}
            </GridLayout>
            <Fab
                style={{right: 0, bottom: 0}}
                mainButtonStyles={{backgroundColor: "orange"}}
                icon={isEdit ? <Icon type="check" /> : <Icon type="experiment" />}
                onClick={() => isEdit && handleSaveChanges()}
            >
                {!isEdit && (
                    <StyledAction
                        text="Add new widget"
                        onClick={() => {
                            setOpenAddWidgetModal(true)
                        }}
                    >
                        <Icon type="plus" />
                    </StyledAction>
                )}
                {!isEdit && (
                    <StyledAction
                        text="Enter edit mode"
                        onClick={() => {
                            setIsEdit(true)
                            triggerShouldReload()
                            message.info("Drag and resize is available now.")
                        }}
                    >
                        <Icon type="edit" />
                    </StyledAction>
                )}
            </Fab>
            {isEdit && (
                <Fab
                    style={{right: 80, bottom: 0}}
                    mainButtonStyles={{backgroundColor: "red"}}
                    icon={<Icon type="close" />}
                    onClick={() => {
                        setIsEdit(false)
                        triggerShouldReload()
                        message.warn("Drag and resize is not available now.")
                    }}
                />
            )}
        </div>
    )
}

export default DesignLayout
