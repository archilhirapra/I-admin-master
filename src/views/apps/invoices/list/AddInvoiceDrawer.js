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
import {addInvoice} from 'src/store/apps/billings/invoice'
import Switch from '@mui/material/Switch'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import {CircularProgress, Dialog} from '@mui/material'


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


const Header = styled(Box)(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const schema = yup.object().shape({
  customer: yup.mixed().required(),
  pickupdate: yup.mixed().required(),
  pickuptime: yup.mixed().required(),
  pickup_address: yup.mixed().required(),
  pickup_instruction: yup.mixed().oneOf(["x", "y", "z"]),

  deliverydate: yup.mixed().required(),
  deliverytime: yup.mixed().required(),
  delivery_address: yup.mixed().required(),
  delivery_instruction: yup.mixed().oneOf(["x", "y", "z"]),


})

const defaultValues = {
  customer: null,
  pickupdate: null,
  pickuptime: null,
  pickup_address: null,
  pickup_instruction: '',

  deliverydate: null,
  deliverytime: null,
  delivery_address: null,
  delivery_instruction: '',

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
  const {
    open,
    toggle,
    customerStore,
    pickupDateTimeSlots,
    setSelecedPuckupTimeId,
    deliveryDateTimeSlots,
    addresses
  } = props
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
    const {
      customer,
      pickupdate,
      pickuptime,
      pickup_address,
      pickup_instruction,
      deliverydate,
      deliverytime,
      delivery_address,
      delivery_instruction,
    } = data


    dispatch(addInvoice({
      userId: customer.id,
      pickupTimeId: pickuptime.id,
      deliveryTimeId: deliverytime.id,
      pickupAddressId: pickup_address.id,
      deliveryAddressId: delivery_address.id,
      pickupInstruction: pickup_instruction,
      deliveryInstruction: delivery_instruction,
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
    toggle()
    setCustomerValue(null);
    reset()
  }


  const handleClose = () => {
    toggle()

    setCustomerValue(null);
    setSelectedPickupDateValue(null)
    setSelectedPickupTimeValue(null)
    setSelectedPickupAddressValue(null)

    setSelectedDeliveryDateValue(null)
    setSelectedDeliveryTimeValue(null)
    setSelectedDeliveryAddressValue(null)
    reset()
  }


  const [customerValue, setCustomerValue] = useState(null)
  const [filteredAddresses, setFilteredAddresses] = useState([])

  const handleChange = (newValue) => {
    setCustomerValue(newValue)

    setValue('delivery_address', null)
    setValue('pickup_address', null)
    setSelectedDeliveryAddressValue(null)
    setSelectedPickupAddressValue(null)

    if (newValue == null) {
      setFilteredAddresses([])
      setValue('delivery_address', null)
      setValue('pickup_address', null)
      setSelectedDeliveryAddressValue(null);
      setSelectedPickupAddressValue(null);
    } else {
      let filter = addresses.filter(obj => {
        return obj.userId === newValue?.id;
      })
      setFilteredAddresses(filter)
    }


  }

  const [filteredPickupTimeSlots, setPickupFilteredTimeSlots] = useState([])
  const [filteredDeliveryTimeSlots, setDeliveryFilteredTimeSlots] = useState([])


  const [selectedPickupDateValue, setSelectedPickupDateValue] = useState(null)
  const handlePickupDateSelectionChange = (newValue) => {
    setSelectedPickupDateValue(newValue)

    setValue('pickuptime', null)
    setSelectedPickupTimeValue(null)
    setValue('deliverydate', null)
    setSelectedDeliveryDateValue(null)
    setValue('deliverytime', null)
    setSelectedDeliveryTimeValue(null)
    setSelecedPuckupTimeId(null)
    setDeliveryFilteredTimeSlots([])

    if (newValue == null) {
      setPickupFilteredTimeSlots([]);
      setValue('pickuptime', null)
      setSelectedPickupTimeValue(null)
    } else {
      setPickupFilteredTimeSlots(newValue?.timeSlots);
    }
  }

  const [selectedPickupTimeValue, setSelectedPickupTimeValue] = useState(null)

  const handlePickupTimeSelectionChange = (newValue) => {
    setValue('deliverydate', null)
    setSelectedDeliveryDateValue(null)
    setValue('deliverytime', null)
    setSelectedDeliveryTimeValue(null)
    setSelecedPuckupTimeId(null)
    setDeliveryFilteredTimeSlots([])

    setSelectedPickupTimeValue(newValue)
    setSelecedPuckupTimeId(newValue?.id)
  }


  const [selectedDeliveryDateValue, setSelectedDeliveryDateValue] = useState(null)
  const handleDeliveryDateSelectionChange = (newValue) => {
    setSelectedDeliveryDateValue(newValue)
    setValue('deliverytime', null)
    setSelectedDeliveryTimeValue(null)

    if (newValue == null) {
      setDeliveryFilteredTimeSlots([]);
      setValue('deliverytime', null)
      setSelectedDeliveryTimeValue(null)
    } else {
      setDeliveryFilteredTimeSlots(newValue?.timeSlots);
    }
  }

  const [selectedDeliveryTimeValue, setSelectedDeliveryTimeValue] = useState(null)

  const handleDeliveryTimeSelectionChange = (newValue) => {
    setSelectedDeliveryTimeValue(newValue)
  }


  const [selectedDeliveryAddressValue, setSelectedDeliveryAddressValue] = useState(null)
  const handleDeliveryAddressSelectionChange = (newValue) => {
    setSelectedDeliveryAddressValue(newValue)
  }

  const [selectedPickupAddressValue, setSelectedPickupAddressValue] = useState(null)
  const handlePickupAddressSelectionChange = (newValue) => {
    setSelectedPickupAddressValue(newValue)
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
        <Typography variant='h6'>Add Order</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{cursor: 'pointer'}}/>
      </Header>

      <Box sx={{p: 5}}>
        <form onSubmit={handleSubmit(onSubmit)}>

          <FormControl fullWidth sx={{mb: 6}}>
            <Controller
              error={Boolean(errors.customer)}
              name='customer'
              render={(props) => (
                <Autocomplete
                  value={customerValue}
                  options={customerStore.data}

                  onChange={(_, data) => {
                    clearErrors('customer');
                    props.field.onChange(data)
                    handleChange(data)
                  }}
                  id='customer'
                  getOptionLabel={option => (option.name ? option.name : (option.email ? option.email : option.mobileNo))}
                  renderInput={params => <TextField {...params} error={Boolean(errors.customer)}
                                                    label='Select Customer'/>}
                />
              )}
              control={control}
            />

            {errors.customer && (
              <FormHelperText sx={{color: 'error.main'}} id='validation-basic-email'>
                This field is required
              </FormHelperText>
            )}
          </FormControl>


          <FormControl fullWidth sx={{mb: 6}}>
            <Controller
              error={Boolean(errors.pickupdate)}
              name='pickupdate'
              render={(props) => (
                <Autocomplete
                  value={selectedPickupDateValue}
                  options={pickupDateTimeSlots}

                  onChange={(_, data) => {
                    clearErrors('pickupdate');
                    props.field.onChange(data)
                    handlePickupDateSelectionChange(data)
                  }}
                  id='pickupDate'
                  getOptionLabel={option => option.date}
                  renderInput={params => <TextField {...params} error={Boolean(errors.pickupdate)}
                                                    label='Select Pickup Date'/>}
                />
              )}
              control={control}
            />

            {errors.pickupdate && (
              <FormHelperText sx={{color: 'error.main'}} id='validation-basic-email'>
                This field is required
              </FormHelperText>
            )}
          </FormControl>


          <FormControl fullWidth sx={{mb: 6}}>
            <Controller
              error={Boolean(errors.pickuptime)}
              name='pickuptime'
              render={(props) => (
                <Autocomplete
                  value={selectedPickupTimeValue}
                  // sx={{ width: 250 }}
                  options={filteredPickupTimeSlots}

                  onChange={(_, data) => {
                    clearErrors('pickuptime');
                    props.field.onChange(data)
                    handlePickupTimeSelectionChange(data)
                  }}
                  id='pickuptime'
                  getOptionLabel={option => option.timeSlot}
                  renderInput={params => <TextField {...params} error={Boolean(errors.pickuptime)}
                                                    label='Select Pickup Time'/>}
                />
              )}
              control={control}
            />

            {errors.pickuptime && (
              <FormHelperText sx={{color: 'error.main'}} id='validation-basic-email'>
                This field is required
              </FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{mb: 6}}>
            <Controller
              error={Boolean(errors.pickup_address)}
              name='pickup_address'
              render={(props) => (
                <Autocomplete
                  value={selectedPickupAddressValue}
                  options={filteredAddresses}

                  onChange={(_, data) => {
                    clearErrors('pickup_address');
                    props.field.onChange(data)
                    handlePickupAddressSelectionChange(data)
                  }}
                  id='pickup_address'
                  getOptionLabel={option => option.addressType + ' (' + option.houseNo + ',' + option.locality + ')'}
                  renderInput={params => <TextField {...params} error={Boolean(errors.pickup_address)}
                                                    label='Select Pickup Address'/>}
                />
              )}
              control={control}
            />

            {errors.pickup_address && (
              <FormHelperText sx={{color: 'error.main'}} id='validation-basic-email'>
                This field is required
              </FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{mb: 6}}>
            <InputLabel
              id='pickup_instruction'
              error={Boolean(errors.pickup_instruction)}
              htmlFor='pickup_instruction'
            >
              Pickup Instruction
            </InputLabel>
            <Controller
              name='pickup_instruction'
              control={control}
              rules={{required: true}}
              render={({field: {value, onChange}}) => (
                <Select
                  value={value}
                  label='pickup Instruction'
                  onChange={onChange}
                  error={Boolean(errors.pickup_instruction)}
                  labelId='pickup_instruction'
                >
                  <MenuItem value=''>Select Instruction</MenuItem>
                  <MenuItem value='x'>x</MenuItem>
                  <MenuItem value='y'>y</MenuItem>
                  <MenuItem value='z'>z</MenuItem>

                </Select>
              )}
            />
            {errors.pickup_instruction && (
              <FormHelperText sx={{color: 'error.main'}} id='delivery_instruction'>
                This field is required
              </FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth sx={{mb: 6}}>
            <Controller
              error={Boolean(errors.deliverydate)}
              name='deliverydate'
              render={(props) => (
                <Autocomplete
                  value={selectedDeliveryDateValue}
                  options={deliveryDateTimeSlots}

                  onChange={(_, data) => {
                    clearErrors('deliverydate');
                    props.field.onChange(data)
                    handleDeliveryDateSelectionChange(data)
                  }}
                  id='deliverydate'
                  getOptionLabel={option => option.date}
                  renderInput={params => <TextField {...params} error={Boolean(errors.deliverydate)}
                                                    label='Select Delivery Date'/>}
                />
              )}
              control={control}
            />

            {errors.deliverydate && (
              <FormHelperText sx={{color: 'error.main'}} id='validation-basic-email'>
                This field is required
              </FormHelperText>
            )}
          </FormControl>


          <FormControl fullWidth sx={{mb: 6}}>
            <Controller
              error={Boolean(errors.deliverytime)}
              name='deliverytime'
              render={(props) => (
                <Autocomplete
                  value={selectedDeliveryTimeValue}
                  options={filteredDeliveryTimeSlots}

                  onChange={(_, data) => {
                    clearErrors('deliverytime');
                    props.field.onChange(data)
                    handleDeliveryTimeSelectionChange(data)
                  }}
                  id='deliverytime'
                  getOptionLabel={option => option.timeSlot}
                  renderInput={params => <TextField {...params} error={Boolean(errors.deliverytime)}
                                                    label='Select Delivery Time'/>}
                />
              )}
              control={control}
            />

            {errors.deliverytime && (
              <FormHelperText sx={{color: 'error.main'}} id='validation-basic-email'>
                This field is required
              </FormHelperText>
            )}
          </FormControl>


          <FormControl fullWidth sx={{mb: 6}}>
            <Controller
              error={Boolean(errors.delivery_address)}
              name='delivery_address'
              render={(props) => (
                <Autocomplete
                  value={selectedDeliveryAddressValue}
                  // sx={{ width: 250 }}
                  options={filteredAddresses}

                  onChange={(_, data) => {
                    clearErrors('delivery_address');
                    props.field.onChange(data)
                    handleDeliveryAddressSelectionChange(data)
                  }}
                  id='delivery_address'
                  getOptionLabel={option => option.addressType + ' (' + option.houseNo + ',' + option.locality + ')'}
                  renderInput={params => <TextField {...params} error={Boolean(errors.delivery_address)}
                                                    label='Select Delivery Address'/>}
                />
              )}
              control={control}
            />

            {errors.delivery_address && (
              <FormHelperText sx={{color: 'error.main'}} id='validation-basic-email'>
                This field is required
              </FormHelperText>
            )}
          </FormControl>


          <FormControl fullWidth sx={{mb: 6}}>
            <InputLabel
              id='delivery_instruction'
              error={Boolean(errors.delivery_instruction)}
              htmlFor='delivery_instruction'
            >
              Delivery Instruction
            </InputLabel>
            <Controller
              name='delivery_instruction'
              control={control}
              rules={{required: true}}
              render={({field: {value, onChange}}) => (
                <Select
                  value={value}
                  label='Delivery Instruction'
                  onChange={onChange}
                  error={Boolean(errors.delivery_instruction)}
                  labelId='delivery_instruction'
                >
                  <MenuItem value=''>Select Instruction</MenuItem>
                  <MenuItem value='x'>x</MenuItem>
                  <MenuItem value='y'>y</MenuItem>
                  <MenuItem value='z'>z</MenuItem>
                </Select>
              )}
            />
            {errors.delivery_instruction && (
              <FormHelperText sx={{color: 'error.main'}} id='delivery_instruction'>
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
