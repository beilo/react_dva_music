import React from 'react';
import './PrivateFM.css'
import { connect } from 'dva';
import { Button } from 'reactstrap';


import { HotComments } from '../playlist/PlayListDetail';


const namespace = "privateFMNamespace"

@connect(
    _state => ({
        lastMusic: _state[namespace].lastMusic,
        currentMusic: _state[namespace].currentMusic,
        nextMusic: _state[namespace].nextMusic,
        currentIndex: _state[namespace].currentIndex,
        comments: _state[namespace].comments
    })
)
class PrivateFM extends React.Component {

    componentDidMount() {
        this.props
            .dispatch({
                type: `${namespace}/initMusic`
            })
            .then(data => {
                if (data) {
                    this.props.dispatch({
                        type: `${namespace}/getCommentData`,
                        payload: {
                            id: data[0].id
                        }
                    })
                    this.props.dispatch({
                        type: "baseNameSpace/getMusicUrl",
                        payload: {
                            musicId: data[0].id
                        }
                    })
                }
            })
    }

    createCommentElement = (comments) => {
        if (comments === undefined || Object.keys(comments).length === 0 || comments.hotComments === undefined) {
            return ""
        } else {
            return comments.hotComments.map((item, index) => {
                return <HotComments  {...{
                    item: item,
                    index: index,
                    key: item.commentId
                }} />
            })
        }
    }

    goNextMusic = () => {
        this.props.dispatch({
            type: `${namespace}/gotoNextMusic`,
        }).then(data => {
            this.props.dispatch({
                type: `${namespace}/getCommentData`,
                payload: {
                    id: data.id
                }
            })
            this.props.dispatch({
                type: "baseNameSpace/getMusicUrl",
                payload: {
                    musicId: data.id
                }
            })
        })
    }


    render() {
        if (this.props.lastMusic === undefined || Object.keys(this.props.lastMusic).length === 0) {
            return ""
        }

        const lastMusicUrl = App_.http.httpToHttps(this.props.lastMusic.artists[0].img1v1Url)
        const currentMusicUrl = App_.http.httpToHttps(this.props.currentMusic.artists[0].img1v1Url)

        return (
            <>
                <div className="row h200">
                    <div className="col-md-2"></div>
                    <div className="col-md-4 ">
                        <img className="imglast" src={lastMusicUrl} />
                        <img className="imgcurrent" src={currentMusicUrl} />
                    </div>
                    <div className="col-md-4">
                        <div className="row">
                            <h3>You're the Shine (Night Butterflies)</h3>
                            <div className="col-md-6">
                                专辑：Rebirth Story
                        </div>
                            <div className="col-md-6">
                                歌手：FELT
                        </div>
                        </div>
                    </div>
                    <div className="col-md-2"></div>
                </div>
                <div className="row controlDiv">
                    <div className="col-md-2"></div>
                    <div className="col-md-4">
                        <div className="row">
                            <div className="col-md-3">
                                <Button color="primary">爱心</Button>
                            </div>
                            <div className="col-md-3">
                                <Button color="primary">删除</Button>
                            </div>
                            <div className="col-md-3" >
                                <Button color="primary" onClick={this.goNextMusic}>下一首</Button>
                            </div>
                            <div className="col-md-3">
                                <Button color="primary">省略</Button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6"></div>
                </div>
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                        {this.createCommentElement(this.props.comments)}
                    </div>
                    <div className="col-md-2"></div>
                </div>
            </>
        )
    }
}

export default PrivateFM