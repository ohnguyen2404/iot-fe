import React from "react";
import sale from "../../static/images/icon-sale.png";
import order from "../../static/images/icon-order.png";
import visitor from "../../static/images/icon-visitor.png";
import Stats from "../home/Stats";
import ProgressBar from "../home/ProgressBar";
import GradientProgess from "../home/GradientProgess";
import Barchart from "../home/Barchart";
import TodoList from "../home/TodoList";
import TimeLine from "../home/TimeLine";
import Testimonial from "../home/Testimonial";
import {Button, Card, Col, Row} from "antd";
import user1 from "../../static/images/user1.png";
import user2 from "../../static/images/user2.png";
import {useSelector} from "react-redux";
import {Redirect} from "react-router";
import TableSelect from "../home/TableSelect";

const Dashboard = (props) => {

  const { user, isLoggedIn } = useSelector((state) => state.auth);
  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Row gutter={16}>
        <Col xs={24} sm={12} lg={6} className="custom-statcards">
          <Card
            bordered={false}
            className="sale"
            bodyStyle={{ padding: "20px" }}
          >
            <Stats icon={sale} text="Total Sale" number="9541" />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6} className="custom-statcards">
          <Card
            bordered={false}
            className="order"
            bodyStyle={{ padding: "20px" }}
          >
            <Stats icon={order} text="New Order" number="9541" />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6} className="custom-statcards">
          <Card
            bordered={false}
            bodyStyle={{ padding: "20px" }}
            className="user"
          >
            <Stats icon={user} text="New User" number="9541" />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6} className="custom-statcards">
          <Card
            bordered={false}
            bodyStyle={{ padding: "20px" }}
            className="visitor"
          >
            <Stats icon={visitor} text="Unique Visitor" number="9541" />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} className="m-t-15">
        <Col lg={16} xs={24}>
          <Card
            bordered={false}
            title={<p>Sales Report</p>}
            bodyStyle={{ padding: "0 0 20px" }}
          >
            <Barchart />
          </Card>
        </Col>
        {/* To do List */}
        <Col lg={8} xs={24} className="custom-tocard">
          <TodoList />
        </Col>
      </Row>

      <Row gutter={16} className="m-t-15">
        <Col xl={12} lg={16}>
          <Card
            bordered={false}
            title={<p>Progress Report: </p>}
            bodyStyle={{ padding: "0 20px 20px" }}
          >
            <Row>
              <Col sm={8} xs={24} className="text-center custom-categories">
                <ProgressBar number="70" color="#4BBACE" width="10" />
              </Col>
              <Col sm={8} xs={24} className="text-center custom-categories">
                <ProgressBar number="30" color="#E66793" width="10" />
              </Col>
              <Col sm={8} xs={24} className="text-center custom-categories">
                <ProgressBar number="100" color="#45CD93" width="10" />
              </Col>
            </Row>
          </Card>
          <Card bordered={false} className="m-t-15">
            <GradientProgess />
          </Card>
        </Col>
        <Col xl={6} lg={8} className="custom-timeline">
          <Card
            bordered={false}
            title={<p>Timeline </p>}
            bodyStyle={{ padding: "0 20px 20px" }}
          >
            <TimeLine />
            <div className="text-center">
              {" "}
              <Button type="primary">Learn More</Button>
            </div>
          </Card>
        </Col>
        <Col xl={6} lg={24}>
          <Row gutter={16}>
            <Col
              xl={24}
              md={12}
              className="custom-home-cards custom-margincards"
            >
              <Card
                bordered={false}
                className="testimonials"
                bodyStyle={{ padding: "20px" }}
              >
                <Testimonial
                  name="Pauline I. Bird"
                  designation="Web developer"
                  img={user1}
                  description="Computer users and programmers have become so accustomed to using Windows."
                />
              </Card>
            </Col>
            <Col xl={24} md={12} className="custom-home-cards m-t-15">
              <Card
                bordered={false}
                className="testimonials"
                bodyStyle={{ padding: "20px" }}
              >
                <Testimonial
                  name="Ralph L. Alva"
                  designation="Web developer"
                  img={user2}
                  description="Computer users and programmers have become so accustomed to using Windows."
                />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={16} className="m-t-15">
        <Col span={24}>
          <Card
            bordered={false}
            title={<p>Dynamic Custom Table </p>}
            bodyStyle={{ padding: "10px 20px" }}
          >
            <TableSelect />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
