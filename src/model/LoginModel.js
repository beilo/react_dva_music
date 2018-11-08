import LoginService from '../service/LoginService'

export default {
    namespace: "loginNamespace",
    state: {
        loading: false,
        data: {}
    },
    effects: {
        * login({
            payload
        }, {
            call,
            put,
            select
        }) {
            const {
                email,
                pwd
            } = payload
            yield put({
                type: "showLoading"
            })
            const data = yield LoginService.login(email, pwd)
            yield put({
                type: "addData",
                payload: {
                    data: data
                }
            })
            yield put({
                type: "hideLoading"
            })
            App_.history.push("/songList")
        }
    },
    reducers: {
        showLoading(state) {
            return { ...state,
                loading: true
            }
        },
        hideLoading(state) {
            return { ...state,
                loading: false
            }
        },
        addData: (state, action) => {
            return {
                ...state,
                data: action.payload.data
            }
        }
    }
}