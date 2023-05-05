// ** React Imports
import {useEffect, useState, forwardRef, Fragment} from 'react'

// ** MUI Imports
import Dialog from '@mui/material/Dialog'

import FormControl from '@mui/material/FormControl'

import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm, Controller} from 'react-hook-form'
import FormHelperText from '@mui/material/FormHelperText'


import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import TableRow from '@mui/material/TableRow'
import Collapse from '@mui/material/Collapse'
import TableBody from '@mui/material/TableBody'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import {styled, useTheme} from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import TableContainer from '@mui/material/TableContainer'
import Select from '@mui/material/Select'
import TableCell from '@mui/material/TableCell'
import CardContent from '@mui/material/CardContent'
import Paper from '@mui/material/Paper'

import TableHead from '@mui/material/TableHead'


// ** Icon Imports
import Plus from 'mdi-material-ui/Plus'
import Close from 'mdi-material-ui/Close'
// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'

// ** Third Party Imports
import axios from 'axios'
import DatePicker from 'react-datepicker'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Custom Component Imports
import Repeater from 'src/@core/components/repeater'

// ** Styles
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import {useDispatch, useSelector} from 'react-redux'
import {fetchData, deleteUser} from 'src/store/apps/services/categories'
import {fetchItems} from 'src/store/apps/services/items'

import Autocomplete from '@mui/material/Autocomplete'

import {fetchCustomerList} from 'src/store/apps/customer'
import {useCallback} from 'react'

import AddCustomerDrawer from 'src/views/apps/invoices/edit/AddCustomerDrawer'


import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import Slide from '@mui/material/Slide'

import authConfig from 'src/configs/auth'
import invoiceConfig from 'src/configs/invoice'


const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})


const CustomInput = forwardRef(({...props}, ref) => {
  return (
    <TextField
      size='small'
      inputRef={ref}
      {...props}
      sx={{width: {sm: '250px', xs: '170px'}, '& .MuiInputBase-input': {color: 'text.secondary'}}}
    />
  )
})

const MUITableCell = styled(TableCell)(({theme}) => ({
  borderBottom: 0,
  padding: `${theme.spacing(1, 0)} !important`
}))

const CalcWrapper = styled(Box)(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '&:not(:last-of-type)': {
    marginBottom: theme.spacing(2)
  }
}))

const RepeatingContent = styled(Grid)(({theme}) => ({
  paddingRight: 0,
  display: 'flex',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  '& .col-title': {
    top: '-1.5rem',
    position: 'absolute'
  },
  '& .MuiInputBase-input': {
    color: theme.palette.text.secondary
  },
  [theme.breakpoints.down('lg')]: {
    '& .col-title': {
      top: '0',
      position: 'relative'
    }
  }
}))

const RepeaterWrapper = styled(CardContent)(({theme}) => ({
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(5.5),
  '& .repeater-wrapper + .repeater-wrapper': {
    marginTop: theme.spacing(8)
  }
}))

const InvoiceAction = styled(Box)(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  padding: theme.spacing(2, 0),
  borderLeft: `1px solid ${theme.palette.divider}`
}))

const EditCard = ({data, itemAddedRefresh, setItemAddedRefresh}) => {

  const [userId, setUserId] = useState(data.userId)
  const [orderId, setOrderId] = useState(data.id)


  useEffect(() => {
    dispatch(fetchCustomerList({}))
  }, [])
  const customerStore = useSelector(state => state.customer)

  let a = customerStore.data.find((item) => item.id === data.userId)

  const [customer, setCustomer] = useState(customerStore.data.find((item) => item.id === data.userId))


  const [customerValue, setCustomerValue] = useState(null)
  const [customerId, setCustomerId] = useState('')
  
  const handleSelectCategoryChange = useCallback(e => {
    setCustomerValue(e)
    setCustomerId(e?.id)
  }, [])


  const categoryStore = useSelector(state => state.serviceCategory)
  const itemStore = useSelector(state => state.serviceItem)
  const dispatch = useDispatch()
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const handleAddDialogOpen = () => setOpenAddDialog(true)
  
  const handleAddDialogClose = () => {
    setIsEditDialog(false)
    reset()
    setCategoryValue(null)
    setItemValue(null)

    setOpenAddDialog(false)
  }


  useEffect(() => {
    dispatch(fetchData({}))
    dispatch(fetchItems({}))
  }, [])

  const schema = yup.object().shape({
    category: yup.mixed().required(),
    item: yup.mixed().required(),
    originalPrice: yup.string().required(),
    quantity: yup.string().required(),
    finalPrice: yup.string().required(),
  })

  const defaultValues = {
    category: null,
    item: null,
    originalPrice: '',
    quantity: '',
    finalPrice: '',
  }


  const {
    watch,
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

  const [filteredItems, setFilteredItems] = useState([])

  const [categoryValue, setCategoryValue] = useState(null)
  const [itemValue, setItemValue] = useState(null)

  const handleChange = (newValue) => {
    setCategoryValue(newValue)

    let filter = itemStore.data.filter(obj => {
      return obj.categoryId === newValue?.id;
    })
    setFilteredItems(filter);
    setValue('item', '')
    setValue('originalPrice', 0)
    setValue('quantity', 1)
    setItemValue(null)
  }

  const handleChangeItem = (newValue) => {
    setItemValue(newValue)
    if (newValue != null) {
      const originalPrice = itemStore.data.find(obj => {
        return obj.id === newValue?.id;
      })
      setValue('originalPrice', originalPrice?.price)
    } else {
      setValue('originalPrice', 0)
    }

  }


  const priceFromat = (value) => {
    const price = value.replace(/[^\d&^.]/g, '');
   
    return price
  }

  const watchOriginalPriceField = watch('originalPrice');
  const watchQuantityField = watch('quantity');


  const watchPriceField = watch('price');
  const calculatedtotalPrice = watchOriginalPriceField * watchQuantityField
  if (watchPriceField != null && watchPriceField != '' && watchPriceField != undefined && watchPriceField != '0') {
    calculatedtotalPrice = watchPriceField * watchQuantityField
  }
  setValue('finalPrice', calculatedtotalPrice)


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


  // ** States
  const [count, setCount] = useState(1)
  const [selected, setSelected] = useState('')
  const [clients, setClients] = useState(undefined)
  const [selectedClient, setSelectedClient] = useState(null)

  // ** Hook
  const theme = useTheme()
  useEffect(() => {
    axios.get('/apps/invoice/clients').then(response => {
      if (response.data && clients === undefined) {
        setClients(response.data)
        setSelected(response.data[0].name)
        setSelectedClient(response.data[0])
      }
    })
  }, [clients])

  // ** Deletes form
  const deleteForm = e => {
    e.preventDefault()

    // @ts-ignore
    e.target.closest('.repeater-wrapper').remove()
  }


  const MUITableCell = styled(TableCell)(({theme}) => ({
    borderBottom: 0,
    padding: `${theme.spacing(1, 0)} !important`
  }))

  const CalcWrapper = styled(Box)(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '&:not(:last-of-type)': {
      marginBottom: theme.spacing(2)
    }
  }))


  // const [openEditDialog, setOpenEditDialog] = useState(false)
  const [isEditDialog, setIsEditDialog] = useState(false)


  const ItemsRow = props => {
    // ** Props
    const {row} = props

    const onEditClicked = (singleItem) => {
      setIsEditDialog(true)
      handleAddDialogOpen()

      let selectedCategory = categoryStore.data.find(obj => {
        return obj.id === singleItem?.categoryId;
      })
      setValue('category', selectedCategory)
      setCategoryValue(selectedCategory)

      let filter = itemStore.data.filter(obj => {
        return obj.categoryId === singleItem?.categoryId;
      })
      setFilteredItems(filter);


      let selectedItem = filter.find(obj => {
        return obj.id === singleItem?.itemId;
      })

      setValue('item', selectedItem)
      setItemValue(selectedItem)

      setValue('quantity', singleItem.qty)

      setValue('originalPrice', selectedItem?.price)


    }


    const onDeleteClicked = (singleItem) => {
      deleteItemClicked(singleItem.itemData.id, 0, singleItem.categoryName.id)
    }


    // ** State
    const [open, setOpen] = useState(false)

    return (
      <Fragment>
        <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
          <TableCell>
            <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
              {open ? <ChevronUp/> : <ChevronDown/>}
            </IconButton>
          </TableCell>
          <TableCell component='th' scope='row'>
            {row[0]}
          </TableCell>
          <TableCell align='right'>{}</TableCell>
          <TableCell align='right'>{}</TableCell>
          <TableCell align='right'>{}</TableCell>
          <TableCell align='right'>{}</TableCell>
          <TableCell align='right'>{}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={6} sx={{py: '0 !important'}}>
            <Collapse in={open} timeout='auto' unmountOnExit>
              <Box sx={{m: 2}}>
                <Typography variant='h6' gutterBottom component='div'>
                  Items List
                </Typography>
                <Table size='small' aria-label='purchases'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Item Name</TableCell>
                      <TableCell>Item Quantity</TableCell>
                      <TableCell align='right'>Unit</TableCell>
                      <TableCell align='right'>Price ($)</TableCell>
                      <TableCell align='right'>(IQ x Price ) Total price ($)</TableCell>
                      <TableCell align='right'>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row[1].map(singleItem => (
                      <TableRow key={singleItem.id}>
                        <TableCell component='th' scope='row'>
                          {singleItem.itemData.name}
                        </TableCell>
                        <TableCell>{singleItem.qty}</TableCell>
                        <TableCell align='right'>{singleItem.itemData.unitType}</TableCell>
                        <TableCell align='right'>{singleItem.itemData.price}</TableCell>
                        <TableCell align='right'>{singleItem.amount}</TableCell>
                        <TableCell align='right'>
                          <Button
                            style={{color: 'white'}}
                            sx={{mr: 2, mb: {xs: 2, sm: 2, md: 0}}}
                            size='small'
                            variant='contained'
                            onClick={onEditClicked.bind(this, singleItem)}
                          >
                            Edit
                          </Button>
                          <Button
                            style={{color: 'white'}}
                            size='small'
                            variant='contained'
                            onClick={onDeleteClicked.bind(this, singleItem)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>

      </Fragment>
    )
  }


  // Accepts the array and key
  const groupBy = (array, key) => {

    if (array != null) {
      // Return the end result
      return array.reduce((result, currentValue) => {
        // If an array already present for key, push it to the array. Else create an array and push the object
        (result[currentValue.categoryName[key]] = result[currentValue.categoryName[key]] || []).push(
          currentValue
        );
        // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
       
        return result;
      }, {});
      // empty object is the initial value for result object
    } else {
      return {}
    }
  };


  const ItemGroupedByCategory = groupBy(data.orderItems, 'name');


  const addItemClicked = (data) => {

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
    }


    axios
      .post(invoiceConfig.AddOrderByUserIdEndpoint, {
        userId: userId,
        itemId: data.item.id,
        qty: data.quantity,
        categoryId: data.category.id,
        orderId: orderId
      }, {headers})
      .then(response => {
        setItemAddedRefresh(itemAddedRefresh + 1)

        setDialogType('success');
        setDialogMessage('Item added succesfully')
        handleClickOpenDialog()


      })
      .catch((e) => {

        setDialogType('failed');
        setDialogMessage('Item add failed')
        handleClickOpenDialog()
      })
  }


  const deleteItemClicked = (itemId, qty, categoryId) => {

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
    }


    axios
      .post(invoiceConfig.AddOrderByUserIdEndpoint, {
        userId: userId,
        itemId: itemId,
        qty: qty,
        categoryId: categoryId,
        orderId: orderId
      }, {headers})
      .then(response => {
        setItemAddedRefresh(itemAddedRefresh + 1)

        setDialogType('success');
        setDialogMessage('Item deleted succesfully')
        handleClickOpenDialog()


      })
      .catch((e) => {

        setDialogType('failed');
        setDialogMessage('Item add failed')
        handleClickOpenDialog()
      })
  }


  const [openDialog, setOpenDialog] = useState(false)
  const [dialogType, setDialogType] = useState('success')
  const [dialogMessage, setDialogMessage] = useState('')
  const handleClickOpenDialog = () => setOpenDialog(true)

  const handleCloseDialog = () => {
    if (dialogType == 'success') {
      handleAddDialogClose()
    } else if (dialogType == 'warning') {
      setDialogMessage('')
    }
    setOpenDialog(false)
  }


  const [discount, setDiscount] = useState(data?.taxes?.discount);


  const [addCustomerOpen, setAddCustomerOpen] = useState(false)
  const toggleAddCustomerDrawer = () => setAddCustomerOpen(!addCustomerOpen)

  // ** Handle Invoice To Change
  const handleInvoiceChange = e => {
    setSelected(e)

    if (clients !== undefined && e !== null) {
      setSelectedClient(clients.filter(i => i.name === e?.name)[0])
    }
  }


  //0==initiated
  //1==pending
  //2==booking confirm pickup pending
  //3==pickup initiated
  //4==pickup failed
  //5==pickup complete
  //6==processing
  //7==complete cleaning
  //8==delivery initiated
  //9==delivery failed
  //10==delivery completed& order completed

  const statusText = (status) => {
    switch (status) {
      case 0:
        return 'Created'
      case 1:
        return 'Payment Pending'
      case 2:
        return 'Booking Confirmed (PI)'
      case 3:
        return 'Pickup Initiated'
      case 4:
        return 'Pickup Failed'
      case 5:
        return 'Pickup Completed'
      case 6:
        return 'Processing'
      case 7:
        return 'Cleaning Completed'
      case 8:
        return 'Delivery Intiated'
      case 9:
        return 'Delivery Failed'
      case 10:
        return 'Order Completed (DC)'
      case 11:
        return 'Cancelled'
      case 12:
        return 'Refund Pending'
      case 13:
        return 'Refund Completed (OC)'
      case 14:
        return "Payment Failed"
      default:
        return 'Not Available';
    }
  }


  const [updateStatusError, setUpdateStatusError] = useState(false)
  const [updateStatusValue, setUpdateStatusValue] = useState('')
  
  const onChangeupdateStatus = (e) => {
    setUpdateStatusError(false)
    setUpdateStatusValue(e.target.value)
  }


  const onUpdateStatusClick = () => {
    if (updateStatusValue == null || updateStatusValue == '') {
      setUpdateStatusError(true)
      
      return
    }
    setDialogType('warning');
    setDialogMessage('Are you sure to update status?')
    handleClickOpenDialog()
  }


  const onUpdateStatusClickContinue = () => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
    }


    axios
      .put(invoiceConfig.UpdateOrderStatusEndpoint, {status: updateStatusValue, orderId: orderId}, {headers})
      .then(response => {

        setItemAddedRefresh(itemAddedRefresh + 1)

        setDialogType('success');
        setDialogMessage('Status updated succesfully')
        handleClickOpenDialog()
      })
      .catch((e) => {
        setDialogType('failed');
        setDialogMessage('Updating status failed')
        handleClickOpenDialog()
      })

  }

  if (data) {
    return (
      <>
        <Card>
          <CardContent>
            <Grid container>
              <Grid item xl={6} xs={12}>
                <DatePickerWrapper sx={{ '& .react-datepicker-wrapper': { width: 'auto' } }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: { xl: 'flex-start', xs: 'flex-start' }
                    }}
                  >
                    <Box sx={{ mb: 4, display: 'flex' }}>
                      <Typography variant='h6' sx={{ mr: 1, width: '105px' }}>
                        Status
                      </Typography>
                      <TextField
                        size='small'
                        sx={{ width: { sm: '250px', xs: '250px' } }}
                        InputProps={{
                          disabled: true,
                          startAdornment: <InputAdornment position='start'>{statusText(data?.status)}</InputAdornment>
                        }}
                      />
                    </Box>
                    <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                      <Typography variant='h6' sx={{ mr: 1, width: '105px' }}>
                        Order Id
                      </Typography>
                      <TextField
                        size='small'
                        sx={{ width: { sm: '250px', xs: '250px' } }}
                        InputProps={{
                          disabled: true,
                          startAdornment: <InputAdornment position='start'>#{data?.orderId}</InputAdornment>
                        }}
                      />
                    </Box>
                    <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                      <Typography variant='h6' sx={{ mr: 1, width: '105px' }}>
                        Invoice Id
                      </Typography>
                      <TextField
                        size='small'
                        sx={{ width: { sm: '250px', xs: '250px' } }}
                        InputProps={{
                          disabled: true,
                          startAdornment: <InputAdornment position='start'>#{data.invoiceId}</InputAdornment>
                        }}
                      />
                    </Box>
                    <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                      <Typography variant='body2' sx={{ mr: 2, width: '100px' }}>
                        Created At:
                      </Typography>
                      <TextField
                        size='small'
                        sx={{ width: { sm: '250px', xs: '250px' } }}
                        InputProps={{
                          disabled: true,
                          startAdornment: <InputAdornment position='start'>{data.createdAt}</InputAdornment>
                        }}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant='body2' sx={{ mr: 2, width: '100px' }}>
                        Updated At:
                      </Typography>
                      <TextField
                        size='small'
                        sx={{ width: { sm: '250px', xs: '250px' } }}
                        InputProps={{
                          disabled: true,
                          startAdornment: <InputAdornment position='start'>{data.updatedAt}</InputAdornment>
                        }}
                      />
                    </Box>
                  </Box>
                </DatePickerWrapper>
              </Grid>
            </Grid>
          </CardContent>

          <Divider sx={{ mt: 1 }} />

          <CardContent sx={{ pb: 2 }}>
            <Grid container>
              <Grid item xs={12} sm={6} sx={{ mb: { lg: 0, xs: 4 }, justifyContent: 'start' }}>
                <Typography variant='subtitle2' sx={{ mb: 2.5, color: 'text.primary' }}>
                  Time Slot:
                </Typography>
                <Box sx={{ mb: 6 }}>
                  <Typography variant='body2' sx={{ mb: 1, color: 'text.primary' }}>
                    Pickup Date: {data?.pickupTime?.[0]?.date}
                  </Typography>
                  <Typography variant='body2' sx={{ mb: 1, color: 'text.primary' }}>
                    Pickup Time: {data?.pickupTime?.[0]?.timeSlot}
                  </Typography>
                  <Typography variant='body2' sx={{ mb: 1, color: 'text.primary' }}>
                    Pickup Instruction: {data?.pickupInstruction}
                  </Typography>
                  <Typography variant='body2' sx={{ mb: 1, color: 'text.primary' }}>
                    Delivery Date: {data?.deliveryTime?.[0]?.date}
                  </Typography>
                  <Typography variant='body2' sx={{ mb: 1, color: 'text.primary' }}>
                    Delivery Time: {data?.deliveryTime?.[0]?.timeSlot}
                  </Typography>
                  <Typography variant='body2' sx={{ mb: 1, color: 'text.primary' }}>
                    Delivery Instruction: {data?.deliveryInstruction}
                  </Typography>
                </Box>

                <Typography variant='subtitle2' sx={{ mb: 2.5, color: 'text.primary' }}>
                  Payment Details:
                </Typography>
                <Box sx={{ mb: 6 }}>
                  <Typography variant='body2' sx={{ mb: 1, color: 'text.primary' }}>
                    Paid Amount: {data?.amountPaid}
                  </Typography>
                  <Typography variant='body2' sx={{ mb: 1, color: 'text.primary' }}>
                    Pending Amount: {data?.pendingAmount}
                  </Typography>
                  <Typography variant='body2' sx={{ mb: 1, color: 'text.primary' }}>
                    Refund Amount: {data?.refundAmount}
                  </Typography>
                  <Typography variant='body2' sx={{ mb: 1, color: 'text.primary' }}>
                    Payment ID: {data?.paymentId?.[0]}
                  </Typography>
                  <Typography variant='body2' sx={{ mb: 1, color: 'text.primary' }}>
                    Payment Time: {data?.refundInfo?.[0]?.paymentId}
                  </Typography>
                  <Typography variant='body2' sx={{ mb: 1, color: 'text.primary' }}>
                    Refund ID: {data?.refundInfo?.[0]?.paymentId}
                  </Typography>
                  <Typography variant='body2' sx={{ mb: 1, color: 'text.primary' }}>
                    Refund Time: {data?.refundInfo?.[0]?.cancellationTime}
                  </Typography>
                </Box>

                <Typography variant='subtitle2' sx={{ mb: 2.5, color: 'text.primary' }}>
                  Invoice To:
                </Typography>

                <Box>
                  <Typography variant='body2' sx={{ mb: 1, color: 'text.primary' }}>
                    {data?.name}
                  </Typography>
                  {customer?.mobileNo == undefined ? (
                    ''
                  ) : (
                    <Typography variant='body2' sx={{ mb: 1, color: 'text.primary' }}>
                      {customer?.countryCode} {' ' + formatPhoneNumber(customer?.mobileNo)}
                    </Typography>
                  )}
                </Box>
              </Grid>
            </Grid>
          </CardContent>

          <Divider sx={{ mb: 1.25 }} />

          <TableContainer component={Paper}>
            <Table aria-label='collapsible table'>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell width='70%'>Service Categories</TableCell>
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell align='right'>Total Items</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(ItemGroupedByCategory).map(item => {
                  return <>{<ItemsRow row={item} />}</>
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Grid container sx={{ ml: 4.74, mt: 4.75, mb: 4.75 }}>
            <Grid item xs={12} sx={{ px: 0 }}>
              <Button
                size='small'
                variant='contained'
                startIcon={<Plus fontSize='small' />}
                onClick={() => {
                  setCount(count + 1)
                  handleAddDialogOpen()
                }}
              >
                Add Item
              </Button>
            </Grid>
          </Grid>

          <Divider />

          <CardContent>
            <Grid container>
              <Grid item xs={12} sm={9} sx={{ order: { sm: 1, xs: 2 } }}></Grid>
              <Grid item xs={12} sm={3} sx={{ mb: { sm: 0, xs: 4 }, order: { sm: 2, xs: 1 } }}>
                <CalcWrapper>
                  <Typography variant='body2'>Order Amount:</Typography>

                  <TextField
                    disabled
                    size='small'
                    sx={{ input: { textAlign: 'end' }, maxWidth: '150px' }}
                    defaultValue={'$' + data?.orderAmount}
                  />
                </CalcWrapper>
                <CalcWrapper>
                  <Typography variant='body2'>Ride Charge:</Typography>

                  <TextField
                    disabled
                    size='small'
                    sx={{ input: { textAlign: 'end' }, maxWidth: '150px' }}
                    defaultValue={'$' + data?.taxes?.pickup_delivery}
                  />
                </CalcWrapper>

                <CalcWrapper>
                  <Typography variant='body2'>Service Fees:</Typography>

                  <TextField
                    disabled
                    size='small'
                    sx={{ input: { textAlign: 'end' }, maxWidth: '150px' }}
                    defaultValue={'$' + data?.taxes?.service_fee}
                  />
                </CalcWrapper>

                <CalcWrapper>
                  <Typography variant='body2'>Tax:</Typography>

                  <TextField
                    disabled
                    size='small'
                    sx={{ input: { textAlign: 'end' }, maxWidth: '150px' }}
                    defaultValue={data?.taxes?.tax}
                  />
                </CalcWrapper>

                <CalcWrapper>
                  <Typography variant='body2'>Final Amount:</Typography>

                  <TextField
                    disabled
                    size='small'
                    sx={{ input: { textAlign: 'end' }, maxWidth: '150px' }}
                    defaultValue={data?.finalAmount}
                  />
                </CalcWrapper>

                <CalcWrapper>
                  <Typography variant='body2'>Discount:</Typography>

                  <TextField
                    disabled
                    size='small'
                    sx={{ input: { textAlign: 'end' }, maxWidth: '150px' }}
                    defaultValue={'$' + (discount ? discount : '0')}
                  />
                </CalcWrapper>

                <Divider sx={{ mt: 5, mb: 1.5 }} />
                <CalcWrapper>
                  <Typography variant='body2'>Total:</Typography>
                  <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary', lineHeight: '.25px' }}>
                    ${data?.orderTotalAmount}
                  </Typography>
                </CalcWrapper>
              </Grid>
            </Grid>
          </CardContent>

          <Divider sx={{ my: 1 }} />

          <CardContent>
            <Grid container sx={{ display: 'flex', flexDirection: 'column', width: '226px', gap: 2 }}>
              <FormControl sx={{ mb: 0 }}>
                <InputLabel
                  // sx={{  }}
                  id='status'
                  error={Boolean(errors.role)}
                  htmlFor='status'
                >
                  {statusText(data?.invoiceStatus)}
                </InputLabel>
                <Controller
                  name='Status'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      value={updateStatusValue}
                      label={statusText(data?.invoiceStatus)}
                      onChange={onChangeupdateStatus}
                      error={Boolean(updateStatusError)}
                      labelId='status'
                    >
                      <MenuItem value=''>Select Status</MenuItem>
                      {/* <MenuItem value='0'>Created</MenuItem> */}
                      <MenuItem value='1'>Payment Pending</MenuItem>
                      <MenuItem value='2'>Booking Confirmed (PI)</MenuItem>
                      <MenuItem value='3'>Pickup Initiated</MenuItem>
                      <MenuItem value='4'>Pickup Failed</MenuItem>
                      <MenuItem value='5'>Pickup Completed</MenuItem>
                      <MenuItem value='6'>Processing</MenuItem>
                      <MenuItem value='7'>Cleaning Completed</MenuItem>
                      <MenuItem value='8'>Delivery Initiated</MenuItem>
                      <MenuItem value='9'>Delivery Failed</MenuItem>
                      <MenuItem value='10'>Order Completed (DC)</MenuItem>
                      <MenuItem value='11'>Order Canceled</MenuItem>
                      <MenuItem value='12'>Refund Pending</MenuItem>
                      <MenuItem value='13'>Refund proceed and canceled</MenuItem>
                      <MenuItem value='14'>Payment Failed</MenuItem>
                    </Select>
                  )}
                />
                {updateStatusError && (
                  <FormHelperText sx={{ color: 'error.main' }} id='status'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>

              <Button onClick={onUpdateStatusClick} size='large' color='success' variant='contained' sx={{ ml: 0 }}>
                Update
              </Button>
            </Grid>
          </CardContent>

          <Dialog
            open={openAddDialog}
            onClose={handleAddDialogClose}
            aria-labelledby='user-view-edit'
            sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650, p: [2, 10] } }}
            aria-describedby='user-view-edit-description'
          >
            <form onSubmit={handleSubmit(addItemClicked)}>
              <DialogTitle id='user-view-edit' sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
                {isEditDialog ? 'Edit Item' : 'Add Item'}
              </DialogTitle>
              <DialogContent>
                <DialogContentText
                  variant='body2'
                  id='user-view-edit-description'
                  sx={{ textAlign: 'center', mb: 3 }}
                ></DialogContentText>

                <Grid container spacing={6}>
                  <Grid item xs={12} sm={12}>
                    <FormControl fullWidth>
                      <Controller
                        error={Boolean(errors.category)}
                        name='category'
                        render={props => (
                          <Autocomplete
                            disabled={isEditDialog ? true : false}
                            value={categoryValue}
                            options={categoryStore.data}
                            onChange={(_, data) => {
                              clearErrors('category')
                              props.field.onChange(data)
                              handleChange(data)
                            }}
                            id='category'
                            getOptionLabel={option => option.name}
                            renderInput={params => (
                              <TextField {...params} error={Boolean(errors.category)} label='Select Category' />
                            )}
                          />
                        )}
                        control={control}
                      />

                      {errors.category && (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-email'>
                          This field is required
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <FormControl fullWidth>
                      <Controller
                        error={Boolean(errors.item)}
                        name='item'
                        render={props => (
                          <Autocomplete
                            disabled={isEditDialog ? true : false}
                            value={itemValue}
                            options={filteredItems}
                            onChange={(_, data) => {
                              clearErrors('item')
                              props.field.onChange(data)
                              handleChangeItem(data)
                            }}
                            id='item'
                            getOptionLabel={option => option.name}
                            renderInput={params => (
                              <TextField {...params} error={Boolean(errors.item)} label='Select Item' />
                            )}
                          />
                        )}
                        control={control}
                      />

                      {errors.item && (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-email'>
                          This field is required
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <FormControl fullWidth>
                      <Controller
                        name='quantity'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            InputProps={{ inputProps: { min: 1 } }}
                            type='number'
                            value={value}
                            label='Quantity'
                            onChange={onChange}
                            error={Boolean(errors.quantity)}
                          />
                        )}
                      />
                      {errors.quantity && (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                          This field is required
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <FormControl fullWidth>
                      <Controller
                        name='originalPrice'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            InputProps={{ inputProps: { min: 0 } }}
                            disabled
                            value={value}
                            label='Original Price'
                            onChange={e => {
                              clearErrors('originalPrice')
                              onChange(priceFromat(e.target.value))
                            }}
                            error={Boolean(errors.originalPrice)}
                          />
                        )}
                      />
                      {errors.originalPrice && (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                          This field is required
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <FormControl fullWidth>
                      <Controller
                        name='price'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            InputProps={{ inputProps: { min: 0 } }}
                            value={value}
                            label='Price (optional)'
                            onChange={e => {
                              clearErrors('price')
                              onChange(priceFromat(e.target.value))
                            }}
                            error={Boolean(errors.price)}
                          />
                        )}
                      />
                      {errors.price && (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                          This field is required
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <FormControl fullWidth>
                      <Controller
                        name='finalPrice'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            InputProps={{ inputProps: { min: 0 } }}
                            disabled
                            value={value}
                            label='Final Price'
                            onChange={e => {
                              clearErrors('finalPrice')
                              onChange(priceFromat(e.target.value))
                            }}
                            error={Boolean(errors.finalPrice)}
                          />
                        )}
                      />
                      {errors.finalPrice && (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                          This field is required
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions sx={{ justifyContent: 'center' }}>
                <Button type='submit' variant='contained' sx={{ mr: 1 }}>
                  Submit
                </Button>
                <Button variant='outlined' color='secondary' onClick={handleAddDialogClose}>
                  Discard
                </Button>
              </DialogActions>
            </form>

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
                    <Button onClick={onUpdateStatusClickContinue}>Continue</Button>
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
          </Dialog>

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
                  <Button onClick={onUpdateStatusClickContinue}>Continue</Button>
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
        </Card>
        <AddCustomerDrawer open={addCustomerOpen} toggle={toggleAddCustomerDrawer} />
      </>
    )
  } else {
    return null
  }
}

export default EditCard
