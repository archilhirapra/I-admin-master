// ** React Imports
import {forwardRef, useState} from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import {styled} from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
// import Select from '@mui/material/Select'
// import MenuItem from '@mui/material/MenuItem'


// ** Icons Imports
import Close from 'mdi-material-ui/Close'


import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm, Controller} from 'react-hook-form'


// for otp dialog
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'

// for validation
// ** CleaveJS Imports
import Cleave from 'cleave.js/react'
import 'cleave.js/dist/addons/cleave-phone.us'
// ** Styled Component
import CleaveWrapper from 'src/@core/styles/libs/react-cleave'


import 'react-datepicker/dist/react-datepicker.css'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import DatePicker from 'react-datepicker'
import {useEffect} from 'react'


import adminConfig from 'src/configs/admin'
import riderConfig from 'src/configs/rider'
import axios from 'axios'
import authConfig from 'src/configs/auth'


import {useAuth} from 'src/hooks/useAuth'
import FormHelperText from '@mui/material/FormHelperText'

const CustomInput = forwardRef(({...props}, ref) => {
  return <TextField inputRef={ref} {...props} sx={{width: '100%'}}/>
})


const ImgStyled = styled('img')(({theme}) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(5),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({theme}) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({theme}) => ({
  marginLeft: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const TabAccount = ({id, rider, refresh, setRefresh}) => {
  const auth = useAuth()
  const [riderId, setRiderId] = useState(id)
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


  const schema = yup.object().shape({})
  const defaultValues = {
    email: rider?.email,
    mobile: formatPhoneNumber(rider?.mobileNo),
  }
  const {
    getValues,
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


  const handleAndroidSave = () => {
    let android = getValues("android")
    if (getValues("android") == '') {
      android = '#'
    }
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
    }
    axios
      .post(adminConfig.AppLinkAddEndpoint, {apkLink: android, isAndroid: true}, {headers})
      .then(response => {
        setRefresh(refresh + 1)
      })
      .catch((e) => {
      })
  }
  const handleIosSave = () => {
    let ios = getValues("ios")
    if (getValues("ios") == '') {
      ios = '#'
    }
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
    }
    axios
      .post(adminConfig.AppLinkAddEndpoint, {apkLink: ios, isAndroid: false}, {headers})
      .then(response => {
        setRefresh(refresh + 1)
      })
      .catch((e) => {
      })
  }


  // ** State
  const [data, setData] = useState(null)

  const [isEditEmail, setIsEditEmail] = useState(false)
  const [isEditMobile, setIsEditMobile] = useState(false)

  const onEditEmailClick = () => {
    setIsEditEmail(true)
  }
  const onCancelEmailClicked = () => {
    setIsEditEmail(false)
  }
  const onEditMobileClick = () => {
    setIsEditMobile(true)
  }
  const onCancelMobileClicked = () => {
    setIsEditMobile(false)
  }


  // ** otp dialogs State
  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
    setCooldown(0)
    setOtpCodeInput('')
  }


  const [otpCodeInput, setOtpCodeInput] = useState(null);
  const otpChange = (e) => {
    setOtpCodeInput(e.target.value);
    setError('otp', {})
  }
  const handleResendCode = () => {
    let email = rider?.email


    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
    }
    axios
      .post(riderConfig.RiderOtpEndpoint, {id: email}, {headers})
      .then(response => {
        setCooldown(30);
        setError('otp', {})
        setOtpCodeInput('')
      })
      .catch((e) => {


        setError('otp', {
          // type: 'manual',
          message: data.error
        })

      })


  }


  const [cooldown, setCooldown] = useState(30);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (cooldown <= 0) return;
      setCooldown((old) => old - 1);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [cooldown]);


  const [openSuccess, setOpenSuccess] = useState(false);
  const handleCloseSuccess = () => {
    setOpenSuccess(false)
    setOpen(false)
    setRefresh(refresh + 1)
  }

  const handleVerifyOtp = () => {
    let id = typedId.replace(/[^\d]/g, '');
    if (otpCodeInput == null) {
      setError('otp', {
        message: 'please enter otp'
      })
    } else {
      let otp = otpCodeInput.replace(/\s/g, '');


      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
      }
      axios
        .put(riderConfig.RiderUpdateWithOtpEndpoint, {id: id, otp: otp, riderId: riderId}, {headers})
        .then(response => {

          reset()
          setOpenSuccess(true)

        })
        .catch((e) => {
          setError('otp', {
            // type: 'manual',
            message: e?.response?.data?.message
          })

        })
    }


  }


  const [typedId, setTypedId] = useState(null);

  const onSubmit = () => {
    let email = rider?.email


    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
    }
    axios
      .post(riderConfig.RiderOtpEndpoint, {id: email}, {headers})
      .then(response => {

        setTypedId(getValues('mobile'));
        setOpen(true);
        setCooldown(30);
      })
      .catch((e) => {
        setError('mobile', {
          // type: 'manual',
          message: data.error
        })

      })


  }


  return (
    <>
      <CardContent>
        <form>
          <Grid container spacing={6}>


            <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
                <Controller
                  name='mobile'
                  control={control}
                  rules={{required: true}}
                  render={({field: {value, onChange}}) => (
                    <TextField
                      disabled={!isEditMobile}
                      value={value}
                      label='Mobile Number'
                      onChange={(e) => {
                        clearErrors('mobile');
                        onChange(formatPhoneNumber(e.target.value))
                      }}
                    />
                  )}
                />

              </FormControl>
            </Grid>


            <Grid item xs={12}>
              {isEditMobile ? (
                <>
                  <Button onClick={onSubmit} variant='contained' sx={{mr: 4}}>
                    Save
                  </Button>
                  <Button onClick={onCancelMobileClicked} color='error' variant='contained' sx={{mr: 4}}>
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={onEditMobileClick} variant='contained' sx={{mr: 4}}>
                    Edit
                  </Button>
                </>
              )}

            </Grid>
          </Grid>
        </form>
      </CardContent>
      <Dialog open={open} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>OTP Verification</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{mb: 4}}>
            Please enter six digit security code,
          </DialogContentText>

          <CleaveWrapper>
            <Grid container spacing={2}>

              <Grid item xs={12}>
                <InputLabel htmlFor='blocks' sx={{mb: 1, fontSize: '.75rem'}}>
                  otp code
                </InputLabel>
                <Cleave disabled={cooldown > 0 ? ('') : ('disabled')} value={otpCodeInput} onChange={otpChange}
                        label="otp" className="form-field" id='blocks' placeholder='000 000'
                        options={{blocks: [3, 3], uppercase: true}}/>
                {errors.otp && <FormHelperText sx={{color: 'error.main'}}>{errors.otp.message}</FormHelperText>}
                <InputLabel htmlFor='blocks' sx={{mt: 2, fontSize: '.75rem'}}>{cooldown > 0 ? (<>Your code will expire
                  in {cooldown} sec.</>) : ('')}</InputLabel>
              </Grid>


            </Grid>
          </CleaveWrapper>

        </DialogContent>
        <DialogActions className='dialog-actions-dense roshan' sx={{justifyContent: 'space-between'}}>
          <Button disabled={cooldown > 0 ? ('disabled') : ('')} onClick={(handleResendCode)}>Resend</Button>
          <Grid item xs={12} sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Button disabled={cooldown > 0 ? ('') : ('disabled')} onClick={handleVerifyOtp}>Vefiry</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </Grid>

        </DialogActions>
      </Dialog>


      <Dialog open={openSuccess} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Success</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{mb: 4}}>
            Mobile Number is Succesfully changed,
          </DialogContentText>

        </DialogContent>
        <DialogActions className='dialog-actions-dense roshan' sx={{justifyContent: 'space-between'}}>
          <Grid item xs={12} sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Button onClick={handleCloseSuccess}>Ok</Button>
          </Grid>

        </DialogActions>
      </Dialog>
    </>

  )
}

export default TabAccount
