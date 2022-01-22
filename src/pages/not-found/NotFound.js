import * as React from 'react';
import Layouts from '../../components/layout/Layouts';
import {Card, Col, Row} from 'antd';
import {Link} from 'react-router-dom';

class NotFound extends React.Component {
    render() {
        return (
            <Layouts title="assets" classname="grid">
                <Row gutter={16}>
                    <Col xs={24} sm={24}>
                        <Card
                            bordered={false}
                        >
                            <div
                                className="d-flex align-items-center justify-content-center vh-100 flex-column">
                                <h1>Page not found</h1>
                                <Link to="/"><a>Back to Dashboard Page</a></Link>
                            </div>
                        </Card>
                    </Col>

                </Row>
            </Layouts>
        );
    }
}

export default NotFound;
