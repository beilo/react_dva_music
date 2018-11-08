import React from 'react'
import { Input, Button, message } from 'antd';
import { connect } from 'dva';
import './Login.css'



const namespace = "loginNamespace"

const mapStateToProps = (state) => {
    const loginState = state[namespace]
    return {
        loginState
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onDidMount: (email, pwd) => {
            dispatch({
                type: `${namespace}/login`,
                payload: {
                    email: email,
                    pwd: pwd,
                }
            })
        },
        changeEmail: (value) => {
            dispatch({
                type: `${namespace}/changeEmail`,
                payload: {
                    email: value
                }
            })
        },
        changePWD: (value) => {
            dispatch({
                type: `${namespace}/changePWD`,
                payload: {
                    pwd: value
                }
            })
        }
    }
}


class Login extends React.Component {

    state = {
        email: "",
        pwd: "",
    }

    componentDidMount() {
        message.config({
            top: 300,
            maxCount: 2
        })
    }

    loginHttp = () => {
        this.props.onDidMount(this.state.email, this.state.pwd)
    }

    storageUserInfo(data) {
        sessionStorage.setItem("userInfo", data)
    }

    textHandleChange = (sign, event) => {
        if ("email" == sign) {
            this.setState({
                email: event.target.value
            })
        } else if ("pwd" == sign) {
            this.setState({
                pwd: event.target.value
            })
        }
    }

    render() {
        return (
            <div className="loginbody pt100">
                <div className="loginInput">
                    <span className="ml30p textW">登录框</span>
                    <Input placeholder="请输入用户名"
                        value={this.state.email}
                        onChange={(event) => {
                            this.textHandleChange("email", event)
                        }}
                        style={{
                            marginLeft: "40px",
                            position: "relative",
                            width: "260px"
                        }} />
                </div>

                <div className="loginInput pt40">
                    <span className="ml30p textW">密码框</span>
                    <Input placeholder="请输入密码"
                        value={this.state.pwd}
                        onChange={(event) => {
                            this.textHandleChange("pwd", event)
                        }}
                        style={{
                            marginLeft: "40px",
                            position: "relative",
                            width: "260px"
                        }} />
                </div>

                <div className="ml30p pt40">
                    <Button type="primary" loading={this.props.loginState.loading}
                        onClick={() => {
                            this.loginHttp()
                        }}
                        style={{
                            width: "39%"
                        }}>
                        登录
                </Button>
                </div>

            </div>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
