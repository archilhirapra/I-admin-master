import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'
// import adminConfig from 'src/configs/admin'
import paymentConfig from 'src/configs/payment'

// ** Fetch Users
export const fetchPayments = createAsyncThunk('appAdmins/fetchInvoices', async params => {
  const data = [];
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
  }


  let status = 0;
  if (params.status == 'active') {
    status = 0
  } else if (params.status == 'inactive') {
    status = 1
  }


  const filterParams = "?" + (params.name ? 'name=' + params.name : '') + (params.role ? '&role=' + params.role : '') + (params.status ? '&status=' + status : '')

  const response = await axios.get(paymentConfig.PaymentListEndpoint + filterParams, {headers})
  return {
    payments: response.data.data.data,
  };

})

// ** Add User
export const addAdmin = createAsyncThunk('appAdmin/addUser', async (data, {getState, dispatch}) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    // 'Content-Type': 'multipart/form-data',
    Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
  }
  let returnResponse = null
  try {

    const response = await axios.post(adminConfig.AdminAddEndpoint, data, {headers})
    dispatch(fetchData(getState().user.params))
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

export const appPaymentsSlice = createSlice({
  name: 'appPayments',
  initialState: {
    data: [],
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchPayments.fulfilled, (state, action) => {
      state.data = action.payload.payments
    })
  }
})

export default appPaymentsSlice.reducer
