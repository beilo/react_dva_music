import React from 'react'
import { List, Avatar, Spin } from 'antd';
import axios from 'axios'
import { connect } from "dva";


const namespace = "songListNamespace"

const mapStateToProps = (state) => {
    const songListData = state[namespace]
    return {
        songListData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDataList: () => {
            dispatch({
                type: `${namespace}/getDataList`
            })
        },
        onPushSongList: (id) => {
            dispatch({
                type: `${namespace}/pushPlayListDetail`,
                payload: {
                    id, id
                }
            })
        }
    }
}


class SongList extends React.Component {
    state = {
        playlist: [],
        loading: false
    }

    componentDidMount() {
        this.props.getDataList()
    }

    render() {
        return (

            <Spin tip="加载数据,请稍等..." spinning={this.state.loading} delay="500">
                <List
                    itemLayout="horizontal"
                    dataSource={this.props.songListData.playlist}
                    renderItem={(item) => (
                        <List.Item style={{ height: "100px" }}>
                            <List.Item.Meta
                                avatar={<Avatar style={{ width: "80px", height: "80px" }} src={item.picUrl} />}
                                title={<span
                                    onClick={() => {
                                        this.props.onPushSongList(item.id)
                                    }}
                                    style={{ fontSize: "140%" }}>{item.name}</span>}
                                description={<span style={{ fontSize: "120%" }}>{item.copywriter}</span>}
                            >
                            </List.Item.Meta>
                        </List.Item>
                    )}
                />
            </Spin>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SongList);