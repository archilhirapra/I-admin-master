// ** React Imports
import {Fragment, useState} from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Divider from '@mui/material/Divider'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import AlertTitle from '@mui/material/AlertTitle'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import DialogTitle from '@mui/material/DialogTitle'
import OutlinedInput from '@mui/material/OutlinedInput'
import DialogContent from '@mui/material/DialogContent'
import InputAdornment from '@mui/material/InputAdornment'
import TableContainer from '@mui/material/TableContainer'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'
import PencilOutline from 'mdi-material-ui/PencilOutline'

const data = [
  {
    device: 'Dell XPS 15',
    location: 'United States',
    browser: 'Chrome on Windows',
    recentActivity: '10, Jan 2020 20:07'
  },
  {
    location: 'Ghana',
    device: 'Google Pixel 3a',
    browser: 'Chrome on Android',
    recentActivity: '11, Jan 2020 10:16'
  },
  {
    location: 'Mayotte',
    device: 'Apple iMac',
    browser: 'Chrome on MacOS',
    recentActivity: '11, Jan 2020 12:10'
  },
  {
    location: 'Mauritania',
    device: 'Apple iPhone XR',
    browser: 'Chrome on iPhone',
    recentActivity: '12, Jan 2020 8:29'
  }
]

const UserViewSecurity = () => {
  // ** States
  const [defaultValues, setDefaultValues] = useState({mobile: '+1(968) 819-2547'})
  const [mobileNumber, setMobileNumber] = useState(defaultValues.mobile)
  const [openEditMobileNumber, setOpenEditMobileNumber] = useState(false)

  const [values, setValues] = useState({
    newPassword: '',
    showNewPassword: false,
    confirmNewPassword: '',
    showConfirmNewPassword: false
  })

  // Handle Password
  const handleNewPasswordChange = prop => event => {
    setValues({...values, [prop]: event.target.value})
  }

  const handleClickShowNewPassword = () => {
    setValues({...values, showNewPassword: !values.showNewPassword})
  }

  const handleMouseDownNewPassword = event => {
    event.preventDefault()
  }

  // Handle Confirm Password
  const handleConfirmNewPasswordChange = prop => event => {
    setValues({...values, [prop]: event.target.value})
  }

  const handleClickShowConfirmNewPassword = () => {
    setValues({...values, showConfirmNewPassword: !values.showConfirmNewPassword})
  }

  const handleMouseDownConfirmNewPassword = event => {
    event.preventDefault()
  }

  // Handle edit mobile number dialog
  const handleEditMobileNumberClickOpen = () => setOpenEditMobileNumber(true)
  const handleEditMobileNumberClose = () => setOpenEditMobileNumber(false)

  // Handle button click inside the dialog
  const handleCancelClick = () => {
    setMobileNumber(defaultValues.mobile)
    handleEditMobileNumberClose()
  }

  const handleSubmitClick = () => {
    setDefaultValues({...defaultValues, mobile: mobileNumber})
    handleEditMobileNumberClose()
  }

  return (
    <Fragment>
      <Card sx={{mb: 6}}>
        <CardHeader title='Change Password' titleTypographyProps={{variant: 'h6'}}/>
        <CardContent>
          <Alert icon={false} severity='warning' sx={{mb: 4}}>
            <AlertTitle sx={{mb: theme => `${theme.spacing(1)} !important`}}>
              Ensure that these requirements are met
            </AlertTitle>
            Minimum 8 characters long, uppercase & symbol
          </Alert>

          <form onSubmit={e => e.preventDefault()}>
            <Grid container spacing={2.5}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size='small'>
                  <InputLabel htmlFor='user-view-security-new-password'>New Password</InputLabel>
                  <OutlinedInput
                    label='New Password'
                    value={values.newPassword}
                    id='user-view-security-new-password'
                    onChange={handleNewPasswordChange('newPassword')}
                    type={values.showNewPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={handleClickShowNewPassword}
                          aria-label='toggle password visibility'
                          onMouseDown={handleMouseDownNewPassword}
                        >
                          {values.showNewPassword ? <EyeOutline/> : <EyeOffOutline/>}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size='small'>
                  <InputLabel htmlFor='user-view-security-confirm-new-password'>Confirm New Password</InputLabel>
                  <OutlinedInput
                    label='Confirm New Password'
                    value={values.confirmNewPassword}
                    id='user-view-security-confirm-new-password'
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
                          {values.showConfirmNewPassword ? <EyeOutline/> : <EyeOffOutline/>}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sx={{mt: 1.5}}>
                <Button type='submit' variant='contained'>
                  Change Password
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>


    </Fragment>
  )
}

export default UserViewSecurity
