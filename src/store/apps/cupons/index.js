import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'
import cuponConfig from 'src/configs/cupons'

// ** Fetch Users
export const fetchCupons = createAsyncThunk('appAdmins/fetchData', async params => {
  const data = [];
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
  }


  const filterParams = "?" + (params.name ? 'name=' + params.name : '') + (params.status ? 'status=' + params.status : '') + (params.start ? '&start=' + params.start : '') + (params.end ? '&end=' + params.end : '') + (params.date ? '&date=' + params.date : '')

  const response = await axios.get(cuponConfig.CuponListEndpoint + filterParams, {headers})
  return {
    cupons: response.data.data.data,
  };

})

// ** Add User
export const addCupon = createAsyncThunk('appAdmin/addUser', async (data, {getState, dispatch}) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    // 'Content-Type': 'multipart/form-data',
    Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
  }
  let returnResponse = null
  try {

    const response = await axios.post(cuponConfig.CuponAddEndpoint, data, {headers})
    dispatch(fetchCupons(getState().user.params))
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
export const editCupon = createAsyncThunk('appAdmin/editUser', async (data, {getState, dispatch}) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    // 'Content-Type': 'multipart/form-data',
    Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
  }
  let returnResponse = null
  try {
    const response = await axios.put(cuponConfig.CuponUpdateEndpoint, data, {headers})
    dispatch(fetchCupons(getState().user.params))
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

export const appCuponsSlice = createSlice({
  name: 'appCupons',
  initialState: {
    data: [],

  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCupons.fulfilled, (state, action) => {
      state.data = action.payload.cupons
    })
  }
})

export default appCuponsSlice.reducer
