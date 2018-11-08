import dva from "dva";
import routers from './config/Routers'
import 'antd/dist/antd.css';
import './public/css/bootstrap.css'

// import createHistory from "history/createBrowserHistory"
import history from './config/History'
import HttpUtil from './util/HttpUtil'

import BaseModel from './model/BaseModel';
import LoginModel from './model/LoginModel'
import SongListModel from './model/SongListModel';
import PlayListDetailModel from './model/PlayListDetailModel';
import PrivateFMModel from './model/PrivateFMModel';

const app = dva({
    history: history,
    onError(error) {
        console.error(error.stack);
    },
});


app.model(LoginModel)
app.model(SongListModel)
app.model(PlayListDetailModel)
app.model(PrivateFMModel)
app.model(BaseModel)

app.router(routers)

window.App_ = {
    history: history,
    dva: app,
    http: HttpUtil
}

app.start("#root")

module.hot.accept();