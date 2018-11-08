class RecommendService {
    static songList() {
        return App_.http.get("personalized")
    }
}

export default RecommendService