import request from '../utils/request';

export async function queryMenus() {
  return request('/api/menu', {
    method: 'POST',
  //  body: params,
  });
}
