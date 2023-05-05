// ** React Imports
import {useState, useEffect, useCallback} from 'react'
import dynamic from "next/dynamic";

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
import Tooltip from '@mui/material/Tooltip';

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
import {getInitials} from 'src/@core/utils/get-initials'

// ** Actions Imports
// import { fetchData, deleteUser } from 'src/store/apps/user'
// import { fetchData, deleteUser } from 'src/store/apps/admin'
// import { fetchData, deleteUser } from 'src/store/apps/services/categories'
import {fetchRides} from 'src/store/apps/rides'

// ** Custom Components Imports
// import TableHeader from 'src/views/apps/services/categories/list/TableHeader'
import TableHeader from 'src/views/apps/rides/list/TableHeader'
import AddUserDrawer from 'src/views/apps/services/categories/list/AddUserDrawer'
import EditUserDrawer from 'src/views/apps/services/categories/list/EditUserDrawer'

// import RidesLiveViewDialog from 'src/views/apps/rides/live-view-dialog/RidesLiveViewDialog'

// const LiveTracking = dynamic(() => import("src/views/apps/rides/live-view-dialog/RidesLiveViewDialog"), {
//   ssr: false
// });


const ServiceCategoriesList = () => {


  // ** Vars
  const userRoleObj = {
    admin: <Laptop sx={{mr: 2, color: 'error.main'}}/>,
    author: <CogOutline sx={{mr: 2, color: 'warning.main'}}/>,
    editor: <PencilOutline sx={{mr: 2, color: 'info.main'}}/>,
    maintainer: <ChartDonut sx={{mr: 2, color: 'success.main'}}/>,
    subscriber: <AccountOutline sx={{mr: 2, color: 'primary.main'}}/>
  }

  const ridesPaymentStatus = {
    0: 'Unpaid',
    1: 'Paid',
  }
  const userIsVisibleObj = {
    true: 'success',
    false: 'warning',
    undefined: 'secondary',
    // null: 'secondary'
  }

  const rideTypeObj = {
    Pickup: 'warning',
    Delivery: 'success',
    Return: 'error',
    // undefined: 'secondary',
    // null: 'secondary'
  }
  const ridesSDPObj = {
    true: 'success',
    false: 'error',
    // Return: 'error',
    // undefined: 'secondary',
    // null: 'secondary'
  }

  const ridesGeneratedByObj = {
    Machine: 'primary',
    User: 'secondary',
    // undefined: 'secondary',
    // null: 'secondary'
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
    if (row.icon.length) {
      return (
        <AvatarWithImageLink href={`/apps/user/admin/view/${row.id}`}>
          <CustomAvatar src={row.icon} sx={{mr: 3, width: 34, height: 34}}/>
        </AvatarWithImageLink>
      )
    } else {
      return (
        <AvatarWithoutImageLink href={`/apps/user/admin/view/${row.id}`}>
          <CustomAvatar
            skin='light'
            color={'primary'}
            sx={{mr: 3, width: 34, height: 34, fontSize: '1rem'}}
          >
            {getInitials(row.name ? row.name : 'N O')}
          </CustomAvatar>
        </AvatarWithoutImageLink>
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

      // this.setEditId(id);
      // toggleAddUserDrawer()
      setEditId(id);
      setEditRow(row);
      toggleEditUserDrawer();
      console.log("Edit is Cliced id: ", id);
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
          {/* <MenuItem sx={{ p: 0 }}>
          <Link href={`/apps/user/admin/view/${id}`} passHref>
            <MenuItemLink>
              <EyeOutline fontSize='small' sx={{ mr: 2 }} />
              View
            </MenuItemLink>
          </Link>
        </MenuItem> */}
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
    // console.log('name',name.length)
    let length = (name.length) - 3
    return text.substring(0, length) + '...'
  }

  const threeDotForDescription = (text, length) => {
    // console.log('name',text)
    // let length = (name.length) - 3
    if (text != undefined) {
      console.log('name', text.substring(0, length))
      return text.substring(0, length) + '...'
    }

  }

  const columns = [
    {
      sortable: false,
      flex: 0.2,
      minWidth: 230,
      field: 'order_id',
      headerName: 'Order Id',
      renderCell: ({row}) => {
        const {orderId, id,} = row

        return (
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            {/* {renderClient(row)} */}
            <Box sx={{display: 'flex', alignItems: 'flex-start', flexDirection: 'column'}}>
              {/* <Link href={`/apps/rides/view/${id}`} passHref>
                <Typography
                  noWrap
                  component='a'
                  variant='subtitle2'
                  sx={{ color: 'text.primary', textDecoration: 'none' }}
                >
                  {name}
                </Typography>
              </Link> */}
              <Link href={`/apps/rides/view/${id}`} passHref>
                <Typography noWrap component='a' variant='caption' sx={{textDecoration: 'none'}}>
                  {/* @{threeDotForDescription(orderId, 10)} */}
                  @{orderId}
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
      field: 'customer',
      headerName: 'Customer',
      renderCell: ({row}) => {
        const {userId, name} = row

        return (
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            {/* {renderClient(row)} */}
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
                  {/* @{threeDotForDescription(userId, 10)} */}
                  @{userId}
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
      minWidth: 220,
      field: 'invoiceStatus',
      headerName: 'Invoice Status',
      renderCell: ({row}) => {
        return (
          <Typography noWrap variant='body2'>
            {row.invoiceStatus}
          </Typography>
        )
      }
    },
    {
      sortable: false,
      flex: 0.1,
      minWidth: 220,
      field: 'paymentStatus',
      headerName: 'Payment Status',
      renderCell: ({row}) => {
        return (
          <Typography noWrap variant='body2'>
            {ridesPaymentStatus[row.paymentStatus]}
          </Typography>
        )
      }
    },


    // {
    //   flex: 0.1,
    //   minWidth: 110,
    //   field: 'visibility',
    //   headerName: 'Ride Status',
    //   renderCell: ({ row }) => {
    //     return (
    //       <CustomChip
    //         skin='light'
    //         size='small'
    //         label={row.isVisible ? ('active') : ('inactive')}
    //         // label={row.isVisible}
    //         color={userIsVisibleObj[row.isVisible]}
    //         sx={{ textTransform: 'capitalize', '& .MuiChip-label': { lineHeight: '18px' } }}
    //       />
    //     )
    //   }
    // },
    // {
    //   flex: 0.1,
    //   minWidth: 90,
    //   sortable: false,
    //   field: 'actions',
    //   headerName: 'Actions',
    //   renderCell: ({ row }) => <RowOptions id={row.id} row={row} />
    // }
  ]


  const [editId, setEditId] = useState(null);
  const [editRow, setEditRow] = useState(null);
  // ** State
  const [name, setName] = useState('')

  const [value, setValue] = useState('')
  const [isSubscription, setIsSubscription] = useState('')
  const [isVisible, setIsVisible] = useState('')
  const [isPickup, setIsPickup] = useState('all')

  const [pageSize, setPageSize] = useState(10)
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [liveViewDialog, setLiveViewDialogOpen] = useState(false)
  const [editUserOpen, setEditUserOpen] = useState(false)

  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.ride)
  console.log(store)
  useEffect(() => {
    dispatch(
      fetchRides({
        isPickup,
        // isSubscription,
        // isVisible,
        // status,
        name: value,
        // q: value,
        // currentPlan: plan
      })
    )
  }, [dispatch, name, value, isPickup])

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])


  const handleIsPickupChange = useCallback(e => {
    setIsPickup(e.target.value)
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

  const toggleLiveViewDialog = () => setLiveViewDialogOpen(!liveViewDialog)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Search Filters' sx={{pb: 4, '& .MuiCardHeader-title': {letterSpacing: '.15px'}}}/>
          <CardContent>
            <Grid container spacing={6}>
              <Grid item sm={3} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='ride_type'>Ride Type</InputLabel>
                  <Select
                    fullWidth
                    value={isPickup}
                    id='ride_type'
                    label='Ride Type'
                    labelId='ride_type'
                    onChange={handleIsPickupChange}
                    inputProps={{placeholder: 'Ride Type'}}
                  >
                    <MenuItem value='all'>All</MenuItem>
                    <MenuItem value='false'>Delivery</MenuItem>
                    <MenuItem value='true'>Pickup</MenuItem>
                    {/* <MenuItem value='return'>Return</MenuItem> */}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <TableHeader value={value} handleFilter={handleFilter} toggle={toggleLiveViewDialog}/>
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

      {/* <LiveTracking open={liveViewDialog} toggle={toggleLiveViewDialog} /> */}
      {/* <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />
      <EditUserDrawer open={editUserOpen} toggle={toggleEditUserDrawer} editId={editId} setEditId={setEditId} editRow={editRow} setEditRow={setEditRow} /> */}
    </Grid>
  )
}
// UserList.acl = {
//   action: 'read',
//   subject: 'admin-list'
// }
// UserList.guestGuard = true
export default ServiceCategoriesList
