import * as React from "react";
import {Button, Form, Input, Select} from 'antd';

const {Option} = Select;

class PriceInput extends React.Component {
    constructor(props) {
        super(props);

        const value = props.value || {};
        this.state = {
            number: value.number || 0,
            currency: value.currency || 'rmb',
        };
    }

    static getDerivedStateFromProps(nextProps) {
        // Should be a controlled component.
        if ('value' in nextProps) {
            return {
                ...(nextProps.value || {}),
            };
        }
        return null;
    }

    handleNumberChange = e => {
        const number = parseInt(e.target.value || 0, 10);
        if (Number.isNaN(number)) {
            return;
        }
        if (!('value' in this.props)) {
            this.setState({number});
        }
        this.triggerChange({number});
    };

    handleCurrencyChange = currency => {
        if (!('value' in this.props)) {
            this.setState({currency});
        }
        this.triggerChange({currency});
    };

    triggerChange = changedValue => {
        // Should provide an event to pass value to Form.
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(Object.assign({}, this.state, changedValue));
        }
    };

    render() {

        const {size} = this.props;
        const state = this.state;
        return (
            <span>
        <Input
            type="text"
            size={size}
            value={state.number}
            onChange={this.handleNumberChange}
            style={{width: '65%', marginRight: '3%'}}
        />
        <Select
            value={state.currency}
            size={size}
            style={{width: '32%'}}
            onChange={this.handleCurrencyChange}
        >
          <Option value="rmb">RMB</Option>
          <Option value="dollar">Dollar</Option>
        </Select>
      </span>

        );
    }
}

class CustomizedFormControls extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    checkPrice = (rule, value, callback) => {
        if (value.number > 0) {
            callback();
            return;
        }
        callback('Price must greater than zero!');
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form layout="inline" onSubmit={this.handleSubmit}>
                <Form.Item label="Price">
                    {getFieldDecorator('price', {
                        initialValue: {number: 0, currency: 'rmb'},
                        rules: [{validator: this.checkPrice}],
                    })(<PriceInput/>)}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

export default CustomizedFormControls;


