// ** React Imports
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'

import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

import { fetchRiderList } from 'src/store/apps/rider'
import { useDispatch, useSelector } from 'react-redux'
import { auto } from '@popperjs/core'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Refresh } from 'mdi-material-ui'

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import Slide from '@mui/material/Slide'

import authConfig from 'src/configs/auth'
import invoiceConfig from 'src/configs/invoice'
import axios from 'axios'

// import io from 'Socket.IO-client'
import { createRef } from 'react'
// import { createRef } from 'react'
let socket

// const TestComponent = dynamic(() => import("src/views/apps/invoices/edit/single-map-view-dialog/testComponent"), {
//   ssr: false
// });

// const ForwardedRefComponent = forwardRef((props, ref) => (
//   <TestComponent {...props} forwardedRef={ref} />
// ))

//  import SingleRideLiveTrackingPickup from "src/views/apps/invoices/edit/single-map-view-dialog/SingleRideLiveViewDialogPickup"

const SingleRideLiveTrackingPickup = dynamic(
  () => import('src/views/apps/invoices/edit/single-map-view-dialog/SingleRideLiveViewDialogPickup'),
  {
    ssr: false
  }
)
// const SingleRideLiveTrackingDelivery = dynamic(() => import("src/views/apps/invoices/edit/single-map-view-dialog/SingleRideLiveViewDialogDelivery"), {
//   ssr: false
// });

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const RidesDetailsTabView = ({
  id,
  data,
  pickupAssignedTo,
  deliveryAssignedTo,
  itemAddedRefresh,
  setItemAddedRefresh
}) => {
  const childRef = createRef()
  const [statusCode, setStatusCode] = useState(data?.status)

  const dispatch = useDispatch()
  const [singleLiveViewDialogP, setSingleLiveViewDialogOpenP] = useState(false)
  const [singleLiveViewDialogD, setSingleLiveViewDialogOpenD] = useState(false)

  useEffect(() => {
    dispatch(fetchRiderList({}))
  }, [])

  const riderStore = useSelector(state => state.rider)

  const [dialogTitle, setDialogTitle] = useState('')

  const toggleSingleLiveViewDialogP = (from = '') => {
    // socketInitializer()
    // console.log('childRef',childRef.current)
    // childRef.current?.showAlert()
    // console.log(from)
    setDialogTitle(from)

    if (singleLiveViewDialogP == false) {
      // console.log('close tab')
      // socket.disconnect()
      // socket.offAnyOutgoing()
      if (from == 'Pickup') {
        setTrackRiderId(data?.riderData?.pickupAssignedTo?.id)
      } else if (from == 'Delivery') {
        setTrackRiderId(data?.riderData?.deliveryAssignedTo?.id)
      }
    }
    setSingleLiveViewDialogOpenP(!singleLiveViewDialogP)
  }

  const toggleSingleLiveViewDialogD = (from = '') => {
    socketInitializer()
    // console.log(from)
    setDialogTitle(from)

    if (singleLiveViewDialogD == true) {
      // console.log('close tab')
      // socket.disconnect()
      // socket.offAnyOutgoing()
    }
    setSingleLiveViewDialogOpenD(!singleLiveViewDialogD)
  }

  const riderPickupStatusText = (from, status) => {
    //0==Assigned
    //1==out
    //2==complete
    //3==failed for pickup
    //4==cancelled by rider
    switch (status) {
      case 0:
        return 'Assigned'
      case 1:
        if (from === 'pickup') {
          return 'Out for Pickup'
        } else {
          return 'Out for Delivery'
        }
      case 2:
        return 'Completed'
      case 3:
        return 'Failed'
      case 4:
        return 'Canceled By Rider'
      default:
        return ''
    }
  }

  const updatePickupStatusButtonText = code => {
    // alert(code)

    switch (code) {
      case 0:
        return 'Assign'
      case 1:
        return 'Assign'
      case 2:
        return 'Assign'
      case 3:
        return 'Assign'
      case 4:
        return 'Assign'
      case 5:
        return 'Assign'
      case 6:
        return 'Assign'
      case 7:
        return 'Assign'
      case 8:
        return 'Assign'
      case 9:
        return 'Assign'
      case 10:
        return 'Assign'
      case 11:
        return 'Assign'
      case 12:
        return 'Assign'
      case 13:
        return 'Assign'
      default:
        return ''
    }
  }
  

  const pickupDisableStatusForButton = code => {
    // alert(code)
    switch (code) {
      case 0:
        return false
      case 3:
        return false
      case 4:
        return false
      case 5:
        return false
      default:
        return true
    }
  }

  const TrackDisableStatusForButton = code => {
    // alert(code)
    switch (code) {
      case 1:
        return false
      case 2:
        return false
      case 3:
        return false
      case 4:
        return false
      default:
        return true
    }
  }

  // const deliveryDisableStatusForButton = () => {
  //   switch (data?.status) {
  //     case 7:
  //       return false
  //     case 8:
  //       return false
  //     case 9:
  //       return false
  //     default:
  //       return true
  //   }
  // }

  const onPickupStatusUpdateClick = from => {
    let parameters = {}
    let postUrl = ''
    if (from === 'pickup') {
      if (pickUpRiderValue == undefined) {
        setDialogType('failed')
        setDialogMessage('Please Select Rider')
        handleClickOpenDialog()

        return
      }
      parameters = {
        orderId: id,
        riderId: pickUpRiderValue?.id
      }
      postUrl = 'assignPickup'

      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
      }
      axios
        .put(invoiceConfig.AssignPickupEndpoint, parameters, { headers })
        .then(response => {
          setItemAddedRefresh(itemAddedRefresh + 1)

          setPickUpRiderValue(null)
          setDeliveryRiderValue(null)
          setDialogType('success')
          // setDialogMessage('Ride status updted succesfully')
          setDialogMessage(response.data.message)

          handleClickOpenDialog()
        })
        .catch(e => {
          setDialogType('failed')
          setDialogMessage(e?.response?.data?.message)
          handleClickOpenDialog()
        })
    } else if (from === 'delivery') {
      if (deliveryRiderValue == undefined) {
        setDialogType('failed')
        setDialogMessage('Please Select Rider')
        handleClickOpenDialog()

        return
      }
      parameters = {
        orderId: id,
        riderId: deliveryRiderValue?.id
      }
      postUrl = 'assignPickup'

      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
      }
      axios
        .put(invoiceConfig.AssignDeliveryEndpoint, parameters, { headers })
        .then(response => {
          setItemAddedRefresh(itemAddedRefresh + 1)

          setPickUpRiderValue(null)
          setDeliveryRiderValue(null)
          setDialogType('success')
          // setDialogMessage('Ride status updted succesfully')
          setDialogMessage(response.data.message)

          handleClickOpenDialog()
        })
        .catch(e => {
          // console.log(e)
          setDialogType('failed')
          setDialogMessage(e?.response?.data?.message)
          handleClickOpenDialog()
        })
    }

    // const headers = {
    //   Accept: 'application/json',
    //   'Content-Type': 'application/json',
    //   Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
    // }
    // axios.put(invoiceConfig.UpdateOrderStatusEndpoint, parameters, { headers })
    //   .then(response => {
    //     setItemAddedRefresh(itemAddedRefresh + 1)

    //     setPickUpRiderValue(null);
    //     setDeliveryRiderValue(null);
    //     setDialogType('success');
    //     setDialogMessage('Ride status updted succesfully')
    //     handleClickOpenDialog()

    //   })
    //   .catch((e) => {

    //     setDialogType('failed');
    //     setDialogMessage('Item add failed')
    //     handleClickOpenDialog()
    //   })
  }

  const [pickUpRiderValue, setPickUpRiderValue] = useState(null)

  const handleChangePickUpRider = newValue => {
    setPickUpRiderValue(newValue)
  }
  const [deliveryRiderValue, setDeliveryRiderValue] = useState(null)

  const handleChangeDeliveryRider = newValue => {
    setDeliveryRiderValue(newValue)
  }

  const [sameDayDelivery, setSameDayDelivery] = useState(data?.riderData?.sameDayDelivery)
  const [sameDayPickup, setSameDayPickup] = useState(data?.riderData?.sameDayPickup)

  const [openDialog, setOpenDialog] = useState(false)
  const [dialogType, setDialogType] = useState('success')
  const [dialogMessage, setDialogMessage] = useState('')
  const handleClickOpenDialog = () => setOpenDialog(true)

  const handleCloseDialog = () => {
    if (dialogType == 'success') {
      setDialogMessage('')
    } else if (dialogType == 'warning') {
      setDialogMessage('')
    }
    setOpenDialog(false)
  }

  const [trackRiderId, setTrackRiderId] = useState(null)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sm={12} md={4}>
        <Card sx={{ mb: 6, mr: 4 }}>
          <CardHeader title='Ride Details' titleTypographyProps={{ variant: 'h6' }} />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item xs={12} lg={12}>
                <TableContainer>
                  <Table size='small' sx={{ width: '95%' }}>
                    <TableBody
                      sx={{
                        '& .MuiTableCell-root': {
                          border: 0,
                          pt: 2,
                          pb: 2,
                          pl: '0 !important',
                          pr: '0 !important',
                          '&:first-of-type': {
                            width: 148
                          }
                        }
                      }}
                    >
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                            Customer Name :
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='body2'>{data?.name}</Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                            Order Id:
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='body2'>{data?.orderId}</Typography>
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                            Same Day Pickup :
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='body2'>{sameDayPickup ? 'Yes' : 'No'}</Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                            Same Day Delivery :
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='body2'>{sameDayDelivery ? 'Yes' : 'No'}</Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={12} md={8}>
        <Card sx={{ mb: 6, mr: 4 }}>
          <CardHeader title='Pickup Rider' titleTypographyProps={{ variant: 'h6' }} />
          <CardContent>
            <Grid container spacing={6}>
              <Grid container item sm={12} xs={12}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Autocomplete
                      sx={{ mb: 2, ml: 2 }}
                      value={pickUpRiderValue}
                      options={riderStore.data}
                      onChange={(_, data) => {
                        handleChangePickUpRider(data)
                      }}
                      getOptionLabel={option => option.name}
                      renderInput={params => <TextField {...params} label='Select Rider' />}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={3} md={3} sx={{ alignSelf: 'center' }}>
                  <FormControl fullWidth>
                    <Button
                      disabled={pickupDisableStatusForButton(data?.riderData?.pickupAssignedTo?.rideStatus)}
                      onClick={() => onPickupStatusUpdateClick('pickup')}
                      sx={{ mb: 2, ml: 2 }}
                      variant='contained'
                    >
                      {updatePickupStatusButtonText(data?.riderData?.pickupAssignedTo?.rideStatus)}
                      {/* Assign */}
                      {/* Completed */}
                    </Button>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={3} md={3} sx={{ alignSelf: 'center' }}>
                  <FormControl fullWidth>
                    <Button
                      disabled={TrackDisableStatusForButton(data?.riderData?.pickupAssignedTo?.rideStatus)}
                      onClick={() => toggleSingleLiveViewDialogP('Pickup')}
                      sx={{ mb: 2, ml: 2 }}
                      variant='contained'
                    >
                      {/* <Button onClick={() => {childRef.current.showAlert()} } sx={{ mb: 2, ml: 2 }} variant='contained'> */}
                      Track
                    </Button>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid item xs={12} lg={12}>
                <TableContainer>
                  <Table size='small' sx={{ width: '95%' }}>
                    <TableBody
                      sx={{
                        '& .MuiTableCell-root': {
                          border: 0,
                          pt: 2,
                          pb: 2,
                          pl: '0 !important',
                          pr: '0 !important',
                          '&:first-of-type': {
                            width: 148
                          }
                        }
                      }}
                    >
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                            Ride Id :
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='body2'>{data?.riderData?.pickupAssignedTo?.rideId}</Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                            Pickup Status :
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='body2'>
                            {riderPickupStatusText('pickup', data?.riderData?.pickupAssignedTo?.rideStatus)}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                            Rider Id :
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Link href={`/apps/user/rider/view/${data?.riderData?.pickupAssignedTo?.riderId}`} passHref>
                            <Typography variant='body2'>{data?.riderData?.pickupAssignedTo?.riderId}</Typography>
                          </Link>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                            Rider Name :
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Link href={`/apps/user/rider/view/${data?.riderData?.pickupAssignedTo?.riderId}`} passHref>
                            <Typography variant='body2'>{data?.riderData?.pickupAssignedTo?.riderName}</Typography>
                          </Link>
                        </TableCell>
                      </TableRow>
                      {/* <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                            Created At :
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='subtitle2'>{data?.riderData?.pickupAssignedTo?.createdAt}</Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                            Updated At :
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='subtitle2'>{data?.riderData?.pickupAssignedTo?.updatedAt}</Typography>
                        </TableCell>
                      </TableRow> */}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card sx={{ mb: 6, mr: 4 }}>
          <CardHeader title='Delivery Rider' titleTypographyProps={{ variant: 'h6' }} />
          <CardContent>
            <Grid container spacing={6}>
              <Grid container item sm={12} xs={12}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Autocomplete
                      sx={{ mb: 2, ml: 2 }}
                      value={deliveryRiderValue}
                      options={riderStore.data}
                      onChange={(_, data) => {
                        handleChangeDeliveryRider(data)
                      }}
                      getOptionLabel={option => option.name}
                      renderInput={params => <TextField {...params} label='Select Rider' />}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={3} md={3} sx={{ alignSelf: 'center' }}>
                  <FormControl fullWidth>
                    <Button
                      disabled={pickupDisableStatusForButton(data?.riderData?.deliveryAssignedTo?.rideStatus)}
                      onClick={() => onPickupStatusUpdateClick('delivery')}
                      sx={{ mb: 2, ml: 2 }}
                      variant='contained'
                    >
                      {updatePickupStatusButtonText(data?.riderData?.deliveryAssignedTo?.rideStatus)}
                      {/* Assign */}
                    </Button>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={3} md={3} sx={{ alignSelf: 'center' }}>
                  <FormControl fullWidth>
                    <Button
                      disabled={TrackDisableStatusForButton(data?.riderData?.deliveryAssignedTo?.rideStatus)}
                      onClick={() => toggleSingleLiveViewDialogP('Delivery')}
                      sx={{ mb: 2, ml: 2 }}
                      variant='contained'
                    >
                      {/* <Button onClick={() => {childRef.current.showAlert()} } sx={{ mb: 2, ml: 2 }} variant='contained'> */}
                      Track
                    </Button>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid item xs={12} lg={12}>
                <TableContainer>
                  <Table size='small' sx={{ width: '95%' }}>
                    <TableBody
                      sx={{
                        '& .MuiTableCell-root': {
                          border: 0,
                          pt: 2,
                          pb: 2,
                          pl: '0 !important',
                          pr: '0 !important',
                          '&:first-of-type': {
                            width: 148
                          }
                        }
                      }}
                    >
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                            Ride Id :
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='body2'>{data?.riderData?.deliveryAssignedTo?.rideId}</Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                            Delivery Status :
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='body2'>
                            {riderPickupStatusText('pickup', data?.riderData?.deliveryAssignedTo?.rideStatus)}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                            Rider Id :
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Link href={`/apps/user/rider/view/${data?.riderData?.deliveryAssignedTo?.riderId}`} passHref>
                            <Typography variant='body2'>{data?.riderData?.deliveryAssignedTo?.riderId}</Typography>
                          </Link>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                            Rider Name :
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Link href={`/apps/user/rider/view/${data?.riderData?.deliveryAssignedTo?.riderId}`} passHref>
                            <Typography variant='body2'>{data?.riderData?.deliveryAssignedTo?.riderName}</Typography>
                          </Link>
                        </TableCell>
                      </TableRow>
                      {/* <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                            Created At :
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='subtitle2'>{data?.riderData?.pickupAssignedTo?.createdAt}</Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                            Updated At :
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='subtitle2'>{data?.riderData?.pickupAssignedTo?.updatedAt}</Typography>
                        </TableCell>
                      </TableRow> */}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Dialog
        open={openDialog}
        keepMounted
        onClose={handleCloseDialog}
        TransitionComponent={Transition}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
      >
        {dialogType == 'success' && <DialogTitle id='alert-dialog-slide-title'>Success</DialogTitle>}
        {dialogType == 'failed' && <DialogTitle id='alert-dialog-slide-title'>Error</DialogTitle>}
        {dialogType == 'warning' && <DialogTitle id='alert-dialog-slide-title'>Warning</DialogTitle>}

        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>{dialogMessage}</DialogContentText>
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          {dialogType == 'warning' && (
            <>
              <Button onClick={continueEditing}>Continue</Button>
              <Button onClick={handleCloseDialog}>Cancel</Button>
            </>
          )}
          {dialogType == 'success' && (
            <>
              <Button onClick={handleCloseDialog}>OK</Button>
            </>
          )}
          {dialogType == 'failed' && (
            <>
              <Button onClick={handleCloseDialog}>OK</Button>
            </>
          )}
        </DialogActions>
      </Dialog>
      {/* <ForwardedRefComponent ref={childRef}/> */}
      {/* <SingleRideLiveTrackingPickup  /> */}
      {/* <SingleRideLiveTrackingPickup open={singleLiveViewDialogP} toggle={toggleSingleLiveViewDialogP} title={dialogTitle} /> */}

      {singleLiveViewDialogP && (
        <SingleRideLiveTrackingPickup
          trackRiderId={trackRiderId}
          open={singleLiveViewDialogP}
          toggle={toggleSingleLiveViewDialogP}
          title={dialogTitle}
        />
      )}

      {/* <SingleRideLiveTrackingDelivery open={singleLiveViewDialogD} toggle={toggleSingleLiveViewDialogD} title={dialogTitle} socketPickup={socketPickup}  socketDelivery={socketDelivery}/> */}
    </Grid>
  )
}

export default RidesDetailsTabView
