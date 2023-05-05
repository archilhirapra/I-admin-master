import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'
import servicesHelperConfig from 'src/configs/services_helper'

// ** Fetch categories

export const fetchHelper = createAsyncThunk('appServicesHelper/fetchData', async params => {
  const data = [];
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
  }


  let isVisible = undefined;
  if (params.isVisible == 'active') {
    isVisible = "true"
  } else if (params.isVisible == 'inactive') {
    isVisible = "false"
  }

  const filterParams = "?" + (params.title ? 'title=' + params.title : '') + (params.categoryId ? '&categoryId=' + params.categoryId : '') + (isVisible ? '&isVisible=' + isVisible : '')

  const response = await axios.get(servicesHelperConfig.ServiceHelperListEndpoint + filterParams, {headers})
  return {
    ServicesHelper: response.data.data.data,
  };

})

// ** Add User
export const addHelper = createAsyncThunk('appServicesHelper/addHelper', async (data, {getState, dispatch}) => {
  const headers = {
    Accept: 'application/json',
    // 'Content-Type': 'application/json',
    'Content-Type': 'multipart/form-data',
    Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
  }
  let returnResponse = null
  try {
    const response = await axios.post(servicesHelperConfig.ServiceHelperAddEndpoint, data, {headers})
    dispatch(fetchHelper(getState().user.params))

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
// ** Edit User
export const editHelper = createAsyncThunk('appServicesHelper/editHelper', async (data, {getState, dispatch}) => {
  const headers = {
    Accept: 'application/json',
    // 'Content-Type': 'application/json',
    'Content-Type': 'multipart/form-data',
    Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
  }
  let returnResponse = null
  try {
    const response = await axios.put(servicesHelperConfig.ServiceHelperEditEndpoint, data, {headers})
    dispatch(fetchHelper(getState().user.params))
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
export const deleteUser = createAsyncThunk('appServicesCategories/deleteUser', async (id, {getState, dispatch}) => {
  const response = await axios.delete('/apps/users/delete', {
    data: id
  })
  dispatch(fetchHelper(getState().user.params))

  return response.data
})

export const appServicesHelperSlice = createSlice({
  name: 'appServicesCategories',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchHelper.fulfilled, (state, action) => {
      state.data = action.payload.ServicesHelper
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appServicesHelperSlice.reducer
