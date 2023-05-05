// ** React Imports
import {useState} from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Box from '@mui/material/Box'
import MuiLink from '@mui/material/Link'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import {styled, useTheme} from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
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

// ** Icons Imports
import Google from 'mdi-material-ui/Google'
import Github from 'mdi-material-ui/Github'
import Twitter from 'mdi-material-ui/Twitter'
import Facebook from 'mdi-material-ui/Facebook'
import Phone from 'mdi-material-ui/Phone'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

import {useAuth} from 'src/hooks/useAuth'
// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustrationsV1'

// ** Styled Components
const Card = styled(MuiCard)(({theme}) => ({
  [theme.breakpoints.up('sm')]: {width: 450}
}))

const FormControlLabel = styled(MuiFormControlLabel)(({theme}) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const MLogin = () => {
  // ** State
  const [values, setValues] = useState({
    password: '',
    showPassword: false
  })

  // ** otp dialogs State
  const [open, setOpen] = useState(false)
  const handleClickOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  }
  const handleClose = () => setOpen(false)

  // ** Hook
  // const auth = useAuth()
  const theme = useTheme()

  const handleChange = prop => event => {
    setValues({...values, [prop]: event.target.value})
  }

  const handleClickShowPassword = () => {
    setValues({...values, showPassword: !values.showPassword})
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  return (
    <Box className='content-center'>
      <Card sx={{zIndex: 1}}>
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
          <Box sx={{mb: 6}}>
            <Typography variant='h5' sx={{mb: 1.5, fontWeight: 600, letterSpacing: '0.18px'}}>
              {`Welcome to ${themeConfig.templateName}! 👋🏻`}
            </Typography>
            <Typography variant='body2'>Please sign-in to your account.</Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
            {/* <TextField autoFocus fullWidth id='email' label='Email' sx={{ mb: 4 }} /> */}
            <TextField

              sx={{mb: 6}}
              fullWidth
              type='number'
              label='Phone No.'
              placeholder='+1-123-456-8790'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Phone/>
                  </InputAdornment>
                )
              }}
            />
            <CleaveWrapper>
              <InputLabel htmlFor='prefix' sx={{mb: 2, fontSize: '.75rem'}}>
                Prefix
              </InputLabel>
              <Cleave id='prefix' options={{prefix: '+1', blocks: [3, 3, 3, 4], uppercase: true}}/>
            </CleaveWrapper>

            {/* <Box
              sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
            >
              <FormControlLabel
                label='Remember Me'
                control={<Checkbox />}
                sx={{ '& .MuiFormControlLabel-label': { color: 'text.primary' } }}
              />
              <Link passHref href='/forgot-password'>
                <Typography component={MuiLink} variant='body2' sx={{ color: 'primary.main' }}>
                  Forgot Password?
                </Typography>
              </Link>
            </Box> */}
            <Button onClick={handleClickOpen} fullWidth size='large' type='submit' variant='contained' sx={{mb: 7}}>
              Send Code
            </Button>
            <Box sx={{display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center'}}>
              {/* <Typography sx={{ mr: 2, color: 'text.secondary' }}>New on our platform?</Typography> */}
              {/* <Typography>
                <Link passHref href='/register'>
                  <Typography component={MuiLink} sx={{ color: 'primary.main' }}>
                    Create an account
                  </Typography>
                </Link>
              </Typography> */}
            </Box>
            <Divider sx={{mt: 0, mb: 2, '& .MuiDivider-wrapper': {px: 4}}}>or</Divider>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Link href='/' passHref>
                <IconButton component='a'>
                  <EmailOutline sx={{color: '#497ce2'}}/>
                </IconButton>
              </Link>
            </Box>
          </form>
        </CardContent>
      </Card>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
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
                <Cleave label="otp" className="form-field" id='blocks' placeholder='000 000 000'
                        options={{blocks: [3, 3, 3], uppercase: true}}/>
                <InputLabel htmlFor='blocks' sx={{mb: 0, fontSize: '.75rem'}}>5 sec</InputLabel>
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
          <Button disabled onClick={handleClose}>Resend</Button>
          <Grid className='roshan' item xs={12} sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Button onClick={handleClose}>Vefiry</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </Grid>

        </DialogActions>
      </Dialog>
      <FooterIllustrationsV1/>
    </Box>
  )
}
MLogin.getLayout = page => <BlankLayout>{page}</BlankLayout>
MLogin.guestGuard = true

export default MLogin
