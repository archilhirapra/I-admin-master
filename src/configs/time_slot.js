import base from "./baseurl";

export default {
  AddHolidayEndpoint: base.baseurl + '/admin/addHoliday',
  GetHolidayEndpoint: base.baseurl + '/admin/getHoliday',


  GetPickupDaysEndpoint: base.baseurl + '/admin/getPickupDays',
  GetDeliveryDaysEndpoint: base.baseurl + '/admin/getDeliveryDays',
}
