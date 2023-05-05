// ** React Imports
import { useState } from 'react'

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
import TextField from '@mui/material/TextField'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

// ** Icons Imports
import Key from 'mdi-material-ui/Key'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

const LoginMethod = ({ data }) => {
  const formatPhoneNumber = value => {
    if (!value) return value
    const phoneNumber = value.replace(/[^\d]/g, '')
    const phoneNumberLength = phoneNumber.length
    if (phoneNumberLength < 4) return phoneNumber
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)} - ${phoneNumber.slice(6, 10)}`
  }
  console.log('data is:', formatPhoneNumber('9876543210'))
  const schema = yup.object().shape({
    email: yup.string().required(),
    mobileNo: yup.string().required()
  })
  const defaultValues = {
    email: data?.email,
    mobileNo: formatPhoneNumber(data?.mobileNo)
  }

  const {
    register,
    reset,
    control,
    setValue,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

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
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowCurrentPassword = () => {
    setValues({ ...values, showCurrentPassword: !values.showCurrentPassword })
  }

  const handleMouseDownCurrentPassword = event => {
    event.preventDefault()
  }

  // Handle New Password
  const handleNewPasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword })
  }

  const handleMouseDownNewPassword = event => {
    event.preventDefault()
  }

  // Handle Confirm New Password
  const handleConfirmNewPasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowConfirmNewPassword = () => {
    setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword })
  }

  const handleMouseDownConfirmNewPassword = event => {
    event.preventDefault()
  }

  const [phoneInput, setPhoneInput] = useState('')
  const handlePhoneInput = e => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value)
    setPhoneInput(formattedPhoneNumber)
  }

  return (
    <form>
      <CardContent>
        <Grid container sx={{ my: 0 }} spacing={6}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Controller
                name='email'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    disabled
                    type='email'
                    value={value}
                    label='Email'
                    onChange={onChange}
                    error={Boolean(errors.email)}
                    placeholder='carterleonard@gmail.com'
                    // aria-describedby='validation-basic-email'
                  />
                )}
              />
              {errors.email && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-email'>
                  This field is required
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <Controller
                name='mobileNo'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    disabled
                    value={value}
                    label='Mobile Number'
                    // onChange={handlePhoneInput}
                    onChange={e => {
                      clearErrors('mobileNo')
                      onChange(formatPhoneNumber(e.target.value))
                    }}
                    placeholder='(000)000-0000'
                    error={Boolean(errors.mobileNo)}
                    InputProps={{ startAdornment: <InputAdornment position='start'>+1</InputAdornment> }}
                  />
                )}
              />

              {errors.mobileNo && (
                <FormHelperText sx={{ mx: 3.5, color: 'error.main' }} id='validation-basic-dob'>
                  This field is required
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          {/* <Grid item sm={6} xs={12} sx={{ display: 'flex', mt: 2.5, alignItems: 'flex-end', justifyContent: 'center' }}>
            <img alt='avatar' src='/images/pages/account-settings-security-illustration.png' />
          </Grid> */}
        </Grid>

        <Divider sx={{ mt: 6, mb: 6 }} />
        {/* <Grid item xs={12}>
          <Alert
            severity='info'
            sx={{ '& a': { fontWeight: 400 }, mb: 6 }}
          action={
            <IconButton size='small' color='inherit' aria-label='close' onClick={() => setOpenAlert(false)}>
              <Close fontSize='inherit' />
            </IconButton>
          }
          >
            <AlertTitle sx={{ mb: '.15rem' }}>Please contact administration for updating those data.</AlertTitle>
            <Link href='/' onClick={e => e.preventDefault()}>
                  Resend Confirmation
                </Link>
          </Alert>
        </Grid> */}

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

        {/* <Box>
          <Button variant='contained' sx={{ mr: 4 }}>
            Save Changes
          </Button>
          <Button
            type='reset'
            variant='outlined'
            color='secondary'
            onClick={() => setValues({ ...values, currentPassword: '', newPassword: '', confirmNewPassword: '' })}
          >
            Reset
          </Button>
        </Box> */}
      </CardContent>
    </form>
  )
}

export default LoginMethod
