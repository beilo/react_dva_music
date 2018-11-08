class MusicService {
    static musicUrl(id) {
        return App_.http.get(`/song/url?id=${id}`)
    }
}

export default MusicService