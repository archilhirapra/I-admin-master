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
import {fetchData, deleteUser} from 'src/store/apps/services/categories'

// ** Custom Components Imports

import TableHeader from 'src/views/apps/user/rider/view/RidesTabTableHeader'


// const LiveTracking = dynamic(() => import("src/views/apps/rides/live-view-dialog/RidesLiveViewDialog"), {
//   ssr: false
// });


const RiderRidesListTab = () => {


  // ** Vars
  const userRoleObj = {
    admin: <Laptop sx={{mr: 2, color: 'error.main'}}/>,
    author: <CogOutline sx={{mr: 2, color: 'warning.main'}}/>,
    editor: <PencilOutline sx={{mr: 2, color: 'info.main'}}/>,
    maintainer: <ChartDonut sx={{mr: 2, color: 'success.main'}}/>,
    subscriber: <AccountOutline sx={{mr: 2, color: 'primary.main'}}/>
  }

  const userIsVisibleObj = {
    true: 'success',
    false: 'warning',
    undefined: 'secondary',
  }

  const rideTypeObj = {
    Pickup: 'warning',
    Delivery: 'success',
    Return: 'error',

  }
  const ridesSDPObj = {
    true: 'success',
    false: 'error',

  }

  const ridesGeneratedByObj = {
    Machine: 'primary',
    User: 'secondary',

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
      flex: 0.2,
      minWidth: 110,
      field: 'name',
      headerName: 'Ride Id',
      renderCell: ({row}) => {
        const {id, fullName, name} = row

        return (
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            {/* {renderClient(row)} */}
            <Box sx={{display: 'flex', alignItems: 'flex-start', flexDirection: 'column'}}>
              <Link href={`/apps/rides/view/${id}`} passHref>
                <Typography
                  noWrap
                  component='a'
                  variant='subtitle2'
                  sx={{color: 'text.primary', textDecoration: 'none'}}
                >
                  {name}
                </Typography>
              </Link>
              <Link href={`/apps/rides/view/${id}`} passHref>
                <Typography noWrap component='a' variant='caption' sx={{textDecoration: 'none'}}>
                  @{threeDotForId(name, id)}
                </Typography>
              </Link>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 110,
      field: 'ride_type',
      headerName: 'Ride Type',
      renderCell: ({row}) => {
        return (
          <CustomChip
            skin='light'
            size='small'
            label={row.description}
            color={rideTypeObj[row.description]}
            sx={{textTransform: 'capitalize', '& .MuiChip-label': {lineHeight: '18px'}}}
          />
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 110,
      field: 's_d_p',
      headerName: 'S D Pickup',
      renderCell: ({row}) => {
        return (
          <CustomChip
            skin='light'
            size='small'
            label={row.isSubscription ? ('Yes') : ('No')}
            color={ridesSDPObj[row.isSubscription]}
            sx={{textTransform: 'capitalize', '& .MuiChip-label': {lineHeight: '18px'}}}
          />


        )
      }
    },
    {
      flex: 0.1,
      minWidth: 110,
      field: 's_allowed',
      headerName: 'S D Delivery',
      renderCell: ({row}) => {
        return (
          <CustomChip
            skin='light'
            size='small'
            label={row.isSubscription ? ('Yes') : ('No')}
            color={ridesSDPObj[row.isSubscription]}
            sx={{textTransform: 'capitalize', '& .MuiChip-label': {lineHeight: '18px'}}}
          />


        )
      }
    },
    {
      flex: 0.1,
      minWidth: 110,
      field: 'generated_by',
      headerName: 'Generated By',
      renderCell: ({row}) => {
        return (
          <CustomChip
            skin='light'
            size='small'
            label={row.description}

            color={ridesGeneratedByObj[row.description]}
            sx={{textTransform: 'capitalize', '& .MuiChip-label': {lineHeight: '18px'}}}
          />
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 220,
      field: 'description1',
      headerName: 'Generated At',
      renderCell: ({row}) => {
        return (
          <Typography noWrap variant='body2'>
            {row.description}
          </Typography>
        )
      }
    },


    {
      flex: 0.1,
      minWidth: 110,
      field: 'visibility',
      headerName: 'Ride Status',
      renderCell: ({row}) => {
        return (
          <CustomChip
            skin='light'
            size='small'
            label={row.isVisible ? ('active') : ('inactive')}
            color={userIsVisibleObj[row.isVisible]}
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

  const [value, setValue] = useState('')
  const [isSubscription, setIsSubscription] = useState('')
  const [isVisible, setIsVisible] = useState('')

  const [pageSize, setPageSize] = useState(10)
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [liveViewDialog, setLiveViewDialogOpen] = useState(false)
  const [editUserOpen, setEditUserOpen] = useState(false)

  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.serviceCategory)
  useEffect(() => {
    dispatch(
      fetchData({
        isSubscription,
        isVisible,
        name: value,

      })
    )
  }, [dispatch, name, isSubscription, isVisible, value])

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  const handleIsSubscriptionChange = useCallback(e => {
    setIsSubscription(e.target.value)
  }, [])
  const handleIsVisibleChange = useCallback(e => {
    setIsVisible(e.target.value)
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
  // const toggleLiveViewDialog = () => setLiveViewDialogOpen(!liveViewDialog)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Search Filters' sx={{pb: 4, '& .MuiCardHeader-title': {letterSpacing: '.15px'}}}/>
          <CardContent>
            <Grid container spacing={6}>
              <Grid item sm={3} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='sub_allowed'>Ride Type</InputLabel>
                  <Select
                    fullWidth
                    value={isSubscription}
                    id='ride_tyepe'
                    label='Ride Type'
                    labelId='ride_type'
                    onChange={handleIsSubscriptionChange}
                    inputProps={{placeholder: 'Ride Type'}}
                  >
                    <MenuItem value=''>Null</MenuItem>
                    <MenuItem value='pickup'>Pickup</MenuItem>
                    <MenuItem value='delivery'>Delivery</MenuItem>
                    <MenuItem value='return'>Return</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item sm={2} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='s_d_pickup'>S D Pickup</InputLabel>
                  <Select
                    fullWidth
                    value={isVisible}
                    id='s_d_pickup'
                    label='S D Pickup'
                    labelId='s_d_pickup'
                    onChange={handleIsVisibleChange}
                    inputProps={{placeholder: 'S D Pickup'}}
                  >
                    <MenuItem value=''>Select status</MenuItem>
                    <MenuItem value='yes'>Yes</MenuItem>
                    <MenuItem value='no'>No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={2} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='s_d_delivery'>S D Delivery</InputLabel>
                  <Select
                    fullWidth
                    value={isVisible}
                    id='s_d_delivery'
                    label='S D Delivery'
                    labelId='s_d_delivery'
                    onChange={handleIsVisibleChange}
                    inputProps={{placeholder: 'S D Delivery'}}
                  >
                    <MenuItem value=''>Select status</MenuItem>
                    <MenuItem value='yes'>Yes</MenuItem>
                    <MenuItem value='no'>No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={3} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='status-select'>Generated By</InputLabel>
                  <Select
                    fullWidth
                    value={isVisible}
                    id='generated_by'
                    label='Generated By'
                    labelId='generated_by'
                    onChange={handleIsVisibleChange}
                    inputProps={{placeholder: 'Generated By'}}
                  >
                    <MenuItem value=''>Select One</MenuItem>
                    <MenuItem value='machine'>Machine</MenuItem>
                    <MenuItem value='user'>User</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={2} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='ride_tatus'>Ride Status</InputLabel>
                  <Select
                    fullWidth
                    value={isVisible}
                    id='ride_tatus'
                    label='Ride Status'
                    labelId='ride_tatus'
                    onChange={handleIsVisibleChange}
                    inputProps={{placeholder: 'Ride Status'}}
                  >
                    <MenuItem value=''>Select status</MenuItem>
                    <MenuItem value='active'>Active</MenuItem>
                    <MenuItem value='inactive'>Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <TableHeader value={value} handleFilter={handleFilter}/>
          <DataGrid
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
    </Grid>
  )
}
// UserList.acl = {
//   action: 'read',
//   subject: 'admin-list'
// }
// UserList.guestGuard = true
export default RiderRidesListTab
