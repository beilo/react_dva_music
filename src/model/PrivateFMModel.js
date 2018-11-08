export default {
    namespace: "privateFMNamespace",
    state: {
        histroyData: [],
        lastMusic: {},
        currentMusic: {},
        nextMusic: {},
        currentIndex: -1,
        comments: []
    },
    effects: {
        * getCommentData({
            payload
        }, {
            select,
            put
        }) {
            const response = yield App_.http.get(`comment/music?id=${payload.id}`)
            const data = response
            yield put({
                type: "addCommentData",
                payload: {
                    comments: data
                }
            })
        },

        * initMusic(_, {
            put,
            call
        }) {
            const response = yield App_.http.get("personal_fm")
            const data = response.data
            console.log(data)
            if (data) {
                yield put({
                    type: "updateMusic",
                    payload: {
                        lastMusic: data[0],
                        currentMusic: data[0],
                        nextMusic: data[1],
                        currentIndex: 1,
                        histroyData: data
                    }
                })
            }
            return data
        },

        * gotoLastMusic(_, {
            select,
            put
        }) {
            const {
                histroyData,
                currentIndex
            } = yield select(state => state.privateFMNamespace)

            if (currentIndex >= 1 && currentIndex <= histroyData.length - 2) {
                yield put({
                    type: "updateMusic",
                    payload: {
                        lastMusic: histroyData[currentIndex - 2],
                        currentMusic: histroyData[currentIndex - 1],
                        nextMusic: histroyData[currentIndex],
                        currentIndex: currentIndex - 1,
                        histroyData: histroyData
                    }
                })
            } else if (currentIndex <= 0) {
                // 0 没有last
            } else if (currentIndex >= histroyData.length - 1) {
                // 这里不处理 交给 next处理
            }


        },

        gotoNextMusic: function* (_, {
            select,
            put,
            call
        }) {
            const stateData = yield select(state => state.privateFMNamespace)
            const histroyData = stateData.histroyData
            const currentIndex = stateData.currentIndex
            if (currentIndex >= 1 && currentIndex <= histroyData.length - 2) {
                yield put({
                    type: "updateMusic",
                    payload: {
                        lastMusic: histroyData[currentIndex],
                        currentMusic: histroyData[currentIndex + 1],
                        nextMusic: histroyData[currentIndex + 2],
                        currentIndex: currentIndex + 1,
                        histroyData: histroyData
                    }
                })
                return histroyData[currentIndex + 1]
            } else if (currentIndex <= 0) {
                console.log(currentIndex + "111111111111")
            } else {
                const response = yield App_.http.get("personal_fm")
                const data = response.data
                const histroyData = yield select(state => state.privateFMNamespace.histroyData)
                const currentIndex = yield select(state => state.privateFMNamespace.currentIndex)
                const concatData = histroyData.concat(data)
                if (data) {
                    yield put({
                        type: "updateMusic",
                        payload: {
                            lastMusic: concatData[currentIndex],
                            currentMusic: concatData[currentIndex + 1],
                            nextMusic: concatData[currentIndex + 2],
                            currentIndex: currentIndex + 1,
                            histroyData: concatData
                        }
                    })
                    return concatData[currentIndex + 1]
                }
            }

        }
    },
    reducers: {
        updateData(state, action) {
            let {
                histroyData
            } = state
            const {
                dataAction
            } = action.payload
            if (!histroyData.includes(dataAction)) {
                histroyData = histroyData.concat(dataAction)
                return {
                    ...state,
                    histroyData: histroyData
                }
            }
        },
        updateMusic(state, action) {
            const {
                lastMusic,
                currentMusic,
                nextMusic,
                currentIndex,
                histroyData
            } = action.payload
            return {
                ...state,
                lastMusic: lastMusic,
                currentMusic: currentMusic,
                nextMusic: nextMusic,
                currentIndex: currentIndex,
                histroyData: histroyData
            }
        },
        addCommentData(state, {
            payload
        }) {
            return {
                ...state,
                comments: payload.comments
            }
        }
    }
}