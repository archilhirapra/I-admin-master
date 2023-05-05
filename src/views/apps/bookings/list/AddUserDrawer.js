// ** React Imports
import {forwardRef, Fragment, useState} from 'react'
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
import {useDropzone} from 'react-dropzone'
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'


// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import {styled} from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

// ** Third Party Imports
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm, Controller} from 'react-hook-form'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Store Imports
import {useDispatch} from 'react-redux'

// ** Actions Imports
// import { addUser } from 'src/store/apps/user'
// import { addCategory } from 'src/store/apps/services/categories'
import {addHelper} from 'src/store/apps/services/helpers'
import Switch from '@mui/material/Switch'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import {CircularProgress, Dialog} from '@mui/material'


// import Button from '@mui/material/Button'
// import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Slide from '@mui/material/Slide'
import DialogContentText from '@mui/material/DialogContentText'


import Autocomplete from '@mui/material/Autocomplete'

// ** Data
import {top100Films} from 'src/@fake-db/autocomplete'


const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})


// Styled component for the upload image inside the dropzone area
const Img = styled('img')(({theme}) => ({
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
const HeadingTypography = styled(Typography)(({theme}) => ({
  marginBottom: theme.spacing(5),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(4)
  }
}))


const BoxStyle = styled(Box)(({theme}) => ({
  backgroundColor: theme.palette.mode === 'dark' ? "#30334e" : "#ffffff",
}))


// Styled FormControlLabel component
const FormControlLabel = styled(MuiFormControlLabel)(({theme}) => ({
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


// const showErrors = (field, valueLen, min) => {
//   if (valueLen === 0) {
//     return `${field} field is required`
//   } else if (valueLen > 0 && valueLen < min) {
//     return `${field} must be at least ${min} characters`
//   } else {
//     return ''
//   }
// }


const Header = styled(Box)(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const schema = yup.object().shape({
  question: yup.string().required(),
  answer: yup.string().required(),
  category: yup.mixed().required(),
  image: yup.mixed().required(),

  // files: yup.mixed().required(),
  // country: yup.string().required(),
  // email: yup.string().email().required(),
  // contact: yup
  //   .number()
  //   .typeError('Contact Number field is required')
  //   .min(10, obj => showErrors('Contact Number', obj.value.length, obj.min))
  //   .required(),
  // fullName: yup
  //   .string()
  //   .min(3, obj => showErrors('First Name', obj.value.length, obj.min))
  //   .required(),
  // username: yup
  //   .string()
  //   .min(3, obj => showErrors('Username', obj.value.length, obj.min))
  //   .required()
})

const defaultValues = {
  question: '',
  answer: '',
  category: null,
  status: false,
  // isVisibleSitch: false,
  // country: '',
  // contact: '',
  // fullName: '',
  // username: ''
}


const SidebarAddUser = props => {
  console.log('hello');
  const [isVisibleSitch, SetIsVisibleSitch] = useState(false)
  const [isSubscriptionSitch, SetIsSubscriptionSitch] = useState(false)

  const handleVisibilitySwitch = event => {
    console.log(event.target.checked)
    SetIsVisibleSitch(event.target.checked)
  }
  const handleSubscriptionSwitch = event => {
    console.log(event.target.checked)
    SetIsSubscriptionSitch(event.target.checked)
  }

  // ** Props
  const {open, toggle, customerStore} = props

  // ** State
  const [plan, setPlan] = useState('basic')
  const [role, setRole] = useState('subscriber')

  // ** Hooks
  const dispatch = useDispatch()

  const {
    watch,
    register,
    reset,
    control,
    setValue,
    setError,
    handleSubmit,
    clearErrors,
    formState: {errors}
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  console.log(watch('category'));


  const [loading, setLoading] = useState(false);


  const [filledFormData, setFilledFormData] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [dialogType, setDialogType] = useState('success')
  const [dialogMessage, setDialogMessage] = useState('')
  const handleClickOpenDialog = () => setOpenDialog(true)

  const handleCloseDialog = () => {
    if (dialogType == 'success') {
      categoryAddedSuccess();
    } else if (dialogType == 'warning') {
      setDialogMessage('')
      setLoading(false)
    }
    setOpenDialog(false)
  }


  const onSubmit = data => {

    setFilledFormData(data)
    setDialogType('warning');
    setDialogMessage('Do you really want to add this data?');
    handleClickOpenDialog()


  }

  const continueEditing = () => {
    let data = filledFormData
    setLoading(false);
    const {question, answer, category, status} = data
    dispatch(addHelper({
      title: question,
      description: answer,
      categoryId: category.id,
      image: files[0],
      status: status
    })).then((data) => {
      console.log(data);
      console.log(data?.payload)

      setLoading(false);
      if (data?.payload?.status == "success") {
        // alert(data?.payload?.message)
        setDialogType('success');
        setDialogMessage(data?.payload?.message)
        handleClickOpenDialog()
      } else {
        setDialogType('failed');
        setDialogMessage(data?.payload?.message)
        handleClickOpenDialog()
        // alert(data?.payload?.message)
      }


    })
  }


  const categoryAddedSuccess = () => {
    toggle()
    setFiles([])
    // SetIsVisibleSitch(false);
    // SetIsSubscriptionSitch(false);
    setCustomerValue(null);
    reset()
  }


  const handleClose = () => {
    // setPlan('basic')
    // setRole('subscriber')
    // setValue('contact', '')
    toggle()
    setFiles([])
    // SetIsVisibleSitch(false);
    // SetIsSubscriptionSitch(false);
    setCustomerValue(null);
    reset()
  }


  /** upload files */


    // ** State
  const [files, setFiles] = useState([])

  // ** Hooks
  const {getRootProps, getInputProps} = useDropzone({
    multiple: false,
    // maxFiles: 2,
    maxSize: 1000000,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    onDrop: acceptedFiles => {
      clearErrors('image')
      setValue('image', files)
      setFiles(acceptedFiles.map(file => Object.assign(file)))
    },
    onDropRejected: () => {
      toast.error('You can only upload a files & maximum size of 1 MB.', {
        duration: 2000
      })
    },
  })

  const renderFilePreview = file => {
    if (file.type.startsWith('image')) {
      return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file)}/>
    } else {
      return <FileDocumentOutline/>
    }
  }

  const handleRemoveFile = file => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter(i => i.name !== file.name)
    setFiles([...filtered])
  }

  const fileList = files.map(file => (
    <ListItem key={file.name}>
      <div className='file-details'>
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
        <Close fontSize='small'/>
      </IconButton>
    </ListItem>
  ))

  const handleRemoveAllFiles = () => {
    setFiles([])
  }


  const [customerValue, setCustomerValue] = useState(null)

  const handleChange = (newValue) => {
    setCustomerValue(newValue)
  }


  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{keepMounted: true}}
      sx={{'& .MuiDrawer-paper': {width: {xs: 300, sm: 400}}}}
    >
      <Header>
        <Typography variant='h6'>Add Booking</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{cursor: 'pointer'}}/>
      </Header>

      <Box sx={{p: 5}}>
        <form onSubmit={handleSubmit(onSubmit)}>

          <FormControl fullWidth sx={{mb: 6}}>
            <Controller
              error={Boolean(errors.category)}
              name='customer'
              render={(props) => (
                <Autocomplete
                  value={customerValue}
                  // sx={{ width: 250 }}
                  options={customerStore.data}

                  onChange={(_, data) => {
                    clearErrors('customer');
                    props.field.onChange(data)
                    handleChange(data)
                  }}
                  // onChange={handleChange}
                  id='customer'
                  getOptionLabel={option => (option.name ? option.name : (option.email ? option.email : option.mobileNo))}
                  renderInput={params => <TextField {...params} error={Boolean(errors.category)}
                                                    label='Select Customer'/>}
                />
              )}
              control={control}
            />

            {errors.category && (
              <FormHelperText sx={{color: 'error.main'}} id='validation-basic-email'>
                This field is required
              </FormHelperText>
            )}
          </FormControl>


          <FormControl fullWidth sx={{mb: 6}}>
            <InputLabel
              id='date'
              error={Boolean(errors.date)}
              htmlFor='date'
            >
              Date
            </InputLabel>
            <Controller
              name='date'
              control={control}
              rules={{required: true}}
              render={({field: {value, onChange}}) => (
                <Select
                  value={value}
                  label='Date'
                  onChange={onChange}
                  error={Boolean(errors.date)}
                  labelId='date'
                  // aria-describedby='validation-basic-select'
                >
                  <MenuItem value=''>Select Role</MenuItem>
                  <MenuItem value='superAdmin'>Super Admin</MenuItem>
                  <MenuItem value='admin'>Admin</MenuItem>
                  <MenuItem value='employee'>Employee</MenuItem>

                </Select>
              )}
            />
            {errors.date && (
              <FormHelperText sx={{color: 'error.main'}} id='role'>
                This field is required
              </FormHelperText>
            )}
          </FormControl>


          <FormControl fullWidth sx={{mb: 6}}>
            <InputLabel
              id='time'
              error={Boolean(errors.time)}
              htmlFor='time'
            >
              Time
            </InputLabel>
            <Controller
              name='time'
              control={control}
              rules={{required: true}}
              render={({field: {value, onChange}}) => (
                <Select
                  value={value}
                  label='Time'
                  onChange={onChange}
                  error={Boolean(errors.time)}
                  labelId='time'
                  // aria-describedby='validation-basic-select'
                >
                  <MenuItem value=''>Select Role</MenuItem>
                  <MenuItem value='superAdmin'>Super Admin</MenuItem>
                  <MenuItem value='admin'>Admin</MenuItem>
                  <MenuItem value='employee'>Employee</MenuItem>

                </Select>
              )}
            />
            {errors.time && (
              <FormHelperText sx={{color: 'error.main'}} id='role'>
                This field is required
              </FormHelperText>
            )}
          </FormControl>


          <Box sx={{height: 60}}>

          </Box>

          <BoxStyle
            sx={{zIndex: 1, width: {xs: 260, sm: 360}}}
            style={{
              position: "fixed",
              bottom: 0,
              paddingBottom: 20,
              paddingTop: 10,

            }}
          >

            {loading ? (
              <Box sx={{display: "flex", justifyContent: "center"}}>
                <CircularProgress disableShrink sx={{textAlign: "center", justifyContent: "center"}}/>
              </Box>

            ) : (
              <Box sx={{display: 'flex', alignItems: 'center'}}>
                <Button size='large' type='submit' variant='contained' sx={{mr: 3}}>
                  Submit
                </Button>
                <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
                  Cancel
                </Button>
              </Box>
            )}
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

          {/* <Button onClick={handleCloseDialog}>Disagree</Button> */}
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
          {/* <Button onClick={handleCloseDialog}>OK</Button> */}

        </DialogActions>
      </Dialog>


    </Drawer>
  )
}

export default SidebarAddUser
