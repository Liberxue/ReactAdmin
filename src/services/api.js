import { stringify } from 'qs';
import request from '../utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice',{method:'GET'});
}

export async function queryActivities() {
  return request('/api/activities',{method:'GET'});
}

export async function adminList(params) {
  // return request(`/api/admin?${stringify(params)}`,{method:'GET'});
  return request(`/api/admin`,{method:'POST'});
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data',{method:'GET'});
}

export async function queryTags() {
  return request('/v0/api/tags',{method:'GET'});
}

export async function queryBasicProfile() {
  return request('/api/profile/basic',{method:'GET'});
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced',{method:'GET'});
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`,{method:'GET'});
}

export async function fakeAccountLogin(params) {
  return request('/api/login', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices',{method:'GET'});
}

// export async function MenuList() {
//   return request('/api/MenuList',{method:'GET'});
// }
export async function TpsList(params) {
  return request(`/api/tpslist`,{method:'POST'});
}
export async function removeTPS(params) {
  // return request(`/api/admin?${stringify(params)}`,{method:'GET'});
  return request(`/api/admin`,{method:'POST'});
}
export async function addTps(params) {
  // return request(`/api/admin?${stringify(params)}`,{method:'GET'});
  return request(`/api/admin`,{method:'POST'});
}
//auth
export async function Authlist(params) {
  return request(`/api/authlist`,{method:'POST'});
}
export async function removeAuth(params) {
  // return request(`/api/admin?${stringify(params)}`,{method:'GET'});
  return request(`/api/authlist`,{method:'POST'});
}
export async function addAuth(params) {
  // return request(`/api/admin?${stringify(params)}`,{method:'GET'});
  return request(`/api/authlist`,{method:'POST'});
}
//product
export async function ProductList(params) {
  return request(`/api/ProductList`,{method:'POST'});
}
export async function removeProduct(params) {
  return request(`/api/authlist`,{method:'POST'});
}
export async function addProduct(params) {
  return request(`/api/authlist`,{method:'POST'});
}