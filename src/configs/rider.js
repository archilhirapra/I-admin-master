import base from "./baseurl";

export default {
  RiderListEndpoint: base.baseurl + '/rider/getUsers',
  GetRiderEndpoint: base.baseurl + '/admin/getRiderDetails',
  GetRiderVehicleEndPoint: base.baseurl + '/admin/getRiderVehicle',
  RiderAddEndpoint: base.baseurl + '/rider/signUp',
  RiderEditEndpoint: base.baseurl + '/admin/updateRider',


  RiderUpdateWithOtpEndpoint: base.baseurl + '/admin/updateRiderWithOtp',
  RiderOtpEndpoint: base.baseurl + '/rider/resendOtp',

}
