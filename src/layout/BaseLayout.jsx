import React from 'react'
import { Layout, Menu, Icon, Breadcrumb } from 'antd'

import Login from '../constainers/login/Login'
import SongList from '../constainers/recommended/SongList'
import PlayListDetail from '../constainers/playlist/PlayListDetail'
import PrivateFm from '../constainers/fm/PrivateFM';

import { Route, Switch } from 'react-router-dom'
import { connect } from 'dva';

import Player from '../components/Player';

const namespace = "baseNameSpace"
const { Header, Footer, Content, Sider } = Layout
const { SubMenu } = Menu

@connect(
    _state => ({
        musicData: _state[namespace].musicData,
        musicUrl: _state[namespace].musicUrl
    }),
    _dispatch => ({

    })
)
class BasicLayout extends React.Component {


    gotoPrivateFM = () => {
        App_.history.push("/privateFm")
    }

    gotoLogin = () => {
        App_.history.push("/login")
    }

    gotoSongList = () => {
        App_.history.push("/songList")
    }

    render() {

        return (
            <Layout>

                <Header
                    style={{
                        height: "300px", textAlign: 'center', padding: 0,
                        backgroundImage: `url(https://d262ilb51hltx0.cloudfront.net/max/1600/1*tUIJ2H14wOUGbMmrIUhn_Q.jpeg)`,
                        backgroundSize: "auto 100%"
                    }}
                />

                <Layout>
                    <Sider defaultCollapsed={false} width={200} style={{ background: '#fff' }}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}>
                            <Menu.Item key="1" onClick={this.gotoLogin}>
                                <Icon type="user" />
                                <span>登录</span>
                            </Menu.Item>
                            <Menu.Item key="2" onClick={this.gotoPrivateFM}>
                                <Icon type="user" />
                                <span>私人FM</span>
                            </Menu.Item>
                            <Menu.Item key="3" onClick={this.gotoSongList} >
                                <Icon type="user" />
                                <span>推荐歌单</span>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Icon type="user" />
                                <span>朋友</span>
                            </Menu.Item>
                            <Menu.Item key="5">
                                <Icon type="user" />
                                <span>本地音乐</span>
                            </Menu.Item>
                            <Menu.Item key="6">
                                <Icon type="user" />
                                <span>下载管理</span>
                            </Menu.Item>
                            <Menu.Item key="7">
                                <Icon type="user" />
                                <span>我的音乐云盘</span>
                            </Menu.Item>
                            <Menu.Item key="8">
                                <Icon type="user" />
                                <span>我的收藏</span>
                            </Menu.Item>
                            <Menu.Item key="9">
                                <Icon type="user" />
                                <span>创造的歌单</span>
                            </Menu.Item>
                            <Menu.Item key="10">
                                <Icon type="user" />
                                <span>收藏的歌单</span>
                            </Menu.Item>
                        </Menu>
                    </Sider>

                    <Content>
                        <div>
                            <Switch>
                                <Route exact path="/" component={Login}></Route>
                                <Route path="/login" component={Login}></Route>
                                <Route path="/songList" component={SongList}></Route>
                                <Route path="/playListDetail" component={PlayListDetail}></Route>
                                <Route path="/privateFM" component={PrivateFm}></Route>
                            </Switch>
                        </div>
                    </Content>
                </Layout>

                <Footer style={{ textAlign: 'center', height: "150px" }}>
                    <Player musicUrl={this.props.musicUrl} />
                </Footer>
            </Layout>
        )
    }
}


export default BasicLayout