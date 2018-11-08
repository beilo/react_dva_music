import PlayListService from '../service/PlayListService';

export default {
    namespace: "payListDetailNamespace",
    state: {
        playlist: {},
        privileges: [],
        comments: {},
        loading: false,
        id: -1
    },
    subscriptions: {
        setup({
            dispatch,
            history
        }) {
            history.listen((location) => {
                if ("/playListDetail" === location.pathname) {
                    console.log('location is: %o', location);
                    console.log('重定向接收参数：%o', location.state)
                    dispatch({
                        type: 'updateId',
                        payload: location.state,
                    })
                }
            });
        },
    },
    effects: {
        * getData(_, {
            put,
            select
        }) {
            yield put({
                type: "showLoading"
            })
            const id = yield select(state => state.payListDetailNamespace.id)
            const data = yield PlayListService.getPayListDetail(id)
            yield put({
                type: "addData",
                payload: {
                    playlist: data.playlist,
                    privileges: data.privileges
                }
            })
            yield put({
                type: "endLoading"
            })
        },
        * getCommentData(_, {
            select,
            put
        }) {
            const id = yield select(state => state.payListDetailNamespace.id)
            const data = yield PlayListService.getComment(id)
            yield put({
                type: "addCommentData",
                payload: {
                    comments: data
                }
            })
        }
    },
    reducers: {
        showLoading(state) {
            return {
                ...state,
                loading: true
            }
        },
        endLoading(state) {
            return {
                ...state,
                loading: false
            }
        },
        addData(state, action) {
            return {
                ...state,
                playlist: action.payload.playlist,
                privileges: action.payload.privileges
            }
        },
        addCommentData(state, action) {
            return {
                ...state,
                comments: action.payload.comments
            }
        },
        updateId(state, action) {
            return {
                ...state,
                id: action.payload.id
            }
        }
    }
}