import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'
// import adminConfig from 'src/configs/admin'
import riderConfig from 'src/configs/rider'

// ** Fetch Users
export const fetchRiderList = createAsyncThunk('appRiders/fetchRiderList', async params => {
  const data = [];
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
  }


  const filterParams = "?" + (params.name ? 'name=' + params.name : '') + (params.activeStatus ? '&activeStatus=' + params.activeStatus : '') + (params.jobStatus ? '&jobStatus=' + params.jobStatus : '')

  const response = await axios.get(riderConfig.RiderListEndpoint + filterParams, {headers})
  return {
    users: response.data.data.data,
  };

})

// ** Add User
export const addRider = createAsyncThunk('appAdmin/addUser', async (data, {getState, dispatch}) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    // 'Content-Type': 'multipart/form-data',
    Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
  }
  let returnResponse = null
  try {
    const response = await axios.post(riderConfig.RiderAddEndpoint, data, {headers})
    dispatch(fetchRiderList(getState().user.params))
    returnResponse = {'status': 'success', 'message': response?.data?.message}
  } catch (e) {
    returnResponse = {
      'status': 'failed',
      'message': (typeof (e?.response?.data?.message) != undefined ? (e?.response?.data?.message) : ('Something went wrong'))
    }

    // if (e?.response?.status == 409) {
    //   returnResponse = { 'status': 'failed', 'message': (e?.response?.data?.message) }
    // }else{
    //   returnResponse = { 'status': 'failed', 'message': (e?.response?.data?.message) }
    // }
  }
  return returnResponse
})


// ** Edit User
export const editRider = createAsyncThunk('appAdmin/editUser', async (data, {getState, dispatch}) => {
  const headers = {
    Accept: 'application/json',
    // 'Content-Type': 'application/json',
    'Content-Type': 'multipart/form-data',
    Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
  }
  let returnResponse = null
  try {
    const response = await axios.put(riderConfig.RiderEditEndpoint, data, {headers})
    dispatch(fetchRiderList(getState().user.params))
    returnResponse = {'status': 'success', 'message': response?.data?.message}
  } catch (e) {
    returnResponse = {
      'status': 'failed',
      'message': (typeof (e?.response?.data?.message) != undefined ? (e?.response?.data?.message) : ('Something went wrong'))
    }

    // if (e?.response?.status == 409) {
    //   returnResponse = { 'status': 'failed', 'message': (e?.response?.data?.message) }
    // } else {
    //   returnResponse = { 'status': 'failed', 'message': (typeof (e?.response?.data?.message) != undefined ? (e?.response?.data?.message) : ('Something went wrong')) }
    // }
  }
  return returnResponse


})


// ** Delete User
export const deleteUser = createAsyncThunk('appAdmins/deleteUser', async (id, {getState, dispatch}) => {
  const response = await axios.delete('/apps/users/delete', {
    data: id
  })
  dispatch(fetchRiderList(getState().user.params))

  return response.data
})

export const appAdminsSlice = createSlice({
  name: 'appAdmins',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchRiderList.fulfilled, (state, action) => {
      state.data = action.payload.users
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appAdminsSlice.reducer
