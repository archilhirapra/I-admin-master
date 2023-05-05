// ** React Imports
import {useState, useEffect} from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'

// ** Third Party Components
import axios from 'axios'

// ** Demo Components Imports


import authConfig from 'src/configs/auth'
import invoiceConfig from 'src/configs/invoice'
import ridesConfig from 'src/configs/rides'
import RidesDetailsTabView from './RidesDetailsTabView'


const UserView = ({id}) => {
  // console.log('id',id)
  const [error, setError] = useState(false)

  const [data, setData] = useState(null)
  const [deliveryAssignedTo, setDeliveryAssignedTo] = useState(null)
  const [pickupAssignedTo, setPickupAssignedTo] = useState(null)
  const [returnAssignedTo, setReturnAssignedTo] = useState(null)
  const [addPaymentOpen, setAddPaymentOpen] = useState(false)
  const [sendInvoiceOpen, setSendInvoiceOpen] = useState(false)
  const toggleSendInvoiceDrawer = () => setSendInvoiceOpen(!sendInvoiceOpen)
  const toggleAddPaymentDrawer = () => setAddPaymentOpen(!addPaymentOpen)


  const [itemAddedRefresh, setItemAddedRefresh] = useState(0)

  // useEffect(() => {
  //   if (id === undefined || id === null) {
  //     return
  //   }
  //   const data = [];
  //   const headers = {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //     Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
  //   }
  //   axios
  //     .post(invoiceConfig.GetOrderbyOrderIdEndpoint, { orderId: id }, { headers })
  //     .then(response => {
  //       // console.log(response.data.data.data)

  //       setData(response.data.data.data)
  //       setDeliveryAssignedTo(response.data.data.data.riderData.deliveryAssignedTo)
  //       setPickupAssignedTo(response.data.data.data.riderData.pickupAssignedTo)

  //       setError(false)
  //     })
  //     .catch(() => {
  //       setData(null)
  //       // setRiderData(null)
  //       setError(true)
  //     })
  // }, [id, itemAddedRefresh])


  useEffect(() => {
    if (id === undefined || id === null) {
      return
    }
    const data = [];
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
    }
    axios
      .get(ridesConfig.GetOrderRiderDetailsEndpoint + id, {headers})
      .then(response => {
        // console.log(response.data.data.data[0])

        setData(response.data.data.data[0])
        setDeliveryAssignedTo(response.data.data.data[0].riderData.deliveryAssignedTo)
        setPickupAssignedTo(response.data.data.data[0].riderData.pickupAssignedTo)
        setReturnAssignedTo(response.data.data.data[0].riderData.returnAssignedTo)

        setError(false)
      })
      .catch(() => {
        setData(null)
        // setRiderData(null)
        setError(true)
      })
  }, [id, itemAddedRefresh])


  if (data) {
    return (
      <Grid container spacing={6}>
        {/* <Grid item xs={12} md={5} lg={4}>
          <UserViewLeft data={data} />
        </Grid> */}
        <Grid item xs={12} md={12} lg={12}>
          <RidesDetailsTabView id={id} data={data} pickupAssignedTo={pickupAssignedTo}
                               deliveryAssignedTo={deliveryAssignedTo} returnAssignedTo={returnAssignedTo}
                               itemAddedRefresh={itemAddedRefresh} setItemAddedRefresh={setItemAddedRefresh}/>

          {/* <RidesTabView /> */}
        </Grid>
      </Grid>
    )
  } else if (error) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Alert severity='error'>
            User with the id: {id} does not exist. Please check the list of users:{' '}
            <Link href='/apps/user/list'>User List</Link>
          </Alert>
        </Grid>
      </Grid>
    )
  } else {
    return null
  }
}

export default UserView
