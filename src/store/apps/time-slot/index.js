import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'
// import adminConfig from 'src/configs/admin'
import servicesCategoryConfig from 'src/configs/services_category'
import timeSlotConfig from 'src/configs/time_slot'

// ** Fetch categories
export const fetchHolidays = createAsyncThunk('appTimeSlot/fetchHolidays', async params => {
  const data = [];
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
  }

  const filterParams = "?" + (params.name ? 'name=' + params.name : '')
  const response = await axios.get(timeSlotConfig.GetHolidayEndpoint + filterParams, {headers})
  return {
    timeSlots: response.data.data.data,
  };

})

// ** Add User
export const addHoliday = createAsyncThunk('appTimeSlot/addHoliday', async (data, {getState, dispatch}) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    // 'Content-Type': 'multipart/form-data',
    Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
  }
  let returnResponse = null
  // console.log(data)
  // return
  try {
    const response = await axios.post(timeSlotConfig.AddHolidayEndpoint, data, {headers})
    dispatch(fetchHolidays(getState().user.params))
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
    dispatch(fetchHolidays(getState().user.params))
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
  dispatch(fetchHolidays(getState().user.params))

  return response.data
})

export const appTimeSlotSlice = createSlice({
  name: 'appTimeSlot',
  initialState: {
    data: [],
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchHolidays.fulfilled, (state, action) => {
      state.data = action.payload.timeSlots
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appTimeSlotSlice.reducer
