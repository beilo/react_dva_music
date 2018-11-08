import MusicService from '../service/MusicService';
export default {
    namespace: "baseNameSpace",
    state: {
        musicId: -1,
        musicData: [],
        musicUrl: ""
    },
    effects: {
        * getMusicUrl({
            payload
        }, {
            put,
            select
        }) {
            const response = yield MusicService.musicUrl(payload.musicId)
            yield put({
                type: "updateMusicData",
                payload: {
                    musicData: response.data,
                    musicId: payload.musicId
                }
            })
        }
    },
    reducers: {
        updateMusicData(state, action) {
            let musicUrl = ""
            if (action.payload.musicData !== undefined && Object.keys(action.payload.musicData).length !== 0) {
                musicUrl = App_.http.httpToHttps(action.payload.musicData[0].url)
            }

            return {
                ...state,
                musicData: action.payload.musicData,
                musicId: action.payload.musicId,
                musicUrl: musicUrl
            }
        }
    }
}