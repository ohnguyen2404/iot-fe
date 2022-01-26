import React from "react"
import {Card, Col, Row} from "antd"
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom"

import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import Home from "./pages/home/home"
import ProfilePage from "./pages/profile/ProfilePage"
import CustomersPage from "./pages/customers/customers"
import TenantsPage from "./pages/tenants/tenants"
import DevicesPage from "./pages/devices/devices"
import DashboardsPage from "./pages/dashboards/dashboards"
import RuleChainsPage from "./pages/rule-chains/rule-chains"
import WidgetsBundlesPage from "./pages/widgets-bundles/widgets-bundles"

import "../src/styles/global.scss"
import {useSelector} from "react-redux"
import {Redirect} from "react-router"

function App() {
    const {isLoggedIn} = useSelector((state) => state.auth)

    const NoMatchPage = () => {
        return (
            <Row style={{marginTop: "20%"}}>
                <Col xs={{span: 12, offset: 6}}>
                    <Card>
                        <div className="card-body">
                            <div className="d-flex flex-column align-items-center justify-content-center">
                                <h2>Page not found</h2>
                                <Link to="/">back to dashboard</Link>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>
        )
    }

    const handleRedirect = (component) => {
        if (!isLoggedIn) {
            return <Redirect to="/login" />
        }
        return component
    }

    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/" render={() => handleRedirect(<Home />)} />
                    <Route exact path="/profile" render={() => handleRedirect(<ProfilePage />)} />
                    <Route exact path="/devices" render={() => handleRedirect(<DevicesPage />)} />
                    <Route exact path="/tenants" render={() => handleRedirect(<TenantsPage />)} />
                    <Route exact path="/customers" render={() => handleRedirect(<CustomersPage />)} />
                    <Route exact path="/widgets-bundles" render={() => handleRedirect(<WidgetsBundlesPage />)} />
                    <Route exact path="/dashboards" render={() => handleRedirect(<DashboardsPage />)} />
                    <Route exact path="/rule-chains" render={() => handleRedirect(<RuleChainsPage />)} />

                    <Route path="*" component={NoMatchPage} />
                </Switch>
            </Router>
        </div>
    )
}

export default App
