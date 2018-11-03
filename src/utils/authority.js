// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
  //return localStorage.getItem('antd-pro-authority') || 'admin';
 // return localStorage.getItem('MQ');
 return sessionStorage.getItem('MQ');
}

export function setAuthority(authority) {
//  return localStorage.setItem('MQ', authority);
return sessionStorage.setItem('MQ', authority);
}
