import { Authlist, removeAuth, addAuth } from '../services/api';

export default {
  namespace: 'auth',

  state: {
    data: {
      Data: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(Authlist, payload);
      yield put({
        type: 'save',
         payload: response,
      // payload: Array.isArray(response.Data) ? response : [],
      });
      console.log(response.Data)
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addAuth, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeAuth, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
