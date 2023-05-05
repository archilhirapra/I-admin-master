import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'
import customerConfig from 'src/configs/customer'

// ** Fetch Users
export const fetchCustomerList = createAsyncThunk('appCustomers/fetchCustomerList', async params => {
  const data = [];
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
  }

  // axios.get(adminConfig.AdminListEndpoint, params, { headers: headers })

  const filterParams = "?" + (params.name ? 'name=' + params.name : '') + (params.role ? '&role=' + params.role : '') + (params.currentPlan ? '&currentPlan=' + params.currentPlan : '') + (params.status ? '&status=' + params.status : '')

  const response = await axios.get(customerConfig.CustomerListEndpoint + filterParams, {headers})
  return {
    customers: response.data.data.data,
  };

})

// ** Add User
export const addCustomer = createAsyncThunk('appCustomer/addCustomer', async (data, {getState, dispatch}) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    // 'Content-Type': 'multipart/form-data',
    Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
  }
  let returnResponse = null
  try {
    const response = await axios.post(customerConfig.CustomerAddEndpoint, data, {headers})
    dispatch(fetchCustomerList(getState().user.params))
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
export const editCustomer = createAsyncThunk('appCustomer/editCustomer', async (data, {getState, dispatch}) => {
  const headers = {
    Accept: 'application/json',
    // 'Content-Type': 'application/json',
    'Content-Type': 'multipart/form-data',
    Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
  }
  let returnResponse = null
  try {
    const response = await axios.put(customerConfig.AdminListEndpoint, data, {headers})
    dispatch(fetchCustomerList(getState().user.params))
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
export const deleteCustomer = createAsyncThunk('appCustomer/deleteCustomer', async (id, {getState, dispatch}) => {
  const response = await axios.delete('/apps/users/delete', {
    data: id
  })
  dispatch(fetchCustomerList(getState().user.params))

  return response.data
})

export const appCustomersSlice = createSlice({
  name: 'appCustomer',
  initialState: {
    data: [],

  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCustomerList.fulfilled, (state, action) => {
      state.data = action.payload.customers

    })
  }
})

export default appCustomersSlice.reducer
