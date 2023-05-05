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
import InputAdornment from '@mui/material/InputAdornment'
import LinearProgress from '@mui/material/LinearProgress'
import FormControlLabel from '@mui/material/FormControlLabel'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'

// ** Icons Imports
import Check from 'mdi-material-ui/Check'
import Circle from 'mdi-material-ui/Circle'
import StarOutline from 'mdi-material-ui/StarOutline'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import {getInitials} from 'src/@core/utils/get-initials'


import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm, Controller} from 'react-hook-form'
import FormHelperText from '@mui/material/FormHelperText'
import axios from 'axios'
import authConfig from 'src/configs/auth'
import adminConfig from 'src/configs/admin'
import Slide from '@mui/material/Slide'


import EditAdminDrawer from 'src/views/apps/user/admin/list/EditUserDrawer2'


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


const UserViewLeft = ({id, data, accountStatus, setAccountStatus, suspendRefresh, setSuspendRefresh}) => {
  // ** States
  const [openPlans, setOpenPlans] = useState(false)
  const [openSuspend, setOpenSuspend] = useState(false)


  const [editId, setEditId] = useState(null);
  const [editRow, setEditRow] = useState(null);
  const [editUserOpen, setEditUserOpen] = useState(false)
  const toggleEditUserDrawer = () => {

    if (editUserOpen) {
      setSuspendRefresh(suspendRefresh + 1)
      setEditId(null);
      setEditRow(null);
      setEditUserOpen(false)
    } else {
      setEditId(id);
      setEditRow(data);
      setEditUserOpen(true)
    }

  }


  // Handle Upgrade Plan dialog
  const handlePlansClickOpen = () => setOpenPlans(true)
  const handlePlansClose = () => setOpenPlans(false)

  const handleSuspendOpen = () => setOpenSuspend(true)
  const handleSuspendClose = () => {
    reset()
    setOpenSuspend(false)
  }

  const renderUserAvatar = () => {

    if (data) {
      if (data?.image?.length) {
        return (
          <CustomAvatar alt='User Image' src={data.avatar} variant='rounded' sx={{width: 120, height: 120, mb: 4}}/>
        )
      } else {
        return (
          <CustomAvatar
            skin='light'
            variant='rounded'
            color={data?.avatarColor}
            sx={{width: 120, height: 120, fontWeight: 600, mb: 4, fontSize: '3rem'}}
          >
            {getInitials(data?.name)}
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
      .post(adminConfig.AdminSuspendEndpoint, {userId: id, status: 2, note: data.note, reason: data.reason}, {headers})
      .then(response => {
        setAccountStatus(response.data.data.data.status)


        setDialogType('success');
        setDialogMessage("Account suspended successfully")


        setSuspendRefresh(suspendRefresh + 1)


        handleClickOpenDialog()


      })
      .catch((e) => {

        setDialogType('failed');
        setDialogMessage(e?.response?.data?.message)
        handleClickOpenDialog()

      })

  }


  if (data) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{pt: 15, display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
              {renderUserAvatar()}
              <Typography variant='h6' sx={{mb: 4}}>
                {data.name}
              </Typography>
              <CustomChip
                skin='light'
                size='small'
                label={data.role}
                color={roleColors[data.role]}
                sx={{
                  borderRadius: '4px',
                  fontSize: '0.875rem',
                  textTransform: 'capitalize',
                  '& .MuiChip-label': {mt: -0.25}
                }}
              />
            </CardContent>

            <CardContent>
              <Typography variant='h6'>Details</Typography>
              <Divider sx={{mt: 4}}/>
              <Box sx={{pt: 2, pb: 1}}>
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
                    {data?.birthDate}
                  </Typography>
                </Box>
                <Box sx={{display: 'flex', mb: 2.7}}>
                  <Typography sx={{mr: 2, fontWeight: 500, fontSize: '0.875rem'}}>Mobile Number:</Typography>
                  <Typography variant='body2'>{data.countryCode}{formatPhoneNumber(data.mobileNo)}</Typography>
                </Box>
                <Box sx={{display: 'flex', mb: 2.7}}>
                  <Typography sx={{mr: 2, fontWeight: 500, fontSize: '0.875rem'}}>Is Mobile verified :</Typography>
                  <Typography variant='body2'>{(data.isMobileVerified ? 'Yes' : 'No')}</Typography>
                </Box>
                <Box sx={{display: 'flex', mb: 2.7}}>
                  <Typography sx={{mr: 2, fontWeight: 500, fontSize: '0.875rem'}}>Email ID:</Typography>
                  <Typography variant='body2'>{data.email}</Typography>
                </Box>
                <Box sx={{display: 'flex', mb: 2.7}}>
                  <Typography sx={{mr: 2, fontWeight: 500, fontSize: '0.875rem'}}>Is Email verified :</Typography>
                  <Typography variant='body2'>{(data.isEmailVerified ? 'Yes' : 'No')}</Typography>
                </Box>
                <Box sx={{display: 'flex', mb: 2.7}}>
                  <Typography sx={{mr: 2, fontWeight: 500, fontSize: '0.875rem'}}>Father Name:</Typography>
                  <Typography variant='body2'>{data.fatherName}</Typography>
                </Box>
                <Box sx={{display: 'flex', mb: 2.7}}>
                  <Typography sx={{mr: 2, fontWeight: 500, fontSize: '0.875rem'}}>Alternative Number:</Typography>
                  <Typography variant='body2'>{data.countryCode}{formatPhoneNumber(data.alternativeMobile)}</Typography>
                </Box>
                <Box sx={{display: 'flex', mb: 2.7}}>
                  <Typography sx={{mr: 2, fontWeight: 500, fontSize: '0.875rem'}}>Blood Group:</Typography>
                  <Typography variant='body2'>{data.bloodGroup}</Typography>
                </Box>
                <Box sx={{display: 'flex', mb: 2.7}}>
                  <Typography sx={{mr: 2, fontWeight: 500, fontSize: '0.875rem'}}>Account Status:</Typography>
                  <Typography
                    variant='body2'>{(data.status == 0 ? 'Active' : (data.status == 1 ? 'Inactive' : 'Suspended'))}</Typography>
                </Box>
                <Box sx={{display: 'flex', mb: 2.7}}>
                  <Typography sx={{mr: 2, fontWeight: 500, fontSize: '0.875rem'}}>Reason:</Typography>
                  <Typography variant='body2'>{data.reason}</Typography>
                </Box>

              </Box>
            </CardContent>

            <CardActions sx={{display: 'flex', justifyContent: 'left'}}>
              <Button onClick={handleSuspendOpen} color='error' variant='outlined'>
                {accountStatus == 2 ? 'Suspended' : 'Suspend'}
              </Button>
              <Button variant='contained' sx={{mr: 2}} onClick={toggleEditUserDrawer}>
                Edit
              </Button>
            </CardActions>


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
        <EditAdminDrawer
          open={editUserOpen}
          toggle={toggleEditUserDrawer}
          editId={editId}
          setEditId={setEditId}
          editRow={editRow}
          setEditRow={setEditRow}
        />
      </Grid>
    )
  } else {
    return null
  }
}

export default UserViewLeft
