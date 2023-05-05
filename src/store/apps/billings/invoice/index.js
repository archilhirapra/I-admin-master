import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'
// import adminConfig from 'src/configs/admin'
import invoiceConfig from 'src/configs/invoice'

// ** Fetch Users
export const fetchInvoices = createAsyncThunk('appAdmins/fetchInvoices', async params => {
  const data = [];
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
  }


// console.log(params)


  const filterParams = "?" + (params.userId ? 'userId=' + params.userId : '') + (params.name ? '&name=' + params.name : '') + (params.role ? '&role=' + params.role : '') + (params.status ? '&status=' + params.status : '') + (params.pickupStart ? '&pickupStart=' + params.pickupStart : '') + (params.pickupEnd ? '&pickupEnd=' + params.pickupEnd : '') + (params.deliveryStart ? '&deliveryStart=' + params.deliveryStart : '') + (params.deliveryEnd ? '&deliveryEnd=' + params.deliveryEnd : '') + (params.min ? '&min=' + params.min : '') + (params.max ? '&max=' + params.max : '')

  const response = await axios.get(invoiceConfig.InvoiceListEndpoint + filterParams, {headers})
  return {
    invoices: response.data.data.data,
  };

})


// ** Add User
export const addInvoice = createAsyncThunk('appAdmin/addUser', async (data, {getState, dispatch}) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    // 'Content-Type': 'multipart/form-data',
    Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
  }
  let returnResponse = null
  try {

    const response = await axios.post(invoiceConfig.AddOrderEndpoint, data, {headers})
    dispatch(fetchInvoices(getState().user.params))
    returnResponse = {'status': 'success', 'message': response?.data?.message}
  } catch (e) {
    returnResponse = {
      'status': 'failed',
      'message': (typeof (e?.response?.data?.message) != undefined ? (e?.response?.data?.message) : ('Something went wrong'))
    }

    // if (e?.response?.status == 409) {
    //   returnResponse = { 'status': 'failed', 'message': (e?.response?.data?.message) }
    // } else {
    //   returnResponse = { 'status': 'failed', 'message': (e?.response?.data?.message) }
    // }
  }
  return returnResponse
})


// ** Edit User
export const editAdmin = createAsyncThunk('appAdmin/editUser', async (data, {getState, dispatch}) => {
  const headers = {
    Accept: 'application/json',
    // 'Content-Type': 'application/json',
    'Content-Type': 'multipart/form-data',
    Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
  }
  let returnResponse = null
  try {
    const response = await axios.put(adminConfig.AdminUpdateEndpoint, data, {headers})
    dispatch(fetchData(getState().user.params))

    returnResponse = {'status': 'success', 'message': response?.data?.message}
  } catch (e) {
    returnResponse = {
      'status': 'failed',
      'message': (typeof (e?.response?.data?.message) != undefined ? (e?.response?.data?.message) : ('Something went wrong'))
    }


    // if (e?.response?.status == 409) {
    //   returnResponse = { 'status': 'failed', 'message': (e?.response?.data?.message) }
    // }

  }
  return returnResponse


})


// ** Delete User
export const deleteUser = createAsyncThunk('appAdmins/deleteUser', async (id, {getState, dispatch}) => {
  const response = await axios.delete('/apps/users/delete', {
    data: id
  })
  dispatch(fetchData(getState().user.params))

  return response.data
})

export const appInvoicesSlice = createSlice({
  name: 'appInvoices',
  initialState: {
    data: [],
    // total: 1,
    // params: {},
    // allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchInvoices.fulfilled, (state, action) => {
      state.data = action.payload.invoices
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appInvoicesSlice.reducer
