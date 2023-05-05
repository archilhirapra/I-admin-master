import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'
import cuponConfig from 'src/configs/cupons'
import offlineInvoiceConfig from 'src/configs/offline-invoice'

// ** Fetch Users
export const fetchOfflineInvoice = createAsyncThunk('appAdmins/fetchOfflineInvoice', async params => {
  const data = [];
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
  }


  const filterParams = "?" + (params.name ? 'name=' + params.name : '') + (params.start ? '&start=' + params.start : '') + (params.end ? '&end=' + params.end : '') + (params.date ? '&date=' + params.date : '') + (params.min ? '&min=' + params.min : '') + (params.max ? '&max=' + params.max : '')

  const response = await axios.get(offlineInvoiceConfig.OfflineInvoiceEndpoint + filterParams, {headers})
  return {
    offlineInvoice: response.data.data.data,
  };

})

// ** Add User
export const addOfflineInvoice = createAsyncThunk('appAdmin/addOfflineInvoice', async (data, {getState, dispatch}) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    // 'Content-Type': 'multipart/form-data',
    Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
  }
  let returnResponse = null
  try {

    const response = await axios.post(offlineInvoiceConfig.OfflineInvoiceAddEndpoint, data, {headers})
    dispatch(fetchOfflineInvoice(getState().user.params))
    returnResponse = {'status': 'success', 'message': response?.data?.message}
  } catch (e) {
    returnResponse = {
      'status': 'failed',
      'message': (typeof (e?.response?.data?.message) != undefined ? (e?.response?.data?.message) : ('Something went wrong'))
    }

    // if (e?.response?.status == 409) {
    //   returnResponse = { 'status': 'failed', 'message': (e?.response?.data?.message) }
    // } else {
    //   returnResponse = { 'status': 'failed', 'message': (typeof (e?.response?.data?.message) == undefined ? (e?.response?.data?.message) : ('Something went wrong')) }
    // }
  }
  return returnResponse
})


// ** Edit User
export const editOfflineInvoice = createAsyncThunk('appAdmin/editOfflineInvoice', async (data, {
  getState,
  dispatch
}) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    // 'Content-Type': 'multipart/form-data',
    Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
  }
  let returnResponse = null
  try {
    const response = await axios.put(offlineInvoiceConfig.OfflineInvoiceUpdateEndpoint, data, {headers})
    dispatch(fetchOfflineInvoice(getState().user.params))
    returnResponse = {'status': 'success', 'message': response?.data?.message}
  } catch (e) {
    returnResponse = {
      'status': 'failed',
      'message': (typeof (e?.response?.data?.message) != undefined ? (e?.response?.data?.message) : ('Something went wrong'))
    }

    // if (e?.response?.status == 409) {
    //   returnResponse = { 'status': 'failed', 'message': (e?.response?.data?.message) }
    // } else {
    //   returnResponse = { 'status': 'failed', 'message': (typeof (e?.response?.data?.message) == undefined ? (e?.response?.data?.message) : ('Something went wrong')) }
    // }
  }
  return returnResponse


})


// ** Delete User
export const deleteCupon = createAsyncThunk('appAdmins/deleteUser', async (id, {getState, dispatch}) => {
  const response = await axios.delete('/apps/users/delete', {
    data: id
  })
  dispatch(fetchCupons(getState().user.params))

  return response.data
})


export const appOfflineInvoiceSlice = createSlice({
  name: 'appOfflineInvoice',
  initialState: {
    data: [],

  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchOfflineInvoice.fulfilled, (state, action) => {
      state.data = action.payload.offlineInvoice
    })
  }
})

export default appOfflineInvoiceSlice.reducer
