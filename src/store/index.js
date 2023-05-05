// ** Toolkit imports
import {configureStore} from '@reduxjs/toolkit'

// ** Reducers
import user from 'src/store/apps/user'
import admin from 'src/store/apps/admin'
import serviceCategory from 'src/store/apps/services/categories'
import serviceHelper from 'src/store/apps/services/helpers'
import serviceItem from 'src/store/apps/services/items'
import rider from 'src/store/apps/rider'
import customer from 'src/store/apps/customer'
import timeSlot from 'src/store/apps/time-slot'
import invoice from 'src/store/apps/billings/invoice'
import payment from 'src/store/apps/billings/payments'
import plan from 'src/store/apps/plans'
import cupon from 'src/store/apps/cupons'
import subscription from 'src/store/apps/subscriptions'
import ride from 'src/store/apps/rides'
import offlineInvoice from 'src/store/apps/offline-invoice'

export const store = configureStore({
  reducer: {
    user,
    admin,
    rider,
    customer,
    serviceCategory,
    serviceHelper,
    serviceItem,
    timeSlot,
    invoice,
    payment,
    plan,
    cupon,
    subscription,
    ride,
    offlineInvoice,

  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
