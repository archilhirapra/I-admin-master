import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'
// import adminConfig from 'src/configs/admin'
import servicesCategoryConfig from 'src/configs/services_category'

// ** Fetch categories
export const fetchData = createAsyncThunk('appServicesCategories/fetchData', async params => {
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
  let isSubscription = undefined;
  if (params.isSubscription == 'active') {
    isSubscription = "true"
  } else if (params.isSubscription == 'inactive') {
    isSubscription = "false"
  }

  const filterParams = "?" + (params.name ? 'name=' + params.name : '') + (isSubscription ? '&isSubscription=' + isSubscription : '') + (isVisible ? '&isVisible=' + isVisible : '')

  const response = await axios.get(servicesCategoryConfig.ServiceCategoryListEndpoint + filterParams, {headers})
  return {
    ServicesCategory: response.data.data.data,
  };

})

// ** Add User
export const addCategory = createAsyncThunk('appServicesCategories/addUser', async (data, {getState, dispatch}) => {
  const headers = {
    Accept: 'application/json',
    // 'Content-Type': 'application/json',
    'Content-Type': 'multipart/form-data',
    Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
  }
  let returnResponse = null
  try {
    const response = await axios.post(servicesCategoryConfig.ServiceCategoryAddEndpoint, data, {headers})
    dispatch(fetchData(getState().user.params))
    returnResponse = {'status': 'success', 'message': response?.data?.message}
  } catch (e) {
    returnResponse = {
      'status': 'failed',
      'message': (typeof (e?.response?.data?.message) != undefined ? (e?.response?.data?.message) : ('Something went wrong'))
    }

    // if (e?.response?.status) {
    //   returnResponse = { 'status': 'failed', 'message': (e?.response?.data?.message) }
    // }
  }
  return returnResponse


})
// ** Edit User
export const editCategory = createAsyncThunk('appServicesCategories/editUser', async (data, {getState, dispatch}) => {
  const headers = {
    Accept: 'application/json',
    // 'Content-Type': 'application/json',
    'Content-Type': 'multipart/form-data',
    Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
  }
  let returnResponse = null

  try {
    const response = await axios.put(servicesCategoryConfig.ServiceCategoryEditEndpoint, data, {headers})
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
export const deleteUser = createAsyncThunk('appServicesCategories/deleteUser', async (id, {getState, dispatch}) => {
  const response = await axios.delete('/apps/users/delete', {
    data: id
  })
  dispatch(fetchData(getState().user.params))

  return response.data
})

export const appServicesCategoriesSlice = createSlice({
  name: 'appServicesCategories',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.ServicesCategory
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appServicesCategoriesSlice.reducer
