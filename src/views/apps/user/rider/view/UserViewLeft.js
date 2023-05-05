// ** React Imports
import {forwardRef, useState} from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Select from '@mui/material/Select'
import Switch from '@mui/material/Switch'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import {styled} from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import InputAdornment from '@mui/material/InputAdornment'
import LinearProgress from '@mui/material/LinearProgress'
import FormControlLabel from '@mui/material/FormControlLabel'
import DialogContentText from '@mui/material/DialogContentText'

// ** Icons Imports

import TrendingUp from 'mdi-material-ui/TrendingUp'
import ClockFast from 'mdi-material-ui/ClockFast'
import MapMarkerDistance from 'mdi-material-ui/MapMarkerDistance'
import ClockTimeFiveOutline from 'mdi-material-ui/ClockTimeFiveOutline'
import AlertOutline from 'mdi-material-ui/AlertOutline'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
// import { getInitials } from 'src/@core/utils/get-initials'
import {getInitials} from 'src/utils/get-initials'


import EditUserDrawerFromView from 'src/views/apps/user/rider/list/EditUserDrawerFromView'


import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm, Controller} from 'react-hook-form'
import FormHelperText from '@mui/material/FormHelperText'
import axios from 'axios'
import authConfig from 'src/configs/auth'
import adminConfig from 'src/configs/admin'
import Slide from '@mui/material/Slide'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})


// ** Styled <sup> component
const Sup = styled('sup')(({theme}) => ({
  top: '0.2rem',
  left: '-0.6rem',
  position: 'absolute',
  color: theme.palette.primary.main
}))

// ** Styled <sub> component
const Sub = styled('sub')({
  fontWeight: 400,
  fontSize: '.875rem',
  lineHeight: '1.25rem',
  alignSelf: 'flex-end'
})

const roleColors = {
  admin: 'error',
  editor: 'info',
  author: 'warning',
  maintainer: 'success',
  subscriber: 'primary'
}

const statusColors = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}


const schema = yup.object().shape({
  reason: yup.string().required(),
  note: yup.string().required(),
})

const defaultValues = {
  reason: '',
  note: '',
}

const UserViewLeft = ({id, data, vehicle, accountStatus, setAccountStatus, refresh, setRefresh}) => {
  console.log('data', data)
  console.log('vehicle', vehicle)
// console.log('accountStatus',accountStatus)


  // ** States
  // const [openEdit, setOpenEdit] = useState(false)
  const [openSuspend, setOpenSuspend] = useState(false)
  const [openPlans, setOpenPlans] = useState(false)

  // Handle Edit dialog
  // const handleEditClickOpen = () => setOpenEdit(true)
  // const handleEditClose = () => setOpenEdit(false)


  const handleSuspendOpen = () => setOpenSuspend(true)
  const handleSuspendClose = () => {
    reset()
    setOpenSuspend(false)
  }


  // Handle Upgrade Plan dialog
  const handlePlansClickOpen = () => setOpenPlans(true)
  const handlePlansClose = () => setOpenPlans(false)

  const renderUserAvatar = () => {
    if (data) {
      if (data?.image?.length) {
        return (
          <CustomAvatar alt='User Image' src={data.image} variant='rounded' sx={{width: 120, height: 120, mb: 4}}/>
        )
      } else {
        return (
          <CustomAvatar
            skin='light'
            variant='rounded'
            sx={{width: 120, height: 120, fontWeight: 600, mb: 4, fontSize: '3rem'}}
          >
            {getInitials(data.name)}
          </CustomAvatar>
        )
      }
    } else {
      return null
    }
  }


  const formatPhoneNumber = (value) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6
    )} - ${phoneNumber.slice(6, 10)}`;
  }


  const {
    watch,
    register,
    reset,
    control,
    setValue,
    setError,
    clearErrors,
    handleSubmit,
    formState: {errors}
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })


  const [openDialog, setOpenDialog] = useState(false)
  const [dialogType, setDialogType] = useState('success')
  const [dialogMessage, setDialogMessage] = useState('')

  const handleClickOpenDialog = () => {
    setOpenDialog(true)
  }


  const handleCloseDialog = () => {
    if (dialogType == 'success') {
      setOpenDialog(false)
      handleSuspendClose()

    } else if (dialogType == 'warning') {
      setDialogMessage('')
      setLoading(false)
    }
    setOpenDialog(false)
  }


  const onSubmit = data => {

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
    }

    axios
      .post(adminConfig.AdminSuspendEndpoint, {userId: id, status: 3, note: data.note, reason: data.reason}, {headers})
      .then(response => {
        setAccountStatus(response.data.data.data.activeStatus)

        setDialogType('success');
        setDialogMessage("Rider suspended successfully.")

        handleClickOpenDialog()

      })
      .catch((e) => {

        setDialogType('failed');
        setDialogMessage(e?.response?.data?.message)
        handleClickOpenDialog()

      })

  }


  const [editUserOpen, setEditUserOpen] = useState(false)
  const [editId, setEditId] = useState(null);
  const [editRow, setEditRow] = useState(null);

  const [vehicleData, setVehicleData] = useState(null);

  const toggleEditUserDrawer = () => {
    // console.log('hasdf')
    if (editUserOpen) {
      setEditId(null);
      setEditRow(null);

      setVehicleData(null);

      setEditUserOpen(false);
    } else {
      setEditId(id);
      setEditRow(data);
      setVehicleData(vehicle)
      setEditUserOpen(true)
    }
  }


  if (data) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{pt: 15, display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
              {renderUserAvatar()}
              <Typography variant='h6' sx={{mb: 4}}>
                {data.fullName}
              </Typography>
              <CustomChip
                skin='light'
                size='small'
                label='Rider'
                color={roleColors[data.role]}
                sx={{
                  borderRadius: '4px',
                  fontSize: '0.875rem',
                  textTransform: 'capitalize',
                  '& .MuiChip-label': {mt: -0.25}
                }}
              />
            </CardContent>

            <CardContent sx={{my: 1}}>
              <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Grid container spacing={6}>
                  <Grid item xs={6}>

                    <Box sx={{mr: 6, display: 'flex', alignItems: 'center'}}>
                      <CustomAvatar skin='light' variant='rounded' sx={{mr: 4, width: 44, height: 44}}>
                        <TrendingUp/>
                      </CustomAvatar>
                      <Box>
                        <Typography variant='h5' sx={{lineHeight: 1.3}}>
                          {data.completeDelivery}
                        </Typography>
                        <Typography variant='body2'>Delivery Completed</Typography>
                      </Box>
                    </Box>

                  </Grid>
                  <Grid item xs={6}>

                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                      <CustomAvatar skin='light' variant='rounded' sx={{mr: 4, width: 44, height: 44}}>
                        <TrendingUp/>
                      </CustomAvatar>
                      <Box>
                        <Typography variant='h5' sx={{lineHeight: 1.3}}>
                          {data.completePickUp}
                        </Typography>
                        <Typography variant='body2'>Pickups Completed</Typography>
                      </Box>
                    </Box>

                  </Grid>
                </Grid>
              </Box>
            </CardContent>
            <CardContent sx={{my: 1}}>
              <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Grid container spacing={6}>
                  <Grid item xs={6}>


                    <Box sx={{mr: 6, display: 'flex', alignItems: 'center'}}>
                      <CustomAvatar skin='light' variant='rounded' sx={{mr: 4, width: 44, height: 44}}>
                        <ClockTimeFiveOutline/>
                      </CustomAvatar>
                      <Box>
                        <Typography variant='h5' sx={{lineHeight: 1.3}}>
                          {data.pendingDelivery}
                        </Typography>
                        <Typography variant='body2'>Delivery Pending</Typography>
                      </Box>
                    </Box>

                  </Grid>
                  <Grid item xs={6}>

                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                      <CustomAvatar skin='light' variant='rounded' sx={{mr: 4, width: 44, height: 44}}>
                        <ClockTimeFiveOutline/>
                      </CustomAvatar>
                      <Box>
                        <Typography variant='h5' sx={{lineHeight: 1.3}}>
                          {data.pendingPickUp}
                        </Typography>
                        <Typography variant='body2'>Pickups Pending</Typography>
                      </Box>
                    </Box>

                  </Grid>
                </Grid>
              </Box>
            </CardContent>
            <CardContent sx={{my: 1}}>
              <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Grid container spacing={6}>
                  <Grid item xs={6}>

                    <Box sx={{mr: 6, display: 'flex', alignItems: 'center'}}>
                      <CustomAvatar skin='light' variant='rounded' sx={{mr: 4, width: 44, height: 44}}>
                        <AlertOutline/>
                      </CustomAvatar>
                      <Box>
                        <Typography variant='h5' sx={{lineHeight: 1.3}}>
                          {data.cancelledDelivery}
                        </Typography>
                        <Typography variant='body2'>Delivery Cancelled</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>


                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                      <CustomAvatar skin='light' variant='rounded' sx={{mr: 4, width: 44, height: 44}}>
                        <AlertOutline/>
                      </CustomAvatar>
                      <Box>
                        <Typography variant='h5' sx={{lineHeight: 1.3}}>
                          {data.cancelledPickUp}
                        </Typography>
                        <Typography variant='body2'>Pickups Cancelled</Typography>
                      </Box>
                    </Box>

                  </Grid>
                </Grid>
              </Box>
            </CardContent>


            <CardContent>
              <Typography variant='h6'>Details</Typography>
              <Divider sx={{mt: 4}}/>
              <Box sx={{pt: 2, pb: 1}}>
                <Box sx={{display: 'flex', mb: 2.7}}>
                  <Typography variant='subtitle2' sx={{mr: 2, color: 'text.primary'}}>
                    Username:
                  </Typography>
                  <Typography variant='body2'>{data.username}</Typography>
                </Box>
                <Box sx={{display: 'flex', mb: 2.7}}>
                  <Typography variant='subtitle2' sx={{mr: 2, color: 'text.primary'}}>
                    Job Status:
                  </Typography>
                  <Typography variant='body2'>{(data.jobStatus ? 'online' : 'offline')}</Typography>
                </Box>
                <Box sx={{display: 'flex', mb: 2.7}}>
                  <Typography variant='subtitle2' sx={{mr: 2, color: 'text.primary'}}>
                    Account Status:
                  </Typography>
                  <Typography
                    variant='body2'>{(data.activeStatus == 0 ? 'Active' : (data.activeStatus == 1 ? 'Leave' : (data.activeStatus == 2 ? 'Inactive' : 'Suspended')))}</Typography>
                </Box>
                <Box sx={{display: 'flex', mb: 2.7}}>
                  <Typography variant='subtitle2' sx={{mr: 2, color: 'text.primary'}}>
                    Full Name:
                  </Typography>
                  <Typography variant='body2'>{data.name}</Typography>
                </Box>
                <Box sx={{display: 'flex', mb: 2.7}}>
                  <Typography variant='subtitle2' sx={{mr: 2, color: 'text.primary'}}>
                    Gender:
                  </Typography>
                  <Typography variant='body2'>{data.gender}</Typography>
                </Box>

                <Box sx={{display: 'flex', mb: 2.7}}>
                  <Typography sx={{mr: 2, fontWeight: 500, fontSize: '0.875rem'}}>Date of Birth:</Typography>
                  <Typography variant='body2' sx={{textTransform: 'capitalize'}}>
                    {data.dob}
                  </Typography>
                </Box>
                <Box sx={{display: 'flex', mb: 2.7}}>
                  <Typography sx={{mr: 2, fontWeight: 500, fontSize: '0.875rem'}}>Mobile Number:</Typography>
                  <Typography variant='body2'>{data.countryCode}{formatPhoneNumber(data.mobileNo)}</Typography>
                </Box>
                <Box sx={{display: 'flex', mb: 2.7}}>
                  <Typography sx={{mr: 2, fontWeight: 500, fontSize: '0.875rem'}}>Alternative Number:</Typography>
                  <Typography variant='body2'>{data.alternativeMobile}</Typography>
                </Box>
                <Box sx={{display: 'flex', mb: 2.7}}>
                  <Typography sx={{mr: 2, fontWeight: 500, fontSize: '0.875rem'}}>Email ID:</Typography>
                  <Typography variant='body2'>{data.email}</Typography>
                </Box>
                <Box sx={{display: 'flex', mb: 2.7}}>
                  <Typography sx={{mr: 2, fontWeight: 500, fontSize: '0.875rem'}}>Father Name:</Typography>
                  <Typography variant='body2'>{data.fatherName}</Typography>
                </Box>
                <Box sx={{display: 'flex', mb: 2.7}}>
                  <Typography sx={{mr: 2, fontWeight: 500, fontSize: '0.875rem'}}>Blood Group:</Typography>
                  <Typography variant='body2'>{data.bloodGroup}</Typography>
                </Box>
                <Box sx={{display: 'flex', mb: 2.7}}>
                  <Typography sx={{mr: 2, fontWeight: 500, fontSize: '0.875rem'}}>Reason:</Typography>
                  <Typography variant='body2'>{data.reason}</Typography>
                </Box>

              </Box>

              <CardActions sx={{display: 'flex', justifyContent: 'left'}}>
                <Button onClick={handleSuspendOpen} color='error' variant='outlined'>
                  {accountStatus == 3 ? 'Suspended' : 'Suspend'}
                </Button>
                <Button variant='contained' sx={{mr: 2}} onClick={toggleEditUserDrawer}>
                  Edit
                </Button>
              </CardActions>


              <Typography variant='h6'>Rider Insurance</Typography>
              <Divider sx={{mt: 4}}/>
              <Box sx={{pt: 2, pb: 1}}>
                <Box sx={{display: 'flex', mb: 2.7}}>
                  <Typography variant='subtitle2' sx={{mr: 2, color: 'text.primary'}}>
                    Insurance Number:
                  </Typography>
                  <Typography variant='body2'>{data.riderInsurance}</Typography>
                </Box>


                <Box sx={{display: 'flex', mb: 2.7}}>
                  <Typography sx={{mr: 2, fontWeight: 500, fontSize: '0.875rem'}}>Insurance Expiry:</Typography>
                  <Typography variant='body2'>{data.riderExpiry}</Typography>
                </Box>


              </Box>
              <Typography variant='h6'>Vehicle Details</Typography>
              <Divider sx={{mt: 4}}/>
              <Box sx={{pt: 2, pb: 1}}>
                <Box sx={{display: 'flex', mb: 2.7}}>
                  <Typography variant='subtitle2' sx={{mr: 2, color: 'text.primary'}}>
                    Registration Number:
                  </Typography>
                  <Typography variant='body2'>{vehicle?.registrationNo}</Typography>
                </Box>
                <Box sx={{display: 'flex', mb: 2.7}}>
                  <Typography variant='subtitle2' sx={{mr: 2, color: 'text.primary'}}>
                    Registration Date:
                  </Typography>
                  <Typography variant='body2'>{vehicle?.registrationDate}</Typography>
                </Box>
                <Box sx={{display: 'flex', mb: 2.7}}>
                  <Typography variant='subtitle2' sx={{mr: 2, color: 'text.primary'}}>
                    Chassis Number:
                  </Typography>
                  <Typography variant='body2'>{vehicle?.chassisNo}</Typography>
                </Box>
                <Box sx={{display: 'flex', mb: 2.7}}>
                  <Typography variant='subtitle2' sx={{mr: 2, color: 'text.primary'}}>
                    Engine Number:
                  </Typography>
                  <Typography variant='body2'>{vehicle?.engineNo}</Typography>
                </Box>
                <Box sx={{display: 'flex', mb: 2.7}}>
                  <Typography variant='subtitle2' sx={{mr: 2, color: 'text.primary'}}>
                    Owner Name:
                  </Typography>
                  <Typography variant='body2'>{vehicle?.ownerName}</Typography>
                </Box>
                <Box sx={{display: 'flex', mb: 2.7}}>
                  <Typography variant='subtitle2' sx={{mr: 2, color: 'text.primary'}}>
                    Vehicle Class:
                  </Typography>
                  <Typography variant='body2'>{vehicle?.vehicleClass}</Typography>
                </Box>
                <Box sx={{display: 'flex', mb: 2.7}}>
                  <Typography variant='subtitle2' sx={{mr: 2, color: 'text.primary'}}>
                    Fuel:
                  </Typography>
                  <Typography variant='body2'>{vehicle?.fuel}</Typography>
                </Box>
                <Box sx={{display: 'flex', mb: 2.7}}>
                  <Typography variant='subtitle2' sx={{mr: 2, color: 'text.primary'}}>
                    Model:
                  </Typography>
                  <Typography variant='body2'>{vehicle?.model}</Typography>
                </Box>
                <Box sx={{display: 'flex', mb: 2.7}}>
                  <Typography variant='subtitle2' sx={{mr: 2, color: 'text.primary'}}>
                    Manufacturer:
                  </Typography>
                  <Typography variant='body2'>{vehicle?.manufacturer}</Typography>
                </Box>

              </Box>
              <Typography variant='h6'>Vehicle Insurance</Typography>
              <Divider sx={{mt: 4}}/>
              <Box sx={{pt: 2, pb: 1}}>
                <Box sx={{display: 'flex', mb: 2.7}}>
                  <Typography variant='subtitle2' sx={{mr: 2, color: 'text.primary'}}>
                    Vehicle Insurance:
                  </Typography>
                  <Typography variant='body2'>{(vehicle?.vehicleInsurance ? 'Yes' : 'No')}</Typography>
                </Box>
                <Box sx={{display: 'flex', mb: 2.7}}>
                  <Typography variant='subtitle2' sx={{mr: 2, color: 'text.primary'}}>
                    Insurance Number:
                  </Typography>
                  <Typography variant='body2'>{vehicle?.insuranceNumber}</Typography>
                </Box>
                <Box sx={{display: 'flex', mb: 2.7}}>
                  <Typography variant='subtitle2' sx={{mr: 2, color: 'text.primary'}}>
                    Insurance Expiry:
                  </Typography>
                  <Typography variant='body2'>{vehicle?.insuranceExpiry}</Typography>
                </Box>


              </Box>
            </CardContent>


            <Dialog
              open={openSuspend}
              onClose={handleSuspendClose}
              aria-labelledby='user-view-edit'
              sx={{'& .MuiPaper-root': {width: '100%', maxWidth: 650, p: [2, 10]}}}
              aria-describedby='user-view-edit-description'
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle id='user-view-edit' sx={{textAlign: 'center', fontSize: '1.5rem !important'}}>
                  Account Status
                </DialogTitle>
                <DialogContent>
                  <DialogContentText variant='body2' id='user-view-edit-description' sx={{textAlign: 'center', mb: 7}}>
                    Please provide the reason of changes.
                  </DialogContentText>

                  <Grid container spacing={6}>

                    <Grid item xs={12} sm={12}>
                      <FormControl fullWidth>
                        <InputLabel
                          id='status'
                          error={Boolean(errors.status)}
                          htmlFor='status'
                        >
                          Status
                        </InputLabel>
                        <Controller
                          name='status'
                          control={control}
                          rules={{required: true}}
                          render={({field: {value, onChange}}) => (
                            <Select
                              label='Status'
                              defaultValue={3}
                              disabled='true'
                              id='status'
                              onChange={onChange}
                              error={Boolean(errors.status)}
                              labelId='status'
                            >
                              <MenuItem value=''>Select Status</MenuItem>
                              <MenuItem value='resigned'>Resigned</MenuItem>
                              <MenuItem value='fraud'>Fraud</MenuItem>
                              <MenuItem value='scam'>Scam</MenuItem>
                              <MenuItem value='malicious_activities'>Malicious Activities</MenuItem>
                              <MenuItem value='3'>Ban</MenuItem>
                              <MenuItem value='other'>Others</MenuItem>
                            </Select>
                          )}
                        />
                        {errors.status && (
                          <FormHelperText sx={{color: 'error.main'}} id='blood'>
                            This field is required
                          </FormHelperText>
                        )}
                      </FormControl>

                    </Grid>


                    <Grid item xs={12} sm={12}>
                      <FormControl fullWidth>
                        <Controller
                          name='reason'
                          control={control}
                          rules={{required: true}}
                          render={({field: {value, onChange}}) => (
                            <TextField
                              fullWidth


                              value={value}
                              label='Reason'
                              onChange={onChange}
                              error={Boolean(errors.reason)}
                            />
                          )}
                        />
                        {errors.reason &&
                          <FormHelperText sx={{color: 'error.main'}}>{errors.reason.message}</FormHelperText>}
                      </FormControl>
                    </Grid>


                    <Grid item xs={12} sm={12}>

                      <FormControl fullWidth sx={{mb: 6}}>
                        <Controller
                          name='note'
                          control={control}
                          rules={{required: true}}
                          render={({field: {value, onChange}}) => (
                            <TextField
                              fullWidth
                              rows={4}
                              multiline

                              value={value}
                              label='Note'
                              onChange={onChange}
                              error={Boolean(errors.note)}
                            />
                          )}
                        />
                        {errors.note &&
                          <FormHelperText sx={{color: 'error.main'}}>{errors.note.message}</FormHelperText>}
                      </FormControl>
                    </Grid>


                  </Grid>

                </DialogContent>
                <DialogActions sx={{justifyContent: 'center'}}>
                  <Button type='submit' variant='contained' sx={{mr: 1}}>
                    Submit
                  </Button>
                  <Button variant='outlined' color='secondary' onClick={handleSuspendClose}>
                    Discard
                  </Button>
                </DialogActions>
              </form>

              <Dialog
                open={openDialog}
                keepMounted
                onClose={handleCloseDialog}
                TransitionComponent={Transition}
                aria-labelledby='alert-dialog-slide-title'
                aria-describedby='alert-dialog-slide-description'
              >
                {dialogType == 'success' && (
                  <DialogTitle id='alert-dialog-slide-title'>Success</DialogTitle>
                )}
                {dialogType == 'failed' && (
                  <DialogTitle id='alert-dialog-slide-title'>Error</DialogTitle>
                )}
                {dialogType == 'warning' && (
                  <DialogTitle id='alert-dialog-slide-title'>Warning</DialogTitle>
                )}

                <DialogContent>
                  <DialogContentText id='alert-dialog-slide-description'>
                    {dialogMessage}
                  </DialogContentText>
                </DialogContent>
                <DialogActions className='dialog-actions-dense'>

                  {dialogType == 'warning' && (
                    <>
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


            </Dialog>


          </Card>
        </Grid>
        {/* <EditUserDrawerFromView open={editUserOpen} toggle={toggleEditUserDrawer} editId={editId} setEditId={setEditId} editRow={editRow} setEditRow={setEditRow} /> */}
        <EditUserDrawerFromView open={editUserOpen} toggle={toggleEditUserDrawer} editId={editId} setEditId={setEditId}
                                editRow={editRow} setEditRow={setEditRow} vehicleData={vehicleData}
                                setVehicleData={setVehicleData} refresh={refresh} setRefresh={setRefresh}/>
      </Grid>
    )
  } else {
    return null
  }
}

export default UserViewLeft
