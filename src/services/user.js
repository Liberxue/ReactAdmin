import request from '../utils/request';
import token from '../utils/token';
export async function query() {
  return request('/api/users',{
    method: 'POST',
  });
}

// function buildLoginUser()  {
//   const loginuserVal = getLoginUser.get();
//   return (LoginUser !== '') ? `${loginuserVal}` : '';
// }
export async function queryCurrent() {
  return request('/v0/api/currentUser', {
    method: 'POST',
  //  body: params,
  });
 ///return request('/api/currentUser');
  //return request(token.getLoginUser());
}

// export const queryCurrent= token.getLoginUser();
