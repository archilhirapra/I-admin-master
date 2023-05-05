import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'
// import adminConfig from 'src/configs/admin'
import servicesCategoryConfig from 'src/configs/services_category'
import servicesItemConfig from 'src/configs/items'

// ** Fetch categories
export const fetchItems = createAsyncThunk('appServicesItem/fetchItems', async params => {
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

  const filterParams = "?" + (params.name ? 'name=' + params.name : '') + (params.categoryId ? '&categoryId=' + params.categoryId : '') + (params.unitType ? '&unitType=' + params.unitType : '') + (params.isBag ? '&isBag=' + params.isBag : '') + (params.isVisible ? '&isVisible=' + params.isVisible : '')
  const response = await axios.get(servicesItemConfig.ServiceItemListEndpoint + filterParams, {headers})
  return {
    ServicesItem: response.data.data.data,
  };

})

// ** Add User
export const addItem = createAsyncThunk('appServicesItem/addItem', async (data, {getState, dispatch}) => {
  const headers = {
    Accept: 'application/json',
    // 'Content-Type': 'application/json',
    'Content-Type': 'multipart/form-data',
    Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
  }
  let returnResponse = null
  try {
    const response = await axios.post(servicesItemConfig.ServiceItemAddEndpoint, data, {headers})
    dispatch(fetchItems(getState().user.params))
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
export const editItem = createAsyncThunk('appServicesItem/editItem', async (data, {getState, dispatch}) => {
  const headers = {
    Accept: 'application/json',
    // 'Content-Type': 'application/json',
    'Content-Type': 'multipart/form-data',
    Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
  }
  let returnResponse = null
  try {
    const response = await axios.put(servicesItemConfig.ServiceItemEditEndpoint, data, {headers})
    dispatch(fetchItems(getState().user.params))
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
export const deleteItem = createAsyncThunk('appServicesItem/deleteItem', async (id, {getState, dispatch}) => {
  const response = await axios.delete('/apps/users/delete', {
    data: id
  })
  dispatch(fetchItems(getState().user.params))

  return response.data
})

export const appServicesItemsSlice = createSlice({
  name: 'appServicesItems',
  initialState: {
    data: [],
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.data = action.payload.ServicesItem
    })
  }
})

export default appServicesItemsSlice.reducer
