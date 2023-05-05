import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'
import subscriptionConfig from 'src/configs/subscriptions'

// ** Fetch Users
export const fetchSubscription = createAsyncThunk('appAdmins/fetchSubscriptions', async params => {
  const data = [];
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
  }


  const filterParams = "?" + (params.name ? 'name=' + params.name : '')

  const response = await axios.get(subscriptionConfig.SubscriptionListEndpoint + filterParams, {headers})
  return {
    subscriptions: response.data.data.data,
  };

})


export const appSubscriptionsSlice = createSlice({
  name: 'appSubscriptions',
  initialState: {
    data: [],
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchSubscription.fulfilled, (state, action) => {
      state.data = action.payload.subscriptions
    })
  }
})

export default appSubscriptionsSlice.reducer
