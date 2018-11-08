import axios from 'axios'



const Axios = axios.create({
    baseURL: "http://localhost:3000/",
    timeout: 10000,
    responseType: "json",
    withCredentials: true, // 是否允许带cookie这些
});

export default class HttpUtil {
    static async get(url, option) {
        try {
            const response = await Axios.get(url, option);
            if (response.status == 200) {
                return response.data
            } else {
                throw new Error("接口错误")
            }
        } catch (error) {
            console.error(error);
        }

    }

    static httpToHttps(url) {
        if (url !== undefined) {
            if (url.includes("https")) {} else if (url.includes("http")) {
                url = url.replace("http", "https")
            }
        }
        return url
    }
}