// ** React Imports
import {useState, useEffect, useCallback, forwardRef} from 'react'

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
import {fetchData, deleteUser} from 'src/store/apps/admin'
import {fetchCupons} from 'src/store/apps/cupons'

import format from 'date-fns/format'
import DatePicker from 'react-datepicker'
// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Custom Components Imports
import TableHeader from 'src/views/apps/cupons/list/TableHeader'
import AddUserDrawer from 'src/views/apps/cupons/list/AddUserDrawer'
import EditAdminDrawer from 'src/views/apps/cupons/list/EditUserDrawer'

const UserList = () => {


  // ** Vars
  const userRoleObj = {
    superAdmin: <CogOutline sx={{mr: 2, color: 'warning.main'}}/>,
    admin: <CogOutline sx={{mr: 2, color: 'warning.main'}}/>,
    employee: <ChartDonut sx={{mr: 2, color: 'success.main'}}/>,
    user: <AccountOutline sx={{mr: 2, color: 'primary.main'}}/>
  }

  const userStatusObj = {
    Active: 'success',
    Inactive: 'error',

  }

  // ** Styled component for the link for the avatar with image
  const AvatarWithImageLink = styled(Link)(({theme}) => ({
    marginRight: theme.spacing(3)
  }))

  // ** Styled component for the link for the avatar without image
  const AvatarWithoutImageLink = styled(Link)(({theme}) => ({
    textDecoration: 'none',
    marginRight: theme.spacing(3)
  }))

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
      toggleEditUserDrawer();
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
            {/* <Link href={`/apps/user/admin/view/${id}`} passHref>
              <MenuItemLink>
                <EyeOutline fontSize='small' sx={{ mr: 2 }} />
                View
              </MenuItemLink>
            </Link> */}
          </MenuItem>
          <MenuItem onClick={handleEdit}>
            <PencilOutline fontSize='small' sx={{mr: 2}}/>
            Edit
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
      minWidth: 170,
      field: 'cupon',
      headerName: 'Coupon',
      renderCell: ({row}) => {
        const {id, name} = row


        const handleEdit = () => {
          setEditId(id);
          setEditRow(row);
          toggleEditUserDrawer();
        }


        return (
          <Box onClick={handleEdit} sx={{display: 'flex', alignItems: 'center'}}>
            <Box sx={{display: 'flex', alignItems: 'flex-start', flexDirection: 'column'}}>
              <Typography
                onClick={handleEdit}
                noWrap
                component='a'
                variant='subtitle2'
                sx={{color: 'text.primary', textDecoration: 'none'}}
              >
                {name}
              </Typography>
              <Typography onClick={handleEdit} noWrap component='a' variant='caption' sx={{textDecoration: 'none'}}>
                @{threeDotForDescription(id, 10)}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      sortable: false,
      flex: 0.2,
      minWidth: 200,
      field: 'start',
      headerName: 'Start',
      renderCell: ({row}) => {
        return (
          <Typography noWrap variant='body2'>
            {row.start}
          </Typography>
        )
      }
    },
    {
      sortable: false,
      flex: 0.2,
      minWidth: 200,
      field: 'end',
      headerName: 'End',
      renderCell: ({row}) => {
        return (
          <Typography noWrap variant='body2'>
            {row.end}
          </Typography>
        )
      }
    },
    {
      sortable: false,
      flex: 0.1,
      minWidth: 110,
      field: 'discount',
      headerName: 'Discount',
      renderCell: ({row}) => {
        return (
          <Typography noWrap variant='body2'>
            {row.discount}
          </Typography>
        )
      }
    },

    {
      sortable: false,
      flex: 0.1,
      minWidth: 110,
      field: 'validity',
      headerName: 'Validity',
      renderCell: ({row}) => {
        let validityStatus;
        if (row.isExpired == true) {
          validityStatus = 'Active'
        } else {
          validityStatus = 'Expired'
        }
        return (
          <CustomChip
            skin='light'
            size='small'
            label={validityStatus}
            color={userStatusObj[validityStatus]}
            sx={{textTransform: 'capitalize', '& .MuiChip-label': {lineHeight: '18px'}}}
          />
        )
      }
    },
    {
      sortable: false,
      flex: 0.2,
      minWidth: 200,
      field: 'createdAt',
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
      minWidth: 200,
      field: 'UpdatedAt',
      headerName: 'Update At',
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
      minWidth: 110,
      field: 'status',
      headerName: 'Coupon Status',
      renderCell: ({row}) => {
        let couponStatus;
        if (row.isVisible == true) {
          couponStatus = 'Active'
        } else {
          couponStatus = 'Inactive'
        }
        return (
          <CustomChip
            skin='light'
            size='small'
            label={couponStatus}
            color={userStatusObj[couponStatus]}
            sx={{textTransform: 'capitalize', '& .MuiChip-label': {lineHeight: '18px'}}}
          />
        )
      }
    },

    {
      flex: 0.1,
      minWidth: 90,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({row}) => <RowOptions id={row.id} row={row}/>
    }
  ]


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


  const [dates, setDates] = useState([])
  const [endDateRange, setEndDateRange] = useState(null)
  const [startDateRange, setStartDateRange] = useState(null)

  const [endDateRangetosend, setEndDateRangetosend] = useState(null)
  const [startDateRangetosend, setStartDateRangetosend] = useState(null)

  const handleOnChangeRange = dates => {
    const [start, end] = dates
    if (start !== null && end !== null) {
      setDates(dates)
    }
    setStartDateRange(start)
    if (start == null) {
      setStartDateRangetosend(null)
    } else {
      setStartDateRangetosend(new Date(start).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }))
    }
    if (end == null) {
      setEndDateRangetosend(null)
    } else {
      setEndDateRangetosend(new Date(end).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }))
    }

    setEndDateRange(end)
  }


  const [date, setDate] = useState('')
  const [datetosend, Setdatetosend] = useState('')
  const handleOnchangeDate = (e) => {
    setDate(e)
    if (e == null) {
      Setdatetosend(null)
    } else {
      Setdatetosend(new Date(e).toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit',}))
    }
  }


  const [editId, setEditId] = useState(null);
  const [editRow, setEditRow] = useState(null);
  // ** State
  const [name, setName] = useState('')

  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [status, setStatus] = useState('')
  const [value, setValue] = useState('')

  const [pageSize, setPageSize] = useState(10)
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [editUserOpen, setEditUserOpen] = useState(false)

  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.cupon)
  useEffect(() => {
    dispatch(
      fetchCupons({
        status,
        name: value,
        start: startDateRangetosend,
        end: endDateRangetosend,
        date: datetosend
      })
    )
  }, [dispatch, name, role, status, value, startDateRangetosend, endDateRangetosend, datetosend, editUserOpen, addUserOpen])

  const handleFilter = useCallback(val => {
    setValue(val)
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


  const CustomInputDate = forwardRef(({...props}, ref) => {
    return <TextField inputRef={ref} {...props} sx={{width: '100%'}}/>
  })


  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Search Filters' sx={{pb: 4, '& .MuiCardHeader-title': {letterSpacing: '.15px'}}}/>
          <CardContent>
            <Grid container spacing={6}>
              <Grid item sm={4} xs={12}>

                <DatePickerWrapper>
                  <DatePicker
                    isClearable
                    selectsRange
                    monthsShown={2}
                    endDate={endDateRange}
                    selected={startDateRange}
                    startDate={startDateRange}
                    shouldCloseOnSelect={false}
                    id='date-range-picker-months'
                    onChange={handleOnChangeRange}
                    customInput={
                      <CustomInput
                        dates={dates}
                        setDates={setDates}
                        label='Coupon Date Range'
                        end={endDateRange}
                        start={startDateRange}
                      />
                    }
                  />
                </DatePickerWrapper>

              </Grid>


              <Grid item sm={4} xs={12}>
                <DatePickerWrapper>
                  <DatePicker
                    dateFormat={'dd/MM/yyyy'}

                    autoComplete='off'
                    selected={date}
                    showYearDropdown
                    showMonthDropdown
                    onChange={e => handleOnchangeDate(e)}
                    placeholderText='DD/MM/YYYY'
                    customInput={
                      <CustomInputDate
                        value={date}
                        label='Start'
                      />
                    }
                  />
                </DatePickerWrapper>
              </Grid>


              {/* <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='status-select'>Select Status</InputLabel>
                  <Select
                    fullWidth
                    value={status}
                    id='select-status'
                    label='Select Status'
                    labelId='status-select'
                    onChange={handleStatusChange}
                    inputProps={{ placeholder: 'Select Status' }}
                  >
                    <MenuItem value=''>Select Status</MenuItem>
                    <MenuItem value='active'>Active</MenuItem>
                    <MenuItem value='inactive'>Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid> */}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer}/>
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

      <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer}/>
      <EditAdminDrawer open={editUserOpen} toggle={toggleEditUserDrawer} editId={editId} setEditId={setEditId}
                       editRow={editRow} setEditRow={setEditRow}/>
    </Grid>
  )
}
// UserList.acl = {
//   action: 'read',
//   subject: 'admin-list'
// }
// UserList.guestGuard = true
export default UserList
