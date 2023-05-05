// ** React Imports
import {useState, useEffect, useCallback} from 'react'

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
import {fetchCustomerList} from 'src/store/apps/customer'
// import { fetchData, deleteUser } from 'src/store/apps/services/categories'


// ** Custom Components Imports
import TableHeader from 'src/views/apps/user/customer/list/TableHeader'
import AddUserDrawer from 'src/views/apps/user/customer/list/AddUserDrawer'
import EditAdminDrawer from 'src/views/apps/user/customer/list/EditUserDrawer'

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
    Suspended: 'error',

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

  // ** renders client column
  const renderClient = row => {
    if (row?.icon?.length) {
      return (
        <Link href={`/apps/user/customer/view/${row.id}`} passHref>
          <AvatarWithImageLink href={`/apps/user/customer/view/${row.id}`}>
            <CustomAvatar src={row.icon} sx={{mr: 3, width: 34, height: 34}}/>
          </AvatarWithImageLink>
        </Link>
      )
    } else {
      return (
        <Link href={`/apps/user/customer/view/${row.id}`} passHref>
          <AvatarWithoutImageLink href={`/apps/user/customer/view/${row.id}`}>
            <CustomAvatar
              skin='light'
              color={'primary'}
              sx={{mr: 3, width: 34, height: 34, fontSize: '1rem'}}
            >
              {getInitials(row.name ? row.name : 'N O')}
            </CustomAvatar>
          </AvatarWithoutImageLink>
        </Link>
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
          <MenuItem sx={{p: 0}}>
            <Link href={`/apps/user/customer/view/${id}`} passHref>
              <MenuItemLink>
                <EyeOutline fontSize='small' sx={{mr: 2}}/>
                View
              </MenuItemLink>
            </Link>
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


  const columns = [
    {
      sortable: false,
      flex: 0.2,
      minWidth: 230,
      field: 'name',
      headerName: 'Customer',
      renderCell: ({row}) => {
        const {id, name} = row

        return (
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            {renderClient(row)}
            <Box sx={{display: 'flex', alignItems: 'flex-start', flexDirection: 'column'}}>
              <Link href={`/apps/user/customer/view/${id}`} passHref>
                <Typography
                  noWrap
                  component='a'
                  variant='subtitle2'
                  sx={{color: 'text.primary', textDecoration: 'none'}}
                >
                  {name}
                </Typography>
              </Link>
              <Link href={`/apps/user/customer/view/${id}`} passHref>
                <Typography noWrap component='a' variant='caption' sx={{textDecoration: 'none'}}>
                  @{threeDotForDescription(id, 10)}
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
      flex: 0.2,
      minWidth: 230,
      field: 'email',
      headerName: 'Email / Phone',
      renderCell: ({row}) => {
        const {id, email, countryCode, mobileNo} = row

        return (
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Box sx={{display: 'flex', alignItems: 'flex-start', flexDirection: 'column'}}>
              <Link href={`/apps/user/customer/view/${id}`} passHref>
                <Typography
                  noWrap
                  component='a'
                  variant='subtitle2'
                  sx={{color: 'text.primary', textDecoration: 'none'}}
                >
                  {email}
                </Typography>
              </Link>
              <Link href={`/apps/user/customer/view/${id}`} passHref>
                <Typography noWrap component='a' variant='caption' sx={{textDecoration: 'none'}}>
                  {countryCode} {formatPhoneNumber(mobileNo)}
                </Typography>
              </Link>
            </Box>
          </Box>
        )
      }
    },
    {
      sortable: false,
      flex: 0.15,
      minWidth: 150,
      field: 'role',
      headerName: 'Role',
      renderCell: ({row}) => {
        return (
          <Typography noWrap sx={{color: 'text.secondary', textTransform: 'capitalize'}}>
            {row.role}
          </Typography>
        )
      }
    },

    {
      sortable: false,
      flex: 0.15,
      minWidth: 150,
      field: 'plan',
      headerName: 'Plan',
      renderCell: ({row}) => {
        return (
          <Typography noWrap sx={{color: 'text.secondary', textTransform: 'capitalize'}}>
            {row.currentPlan}
          </Typography>
        )
      }
    },

    {
      sortable: false,
      flex: 0.15,
      minWidth: 150,
      field: 'createAt',
      headerName: 'Created At',
      renderCell: ({row}) => {
        return (
          <Typography noWrap>
            {row?.createdAt}
          </Typography>
        )
      }
    },
    {
      sortable: false,
      flex: 0.15,
      minWidth: 150,
      field: 'updatedAt',
      headerName: 'Updated At',
      renderCell: ({row}) => {
        return (
          <Typography noWrap>
            {row?.updatedAt}
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
        let accountStatus;
        if (row.status == 0) {
          accountStatus = 'Active'
        } else {
          accountStatus = 'Suspended'
        }


        return (
          <CustomChip
            skin='light'
            size='small'
            label={accountStatus}
            color={userStatusObj[accountStatus]}
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
  const [plan, setPlan] = useState('')
  const [status, setStatus] = useState('')
  const [value, setValue] = useState('')

  const [pageSize, setPageSize] = useState(10)
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [editUserOpen, setEditUserOpen] = useState(false)

  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.customer)
  useEffect(() => {
    dispatch(
      fetchCustomerList({

        status,
        name: value,

      })
    )
  }, [dispatch, name, status, value, addUserOpen, editUserOpen])

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])
  const handleRoleChange = useCallback(e => {
    setRole(e.target.value)
  }, [])
  const handleStatusChange = useCallback(e => {
    setStatus(e.target.value)
  }, [])
  const handlePlanChange = useCallback(e => {
    setPlan(e.target.value)
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
                  <InputLabel id='status'>Select Status</InputLabel>
                  <Select
                    fullWidth
                    value={status}
                    id='status'
                    label='Select Status'
                    labelId='select'
                    onChange={handleStatusChange}
                    inputProps={{placeholder: 'Select Status'}}
                  >
                    <MenuItem value=''>Select Status</MenuItem>
                    <MenuItem value='0'>Active</MenuItem>
                    <MenuItem value='1'>Suspended</MenuItem>
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
