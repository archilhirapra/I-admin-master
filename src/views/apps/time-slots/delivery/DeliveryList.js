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
import Tooltip from '@mui/material/Tooltip'
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
import {fetchHolidays} from 'src/store/apps/time-slot'
// import { fetchData, deleteUser } from 'src/store/apps/services/categories'

import format from 'date-fns/format'
import DatePicker from 'react-datepicker'
// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'


// ** Custom Components Imports

import TableHeader from 'src/views/apps/time-slots/delivery/TableHeader'
import EditTimeSlots from 'src/views/apps/time-slots/common/EditTimeSlots'
import AddTimeSlots from 'src/views/apps/time-slots/common/AddTimeSlots'

const TimeSlotDeliveryList = () => {

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
  const [dates, setDates] = useState([])
  const [value, setValue] = useState('')


  const [endDateRange, setEndDateRange] = useState(null)
  const [startDateRange, setStartDateRange] = useState(new Date())

  const handleOnChangeRange = dates => {
    const [start, end] = dates
    if (start !== null && end !== null) {
      setDates(dates)
    }
    setStartDateRange(start)
    setEndDateRange(end)
  }


  // ** Vars
  const userRoleObj = {
    superAdmin: <CogOutline sx={{mr: 2, color: 'warning.main'}}/>,
    admin: <CogOutline sx={{mr: 2, color: 'warning.main'}}/>,
    employee: <ChartDonut sx={{mr: 2, color: 'success.main'}}/>,
    user: <AccountOutline sx={{mr: 2, color: 'primary.main'}}/>

  }

  const userStatusObj = {
    active: 'success',
    pending: 'warning',
    inactive: 'secondary'
  }
  const fullHolidayStatusObj = {
    true: 'error',
    false: 'success',
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
      toggleEditTimeSlotDrawer();
    }

    const handleDelete = () => {
      dispatch(deleteUser(id))
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
            Edita
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
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const columns = [
    {
      sortable: false,
      flex: 0.1,
      minWidth: 150,
      field: 'day',
      headerName: 'Day Name',
      renderCell: ({row}) => {
        return (
          <Typography noWrap variant='body2'>
            {days[(new Date(row.date)).getDay()]}
          </Typography>
        )
      }
    },
    {
      sortable: false,
      flex: 0.1,
      minWidth: 150,
      field: 'date',
      headerName: 'Date (MM/DD/YYYY)',
      renderCell: ({row}) => {
        return (
          <Typography noWrap variant='body2'>
            {row.date}
          </Typography>
        )
      }
    },


    {
      sortable: false,
      flex: 0.1,
      minWidth: 110,
      field: 'full_holiday_status',
      headerName: 'Full Holiday Status',
      renderCell: ({row}) => {
        return (
          <CustomChip
            skin='light'
            size='small'
            label={row.isFullHoliday ? ('Yes') : ('No')}
            color={fullHolidayStatusObj[row.isFullHoliday]}
            sx={{textTransform: 'capitalize', '& .MuiChip-label': {lineHeight: '18px'}}}
          />
        )
      }
    },
    {
      sortable: false,
      flex: 0.1,
      minWidth: 110,
      field: 'half_holiday_status',
      headerName: 'Half Holiday Status',
      renderCell: ({row}) => {
        return (
          <CustomChip
            skin='light'
            size='small'
            label={row.isHalf ? ('Yes') : ('No')}
            color={fullHolidayStatusObj[row.isHalf]}
            sx={{textTransform: 'capitalize', '& .MuiChip-label': {lineHeight: '18px'}}}
          />
        )
      }
    },


    {
      flex: 0.1,
      align: "right",
      type: 'number',
      minWidth: 130,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({row}) => (
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          <Tooltip title='Edit'>
            <IconButton size='small' sx={{mr: 0.5}}
                        onClick={toggleEditTimeSlotDrawer.bind(this, row)}
            >
              <PencilOutline/>
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ]


  const [editId, setEditId] = useState(null);
  const [editRow, setEditRow] = useState(null);
  // ** State
  const [name, setName] = useState('')

  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [status, setStatus] = useState('')


  const [pageSize, setPageSize] = useState(10)


  const [addTimeSlotOpen, setAddTimeSlotOpen] = useState(false)
  const [editTimeSlotOpen, setEditTimeSlotOpen] = useState(false)

  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.timeSlot)

  const [disableDateArray, setDisableDateArray] = useState([]);

  useEffect(() => {
    setDisableDateArray(store.data.map((item) => new Date(item.date)))
  }, [store])

  useEffect(() => {

    dispatch(
      fetchHolidays({
        status,
        name: value,
      })
    )
  }, [dispatch, status, value])

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])
  const handleRoleChange = useCallback(e => {
    setRole(e.target.value)
  }, [])
  const handleStatusChange = useCallback(e => {
    setStatus(e.target.value)
  }, [])


  const toggleAddTimeSlotDrawer = () => setAddTimeSlotOpen(!addTimeSlotOpen)
  const toggleEditTimeSlotDrawer = (row) => {
    if (editTimeSlotOpen) {
      setEditId(null);
      setEditTimeSlotOpen(false)
    } else {
      setEditRow(row);
      setEditTimeSlotOpen(true)
    }

  }

  return (
    <Grid container spacing={6}>

      <Grid item xs={12}>
        <Card>
          <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddTimeSlotDrawer}/>
          <DataGrid
            disableColumnMenu
            disableColumnFilter
            disableColumnSelector
            autoHeight
            rows={store.data}
            columns={columns}
            // checkboxSelection
            pageSize={pageSize}
            disableSelectionOnClick
            rowsPerPageOptions={[10, 25, 50]}
            sx={{'& .MuiDataGrid-columnHeaders': {borderRadius: 0}}}
            onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          />


        </Card>
      </Grid>
      <EditTimeSlots open={editTimeSlotOpen} toggle={toggleEditTimeSlotDrawer} editRow={editRow}
                     setEditRow={setEditRow}/>
      <AddTimeSlots open={addTimeSlotOpen} toggle={toggleAddTimeSlotDrawer} disableDate={disableDateArray}/>
    </Grid>
  )
}
// UserList.acl = {
//   action: 'read',
//   subject: 'admin-list'
// }
// UserList.guestGuard = true
export default TimeSlotDeliveryList
