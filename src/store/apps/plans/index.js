import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'
import adminConfig from 'src/configs/admin'
import planConfig from 'src/configs/plans'

// ** Fetch Users
export const fetchPlans = createAsyncThunk('appAdmins/fetchPlans', async params => {
  const data = [];
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
  }


  const filterParams = "?" + (params.name ? 'name=' + params.name : '') + (params.isVisible ? '&isVisible=' + params.isVisible : '')

  const response = await axios.get(planConfig.PlanListEndpoint + filterParams, {headers})
  return {
    plans: response.data.data.data,
  };

})

// ** Add User
export const addPlan = createAsyncThunk('appAdmin/addPlan', async (data, {getState, dispatch}) => {

  const headers = {
    Accept: 'application/json',
    // 'Content-Type': 'application/json',
    'Content-Type': 'multipart/form-data',
    Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
  }
  let returnResponse = null
  try {

    const response = await axios.post(planConfig.PlanAddEndpoint, data, {headers})
    dispatch(fetchPlans(getState().user.params))
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
export const editPlan = createAsyncThunk('appAdmin/editPlan', async (data, {getState, dispatch}) => {
  const headers = {
    Accept: 'application/json',
    // 'Content-Type': 'application/json',
    'Content-Type': 'multipart/form-data',
    Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
  }
  let returnResponse = null
  try {
    const response = await axios.put(planConfig.PlanEditEndpoint, data, {headers})
    dispatch(fetchPlans(getState().user.params))
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
  dispatch(fetchPlans(getState().user.params))

  return response.data
})

export const appPlansSlice = createSlice({
  name: 'appPlans',
  initialState: {
    data: [],

  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchPlans.fulfilled, (state, action) => {
      state.data = action.payload.plans
    })
  }
})

export default appPlansSlice.reducer
