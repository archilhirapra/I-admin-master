// ** React Imports
import {forwardRef, Fragment, useEffect, useState} from 'react'
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
// import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'
import DropzoneWrapper from 'src/layouts/components/react-dropzone'


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
import {editCupon} from 'src/store/apps/cupons'
import {addOfflineInvoice, editOfflineInvoice} from 'src/store/apps/offline-invoice'

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

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})


const CustomInput = forwardRef(({...props}, ref) => {
  return <TextField inputRef={ref} {...props} sx={{width: '100%'}}/>
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


const Header = styled(Box)(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))


const SidebarAddUser = props => {

  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required(),
    description: yup.string().required(),
    date: yup.string().required(),
    mobileNo: yup.string().required(),
    orderAmount: yup.number().required(),
    taxes: yup.number().required(),
  })

  const defaultValues = {
    name: '',
    email: '',
    description: '',
    date: '',
    mobileNo: '',
    orderAmount: '',
    taxes: '',

  }


  // ** Props
  const {open, toggle, editId, setEditId, editRow, setEditRow} = props


  // ** Hooks
  const dispatch = useDispatch()


  useEffect(() => {

    setValue('name', editRow?.name)
    setValue('email', editRow?.email)
    setValue('description', editRow?.description)

    setValue('mobileNo', formatPhoneNumber(editRow?.mobileNo))
    setValue('orderAmount', editRow?.orderAmount)
    setValue('taxes', editRow?.taxes)


    if (editRow?.date != undefined) {
      let [startDateComponents, timeComponents] = editRow.date.split(' ');
      let [startMonth, startDay, startYear] = startDateComponents.split('/');
      let startFinalDate = new Date(+startYear, startMonth - 1, +startDay);
      setValue('date', startFinalDate)
    }

  }, [editRow])


  const {
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


  const [loading, setLoading] = useState(false);


  const [openDialog, setOpenDialog] = useState(false)
  const [dialogType, setDialogType] = useState('success')
  const [dialogMessage, setDialogMessage] = useState('')
  const [filledFormData, setFilledFormData] = useState(null)
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
    setDialogMessage('Do you really want to edit this data?');
    handleClickOpenDialog()

  }


  const continueEditing = () => {
    handleCloseDialog()

    let data = filledFormData
    setLoading(false);
    const {name, email, mobileNo, orderAmount, taxes, date, description} = data
    let Datetosend = new Date(date).toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit',});
    let phone = mobileNo.replace(/[^0-9]/g, '');

    dispatch(editOfflineInvoice({
      orderId: editId,
      name,
      email,
      mobileNo: phone,
      description,
      countryCode: '+1',
      orderAmount,
      taxes,
      date: Datetosend
    })).then((data) => {
      setLoading(false);
      if (data?.payload?.status == "success") {
        setDialogType('success');
        setDialogMessage(data?.payload?.message)
        handleClickOpenDialog()
      } else {
        setDialogType('failed');
        setDialogMessage(data?.payload?.message)
        handleClickOpenDialog()
      }


    })


  }


  const categoryAddedSuccess = () => {
    setLoading(false)
    setEditRow(null)
    toggle()
    reset()
  }


  const handleClose = () => {
    setLoading(false)
    setEditRow(null)
    toggle()
    reset()
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


  const priceFromat = (value) => {
    const price = value.replace(/[^\d&^.]/g, '');
    return price
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
        <Typography variant='h6'>Edit Offline Invoice</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{cursor: 'pointer'}}/>
      </Header>

      <Box sx={{p: 5}}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>


            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name='name'
                  control={control}
                  rules={{required: true}}
                  render={({field: {value, onChange}}) => (
                    <TextField
                      value={value}
                      label='Name'
                      onChange={onChange}
                      error={Boolean(errors.name)}
                    />
                  )}
                />
                {errors.name && (
                  <FormHelperText sx={{color: 'error.main'}} id='validation-basic-first-name'>
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
                  rules={{required: true}}
                  render={({field: {value, onChange}}) => (
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
                  <FormHelperText sx={{color: 'error.main'}} id='validation-basic-email'>
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
                  rules={{required: true}}
                  render={({field: {value, onChange}}) => (
                    <TextField
                      value={value}
                      label='Mobile Number'
                      onChange={(e) => {
                        clearErrors('mobileNo');
                        onChange(formatPhoneNumber(e.target.value))
                      }}
                      placeholder='(000)000-0000'
                      error={Boolean(errors.mobileNo)}
                      InputProps={{startAdornment: <InputAdornment position='start'>+1</InputAdornment>}}
                    />
                  )}
                />

                {errors.mobileNo && (
                  <FormHelperText sx={{mx: 3.5, color: 'error.main'}} id='validation-basic-dob'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>

            </Grid>


            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name='orderAmount'
                  control={control}
                  rules={{required: true}}
                  render={({field: {value, onChange}}) => (
                    <TextField
                      // type={'number'}
                      InputProps={{inputProps: {min: 0}}}
                      value={value}
                      label='Order Amount'
                      // onChange={onChange}
                      onChange={(e) => {
                        // clearErrors('mrp');
                        onChange(priceFromat(e.target.value))
                      }}
                      error={Boolean(errors.orderAmount)}
                    />
                  )}
                />
                {errors.orderAmount && (
                  <FormHelperText sx={{color: 'error.main'}} id='validation-basic-first-name'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name='taxes'
                  control={control}
                  rules={{required: true}}
                  render={({field: {value, onChange}}) => (
                    <TextField
                      // type={'number'}
                      InputProps={{inputProps: {min: 0}}}
                      value={value}
                      label='Taxes'
                      // onChange={onChange}
                      onChange={(e) => {
                        // clearErrors('mrp');
                        onChange(priceFromat(e.target.value))
                      }}
                      error={Boolean(errors.taxes)}
                    />
                  )}
                />
                {errors.taxes && (
                  <FormHelperText sx={{color: 'error.main'}} id='validation-basic-first-name'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>


            <Grid item xs={12}>
              <Controller
                name='date'
                control={control}
                rules={{required: true}}
                render={({field: {value, onChange}}) => (
                  <DatePickerWrapper>
                    <DatePicker
                      // dateFormat={'dd/MM/yyyy'}

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
                          label='Date'
                          error={Boolean(errors.date)}
                        />
                      }
                    />
                  </DatePickerWrapper>
                )}
              />
              {errors.date && (
                <FormHelperText sx={{mx: 3.5, color: 'error.main'}} id='validation-basic-dob'>
                  This field is required
                </FormHelperText>
              )}
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth sx={{mb: 6}}>
                <Controller
                  name='description'
                  control={control}
                  rules={{required: true}}
                  render={({field: {value, onChange}}) => (
                    <TextField
                      rows={4}
                      multiline
                      label='Description'
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.description)}
                    />
                  )}
                />
                {errors.description &&
                  <FormHelperText sx={{color: 'error.main'}}>{errors.description.message}</FormHelperText>}
              </FormControl>
            </Grid>


          </Grid>
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


            <Grid item xs={12}>

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

export default SidebarAddUser


