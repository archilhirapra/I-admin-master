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
import {fetchPlans} from 'src/store/apps/plans'

import format from 'date-fns/format'
import DatePicker from 'react-datepicker'
// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'


// ** Custom Components Imports
import TableHeader from 'src/views/apps/plans/list/TableHeader'
import AddUserDrawer from 'src/views/apps/plans/list/AddUserDrawer'
import EditUserDrawer from 'src/views/apps/plans/list/EditUserDrawer'

const PackagesList = () => {


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
    true: 'success',
    false: 'error'
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
        <AvatarWithImageLink href={""}>
          <CustomAvatar src={row.icon} sx={{mr: 3, width: 34, height: 34}}/>
        </AvatarWithImageLink>
      )
    } else {
      return (
        <AvatarWithImageLink href={""}>
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
      minWidth: 230,
      field: 'name',
      headerName: 'Plan Name',
      renderCell: ({row}) => {
        const {id, name} = row

        const handleEdit = () => {
          setEditId(id);
          setEditRow(row);
          toggleEditUserDrawer();
        }

        return (
          <Box onClick={handleEdit} sx={{display: 'flex', alignItems: 'center'}}>
            {renderClient(row)}
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
      flex: 0.1,
      minWidth: 130,
      field: 'total_pickup',
      headerName: 'Total Pickup',
      renderCell: ({row}) => {
        return (
          <Typography noWrap variant='body2'>
            {row.pickup}
          </Typography>
        )
      }
    },
    {
      sortable: false,
      flex: 0.1,
      minWidth: 130,
      field: 'total_delivery',
      headerName: 'Total Delivery',
      renderCell: ({row}) => {
        return (
          <Typography noWrap variant='body2'>
            {row.delivery}
          </Typography>
        )
      }
    },
    {
      sortable: false,
      flex: 0.1,
      minWidth: 130,
      field: 'monthly_price',
      headerName: 'Monthly Price',
      renderCell: ({row}) => {
        return (
          <Typography noWrap variant='body2'>
            ${row.month}
          </Typography>
        )
      }
    },
    {
      sortable: false,
      flex: 0.1,
      minWidth: 130,
      field: 'quarterly_price',
      headerName: 'Quarterly Price',
      renderCell: ({row}) => {
        return (
          <Typography noWrap variant='body2'>
            ${row.quarterly}
          </Typography>
        )
      }
    },
    {
      sortable: false,
      flex: 0.1,
      minWidth: 130,
      field: 'yearly_price',
      headerName: 'Yearly Price',
      renderCell: ({row}) => {
        return (
          <Typography noWrap variant='body2'>
            ${row.year}
          </Typography>
        )
      }
    },
    {
      sortable: false,
      flex: 0.2,
      minWidth: 130,
      field: 'tag',
      headerName: 'Tag',
      renderCell: ({row}) => {
        return (
          <Typography noWrap variant='body2'>
            {row.tag}
          </Typography>
        )
      }
    },
    {
      sortable: false,
      flex: 0.2,
      minWidth: 230,
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
      minWidth: 230,
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
      minWidth: 110,
      field: 'status',
      headerName: 'Status',
      renderCell: ({row}) => {
        return (
          <CustomChip
            skin='light'
            size='small'
            label={row?.isVisible ? ('Active') : ('Inactive')}
            color={userStatusObj[row?.isVisible]}
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
  const store = useSelector(state => state.plan)
  useEffect(() => {
    dispatch(
      fetchPlans({
        isVisible: status,
        name: value,
      })
    )
  }, [dispatch, name, status, value, editUserOpen, addUserOpen])

  const handleFilter = useCallback(val => {
    setValue(val)
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
                  <InputLabel id='select'>Status</InputLabel>
                  <Select
                    fullWidth
                    value={status}
                    id='status'
                    label='Status'
                    labelId='select'
                    onChange={handleStatusChange}
                    inputProps={{placeholder: 'Status'}}
                  >
                    <MenuItem value=''>Select Status</MenuItem>
                    <MenuItem value='true'>Active</MenuItem>
                    <MenuItem value='false'>Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
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
      <EditUserDrawer open={editUserOpen} toggle={toggleEditUserDrawer} editId={editId} setEditId={setEditId}
                      editRow={editRow} setEditRow={setEditRow}/>
    </Grid>
  )
}
// UserList.acl = {
//   action: 'read',
//   subject: 'admin-list'
// }
// UserList.guestGuard = true
export default PackagesList
