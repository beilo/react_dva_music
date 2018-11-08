class PlayListService {
    static getPayListDetail(id) {
        return App_.http.get("playlist/detail?id=" + id)
    }

    static getComment(id) {
        return App_.http.get(`comment/playlist?id=${id}`)
    }
}

export default PlayListService