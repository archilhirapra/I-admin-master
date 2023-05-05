// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Box from '@mui/material/Box'
import MuiLink from '@mui/material/Link'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import {styled, useTheme} from '@mui/material/styles'
import MuiCard from '@mui/material/Card'

// ** Icons Imports
import ChevronLeft from 'mdi-material-ui/ChevronLeft'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustrationsV1'
import {FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput} from '@mui/material'
import {Controller, useForm} from 'react-hook-form'
import {EyeOffOutline, EyeOutline} from 'mdi-material-ui'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {useEffect, useState} from 'react'
import auth from 'src/configs/auth'
import {useAuth} from 'src/hooks/useAuth'


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
// for grid
import Grid from '@mui/material/Grid'
import {Router, useRouter} from 'next/router'

// ** Styled Components
const Card = styled(MuiCard)(({theme}) => ({
  [theme.breakpoints.up('sm')]: {width: 450}
}))


const defaultValues = {
  password: 'r3daxc6l',
  confirm_password: 'r3daxc6l',
  id: 'devkkali@gmail.com'
}

const schema = yup.object().shape({
  id: yup.string().email().required('Email is a required field'),
  password: yup.string().min(5).required('Password is a required field'),
  confirm_password: yup.string().min(5).required('Confirm Password is a required field').oneOf([yup.ref('password')], 'Password does not match'),
})

const ForgotPasswordV1 = () => {
  //** Hook
  const auth = useAuth()
  const router = useRouter()

  const [values, setValues] = useState({
    password: '',
    confirm_password: '',
    showPassword: false
  })


  // ** Hook
  const theme = useTheme()


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


  const [openSuccess, setOpenSuccess] = useState(false);
  const handleCloseSuccess = () => {
    router.replace('/')
  }


  const handleVerifyOtp = () => {
    let id = typedId;
    let password = typedConfirmPassword;
    let otp = otpCodeInput.replace(/\s/g, '');

    auth.verifyOtpforgotPassword({id, otp, password}, (data) => {
      console.log(data);
      if (data.message == 'success') {
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


  const handleClickShowPassword = () => {
    setValues({...values, showPassword: !values.showPassword})
  }

  const {
    control,
    setError,
    handleSubmit,
    formState: {errors}
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const [typedId, setTypedId] = useState(null);
  const [typedConfirmPassword, setTypedConfirmPassword] = useState(null);
  const onSubmit = data => {
    const {id, password, confirm_password} = data

    auth.forgotPassword({id}, (data) => {
      // console.log('login success', data.error.message);
      if (data.message == 'success') {
        setTypedId(id);
        setTypedConfirmPassword(confirm_password)
        setOpen(true);
        setCooldown(30);
      } else {
        if (data.message == 'failed') {
          console.log(data.data.data.message)
          setError('id', {
            // type: 'manual',
            message: data.data.data.message
          })
        } else {
          setError('id', {
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


  return (
    <Box className='content-center'>
      <Card sx={{zIndex: 1}}>
        {/* <CardContent sx={{ p: theme => `${theme.spacing(15.5, 7, 8)} !important` }}> */}
        <CardContent sx={{p: theme => `${theme.spacing(13, 7, 6.5)} !important`}}>

          <Box sx={{mb: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {/* <svg width={47} fill='none' height={26} viewBox='0 0 268 150' xmlns='http://www.w3.org/2000/svg'>
              <rect
                rx='25.1443'
                width='50.2886'
                height='143.953'
                fill={theme.palette.primary.main}
                transform='matrix(-0.865206 0.501417 0.498585 0.866841 195.571 0)'
              />
              <rect
                rx='25.1443'
                width='50.2886'
                height='143.953'
                fillOpacity='0.4'
                fill='url(#paint0_linear_7821_79167)'
                transform='matrix(-0.865206 0.501417 0.498585 0.866841 196.084 0)'
              />
              <rect
                rx='25.1443'
                width='50.2886'
                height='143.953'
                fill={theme.palette.primary.main}
                transform='matrix(0.865206 0.501417 -0.498585 0.866841 173.147 0)'
              />
              <rect
                rx='25.1443'
                width='50.2886'
                height='143.953'
                fill={theme.palette.primary.main}
                transform='matrix(-0.865206 0.501417 0.498585 0.866841 94.1973 0)'
              />
              <rect
                rx='25.1443'
                width='50.2886'
                height='143.953'
                fillOpacity='0.4'
                fill='url(#paint1_linear_7821_79167)'
                transform='matrix(-0.865206 0.501417 0.498585 0.866841 94.1973 0)'
              />
              <rect
                rx='25.1443'
                width='50.2886'
                height='143.953'
                fill={theme.palette.primary.main}
                transform='matrix(0.865206 0.501417 -0.498585 0.866841 71.7728 0)'
              />
              <defs>
                <linearGradient
                  y1='0'
                  x1='25.1443'
                  x2='25.1443'
                  y2='143.953'
                  id='paint0_linear_7821_79167'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop />
                  <stop offset='1' stopOpacity='0' />
                </linearGradient>
                <linearGradient
                  y1='0'
                  x1='25.1443'
                  x2='25.1443'
                  y2='143.953'
                  id='paint1_linear_7821_79167'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop />
                  <stop offset='1' stopOpacity='0' />
                </linearGradient>
              </defs>
            </svg>
            <Typography variant='h6' sx={{ ml: 2, lineHeight: 1, fontWeight: 700, fontSize: '1.5rem !important' }}>
              {themeConfig.templateName}
            </Typography> */}
          </Box>
          <Box sx={{mb: 6.5}}>
            <Typography variant='h5' sx={{mb: 1.5, letterSpacing: '0.18px', fontWeight: 600}}>
              Forgot Password? 🔒
            </Typography>
            <Typography variant='body2'>
              Enter your email and we&prime;ll send you instructions to reset your password
            </Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            {/* <TextField autoFocus type='email' label='Email' sx={{ display: 'flex', mb: 4 }} /> */}
            <FormControl fullWidth sx={{mb: 4}}>
              <Controller
                name='id'
                control={control}
                rules={{required: true}}
                render={({field: {value, onChange, onBlur}}) => (
                  <TextField
                    autoFocus
                    label='Email'
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.id)}
                    placeholder='jaynikpatel119977.jp@gmail.com'
                  />
                )}
              />
              {errors.id && <FormHelperText sx={{color: 'error.main'}}>{errors.id.message}</FormHelperText>}
            </FormControl>
            <FormControl fullWidth sx={{mb: 4}}>
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
                    id='auth-login-v2-password'
                    error={Boolean(errors.password)}
                    type={values.showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onMouseDown={e => e.preventDefault()}
                          onClick={() => handleClickShowPassword(!(values.showPassword))}
                        >
                          {(values.showPassword) ? <EyeOutline/> : <EyeOffOutline/>}
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

            <FormControl fullWidth sx={{mb: 4}}>
              <InputLabel htmlFor='forgot-confirm-password' error={Boolean(errors.password)}>
                Confirm Password
              </InputLabel>
              <Controller
                name='confirm_password'
                control={control}
                rules={{required: true}}
                render={({field: {value, onChange, onBlur}}) => (
                  <OutlinedInput
                    value={value}
                    onBlur={onBlur}
                    label='Confirm Password'
                    onChange={onChange}
                    id='forgot-confirm-password'
                    error={Boolean(errors.password)}
                    type={values.showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onMouseDown={e => e.preventDefault()}
                          onClick={() => handleClickShowPassword(!(values.showPassword))}
                        >
                          {(values.showPassword) ? <EyeOutline/> : <EyeOffOutline/>}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                )}
              />
              {errors.confirm_password && (
                <FormHelperText sx={{color: 'error.main'}} id=''>
                  {errors.confirm_password.message}
                </FormHelperText>
              )}
            </FormControl>


            <Button fullWidth size='large' type='submit' variant='contained' sx={{mb: 5.25}}>
              Send reset otp
            </Button>
            <Typography sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Link passHref href='/login'>
                <Typography
                  component={MuiLink}
                  sx={{display: 'flex', alignItems: 'center', color: 'primary.main', justifyContent: 'center'}}
                >
                  <ChevronLeft sx={{mr: 1.5, fontSize: '2rem'}}/>
                  <span>Back to login</span>
                </Typography>
              </Link>
            </Typography>
          </form>
        </CardContent>
      </Card>

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


      <FooterIllustrationsV1 image={`/images/pages/auth-v1-forgot-password-mask-${theme.palette.mode}.png`}/>
    </Box>
  )
}
ForgotPasswordV1.getLayout = page => <BlankLayout>{page}</BlankLayout>
ForgotPasswordV1.guestGuard = true
export default ForgotPasswordV1
