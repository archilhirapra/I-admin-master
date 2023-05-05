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
import {fetchRiderList} from 'src/store/apps/rider'

// ** Custom Components Imports
import TableHeader from 'src/views/apps/user/rider/list/TableHeader'
// import AddUserDrawer from 'src/views/apps/user/rider/list/AddUserDrawer'
import AddRiderDrawer from 'src/views/apps/user/rider/list/AddUserDrawer'
import EditRiderDrawer from 'src/views/apps/user/rider/list/EditUserDrawer'
import {useContext} from 'react'
import {AbilityContext} from 'src/layouts/components/acl/Can'

const LiveTracking = dynamic(() => import("src/views/apps/user/rider/live-view-dialog/RidesLiveViewDialog"), {
  ssr: false
});

const UserList = () => {

  // ** Vars
  const userRoleObj = {
    admin: <Laptop sx={{mr: 2, color: 'error.main'}}/>,
    author: <CogOutline sx={{mr: 2, color: 'warning.main'}}/>,
    editor: <PencilOutline sx={{mr: 2, color: 'info.main'}}/>,
    maintainer: <ChartDonut sx={{mr: 2, color: 'success.main'}}/>,
    subscriber: <AccountOutline sx={{mr: 2, color: 'primary.main'}}/>
  }


  const userStatusObj = {
    Active: 'success',
    Leave: 'warning',
    Inactive: 'error',
    Suspended: 'error'
  }

  const jobStatusObj = {
    Online: 'success',
    Offline: 'error',

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
    if (row?.image?.length) {
      return (
        <AvatarWithImageLink href={`/apps/user/rider/view/${row.id}`}>
          <CustomAvatar src={row.image} sx={{mr: 3, width: 34, height: 34}}/>
        </AvatarWithImageLink>
      )
    } else {
      return (
        <AvatarWithoutImageLink href={`/apps/user/rider/view/${row.id}`}>
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

    const handleDelete = () => {
      dispatch(deleteUser(id))
      handleRowOptionsClose()
    }


    const handleEdit = () => {

      setEditId(id);
      setEditRow(row);
      toggleEditUserDrawer();
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
            <Link href={`/apps/user/rider/view/${id}`} passHref>
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

        </Menu>
      </>
    )
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
      headerName: 'Rider',
      renderCell: ({row}) => {
        const {id, name, username} = row
        return (
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            {renderClient(row)}
            <Box sx={{display: 'flex', alignItems: 'flex-start', flexDirection: 'column'}}>
              <Link href={`/apps/user/rider/view/${id}`} passHref>
                <Typography
                  noWrap
                  component='a'
                  variant='subtitle2'
                  sx={{color: 'text.primary', textDecoration: 'none'}}
                >
                  {name}
                </Typography>
              </Link>
              <Link href={`/apps/user/rider/view/${id}`} passHref>
                <Typography noWrap component='a' variant='caption' sx={{textDecoration: 'none'}}>
                  @{username}
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
      minWidth: 250,
      field: 'email',
      headerName: 'Mobile No.',
      renderCell: ({row}) => {
        return (
          <Typography noWrap variant='body2'>
            {row.countryCode} {formatPhoneNumber(row.mobileNo)}
          </Typography>
        )
      }
    },
    {
      sortable: false,
      flex: 0.1,
      minWidth: 110,
      field: 'job_status',
      headerName: 'Job Status',
      renderCell: ({row}) => {

        let jstatus = ''
        if (row.jobStatus == true) {
          jstatus = 'Online'
        } else {
          jstatus = 'Offline'
        }


        return (
          <CustomChip
            skin='light'
            size='small'
            label={jstatus}
            color={jobStatusObj[jstatus]}
            sx={{textTransform: 'capitalize', '& .MuiChip-label': {lineHeight: '18px'}}}
          />
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
      headerName: 'Account Status',
      renderCell: ({row}) => {

        var accountStatus;
        if (row.activeStatus == 0) {
          accountStatus = 'Active'
        } else if (row.activeStatus == 1) {
          accountStatus = 'Leave'
        } else if (row.activeStatus == 2) {
          accountStatus = 'Inactive'
        } else if (row.activeStatus == 3) {
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


  // ** State
  const [name, setName] = useState('')


  const [value, setValue] = useState('')
  const [activeStatus, setActiveStatus] = useState('')
  const [jobStatus, setJobStatus] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [editUserOpen, setEditUserOpen] = useState(false)


  const [editId, setEditId] = useState(null);
  const [editRow, setEditRow] = useState(null);

  // ** Hooks
  const ability = useContext(AbilityContext)

  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.rider)
  useEffect(() => {
    dispatch(
      fetchRiderList({

        activeStatus,
        jobStatus,
        name: value,
      })
    )
  }, [dispatch, name, activeStatus, jobStatus, value, addUserOpen, editUserOpen, liveViewDialog])

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])


  const handleActiveStatusChange = useCallback(e => {
    setActiveStatus(e.target.value)
  }, [])
  const handleJobStatusChange = useCallback(e => {
    setJobStatus(e.target.value)
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


  const [liveViewDialog, setLiveViewDialogOpen] = useState(false)
  const toggleLiveViewDialog = () => setLiveViewDialogOpen(!liveViewDialog)
  return (
    <>

      <>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <CardHeader title='Search Filters' sx={{pb: 4, '& .MuiCardHeader-title': {letterSpacing: '.15px'}}}/>
              <CardContent>
                <Grid container spacing={6}>
                  <Grid item sm={4} xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id='active_status'>Select Account Status</InputLabel>
                      <Select
                        fullWidth
                        value={activeStatus}
                        id='active_status'
                        label='Select Account Status'
                        labelId='active_status'
                        onChange={handleActiveStatusChange}
                        inputProps={{placeholder: 'Select Account Status'}}
                      >
                        <MenuItem value=''>Select Account Status</MenuItem>
                        <MenuItem value='0'>Active</MenuItem>
                        <MenuItem value='1'>Leave</MenuItem>
                        <MenuItem value='2'>Inactive</MenuItem>
                        <MenuItem value='3'>Suspended</MenuItem>

                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item sm={4} xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id='jobStatus'>Select Job Status</InputLabel>
                      <Select
                        fullWidth
                        value={jobStatus}
                        id='jobStatus'
                        label='Select Job Status'
                        labelId='jobSelect'
                        onChange={handleJobStatusChange}
                        inputProps={{placeholder: 'Select Job Status'}}
                      >
                        <MenuItem value=''>Select Job Status</MenuItem>
                        <MenuItem value='true'>Online</MenuItem>
                        <MenuItem value='false'>Offline</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer}
                           toggleLiveView={toggleLiveViewDialog}/>
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

          <AddRiderDrawer open={addUserOpen} toggle={toggleAddUserDrawer}/>
          <EditRiderDrawer open={editUserOpen} toggle={toggleEditUserDrawer} editId={editId} setEditId={setEditId}
                           editRow={editRow} setEditRow={setEditRow}/>

          <LiveTracking open={liveViewDialog} toggle={toggleLiveViewDialog}/>
        </Grid>
      </>

    </>
  )
}
UserList.acl = {
  action: 'manage',
  subject: 'rider-list'
}
export default UserList
