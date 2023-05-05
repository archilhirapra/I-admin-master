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
import {getInitials} from 'src/@core/utils/get-initials'

// ** Actions Imports
// import { fetchData, deleteUser } from 'src/store/apps/user'
// import { fetchData, deleteUser } from 'src/store/apps/admin'
import {fetchData, deleteUser} from 'src/store/apps/services/categories'

// ** Custom Components Imports
import TableHeader from 'src/views/apps/services/categories/list/TableHeader'
import AddUserDrawer from 'src/views/apps/services/categories/list/AddUserDrawer'
import EditUserDrawer from 'src/views/apps/services/categories/list/EditUserDrawer'


const ServiceCategoriesList = () => {


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
        <CustomAvatar src={row.icon} sx={{mr: 3, width: 34, height: 34}}/>
      )
    } else {
      return (
        <CustomAvatar
          skin='light'
          color={'primary'}
          sx={{mr: 3, width: 34, height: 34, fontSize: '1rem'}}
        >
          {getInitials(row.name ? row.name : 'N O')}
        </CustomAvatar>
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
      minWidth: 230,
      field: 'name',
      headerName: 'Category Name',
      renderCell: ({row}) => {
        const {id, fullName, name} = row


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
                noWrap
                component='a'
                variant='subtitle2'
                sx={{color: 'text.primary', textDecoration: 'none'}}
              >
                {name}
              </Typography>

              <Typography noWrap component='a' variant='caption' sx={{textDecoration: 'none'}}>
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
      minWidth: 250,
      field: 'description',
      headerName: 'Description',
      renderCell: ({row}) => {
        return (
          <Typography noWrap variant='body2'>
            {row.description}
          </Typography>
        )
      }
    },


    {
      sortable: false,
      flex: 0.2,
      minWidth: 110,
      field: 's_allowed',
      headerName: 'Subscription Allowed',
      renderCell: ({row}) => {
        return (
          <CustomChip
            skin='light'
            size='small'
            label={row.isSubscription ? ('active') : ('inactive')}
            color={userIsVisibleObj[row.isSubscription]}
            sx={{textTransform: 'capitalize', '& .MuiChip-label': {lineHeight: '18px'}}}
          />
        )
      }
    },

    {
      sortable: false,
      flex: 0.15,
      field: 'created_at',
      minWidth: 150,
      headerName: 'Created At',
      renderCell: ({row}) => {
        return (

          <Tooltip
            title={
              <div>
                <Typography variant='caption' sx={{color: 'common.white', fontWeight: 600}}>
                  {row.createdAt}
                </Typography>
              </div>
            }
          >
            <Typography noWrap variant='body2'>
              {row.createdAt}
            </Typography>
          </Tooltip>


        )
      }
    },
    {
      sortable: false,
      flex: 0.15,
      field: 'updated_at',
      minWidth: 150,
      headerName: 'Updated At',
      renderCell: ({row}) => {
        return (

          <Tooltip
            title={
              <div>
                <Typography variant='caption' sx={{color: 'common.white', fontWeight: 600}}>
                  {row.createdAt}
                </Typography>
              </div>
            }
          >
            <Typography noWrap variant='body2'>
              {row.updatedAt}
            </Typography>
          </Tooltip>

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
  const [description, setDecription] = useState('')

  const [value, setValue] = useState('')
  const [isSubscription, setIsSubscription] = useState('')
  const [isVisible, setIsVisible] = useState('')

  const [pageSize, setPageSize] = useState(10)
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [editUserOpen, setEditUserOpen] = useState(false)

  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.serviceCategory)
  useEffect(() => {
    dispatch(
      fetchData({
        description,
        isSubscription,
        isVisible,
        name: value,

      })
    )
  }, [dispatch, name, description, isSubscription, isVisible, value, addUserOpen, editUserOpen])

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

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Search Filters' sx={{pb: 4, '& .MuiCardHeader-title': {letterSpacing: '.15px'}}}/>
          <CardContent>
            <Grid container spacing={6}>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='sub_allowed'>Subscription Allowed</InputLabel>
                  <Select
                    fullWidth
                    value={isSubscription}
                    id='s_allowed'
                    label='Subscription Allowed'
                    labelId='sub_allowed'
                    onChange={handleIsSubscriptionChange}
                    inputProps={{placeholder: 'Subscription Allowed'}}
                  >
                    <MenuItem value=''>Select status</MenuItem>
                    <MenuItem value='active'>Active</MenuItem>
                    <MenuItem value='inactive'>Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='status-select'>Is Visible</InputLabel>
                  <Select
                    fullWidth
                    value={isVisible}
                    id='select-status'
                    label='Is Visible'
                    labelId='status-select'
                    onChange={handleIsVisibleChange}
                    inputProps={{placeholder: 'Is Visible'}}
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
export default ServiceCategoriesList
