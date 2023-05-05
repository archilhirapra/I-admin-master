// ** React Imports
import { forwardRef, Fragment, useState } from 'react'
// ** Spinner Import
// import Spinner from 'src/@core/components/spinner'
import Spinner from 'src/layouts/components/spinner'
// ** MUI Imports
// import Box from '@mui/material/Box'
import List from '@mui/material/List'
// import Button from '@mui/material/Button'
import ListItem from '@mui/material/ListItem'
// import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
// import Typography from '@mui/material/Typography'

// ** Icons Imports
// import Close from 'mdi-material-ui/Close'
import FileDocumentOutline from 'mdi-material-ui/FileDocumentOutline'

// ** Third Party Components
import toast from 'react-hot-toast'
import { useDropzone } from 'react-dropzone'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import FormLabel from '@mui/material/FormLabel'
// import OutlinedInput from '@mui/material/OutlinedInput'
import 'react-datepicker/dist/react-datepicker.css'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import DatePicker from 'react-datepicker'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import Checkbox from '@mui/material/Checkbox'
import InputAdornment from '@mui/material/InputAdornment'

import Cleave from 'cleave.js/react'
import 'cleave.js/dist/addons/cleave-phone.us'
import CleaveWrapper from 'src/@core/styles/libs/react-cleave'

import Drawer from '@mui/material/Drawer'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
// import { addUser } from 'src/store/apps/user'
import { addAdmin } from 'src/store/apps/admin'
import Switch from '@mui/material/Switch'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import { CircularProgress, Dialog, Input } from '@mui/material'

// import Button from '@mui/material/Button'
// import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Slide from '@mui/material/Slide'
import DialogContentText from '@mui/material/DialogContentText'
import { IconPictureAsPdf } from '@aws-amplify/ui-react'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const CustomInput = forwardRef(({ ...props }, ref) => {
  return <TextField inputRef={ref} {...props} sx={{ width: '100%' }} />
})

// Styled component for the upload image inside the dropzone area
const Img = styled('img')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    marginRight: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  },
  [theme.breakpoints.down('sm')]: {
    width: 250
  }
}))

// Styled component for the heading inside the dropzone area
const HeadingTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(5),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(4)
  }
}))

const BoxStyle = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#30334e' : '#ffffff'
}))

// Styled FormControlLabel component
const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  marginLeft: 0,
  '& .MuiSwitch-root': {
    width: 42,
    height: 26,
    padding: 0,
    marginRight: theme.spacing(3),
    '& .MuiSwitch-switchBase': {
      padding: 1,
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: theme.palette.common.white,
        '& + .MuiSwitch-track': {
          opacity: 1,
          border: 'none',
          backgroundColor: '#52d869'
        }
      }
    },
    '& .MuiSwitch-thumb': {
      width: 24,
      height: 24
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      borderRadius: 13,
      backgroundColor: theme.palette.mode === 'dark' ? theme.palette.action.selected : theme.palette.grey[50],
      border: `1px solid ${theme.palette.grey[400]}`,
      transition: theme.transitions.create(['background-color', 'border'])
    }
  }
}))

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required(),
  mobileNo: yup.string().required(),
  aMobileNo: yup.string().required('Alternative mobile number is required'),
  dob: yup.string().required(),
  gender: yup.string().required(),
  fatherName: yup.string().required(),
  blood: yup.string().required(),
  role: yup.string().required()
})

const defaultValues = {
  name: '',
  email: '',
  mobileNo: '',
  aMobileNo: '',
  dob: '',
  gender: '',
  fatherName: '',
  blood: '',
  role: ''
}

const SidebarAddUser = props => {
  const [isVisibleSitch, SetIsVisibleSitch] = useState(false)
  const [isSubscriptionSitch, SetIsSubscriptionSitch] = useState(false)

  const handleVisibilitySwitch = event => {
    SetIsVisibleSitch(event.target.checked)
  }
  const handleSubscriptionSwitch = event => {
    SetIsSubscriptionSitch(event.target.checked)
  }

  // ** Props
  const { open, toggle } = props

  // ** State
  const [plan, setPlan] = useState('basic')
  const [role, setRole] = useState('subscriber')

  // ** Hooks
  const dispatch = useDispatch()

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

  const [loading, setLoading] = useState(false)

  const [openDialog, setOpenDialog] = useState(false)
  const [dialogType, setDialogType] = useState('success')
  const [dialogMessage, setDialogMessage] = useState('')
  const [filledFormData, setFilledFormData] = useState(null)
  const handleClickOpenDialog = () => setOpenDialog(true)

  const handleCloseDialog = () => {
    if (dialogType == 'success') {
      categoryAddedSuccess()
    } else if (dialogType == 'warning') {
      setDialogMessage('')
      setLoading(false)
    }
    setOpenDialog(false)
  }

  const onSubmit = data => {
    setFilledFormData(data)
    setDialogType('warning')
    setDialogMessage('Do you really want to add this data?')
    handleClickOpenDialog()
  }

  const continueEditing = () => {
    handleCloseDialog()

    let data = filledFormData

    const { name, email, mobileNo, dob, gender, role, aMobileNo, fatherName, blood } = data
    let phone = mobileNo.replace(/[^0-9]/g, '')
    let aphone = aMobileNo.replace(/[^0-9]/g, '')
    let date = new Date(data.dob).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })
    setLoading(true)

    dispatch(
      addAdmin({
        name,
        email,
        mobileNo: phone,
        alternativeMobile: aphone,
        dob: date,
        gender,
        role,
        fatherName: fatherName,
        bloodGroup: blood
      })
    ).then(data => {
      setLoading(false)
      if (data?.payload?.status == 'success') {
        setDialogType('success')
        setDialogMessage(data?.payload?.message)
        handleClickOpenDialog()
      } else {
        setDialogType('failed')
        setDialogMessage(data?.payload?.message)
        handleClickOpenDialog()
      }
    })
  }

  const categoryAddedSuccess = () => {
    toggle()
    setFiles([])
    SetIsVisibleSitch(false)
    SetIsSubscriptionSitch(false)
    setPhoneInput('')
    reset()
  }

  const handleClose = () => {
    setPlan('basic')
    setRole('subscriber')
    setValue('contact', '')
    toggle()
    setFiles([])
    SetIsVisibleSitch(false)
    SetIsSubscriptionSitch(false)
    setPhoneInput('')
    reset()
  }

  /** upload files */

  // ** State
  const [files, setFiles] = useState([])

  // ** Hooks
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    // maxFiles: 2,
    maxSize: 1000000,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    onDrop: acceptedFiles => {
      setError('image', {})
      setFiles(acceptedFiles.map(file => Object.assign(file)))
    },
    onDropRejected: () => {
      toast.error('You can only upload a files & maximum size of 1 MB.', {
        duration: 2000
      })
    }
  })

  const renderFilePreview = file => {
    if (file.type.startsWith('image')) {
      return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file)} />
    } else {
      return <FileDocumentOutline />
    }
  }

  const handleRemoveFile = file => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter(i => i.name !== file.name)
    setFiles([...filtered])
    setValue('image', undefined)
  }

  const fileList = files.map(file => (
    <ListItem key={file.name}>
      <div style={{ overflow: 'hidden' }} className='file-details'>
        <div className='file-preview'>{renderFilePreview(file)}</div>
        <div>
          <Typography className='file-name'>{file.name}</Typography>
          <Typography className='file-size' variant='body2'>
            {Math.round(file.size / 100) / 10 > 1000
              ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
              : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
          </Typography>
        </div>
      </div>
      <IconButton onClick={() => handleRemoveFile(file)}>
        <Close fontSize='small' />
      </IconButton>
    </ListItem>
  ))

  const handleRemoveAllFiles = () => {
    setFiles([])
    setValue('image', undefined)
  }

  const [phoneInput, setPhoneInput] = useState('')
  const handlePhoneInput = data => {
    clearErrors('mobileNo')
    const formattedPhoneNumber = formatPhoneNumber(data)
    setPhoneInput(formattedPhoneNumber)
  }

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

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h6'>Add User</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </Header>

      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name='name'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Name'
                      onChange={onChange}
                      error={Boolean(errors.name)}
                      // aria-describedby='validation-basic-first-name'
                    />
                  )}
                />
                {errors.name && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name='email'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      type='email'
                      value={value}
                      label='Email'
                      onChange={onChange}
                      error={Boolean(errors.email)}
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

            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name='mobileNo'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Mobile Number'
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
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name='aMobileNo'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Alternative Mobile Number'
                      onChange={e => {
                        clearErrors('aMobileNo')
                        onChange(formatPhoneNumber(e.target.value))
                      }}
                      placeholder='(000)000-0000'
                      error={Boolean(errors.aMobileNo)}
                      InputProps={{ startAdornment: <InputAdornment position='start'>+1</InputAdornment> }}
                    />
                  )}
                />

                {errors.aMobileNo && (
                  <FormHelperText sx={{ mx: 3.5, color: 'error.main' }} id='validation-basic-dob'>
                    {errors.aMobileNo.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Controller
                name='dob'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <DatePickerWrapper>
                    <DatePicker
                      autoComplete='off'
                      selected={value}
                      showYearDropdown
                      showMonthDropdown
                      onChange={e => onChange(e)}
                      // dateFormat={'dd/MM/yyyy'}
                      placeholderText='MM/DD/YYYY'
                      customInput={
                        <CustomInput
                          value={value}
                          onChange={onChange}
                          label='Date of Birth'
                          error={Boolean(errors.dob)}
                        />
                      }
                    />
                  </DatePickerWrapper>
                )}
              />
              {errors.dob && (
                <FormHelperText sx={{ mx: 3.5, color: 'error.main' }} id='validation-basic-dob'>
                  This field is required
                </FormHelperText>
              )}
            </Grid>

            <Grid item xs={12}>
              <FormControl error={Boolean(errors.gender)}>
                <FormLabel>Gender</FormLabel>
                <Controller
                  name='gender'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <RadioGroup row {...field} aria-label='gender' name='validation-basic-radio'>
                      <FormControlLabel
                        value='Female'
                        label='Female'
                        sx={errors.gender ? { color: 'error.main' } : null}
                        control={<Radio sx={errors.gender ? { color: 'error.main' } : null} />}
                      />
                      <FormControlLabel
                        value='Male'
                        label='Male'
                        sx={errors.gender ? { color: 'error.main' } : null}
                        control={<Radio sx={errors.gender ? { color: 'error.main' } : null} />}
                      />
                    </RadioGroup>
                  )}
                />
                {errors.gender && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-radio'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name='fatherName'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Father Name'
                      onChange={onChange}
                      error={Boolean(errors.fatherName)}
                    />
                  )}
                />
                {errors.fatherName && (
                  <FormHelperText sx={{ color: 'error.main' }} id='father_name'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id='blood' error={Boolean(errors.blood)} htmlFor='blood'>
                  Blood Group
                </InputLabel>
                <Controller
                  name='blood'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      value={value}
                      label='Blood Group'
                      onChange={onChange}
                      error={Boolean(errors.blood)}
                      labelId='blood'
                    >
                      <MenuItem value=''>Select Blood Group</MenuItem>
                      <MenuItem value='A+'>A +ve</MenuItem>
                      <MenuItem value='A-'>A -ve</MenuItem>
                      <MenuItem value='B+'>B +ve</MenuItem>
                      <MenuItem value='B-'>B -ve</MenuItem>
                      <MenuItem value='O+'>O +ve</MenuItem>
                      <MenuItem value='O-'>O -ve</MenuItem>
                      <MenuItem value='AB+'>AB +ve</MenuItem>
                      <MenuItem value='AB-'>AB -ve</MenuItem>
                    </Select>
                  )}
                />
                {errors.blood && (
                  <FormHelperText sx={{ color: 'error.main' }} id='blood'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id='role' error={Boolean(errors.role)} htmlFor='role'>
                  Role
                </InputLabel>
                <Controller
                  name='role'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <Select value={value} label='Role' onChange={onChange} error={Boolean(errors.role)} labelId='role'>
                      <MenuItem value=''>Select Role</MenuItem>
                      <MenuItem value='superAdmin'>Super Admin</MenuItem>
                      <MenuItem value='admin'>Admin</MenuItem>
                      <MenuItem value='employee'>Employee</MenuItem>
                    </Select>
                  )}
                />
                {errors.role && (
                  <FormHelperText sx={{ color: 'error.main' }} id='role'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
          <Box sx={{ height: 60 }}></Box>
          <BoxStyle
            sx={{ zIndex: 1, width: { xs: 260, sm: 360 } }}
            style={{
              position: 'fixed',
              bottom: 0,
              paddingBottom: 20,
              paddingTop: 10
            }}
          >
            <Grid item xs={12}>
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <CircularProgress disableShrink sx={{ textAlign: 'center', justifyContent: 'center' }} />
                </Box>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }}>
                    Submit
                  </Button>
                  <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
                    Cancel
                  </Button>
                </Box>
              )}
            </Grid>
          </BoxStyle>
        </form>
      </Box>

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
    </Drawer>
  )
}

// SidebarAddUser.acl = {
//   action: 'read',
//   subject: 'admin-add'
// }
export default SidebarAddUser
