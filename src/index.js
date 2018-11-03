// import '@babel/polyfill';
// import 'url-polyfill';
// import dva from 'dva';
// import createHistory from 'history/createHashHistory';
// import createLoading from 'dva-loading';
// import { notification } from 'antd';
// import 'moment/locale/zh-cn';
// import './rollbar';
// import './index.less';
import '@babel/polyfill';
import 'url-polyfill';
import dva from 'dva';
import { routerRedux } from 'dva/router';
import { notification } from 'antd';
import 'moment/locale/zh-cn';
import './rollbar';
import createHistory from 'history/createHashHistory';
import createLoading from 'dva-loading';
import './index.less';
// 1. Initialize
// const app = dva({
//   history: createHistory(),
// });
const app = dva({
  onError(err, dispatch) {
    const { response, message } = err;
    const { status, url } = response;
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: message,
    });
    if (status === 403) {
      dispatch(routerRedux.push('/user/login'));
    }
  },
  history: createHistory(),
  // history: browserHistory(),
});

// 2. Plugins
app.use(createLoading());

// 3. Register global model
app.model(require('./models/global').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');

export default app._store; // eslint-disable-line
