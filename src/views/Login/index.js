import React, { Component } from 'react';
import {reduxSetup,loginAuthHnadler} from 'redux/actions/Auth';
import {connect} from 'react-redux'; 
import { Form, Input, Button,message } from 'antd';
import {Routes} from 'config/Routes';

class LoginHandler extends Component {
    componentDidMount = () =>{
        this.props.reduxSetup()
    }

    onFinish = (values) => {
        // console.log('Success:', values);
        if(values.email === 'rachna_lulla@gmail.com' && values.password === 'Rachna@123'){
            this.props.loginAuthHnadler(()=>{
                message.success('Signin successfully!!!');
                setTimeout(()=>{
                    this.props.history.push(Routes.Dashboard)
                },3000)
            },()=>{
                message.error('Something went wrong!!!');
            })
        }else{
            message.error('Something went wrong!!!');
        }
    };

    render() {
        return (
            <div className="authentication-container">
                <div className="part-one">
                    <img alt="auth" src="/img/auth.svg"/>
                </div>
                <div className="part-two">
                    <div className="logo-container">
                        <img src="/img/logo.svg" height="40px" width="40px"/>
                        <div className="stack">stack</div>
                        <div className="question">Questions</div>
                    </div>
                    <div className="sub-text">
                        Welcome
                    </div>
                    <div className="sub-text-light">
                        Login to continue
                    </div>
                    <div>
                        <Form
                            name="auth"
                            initialValues={{
                            }}
                            onFinish={this.onFinish}
                            colon={false}
                            layout={'vertical'}
                        >
                            <Form.Item
                                name="email"
                                label="E-mail"
                                rules={[
                                    {
                                        type: 'email',
                                        message: 'The input is not valid E-mail!',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your E-mail!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                    { 
                                        min: 6, 
                                        message: 'Password must be minimum 6 characters.' 
                                    }
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item>
                                <Button className="sign-in" type="primary" htmlType="submit" block>
                                    Sign in
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

// export default LoginHandler;
function mapStateToProps(state){
    return{
    }
}

export default connect(mapStateToProps,{
    reduxSetup,
    loginAuthHnadler
})(LoginHandler);