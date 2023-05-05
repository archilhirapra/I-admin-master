import base from "./baseurl";

export default {
  // meEndpoint: '/auth/me',
  // loginEndpoint: '/jwt/login',
  loginEndpoint: base.baseurl + '/admin/login',
  resendOtpEndpoint: base.baseurl + '/admin/resendOtp',
  verifyOtpEndpoint: base.baseurl + '/admin/authenticateOtpLogin',
  meEndpoint: base.baseurl + '/admin/getAdminProfile',
  forgetSetPassword: base.baseurl + '/admin/setPassword',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken'
}
