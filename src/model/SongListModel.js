import RecommendService from '../service/RecommendService';

export default {
    namespace: "songListNamespace",
    state: {
        playlist: [],
        loading: false,
    },
    effects: {
        * getDataList(_, {
            call,
            put,
            select
        }) {
            yield put({
                type: "showLoadding"
            })
            const response = yield RecommendService.songList()
            const data = response.result
            yield put({
                type: "addData",
                payload: {
                    data: data
                }
            })
            yield put({
                type: "endLoadding"
            })
        },

        // 展示下怎么传递参数到effects
        * pushPlayListDetail({
            payload
        }, {
            put
        }) {
            App_.history.push({
                pathname: '/playListDetail',
                state: {
                    id: payload.id
                }
            })
        }
    },
    reducers: {
        showLoadding(state) {
            return { ...state,
                loading: true
            }
        },
        endLoadding(state) {
            return { ...state,
                loading: false
            }
        },
        addData(state, action) {
            return {
                ...state,
                playlist: action.payload.data
            }
        }
    }
}