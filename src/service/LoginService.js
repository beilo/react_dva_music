import HttpUtil from "../util/HttpUtil"

class LoginService {
    static login(email, pwd) {
        let url = "login?email=" + email + "&password=" + pwd
        return HttpUtil.get(url);
    }
}
export default LoginService