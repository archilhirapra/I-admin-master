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
import {getInitials} from 'src/@core/utils/get-initials'

// ** Actions Imports
// import { fetchData, deleteUser } from 'src/store/apps/user'
// import { fetchData, deleteUser } from 'src/store/apps/admin'
import {fetchData, deleteUser} from 'src/store/apps/services/categories'
import {fetchItems} from 'src/store/apps/services/items'

// ** Custom Components Imports
import TableHeader from 'src/views/apps/services/item/list/TableHeader'
import AddUserDrawer from 'src/views/apps/services/item/list/AddUserDrawer'
import EditUserDrawer from 'src/views/apps/services/item/list/ItemEditDrawer'
import ItemAddDialog from 'src/views/apps/services/item/list/ItemAddDialog'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

const ServiceCategoriesList = () => {

  const unit_types = [
    {title: 'BAGS'},
    {title: 'BALE'},
    {title: 'BUNDLES'},
    {title: 'BUCKLES'},
    {title: 'BILLIONS OF UNITS'},
    {title: 'BOX'},
    {title: 'BOTTLES'},
    {title: 'BUNCHES'},
    {title: 'CANS'},
    {title: 'CUBIC METER'},
    {title: 'CUBIC CENTIMETER'},
    {title: 'CENTIMETER'},
    {title: 'CARTONS'},
    {title: 'DOZEN'},
    {title: 'DRUM'},
    {title: 'GREAT GROSS'},
    {title: 'GRAMS'},
    {title: 'GROSS'},
    {title: 'GROSS YARDS'},
    {title: 'KILOGRAMS'},
    {title: 'KILOLITER'},
    {title: 'KILOMETRE'},
    {title: 'MILLILITRE'},
    {title: 'METERS'},
    {title: 'NUMBERS'},
    {title: 'PACKS'},
    {title: 'PIECES'},
    {title: 'PAIRS'},
    {title: 'QUINTAL'},
    {title: 'ROLLS'},
    {title: 'SETS'},
    {title: 'SQUARE FEET'},
    {title: 'SQUARE METERS'},
    {title: 'SQUARE YARDS'},
    {title: 'TABLETS'},
    {title: 'TEN GROSS'},
    {title: 'THOUSANDS'},
    {title: 'TONNES'},
    {title: 'TUBES'},
    {title: 'US GALLONS'},
    {title: 'UNITS'},
    {title: 'YARDS'},
    {title: 'OTHERS'},
  ]


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
  const userIsBagObj = {
    true: 'warning',
    false: 'success',

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
        <AvatarWithImageLink href={""}>
          <CustomAvatar src={row.icon} sx={{mr: 3, width: 34, height: 34}}/>
        </AvatarWithImageLink>
      )
    } else {
      return (
        <AvatarWithoutImageLink href={""}>
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


  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedUnitType, setSelectedUnitType] = useState(null);

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


      let a = categoryStore.data.find(obj => {
        return obj.id === row?.categoryId;
      })
      setSelectedCategory(a)

      let b = unit_types.find(obj => {
        return obj.title === row?.unitType;
      })
      setSelectedUnitType(b)


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
      headerName: 'Item Name',
      renderCell: ({row}) => {
        const {id, fullName, name} = row

        const handleEdit = () => {


          setEditId(id);
          setEditRow(row);
          let a = categoryStore.data.find(obj => {
            return obj.id === row?.categoryId;
          })
          setSelectedCategory(a)

          let b = unit_types.find(obj => {
            return obj.title === row?.unitType;
          })
          setSelectedUnitType(b)
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
      minWidth: 110,
      field: 's_allowed',
      headerName: 'Item Type',
      renderCell: ({row}) => {
        return (
          <CustomChip
            skin='light'
            size='small'
            label={row.isBag ? ('Subscription') : ('Regular')}
            color={userIsBagObj[row.isBag]}
            sx={{textTransform: 'capitalize', '& .MuiChip-label': {lineHeight: '18px'}}}
          />
        )
      }
    },
    {
      sortable: false,
      flex: 0.1,
      minWidth: 230,
      field: 'c_name',
      headerName: 'Item Category',
      renderCell: ({row}) => {
        const {id, fullName, name} = row

        return (
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Box sx={{display: 'flex', alignItems: 'flex-start', flexDirection: 'column'}}>
              <Typography
                noWrap
                component='a'
                variant='subtitle2'
                sx={{color: 'text.primary', textDecoration: 'none'}}
              >
                {row.categoryName}
              </Typography>

              <Typography noWrap component='a' variant='caption' sx={{textDecoration: 'none'}}>
                @{threeDotForDescription(row.categoryId, 10)}
              </Typography>
            </Box>
          </Box>
        )
      }
    },


    {
      sortable: false,
      flex: 0.1,
      minWidth: 110,
      field: 'unit',
      headerName: 'Unit',
      renderCell: ({row}) => {
        return (
          <Typography noWrap variant='body2'>
            {row.unitType}
          </Typography>
        )
      }
    },
    {
      sortable: false,
      flex: 0.1,
      minWidth: 110,
      field: 'final_price',
      headerName: 'Final Price',
      renderCell: ({row}) => {
        return (
          <Typography noWrap variant='body2'>
            {row.price}
          </Typography>
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
          <Typography noWrap variant='body2'>
            {row.createdAt}
          </Typography>
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
      headerName: 'status',
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


  const [itemType, setItemType] = useState('')

  const [pageSize, setPageSize] = useState(10)
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [editUserOpen, setEditUserOpen] = useState(false)

  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.serviceItem)
  const categoryStore = useSelector(state => state.serviceCategory)
  const [categoryValue, setCategoryValue] = useState(null)
  const [categoryId, setCategoryId] = useState('')
  const [unitValue, setUnitValue] = useState(null)
  const [unitId, setUnitId] = useState('')

  const handleSelectCategoryChange = useCallback(e => {
    setCategoryValue(e)
    setCategoryId(e?.id)
  }, [])

  const handleSelectedUnitChange = useCallback(e => {
    setUnitValue(e)
  }, [])


  useEffect(() => {
    dispatch(
      fetchItems({
        isVisible,
        categoryId,
        unitType: unitValue?.title,
        isBag: itemType,
        name: value,

      })
    )
  }, [dispatch, name, itemType, isVisible, value, categoryId, unitValue, editUserOpen, addUserOpen])

  useEffect(() => {
    dispatch(fetchData({}))
  }, [])


  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])


  const handleIsVisibleChange = useCallback(e => {
    setIsVisible(e.target.value)
  }, [])


  const handleItemTypeOnChange = useCallback(e => {
    setItemType(e.target.value)
  }, [])


  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)
  const toggleEditUserDrawer = () => {
    if (editUserOpen) {
      setEditId(null);
      setEditRow(null);
      setSelectedCategory(null);
      setSelectedUnitType(null);
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
              <Grid item sm={3} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='i_type'>Item Type</InputLabel>
                  <Select
                    fullWidth
                    value={itemType}
                    id='i_type'
                    label='Item Type'
                    labelId='Item Type'
                    onChange={handleItemTypeOnChange}
                    inputProps={{placeholder: 'Item Type'}}
                  >
                    <MenuItem value=''>Select Type</MenuItem>
                    <MenuItem value='false'>Regular</MenuItem>
                    <MenuItem value='true'>Subscription Based</MenuItem>
                  </Select>
                </FormControl>
              </Grid>


              <Grid item sm={3} xs={12}>
                <FormControl fullWidth>

                  <Autocomplete
                    value={categoryValue}
                    options={categoryStore.data}

                    onChange={(_, data) => {

                      handleSelectCategoryChange(data)
                    }}

                    getOptionLabel={option => option.name}
                    renderInput={params => <TextField {...params} label='Item Category'/>}
                  />

                </FormControl>
              </Grid>


              <Grid item sm={3} xs={12}>
                <FormControl fullWidth>

                  <Autocomplete
                    value={unitValue}
                    options={unit_types}

                    onChange={(_, data) => {

                      handleSelectedUnitChange(data)
                    }}

                    getOptionLabel={option => option.title}
                    renderInput={params => <TextField {...params} label='Unit'/>}
                  />

                </FormControl>
              </Grid>


              <Grid item sm={3} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='status'>Status</InputLabel>
                  <Select
                    fullWidth
                    value={isVisible}
                    id='status'
                    label='Status'
                    labelId='status'
                    onChange={handleIsVisibleChange}
                    inputProps={{placeholder: 'Status'}}
                  >
                    <MenuItem value=''>Select status</MenuItem>
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
            pageSize={pageSize}
            disableSelectionOnClick
            rowsPerPageOptions={[10, 25, 50]}
            sx={{'& .MuiDataGrid-columnHeaders': {borderRadius: 0}}}
            onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          />
        </Card>
      </Grid>

      <ItemAddDialog open={addUserOpen} toggle={toggleAddUserDrawer} categoryStore={categoryStore}
                     unit_types={unit_types}/>
      <EditUserDrawer open={editUserOpen} toggle={toggleEditUserDrawer} editId={editId} setEditId={setEditId}
                      editRow={editRow} setEditRow={setEditRow} categoryStore={categoryStore} unit_types={unit_types}
                      category={editRow?.category} selectedCategory={selectedCategory}
                      selectedUnitType={selectedUnitType}/>
    </Grid>
  )
}


// UserList.acl = {
//   action: 'read',
//   subject: 'admin-list'
// }
// UserList.guestGuard = true
export default ServiceCategoriesList
