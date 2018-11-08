import React from 'react'
import { Row, Col, Button, Tabs, List, Icon } from 'antd'
import { connect } from 'dva';
import "./playlistdetail.css"

import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';

const namespace = "payListDetailNamespace"


/**
 * 歌单列表
 * @param {item,index,key} props 
 */
const HotComments = (props) => {
    return (
        <div>
            <img className="right-icon" src={props.item.user.avatarUrl} />

            <div style={{ display: "inline" }}>
                <a>{`${props.item.user.nickname}: `}</a>
                {props.item.content}
                <div style={{ marginTop: "5px" }}>{props.item.time}</div>
            </div>
            <div style={{ clear: "both" }}></div>
        </div>
    )
}
export { HotComments }


@connect(
    _state => ({
        playlist: _state[namespace].playlist,
        privileges: _state[namespace].privileges,
        comments: _state[namespace].comments
    }),
    _dispatch => ({
        getData: () => {
            _dispatch({
                type: `${namespace}/getData`
            })
        },
        getCommentData: () => {
            _dispatch({
                type: `${namespace}/getCommentData`
            })
        },
        playMusic: (musicId) => {
            _dispatch({
                type: "baseNameSpace/getMusicUrl",
                payload: {
                    musicId: musicId
                }
            })
        }
    }))
class PlayListDetail extends React.Component {

    state = {
        activeTab: '1'
    }

    componentDidMount() {
        this.props.getData()
        this.props.getCommentData()
    }

    createTag = (playlist) => {
        let tag = ""
        for (let index = 0; index < playlist.tags.length; index++) {
            const element = playlist.tags[index];
            if (index === 0) {
                tag += element
            } else {
                tag += "/" + element
            }
        }
        return tag
    }

    createCommentElement = (comments) => {
        if (comments === undefined || Object.keys(comments).length === 0 || comments.hotComments === undefined) {
            return ""
        } else {
            return comments.hotComments.map((item, index) => {
                return <HotComments item={item} index={index} key={item.commentId} />
            })
        }
    }

    toggle = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        const playlist = this.props.playlist
        const privileges = this.props.privileges
        const comments = this.props.comments

        if (playlist === undefined || Object.keys(playlist).length === 0) {
            return ""
        }
        return (
            <>
                <div className="raw">
                    <div className="col-md-3">
                        <img className="left-img" src={playlist.coverImgUrl} />
                    </div>
                    <div className="col-md-9">
                        <div className="raw h70">
                            <div className="col-md-1">
                                <span className="border-radius pt5">歌单</span>
                            </div>
                            <div className="col-md-9">
                                <h1>{playlist.name}</h1>
                            </div>
                            <div className="col-md-1 mt_22">
                                <div>歌曲数</div>
                                <span>{playlist.trackCount}</span>
                            </div>
                            <div className="col-md-1 mt_22">
                                <div>播放数</div>
                                <span>{playlist.playCount}</span>
                            </div>
                        </div>

                        <div className="raw h50">
                            <div className="col-md-5">
                                <img className="right-icon" src={playlist.creator.avatarUrl} />
                                <span className="pt-info">{playlist.creator.nickname} </span>
                                2015-09-04 创建
                            </div>
                        </div>

                        <div className="raw h40 mt-b-10" style={{ marginTop: "30px" }}>
                            <div>
                                <Button icon="search">播放全部</Button>
                                <Button className="ml5" icon="search">已收藏 ({playlist.subscribedCount})</Button>
                                <Button className="ml5" icon="search">分享 ({playlist.shareCount})</Button>
                                <Button className="ml5" icon="search">下载全部</Button>
                            </div>
                        </div>

                        <div style={{ marginTop: "10px" }}>
                            标签: {this.createTag(playlist)}
                        </div>
                        <div style={{ marginTop: "10px" }}>
                            简介: {playlist.description}
                        </div>
                    </div>
                </div>
                <div className="raw">
                    <div className="col-md-12">
                        <div className="nav-t btn-group" role="group" aria-label="...">
                            <button type="button" className={this.state.activeTab === "1" ? "btn btn-primary" : "btn btn-default"}
                                onClick={() => { this.toggle('1'); }}>歌曲列表</button>
                            <button type="button" className={this.state.activeTab === "2" ? "btn btn-primary" : "btn btn-default"}
                                onClick={() => { this.toggle('2'); }}>评论</button>
                            <button type="button" className={this.state.activeTab === "3" ? "btn btn-primary" : "btn btn-default"}
                                onClick={() => { this.toggle('3'); }}>收藏者</button>
                        </div>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <td></td>
                                            <td>操作</td>
                                            <td>音乐标题</td>
                                            <td>歌手</td>
                                            <td>专辑</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {playlist.tracks.map((item, index) => {
                                            return <PlayListItem item={item} index={index} key={item.id} playMusicCallback={(id) => {
                                                this.props.playMusic(id)
                                            }} />
                                        })}
                                    </tbody>
                                </table>
                            </TabPane>
                            <TabPane tabId="2">
                                {this.createCommentElement(comments)}
                            </TabPane>
                            <TabPane tabId="3">
                                <Collection />
                            </TabPane>
                        </TabContent>
                    </div>
                </div>
            </>
        )
    }
}

class PlayListItem extends React.Component {

    playMusic = (id) => {
        this.props.playMusicCallback(id)
    }

    render() {
        const item = this.props.item

        return (
            <tr key={item.id} onDoubleClick={() => {
                this.playMusic(item.id)
            }}>
                <td>{this.props.index}</td>
                <td className="col-md-1">
                    <Icon type="heart"></Icon>
                    <Icon type="download" style={{ marginLeft: "10px" }}></Icon>
                </td>
                <td>{item.name}</td>
                <td>{item.ar[0].name}</td>
                <td>{item.al.name}</td>
            </tr>

        )
    }
}


class Collection extends React.Component {
    render() {
        return (
            <div>
                <div className="col-sm-5 col-md-6">.col-sm-5 .col-md-6</div>
                <div className="col-sm-5 col-sm-offset-2 col-md-6 col-md-offset-0">
                    col-sm5 col-sm-offset-2 col-md-6 col-md-offset-0
                </div>
                <div className="row">
                    <div className="col-sm-6 col-md-5 col-lg-6">
                        col-sm-6 col-md-5 col-lg-6
                    </div>
                    <div className="col-sm-6 col-md-5 col-md-offset-2 col-lg-6 col-lg-offset-0">
                        col-sm-6 col-md-5 col-md-offset-2 col-lg-6 col-lg-offset-0
                        </div>
                </div>
                <span className="h1">h1</span>
                <small>small</small>


                <p>
                    Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula.

    Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec ullamcorper nulla non metus auctor fringilla. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Donec ullamcorper nulla non metus auctor fringilla.

    Maecenas sed diam eget risus varius blandit sit amet non magna. Donec id elit non mi porta gravida at eget metus. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
                </p>
                <p className="lead">
                    Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus.
                </p>
                <mark>highlight</mark>
                <del>this is del text</del>
                <ins>this is ins</ins>
                <strong> strong</strong>
                <em> em</em>
            </div>
        );
    }
}

export default PlayListDetail