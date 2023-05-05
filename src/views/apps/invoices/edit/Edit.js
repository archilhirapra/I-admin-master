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
import EditCard from './EditCard'
import EditActions from './EditActions'
import EditTabView from './EditTabView'


import authConfig from 'src/configs/auth'
import invoiceConfig from 'src/configs/invoice'


const InvoiceEdit = ({id}) => {
  // ** State
  const [error, setError] = useState(false)

  const [data, setData] = useState(null)
  const [deliveryAssignedTo, setDeliveryAssignedTo] = useState(null)
  const [pickupAssignedTo, setPickupAssignedTo] = useState(null)
  const [addPaymentOpen, setAddPaymentOpen] = useState(false)
  const [sendInvoiceOpen, setSendInvoiceOpen] = useState(false)
  const toggleSendInvoiceDrawer = () => setSendInvoiceOpen(!sendInvoiceOpen)
  const toggleAddPaymentDrawer = () => setAddPaymentOpen(!addPaymentOpen)


  const [itemAddedRefresh, setItemAddedRefresh] = useState(0)

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
      .post(invoiceConfig.GetOrderbyOrderIdEndpoint, {orderId: id}, {headers})
      .then(response => {

        setData(response.data.data.data)
        setDeliveryAssignedTo(response.data.data.data.riderData.deliveryAssignedTo)
        setPickupAssignedTo(response.data.data.data.riderData.pickupAssignedTo)

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
      <>
        <Grid container spacing={6}>
          <Grid item xl={12} md={12} xs={12}>
            <EditTabView data={data} pickupAssignedTo={pickupAssignedTo} itemAddedRefresh={itemAddedRefresh}
                         setItemAddedRefresh={setItemAddedRefresh}/>
          </Grid>

        </Grid>

      </>
    )
  } else if (error) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Alert severity='error'>
            Invoice with the id: {id} does not exist. Please check the list of invoices:{' '}
            <Link href='/apps/invoice/list'>Invoice List</Link>
          </Alert>
        </Grid>
      </Grid>
    )
  } else {
    return null
  }
}

export default InvoiceEdit
