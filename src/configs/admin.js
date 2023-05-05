import base from "./baseurl";

export default {
  AdminListEndpoint: base.baseurl + '/admin/getAdminUsers',
  AdminAddEndpoint: base.baseurl + '/admin/signUp',
  AdminUpdateEndpoint: base.baseurl + '/admin/updateInternalEmployee',
  AdminSuspendEndpoint: base.baseurl + '/admin/suspendUser',

  AnalyticsEndpoint: base.baseurl + '/admin/getAnalytics',

  AppLinkEndpoint: base.baseurl + '/admin/getApkLink',
  AppLinkAddEndpoint: base.baseurl + '/admin/addApkLink',
}
