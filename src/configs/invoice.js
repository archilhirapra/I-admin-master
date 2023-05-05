import base from "./baseurl";

export default {
  // InvoiceListEndpoint: base.baseurl + '/admin/invoiceList',
  InvoiceListEndpoint: base.baseurl + '/admin/getOrders',

  //*** init order */
  AddOrderEndpoint: base.baseurl + '/admin/addOrder',
//** get order by id */
  GetOrderbyOrderIdEndpoint: base.baseurl + '/admin/getUserOrders',

  //** add Order Item by userid and orderId*/
  AddOrderByUserIdEndpoint: base.baseurl + '/admin/addOrderItem',

  UpdateOrderStatusEndpoint: base.baseurl + '/admin/updateOrderStatus',


  AssignPickupEndpoint: base.baseurl + '/admin/assignPickup',
  AssignDeliveryEndpoint: base.baseurl + '/admin/assignDelivery',
  // UpdateOrderStatusEndpoint: base.baseurl + '/admin/updateOrderStatus',

}
