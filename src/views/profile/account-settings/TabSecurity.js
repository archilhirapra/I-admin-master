// ** React Imports
import {useState} from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import FormHelperText from '@mui/material/FormHelperText'


// ** Icons Imports
import Key from 'mdi-material-ui/Key'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'


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


// ** Third Party Imports
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm, Controller} from 'react-hook-form'
import {useEffect} from 'react'

import {useAuth} from 'src/hooks/useAuth'


const TabSecurity = ({data}) => {
  // const [userId, setUserId] = useState((data?.email == '' ? data?.email : data?.mobileNo))
  const [userId, setUserId] = useState(data?.email)
  const auth = useAuth()

  // ** States
  const [values, setValues] = useState({
    newPassword: '',
    currentPassword: '',
    showNewPassword: false,
    confirmNewPassword: '',
    showCurrentPassword: false,
    showConfirmNewPassword: false
  })

  // Handle Current Password
  const handleCurrentPasswordChange = prop => event => {
    setValues({...values, [prop]: event.target.value})
  }

  const handleClickShowCurrentPassword = () => {
    setValues({...values, showCurrentPassword: !values.showCurrentPassword})
  }

  const handleMouseDownCurrentPassword = event => {
    event.preventDefault()
  }

  // Handle New Password
  const handleNewPasswordChange = prop => event => {
    setValues({...values, [prop]: event.target.value})
  }

  const handleClickShowNewPassword = () => {
    setValues({...values, showNewPassword: !values.showNewPassword})
  }

  const handleMouseDownNewPassword = event => {
    event.preventDefault()
  }

  // Handle Confirm New Password
  const handleConfirmNewPasswordChange = prop => event => {
    setValues({...values, [prop]: event.target.value})
  }

  const handleClickShowConfirmNewPassword = () => {
    setValues({...values, showConfirmNewPassword: !values.showConfirmNewPassword})
  }

  const handleMouseDownConfirmNewPassword = event => {
    event.preventDefault()
  }


  const schema = yup.object().shape({
    password: yup.string().min(5).required('Password is a required field'),
    cpassword: yup.string().min(5).required('Confirm Password is a required field').oneOf([yup.ref('password')], 'Password does not match'),
  })

  const defaultValues = {
    password: '',
    cpassword: '',
  }


  const {
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


  // ** otp dialogs State
  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
    setCooldown(0)
    setOtpCodeInput('')
  }


  const [otpCodeInput, setOtpCodeInput] = useState(null);
  const otpChange = (e) => {
    console.log(e.target.value)
    setOtpCodeInput(e.target.value);
    setError('otp', {})
  }
  const handleResendCode = () => {
    let id = typedId;
    auth.resendOtp({id}, (data) => {
      if (data.message == 'success') {
        setCooldown(30);
        setError('otp', {})
        setOtpCodeInput('')
      } else {
        if (data.message == 'failed') {
          setError('otp', {
            // type: 'manual',
            message: data.error.message
          })
        } else {
          setError('otp', {
            // type: 'manual',
            message: data.error
          })
        }
      }

    })
  }


  const [cooldown, setCooldown] = useState(30);
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('value of cooldown', cooldown)
      if (cooldown <= 0) return;
      setCooldown((old) => old - 1);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [cooldown]);


  const [openSuccess, setOpenSuccess] = useState(false);
  const handleCloseSuccess = () => {
    // router.replace('/')
    setOpenSuccess(false)
    setOpen(false)
  }

  const handleVerifyOtp = () => {
    let id = typedId;
    let password = typedConfirmPassword;
    let otp = otpCodeInput.replace(/\s/g, '');

    auth.verifyOtpforgotPassword({id, otp, password}, (data) => {
      console.log(data);
      if (data.message == 'success') {
        reset()
        setOpenSuccess(true)
        setError('otp', {
          // type: 'manual',
          message: data.data.data.messsage
        })
      } else if (data.message == 'failed') {
        console.log(data.error.message)
        setError('otp', {
          // type: 'manual',
          message: data.error.message
        })
      } else {
        setError('otp', {
          // type: 'manual',
          message: data.error
        })
      }

    })


  }


  const [typedId, setTypedId] = useState(null);
  const [typedConfirmPassword, setTypedConfirmPassword] = useState(null);
  const onSubmit = data => {
    const {password, cpassword} = data
    // let id = userId

    auth.forgotPassword({id: userId}, (data) => {
      console.log('login success', data);
      if (data.message == 'success') {
        setTypedId(userId);
        setTypedConfirmPassword(cpassword)
        setOpen(true);
        setCooldown(30);

        console.log('yes')


      } else {
        if (data.message == 'failed') {
          console.log(data.data.data.message)
          setError('password', {
            // type: 'manual',
            message: data.data.data.message
          })
        } else {
          setError('password', {
            // type: 'manual',
            message: data.error
          })
        }
      }

    })
  }


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6} sx={{mt: 5, mb: [0, 6]}}>
              <Grid container spacing={6}>
                {/* <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-current-password'>Current Password</InputLabel>
                  <OutlinedInput
                    label='Current Password'
                    value={values.currentPassword}
                    id='account-settings-current-password'
                    type={values.showCurrentPassword ? 'text' : 'password'}
                    onChange={handleCurrentPasswordChange('currentPassword')}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          aria-label='toggle password visibility'
                          onClick={handleClickShowCurrentPassword}
                          onMouseDown={handleMouseDownCurrentPassword}
                        >
                          {values.showCurrentPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid> */}

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
                      Password
                    </InputLabel>
                    <Controller
                      name='password'
                      control={control}
                      rules={{required: true}}
                      render={({field: {value, onChange, onBlur}}) => (
                        <OutlinedInput
                          value={value}
                          onBlur={onBlur}
                          label='Password'
                          onChange={onChange}
                          id='password'
                          error={Boolean(errors.password)}
                          type={values.showNewPassword ? 'text' : 'password'}
                          endAdornment={
                            <InputAdornment position='end'>
                              <IconButton
                                edge='end'
                                onMouseDown={e => e.preventDefault()}
                                onClick={() => handleClickShowNewPassword(!(values.showNewPassword))}
                              >
                                {(values.showNewPassword) ? <EyeOutline/> : <EyeOffOutline/>}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      )}
                    />
                    {errors.password && (
                      <FormHelperText sx={{color: 'error.main'}} id=''>
                        {errors.password.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>


                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='cpassword' error={Boolean(errors.cpassword)}>
                      Confirm Password
                    </InputLabel>
                    <Controller
                      name='cpassword'
                      control={control}
                      rules={{required: true}}
                      render={({field: {value, onChange, onBlur}}) => (
                        <OutlinedInput
                          value={value}
                          onBlur={onBlur}
                          label='Confirm Password'
                          onChange={onChange}
                          id='cpassword'
                          error={Boolean(errors.cpassword)}
                          type={values.showConfirmNewPassword ? 'text' : 'password'}
                          endAdornment={
                            <InputAdornment position='end'>
                              <IconButton
                                edge='end'
                                onMouseDown={e => e.preventDefault()}
                                onClick={() => handleClickShowConfirmNewPassword(!(values.showConfirmNewPassword))}
                              >
                                {(values.showConfirmNewPassword) ? <EyeOutline/> : <EyeOffOutline/>}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      )}
                    />
                    {errors.cpassword && (
                      <FormHelperText sx={{color: 'error.main'}} id=''>
                        {errors.cpassword.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>


                {/* <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-confirm-new-password'>Confirm New Password</InputLabel>
                  <OutlinedInput
                    label='Confirm New Password'
                    value={values.confirmNewPassword}
                    id='account-settings-confirm-new-password'
                    type={values.showConfirmNewPassword ? 'text' : 'password'}
                    onChange={handleConfirmNewPasswordChange('confirmNewPassword')}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          aria-label='toggle password visibility'
                          onClick={handleClickShowConfirmNewPassword}
                          onMouseDown={handleMouseDownConfirmNewPassword}
                        >
                          {values.showConfirmNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid> */}
              </Grid>
            </Grid>

            <Grid item sm={6} xs={12} sx={{display: 'flex', mt: 2.5, alignItems: 'flex-end', justifyContent: 'center'}}>
              <img alt='avatar' src='/images/pages/account-settings-security-illustration.png'/>
            </Grid>
          </Grid>

          <Divider sx={{mt: 0, mb: 6}}/>

          {/* <Box sx={{ mb: 11, display: 'flex', alignItems: 'center' }}>
          <Key sx={{ mr: 4 }} />
          <Typography variant='h5'>Two-factor authentication</Typography>
        </Box> */}

          {/* <Box sx={{ mb: 11, display: 'flex', justifyContent: 'center' }}>
          <Box
            sx={{
              maxWidth: 440,
              display: 'flex',
              textAlign: 'center',
              alignItems: 'center',
              flexDirection: 'column'
            }}
          >
            <CustomAvatar skin='light' variant='rounded' sx={{ mb: 4, width: 48, height: 48 }}>
              <LockOpenOutline />
            </CustomAvatar>
            <Typography variant='h6' sx={{ mb: 4 }}>
              Two factor authentication is not enabled yet.
            </Typography>
            <Typography variant='body2'>
              Two-factor authentication adds an additional layer of security to your account by requiring more than just
              a password to log in. Learn more.
            </Typography>
          </Box>
        </Box> */}

          <Box>
            <Button type='submit' variant='contained' sx={{mr: 4}}>
              Save Changes
            </Button>
            <Button
              type='reset'
              variant='outlined'
              color='secondary'
              onClick={reset}
            >
              Reset
            </Button>
          </Box>
        </CardContent>
      </form>


      <Dialog open={open} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>OTP Verification</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{mb: 4}}>
            Please enter six digit security code,
          </DialogContentText>
          {/* <TextField id='name' autoFocus fullWidth type='email' label='Email Address' /> */}

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
              {/* <Grid item sx={{ pt: 80 }} alignItems="center">
                <InputLabel htmlFor='blocks' sx={{ mb: 2, fontSize: '.75rem' }}>
                  Blocks
                </InputLabel>
              </Grid> */}

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
            Password is Succesfully changed,
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

export default TabSecurity
