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


import 'react-datepicker/dist/react-datepicker.css'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import DatePicker from 'react-datepicker'
import {useEffect} from 'react'

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

const TabAccount = ({data}) => {

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

  const schema = yup.object().shape({
    name: yup.string().required(),
    gender: yup.string().required(),
    dob: yup.string().required(),


    role: yup.string().required(),
    status: yup.string().required(),
  })
  // console.log(data)
  const defaultValues = {
    name: data?.name,
    gender: data?.gender,
    dob: '',
    role: data?.role,
    status: data?.status,
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

  useEffect(() => {
    if (data?.birthDate != undefined) {
      setValue('dob', new Date(data.birthDate))
    }
  }, [])


  // ** State
  const [openAlert, setOpenAlert] = useState(true)
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')

  const onChange = file => {
    const reader = new FileReader()
    const {files} = file.target
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])
    }
  }

  return (
    <CardContent>
      <form>
        <Grid container spacing={6}>
          {/* <Grid item xs={12} sx={{ my: 5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={imgSrc} alt='Profile Pic' />
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Upload New Photo
                  <input
                    hidden
                    type='file'
                    onChange={onChange}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
                <ResetButtonStyled color='error' variant='outlined' onClick={() => setImgSrc('/images/avatars/1.png')}>
                  Reset
                </ResetButtonStyled>
                <Typography sx={{ mt: 4 }} component='p' variant='caption'>
                  Allowed PNG or JPEG. Max size of 800K.
                </Typography>
              </Box>
            </Box>
          </Grid> */}


          <Grid item xs={12} sm={12}>
            <FormControl fullWidth>
              <Controller
                name='name'
                control={control}
                rules={{required: true}}
                render={({field: {value, onChange}}) => (
                  <TextField
                    disabled
                    // type='email'
                    value={value}
                    label='Name'
                    onChange={onChange}
                    error={Boolean(errors.name)}
                    // placeholder='carterleonard@gmail.com'
                    // aria-describedby='validation-basic-email'
                  />
                )}
              />
              {errors.name && (
                <FormHelperText sx={{color: 'error.main'}} id='validation-basic-email'>
                  This field is required
                </FormHelperText>
              )}
            </FormControl>
          </Grid>


          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel
                id='gender'
                error={Boolean(errors.gender)}
                htmlFor='gender'
              >
                Gender
              </InputLabel>
              <Controller
                name='gender'
                control={control}
                rules={{required: true}}
                render={({field: {value, onChange}}) => (
                  <Select
                    disabled
                    value={value}
                    label='Gender'
                    onChange={onChange}
                    error={Boolean(errors.gender)}
                    labelId='gender'
                    // aria-describedby='validation-basic-select'
                  >
                    <MenuItem value=''>Select Role</MenuItem>
                    <MenuItem value='Male'>Male</MenuItem>
                    <MenuItem value='Female'>Female</MenuItem>
                    {/* <MenuItem value='employee'>Employee</MenuItem> */}
                    {/* <MenuItem value='Australia'>Australia</MenuItem>
                      <MenuItem value='Germany'>Germany</MenuItem> */}
                  </Select>
                )}
              />
              {errors.gender && (
                <FormHelperText sx={{color: 'error.main'}} id='role'>
                  This field is required
                </FormHelperText>
              )}
            </FormControl>
          </Grid>


          <Grid item xs={12} sm={6}>
            <Controller
              name='dob'
              control={control}
              rules={{required: true}}
              render={({field: {value, onChange}}) => (
                <DatePickerWrapper>
                  <DatePicker
                    disabled
                    autoComplete='off'
                    selected={value}
                    showYearDropdown
                    showMonthDropdown
                    onChange={e => onChange(e)}
                    placeholderText='MM/DD/YYYY'
                    customInput={
                      <CustomInput
                        value={value}
                        onChange={onChange}
                        label='Date of Birth'
                        error={Boolean(errors.dob)}
                        // aria-describedby='validation-basic-dob'
                      />
                    }
                  />
                </DatePickerWrapper>
              )}
            />
            {errors.dob && (
              <FormHelperText sx={{mx: 3.5, color: 'error.main'}} id='validation-basic-dob'>
                This field is required
              </FormHelperText>
            )}


          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel
                id='role'
                error={Boolean(errors.role)}
                htmlFor='role'
              >
                Role
              </InputLabel>
              <Controller
                name='role'
                control={control}
                rules={{required: true}}
                render={({field: {value, onChange}}) => (
                  <Select
                    disabled
                    value={value}
                    label='Role'
                    onChange={onChange}
                    error={Boolean(errors.role)}
                    labelId='role'
                    // aria-describedby='validation-basic-select'
                  >
                    <MenuItem value=''>Select Role</MenuItem>
                    <MenuItem value='superAdmin'>Super Admin</MenuItem>
                    <MenuItem value='admin'>Admin</MenuItem>
                    <MenuItem value='employee'>Employee</MenuItem>
                  </Select>
                )}
              />
              {errors.role && (
                <FormHelperText sx={{color: 'error.main'}} id='role'>
                  This field is required
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
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
                    disabled
                    value={value}
                    label='Status'
                    onChange={onChange}
                    error={Boolean(errors.status)}
                    labelId='status'
                    // aria-describedby='validation-basic-select'
                  >
                    <MenuItem value=''>Select Status</MenuItem>
                    <MenuItem value='0'>Active</MenuItem>
                    <MenuItem value='1'>InActive</MenuItem>
                    <MenuItem value='2'>Suspended</MenuItem>
                  </Select>
                )}
              />
              {errors.status && (
                <FormHelperText sx={{color: 'error.main'}} id='role'>
                  This field is required
                </FormHelperText>
              )}
            </FormControl>
          </Grid>


          {openAlert ? (
            <Grid item xs={12}>
              <Alert
                severity='info'
                sx={{'& a': {fontWeight: 400}}}
                // action={
                //   <IconButton size='small' color='inherit' aria-label='close' onClick={() => setOpenAlert(false)}>
                //     <Close fontSize='inherit' />
                //   </IconButton>
                // }
              >
                <AlertTitle sx={{mb: '.15rem'}}>Please contact administrator for any changes.</AlertTitle>
                {/* <Link href='/' onClick={e => e.preventDefault()}>
                  Resend Confirmation
                </Link> */}
              </Alert>
            </Grid>
          ) : null}

          {/* <Grid item xs={12}>
            <Button variant='contained' sx={{ mr: 4 }}>
              Save Changes
            </Button>
            <Button type='reset' variant='outlined' color='secondary'>
              Reset
            </Button>
          </Grid> */}
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAccount
