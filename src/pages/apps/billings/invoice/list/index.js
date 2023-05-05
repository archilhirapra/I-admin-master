// ** React Imports
import {useState, useEffect, forwardRef, useCallback} from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import {DataGrid} from '@mui/x-data-grid'
import MenuItem from '@mui/material/MenuItem'
import {styled} from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'

// ** Icons Imports
import Laptop from 'mdi-material-ui/Laptop'
import ChartDonut from 'mdi-material-ui/ChartDonut'
import CogOutline from 'mdi-material-ui/CogOutline'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import PencilOutline from 'mdi-material-ui/PencilOutline'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'

// ** Store Imports
import {useDispatch, useSelector} from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import {getInitials} from 'src/utils/get-initials'

// ** Actions Imports
// import { fetchData, deleteUser } from 'src/store/apps/user'
import {fetchData, deleteUser} from 'src/store/apps/admin'
import {fetchInvoices} from 'src/store/apps/billings/invoice'
// import { fetchData, deleteUser } from 'src/store/apps/services/categories'

import format from 'date-fns/format'
import DatePicker from 'react-datepicker'
// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'


// ** Custom Components Imports
import TableHeader from 'src/views/apps/invoices/list/TableHeader'
import AddInvoiceDrawer from 'src/views/apps/invoices/list/AddInvoiceDrawer'
// import EditUserDrawer from 'src/views/apps/billings/list/EditUserDrawer'
import {useRouter} from 'next/router'

import {fetchCustomerList} from 'src/store/apps/customer'

// ** Config
import authConfig from 'src/configs/auth'
// import invoiceConfig from 'src/configs/invoice'
import addressConfig from 'src/configs/addresses'
import timeSlotConfig from 'src/configs/time_slot'
// import timeSlotConfig from 'src/configs/invoice'
import axios from 'axios'

const UserList = () => {
  const router = useRouter()

  useEffect(() => {
    dispatch(fetchCustomerList({}))
  }, [])

  const customerStore = useSelector(state => state.customer)

  const [pickupDateTimeSlots, setPickupDateTimeSlots] = useState([])
  const [deliveryDateTimeSlots, setDeliveryDateTimeSlots] = useState([])
  const [selecedPuckupTimeId, setSelecedPuckupTimeId] = useState(null)
  const [addresses, setAddresses] = useState([])


  useEffect(() => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
    }
    axios
      .get(timeSlotConfig.GetPickupDaysEndpoint, {params: {}, headers})
      .then(response => {

        setPickupDateTimeSlots(response.data.data.data)
      })
      .catch(() => {
        setPickupDateTimeSlots(null)
      })


    axios
      .get(addressConfig.AddressesListEndpoint, {params: {isActive: true}, headers})
      .then(response => {

        setAddresses(response.data.data.data)
      })
      .catch(() => {
        setAddresses(null)
        // setError(true)
      })
  }, [])


  useEffect(() => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
    }
    axios
      .get(timeSlotConfig.GetDeliveryDaysEndpoint, {params: {dateTimeId: selecedPuckupTimeId}, headers})
      .then(response => {
        if (response.data.data.data == null) {
          setDeliveryDateTimeSlots([])
        } else {
          setDeliveryDateTimeSlots(response.data.data.data)
        }

      })
      .catch(() => {
        setDeliveryDateTimeSlots([])
      })
  }, [selecedPuckupTimeId])


  /* eslint-disable */
  const CustomInput = forwardRef((props, ref) => {
    const startDate = props.start !== null ? format(props.start, 'MM/dd/yyyy') : ''
    const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null
    const value = `${startDate}${endDate !== null ? endDate : ''}`
    props.start === null && props.dates.length && props.setDates ? props.setDates([]) : null
    const updatedProps = {...props}
    delete updatedProps.setDates
    return <TextField fullWidth inputRef={ref} {...updatedProps} label={props.label || ''} value={value}/>
  })


  const [statusValue, setStatusValue] = useState('')
  const [value, setValue] = useState('')
  const [minValue, setMinValue] = useState('')
  const [maxValue, setMaxValue] = useState('')


  // pickup date range

  const [pickupDates, setPickupDates] = useState([])
  const [pickupEndDateRange, setPickupEndDateRange] = useState(null)
  const [pickupStartDateRange, setPickupStartDateRange] = useState(null)

  const [endDateRangetosendPickup, setEndDateRangetosendPickup] = useState(null)
  const [startDateRangetosendPickup, setStartDateRangetosendPickup] = useState(null)

  const handleOnChangePickupRange = dates => {
    const [start, end] = dates
    if (start !== null && end !== null) {
      setPickupDates(dates)
    }
    setPickupStartDateRange(start)
    if (start == null) {
      setStartDateRangetosendPickup(null)
    } else {
      setStartDateRangetosendPickup(new Date(start).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }))
    }
    if (end == null) {
      setEndDateRangetosendPickup(null)
    } else {
      setEndDateRangetosendPickup(new Date(end).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }))
    }

    setPickupEndDateRange(end)
  }


  // delivery date range
  const [deliveryDates, setDeliveryDates] = useState([])
  const [deliveryEndDateRange, setDeliveryEndDateRange] = useState(null)
  const [deliveryStartDateRange, setDeliveryStartDateRange] = useState(null)

  const [endDateRangetosendDelivery, setEndDateRangetosendDelivery] = useState(null)
  const [startDateRangetosendDelivery, setStartDateRangetosendDelivery] = useState(null)

  const handleOnChangeDeliveryRange = dates => {
    const [start, end] = dates
    if (start !== null && end !== null) {
      setDeliveryDates(dates)
    }
    setDeliveryStartDateRange(start)
    if (start == null) {
      setStartDateRangetosendDelivery(null)
    } else {
      setStartDateRangetosendDelivery(new Date(start).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }))
    }
    if (end == null) {
      setEndDateRangetosendDelivery(null)
    } else {
      setEndDateRangetosendDelivery(new Date(end).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }))
    }

    setDeliveryEndDateRange(end)
  }


  const userStatusObj = {
    active: 'success',
    pending: 'warning',
    inactive: 'secondary'
  }

  const isSubscribedObj = {
    True: 'success',
    False: 'error',
    // inactive: 'secondary'
  }

  // ** Styled component for the link for the avatar with image
  const AvatarWithImageLink = styled(Link)(({theme}) => ({
    backgroundColor: 'red',
    marginRight: theme.spacing(3)
  }))

  // ** Styled component for the link for the avatar without image
  const AvatarWithoutImageLink = styled(Link)(({theme}) => ({
    textDecoration: 'none',
    marginRight: theme.spacing(3)
  }))

  // ** renders client column
  const renderClient = row => {
    if (row?.icon?.length) {
      return (
        <AvatarWithImageLink href={`/apps/user/admin/view/${row.id}`}>
          <CustomAvatar src={row.icon} sx={{mr: 3, width: 34, height: 34}}/>
        </AvatarWithImageLink>
      )
    } else {
      return (
        <AvatarWithImageLink href={`/apps/user/admin/view/${row.id}`}>
          <CustomAvatar src={"/images/pages/booking.png"} sx={{mr: 3, width: 34, height: 34}}/>
        </AvatarWithImageLink>
      )
    }
  }

  // ** Styled component for the link inside menu
  const MenuItemLink = styled('a')(({theme}) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    padding: theme.spacing(1.5, 4),
    color: theme.palette.text.primary
  }))


  const RowOptions = ({id, row}) => {
    // ** Hooks
    const dispatch = useDispatch()

    // ** State
    const [anchorEl, setAnchorEl] = useState(null)
    const rowOptionsOpen = Boolean(anchorEl)

    const handleRowOptionsClick = event => {
      setAnchorEl(event.currentTarget)
    }

    const handleRowOptionsClose = () => {
      setAnchorEl(null)
    }

    const handleEdit = () => {


      setEditId(id);
      setEditRow(row);

      const redirectURL = '/apps/billings/invoice/edit/' + id
      router.push(redirectURL)
    }

    const handleDelete = () => {
      handleRowOptionsClose()
    }

    return (
      <>
        <IconButton size='small' onClick={handleRowOptionsClick}>
          <DotsVertical/>
        </IconButton>
        <Menu
          keepMounted
          anchorEl={anchorEl}
          open={rowOptionsOpen}
          onClose={handleRowOptionsClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          PaperProps={{style: {minWidth: '8rem'}}}
        >
          <MenuItem sx={{p: 0}}>
            <Link href={`/apps/user/admin/view/${id}`} passHref>
              <MenuItemLink>
                <EyeOutline fontSize='small' sx={{mr: 2}}/>
                View
              </MenuItemLink>
            </Link>
          </MenuItem>
          <MenuItem onClick={handleEdit}>
            <PencilOutline fontSize='small' sx={{mr: 2}}/>
            Edit
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            <DeleteOutline fontSize='small' sx={{mr: 2}}/>
            Delete
          </MenuItem>
        </Menu>
      </>
    )
  }

  const threeDotForId = (name, text) => {
    let length = (name.length) - 3
    return text.substring(0, length) + '...'
  }

  const threeDotForDescription = (text, length) => {

    if (text != undefined) {
      return text.substring(0, length) + '...'
    }

  }

  const columns = [

    {
      sortable: false,
      flex: 0.2,
      minWidth: 230,
      field: 'order',
      headerName: 'Order & Invoice',
      renderCell: ({row}) => {
        const {invoiceId, id} = row

        return (
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Box sx={{display: 'flex', alignItems: 'flex-start', flexDirection: 'column'}}>
              <a target="_blank" href={`/apps/billings/invoice/edit/${id}`} passHref>
                <Typography
                  noWrap
                  component='a'
                  variant='subtitle2'
                  sx={{color: 'text.primary', textDecoration: 'none'}}
                >
                  {invoiceId}
                </Typography>
              </a>
              <a target="_blank" href={`/apps/billings/invoice/edit/${id}`} passHref>
                <Typography noWrap component='a' variant='caption' sx={{textDecoration: 'none',}}>
                  @{threeDotForDescription(id, 10)}
                </Typography>
              </a>
            </Box>
          </Box>
        )
      }
    },
    {
      sortable: false,
      flex: 0.2,
      minWidth: 180,
      field: 'customer',
      headerName: 'Customer',
      renderCell: ({row}) => {
        const {id, fullName, name, userId} = row

        return (
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Box sx={{display: 'flex', alignItems: 'flex-start', flexDirection: 'column'}}>
              <Link href={`/apps/user/customer/view/${userId}`} passHref>
                <Typography
                  noWrap
                  component='a'
                  variant='subtitle2'
                  sx={{color: 'text.primary', textDecoration: 'none'}}
                >
                  {name}
                </Typography>
              </Link>
              <Link href={`/apps/user/customer/view/${userId}`} passHref>
                <Typography noWrap component='a' variant='caption' sx={{textDecoration: 'none'}}>
                  @{threeDotForDescription(row.userId, 10)}
                  {/* @{name} */}
                </Typography>
              </Link>
            </Box>
          </Box>
        )
      }
    },

    {
      sortable: false,
      flex: 0.1,
      minWidth: 150,
      field: 'subscribed',
      headerName: 'Subscribed',
      renderCell: ({row}) => {
        var isSubscribed = '';
        if (row.isSubscribed == true) {
          isSubscribed = 'True'
        } else if (row.isSubscribed == false) {
          isSubscribed = 'False'
        }
        return (
          <CustomChip
            skin='light'
            size='small'
            label={isSubscribed}
            color={isSubscribedObj[isSubscribed]}
            sx={{textTransform: 'capitalize', '& .MuiChip-label': {lineHeight: '18px'}}}
          />
        )
      }
    },
    {
      sortable: false,
      flex: 0.2,
      minWidth: 250,
      field: 'created_at',
      headerName: 'Created At',
      renderCell: ({row}) => {
        return (
          <Typography noWrap variant='body2'>
            {row.createdAt}
          </Typography>
        )
      }
    },
    {
      sortable: false,
      flex: 0.2,
      minWidth: 250,
      field: 'updated_at',
      headerName: 'Updated At',
      renderCell: ({row}) => {
        return (
          <Typography noWrap variant='body2'>
            {row.updatedAt}
          </Typography>
        )
      }
    },
    {
      sortable: false,
      flex: 0.1,
      minWidth: 210,
      field: 'payment_status',
      headerName: 'Payment Status',
      renderCell: ({row}) => {
        var pstatus = '';
        if (row.paymentStatus == 0) {
          pstatus = 'Unpaid'
        } else if (row.paymentStatus == 1) {
          pstatus = 'Paid'
        }
        return (
          <CustomChip
            skin='light'
            size='small'
            label={pstatus}
            sx={{textTransform: 'capitalize', '& .MuiChip-label': {lineHeight: '18px'}}}
          />
        )
      }
    },
    {
      sortable: false,
      flex: 0.2,
      minWidth: 220,
      field: 'invoice_status',
      headerName: 'Invoice Status',
      renderCell: ({row}) => {
        return (
          <Typography noWrap variant='body2'>
            {row.invoiceStatus}
          </Typography>
        )
      }
    },
    // {
    //   sortable: false,
    //   flex: 0.1,
    //   minWidth: 110,
    //   field: 'invoice_status',
    //   headerName: 'Invoice Status',
    //   renderCell: ({ row }) => {
    //     // var istatus = '';
    //     // if (row.invoiceStatus == 0) {
    //     //   istatus = 'paid'
    //     // } else if (row.invoiceStatus == 1) {
    //     //   istatus = 'unpaid'
    //     // }
    //     return (
    //       <CustomChip
    //         skin='light'
    //         size='small'
    //         label={row.invoiceStatus}
    //         color={'primary'}
    //         sx={{ textTransform: 'capitalize', '& .MuiChip-label': { lineHeight: '18px' } }}
    //       />
    //     )
    //   }
    // },

  ]


  const [editId, setEditId] = useState(null);
  const [editRow, setEditRow] = useState(null);
  // ** State
  const [name, setName] = useState('')

  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [status, setStatus] = useState('')


  const [pageSize, setPageSize] = useState(10)
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [editUserOpen, setEditUserOpen] = useState(false)

  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.invoice)
  useEffect(() => {
    dispatch(
      fetchInvoices({


        status,
        name: value,


        pickupStart: startDateRangetosendPickup,
        pickupEnd: endDateRangetosendPickup,

        deliveryStart: startDateRangetosendDelivery,
        deliveryEnd: endDateRangetosendDelivery,

        min: minValue,
        max: maxValue,

      })
    )
  }, [dispatch, name, email, role, status, value, minValue, maxValue, startDateRangetosendPickup, endDateRangetosendPickup, startDateRangetosendDelivery, endDateRangetosendDelivery, addUserOpen])

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])


  const handleMin = useCallback(val => {
    setMinValue(val)
  }, [])
  const handleMax = useCallback(val => {
    setMaxValue(val)
  }, [])


  const handleRoleChange = useCallback(e => {
    setRole(e.target.value)
  }, [])
  const handleStatusChange = useCallback(e => {
    setStatus(e.target.value)
  }, [])


  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)
  const toggleEditUserDrawer = () => {
    if (editUserOpen) {
      setEditId(null);
      setEditUserOpen(false)
    } else {
      setEditUserOpen(true)
    }

  }


  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Search Filters' sx={{pb: 4, '& .MuiCardHeader-title': {letterSpacing: '.15px'}}}/>
          <CardContent>
            <Grid container spacing={6}>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='status'>Invoice Status</InputLabel>
                  <Select
                    fullWidth
                    value={status}
                    id='status'
                    label='Invoice Status'
                    labelId='status'
                    onChange={handleStatusChange}
                    inputProps={{placeholder: 'Invoice Status'}}
                  >
                    <MenuItem value=''>Select Status</MenuItem>
                    <MenuItem value='0'>Created</MenuItem>
                    <MenuItem value='1'>Payment Pending</MenuItem>
                    <MenuItem value='2'>Booking Confirmed (PI)</MenuItem>
                    <MenuItem value='3'>Pickup Initiated</MenuItem>
                    <MenuItem value='4'>Pickup Failed</MenuItem>
                    <MenuItem value='5'>Pickup Completed</MenuItem>
                    <MenuItem value='6'>Processing</MenuItem>
                    <MenuItem value='7'>Cleaning Completed</MenuItem>
                    <MenuItem value='8'>Delivery Intiated</MenuItem>
                    <MenuItem value='9'>Delivery Failed</MenuItem>
                    <MenuItem value='10'>Order Completed (DC)</MenuItem>
                    <MenuItem value='11'>Order Canceled</MenuItem>
                    <MenuItem value='12'>Refund Pending</MenuItem>
                    <MenuItem value='13'>Refund proceed and canceled</MenuItem>
                    <MenuItem value='14'>Payment Failed</MenuItem>

                  </Select>
                </FormControl>
              </Grid>

              <Grid item sm={4} xs={12}>

                <DatePickerWrapper>
                  <DatePicker
                    isClearable
                    selectsRange
                    monthsShown={2}
                    endDate={pickupEndDateRange}
                    selected={pickupStartDateRange}
                    startDate={pickupStartDateRange}
                    shouldCloseOnSelect={false}
                    id='date-range-picker-months'
                    onChange={handleOnChangePickupRange}
                    customInput={
                      <CustomInput
                        dates={pickupDates}
                        setDates={setPickupDates}
                        label='Pickup Date Range'
                        end={pickupEndDateRange}
                        start={pickupStartDateRange}
                      />
                    }
                  />
                </DatePickerWrapper>

              </Grid>

              <Grid item sm={4} xs={12}>

                <DatePickerWrapper>
                  <DatePicker
                    isClearable
                    selectsRange
                    monthsShown={2}
                    endDate={deliveryEndDateRange}
                    selected={deliveryStartDateRange}
                    startDate={deliveryStartDateRange}
                    shouldCloseOnSelect={false}
                    id='date-range-picker-months'
                    onChange={handleOnChangeDeliveryRange}
                    customInput={
                      <CustomInput
                        dates={deliveryDates}
                        setDates={setDeliveryDates}
                        label='Delivery Date Range'
                        end={deliveryEndDateRange}
                        start={deliveryStartDateRange}
                      />
                    }
                  />
                </DatePickerWrapper>

              </Grid>


            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <TableHeader value={value} handleFilter={handleFilter} handleMin={handleMin} handleMax={handleMax}
                       minValue={minValue} maxValue={maxValue} toggle={toggleAddUserDrawer}/>
          <DataGrid
            disableColumnMenu
            disableColumnFilter
            disableColumnSelector
            autoHeight
            rows={store.data}
            columns={columns}
            pageSize={pageSize}
            disableSelectionOnClick
            rowsPerPageOptions={[10, 25, 50]}
            sx={{'& .MuiDataGrid-columnHeaders': {borderRadius: 0}}}
            onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          />
        </Card>
      </Grid>

      <AddInvoiceDrawer open={addUserOpen} toggle={toggleAddUserDrawer} customerStore={customerStore}
                        pickupDateTimeSlots={pickupDateTimeSlots} setSelecedPuckupTimeId={setSelecedPuckupTimeId}
                        deliveryDateTimeSlots={deliveryDateTimeSlots} addresses={addresses}/>
    </Grid>
  )
}
// UserList.acl = {
//   action: 'read',
//   subject: 'admin-list'
// }
// UserList.guestGuard = true
export default UserList
