import { ProductList, removeProduct, addProduct } from '../services/api';

export default {
  namespace: 'product',

  state: {
    data: {
      Data: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(ProductList, payload);
      yield put({
        type: 'save',
         payload: response,
      // payload: Array.isArray(response.Data) ? response : [],
      });
      console.log(response.Data)
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addProduct, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeProduct, payload);
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
