import {Box, CircularProgress, Grid} from "@mui/material";

// ** React Imports
import {forwardRef, Fragment, useState, useCallback} from 'react'

// ** MUI Imports
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import {styled} from '@mui/material/styles'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import ListItem from '@mui/material/ListItem'
import List from '@mui/material/List'
import {EditorState} from 'draft-js'
// ** Component Import
import ReactDraftWysiwyg from 'src/@core/components/react-draft-wysiwyg'
import {EditorWrapper} from 'src/@core/styles/libs/react-draft-wysiwyg'
// ** Styles
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import Switch from '@mui/material/Switch'


// ** Third Party Imports
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm, Controller} from 'react-hook-form'


// ** Icons Imports
// import Close from 'mdi-material-ui/Close'
import FileDocumentOutline from 'mdi-material-ui/FileDocumentOutline'


// ** Third Party Components
import toast from 'react-hot-toast'
import {useDropzone} from 'react-dropzone'
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'
import {Keg} from "mdi-material-ui";

import {addItem, editItem} from 'src/store/apps/services/items'

import Slide from '@mui/material/Slide'
import DialogContentText from '@mui/material/DialogContentText'
import {useDispatch} from "react-redux";
import {useEffect} from "react";


const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})


const ItemAddDialog = props => {
  const dispatch = useDispatch()


  const schema = yup.object().shape({
    isBag: yup.string().required(),
    category: yup.mixed().required(),
    unitType: yup.mixed().required(),
    name: yup.string().required(),
    description: yup.string().required(),
    mrp: yup.string().required(),
    image: yup.mixed().required(),
    price: yup.string().required(),
  })

  const defaultValues = {}


  // ** Props
  const {
    open,
    toggle,
    categoryStore,
    unit_types,
    editId,
    setEditId,
    editRow,
    setEditRow,
    category,
    selectedCategory,
    selectedUnitType
  } = props
  const [loading, setLoading] = useState(false);


  const {
    watch,
    register,
    reset,
    control,
    setValue,
    setError,
    clearErrors,
    handleSubmit,
    formState: {errors}
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })


  const FormControlLabel = styled(MuiFormControlLabel)(({theme}) => ({
    marginLeft: 0,
    '& .MuiSwitch-root': {
      width: 42,
      height: 26,
      padding: 0,
      marginRight: theme.spacing(3),
      '& .MuiSwitch-switchBase': {
        padding: 1,
        '&.Mui-checked': {
          transform: 'translateX(16px)',
          color: theme.palette.common.white,
          '& + .MuiSwitch-track': {
            opacity: 1,
            border: 'none',
            backgroundColor: '#52d869'
          }
        }
      },
      '& .MuiSwitch-thumb': {
        width: 24,
        height: 24
      },
      '& .MuiSwitch-track': {
        opacity: 1,
        borderRadius: 13,
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.action.selected : theme.palette.grey[50],
        border: `1px solid ${theme.palette.grey[400]}`,
        transition: theme.transitions.create(['background-color', 'border'])
      }
    }
  }))


  // Styled component for the upload image inside the dropzone area
  const Img = styled('img')(({theme}) => ({
    [theme.breakpoints.up('md')]: {
      marginRight: theme.spacing(10)
    },
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(4)
    },
    [theme.breakpoints.down('sm')]: {
      width: 250
    }
  }))

  // Styled component for the heading inside the dropzone area
  const HeadingTypography = styled(Typography)(({theme}) => ({
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(4)
    }
  }))


  /** upload files */


    // ** State
  const [files, setFiles] = useState([])

  // ** Hooks
  const {getRootProps, getInputProps} = useDropzone({
    multiple: false,
    maxSize: 1000000,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    onDrop: acceptedFiles => {
      clearErrors('image')
      setValue('image', files)
      setFiles(acceptedFiles.map(file => Object.assign(file)))
    },
    onDropRejected: () => {
      toast.error('You can only upload a files & maximum size of 1 MB.', {
        duration: 2000
      })
    },
  })

  const renderFilePreview = file => {
    if (file?.type?.startsWith('image')) {
      return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file)}/>
    } else {
      if (editRow) {
        return <img width={38} height={38} alt={editRow?.name} src={editRow?.icon}/>
      }
      return <FileDocumentOutline/>
    }
  }


  const handleRemoveFile = file => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter(i => i?.name !== file?.name)
    setFiles([...filtered])
    setValue('image', undefined);

  }

  const fileList = files.map(file => (
    <ListItem key={file?.name}>
      <div style={{overflow: 'hidden'}} className='file-details'>
        <div className='file-preview'>{renderFilePreview(file)}</div>

        <div>
          <Typography className='file-name'>{file?.name}</Typography>
          <Typography className='file-size' variant='body2'>
            {Math.round(file?.size / 100) / 10 > 1000
              ? `${(Math.round(file?.size / 100) / 10000).toFixed(1)} mb`
              : `${(Math.round(file?.size / 100) / 10).toFixed(1)} kb`}
          </Typography>
        </div>

      </div>
      <IconButton onClick={() => handleRemoveFile(file)}>
        <Close fontSize='small'/>
      </IconButton>
    </ListItem>
  ))

  const handleRemoveAllFiles = () => {
    setFiles([])
    setValue('image', undefined);
  }


  const [categoryValue, setCategoryValue] = useState(null)

  const handleChange = (newValue) => {
    setCategoryValue(newValue)
  }

  const [unitValue, setUnitValue] = useState(null)
  const handleSelectedUnitChange = useCallback(e => {
    setUnitValue(e)
  }, [])


  const watchOriginalField = watch('mrp');
  const watchDiscountField = watch('discount');
  const total = watchOriginalField - (((watchDiscountField / 100) * watchOriginalField))

  setValue('price', total)


  const handleClose = () => {

    reset()

    toggle()

    setFiles([])

    setStatus(false);
    setEditRow(null);

  }


  const [filledFormData, setFilledFormData] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [dialogType, setDialogType] = useState('success')
  const [dialogMessage, setDialogMessage] = useState('')
  const handleClickOpenDialog = () => setOpenDialog(true)

  const handleCloseDialog = () => {
    if (dialogType == 'success') {
      categoryAddedSuccess();

    } else if (dialogType == 'warning') {
      setDialogMessage('')
      setLoading(false)
    }
    setOpenDialog(false)
  }


  useEffect(() => {
    setValue('isBag', editRow?.isBag)
    setValue('name', editRow?.name)
    setValue('description', editRow?.description)
    setValue('mrp', editRow?.mrp)
    setValue('discount', editRow?.discount)


    setValue('category', selectedCategory)
    setValue('unitType', selectedUnitType)


    setValue('image', editRow?.icon)
    setFiles([editRow?.icon])


    setCategoryValue(selectedCategory)
    setUnitValue(selectedUnitType)


    setStatus(editRow?.isVisible)
  }, [editRow])


  const onSubmit = data => {
    setFilledFormData(data)
    setDialogType('warning');
    setDialogMessage('Do you really want to edit this data?');
    handleClickOpenDialog()
  }


  const continueEditing = () => {
    let data = filledFormData
    setLoading(false);


    const {isBag, name, category, description, discount, mrp, price, unitType} = data

    var finaldiscount = discount;

    if (discount == '') {
      finaldiscount = 0
    }
    dispatch(editItem({
      itemId: editId,
      isBag,
      name,
      categoryId: category.id,
      description,
      discount: finaldiscount,
      mrp,
      price,
      unitType: unitType.title,
      image: files[0],
      isVisible: status
    })).then((data) => {


      setLoading(false);
      if (data?.payload?.status == "success") {
        setDialogType('success');
        setDialogMessage(data?.payload?.message)
        handleClickOpenDialog()
      } else {
        setDialogType('failed');
        setDialogMessage(data?.payload?.message)
        handleClickOpenDialog()
      }
    })
  }


  const categoryAddedSuccess = () => {
    setFiles([])


    setStatus(false);
    reset()
    setEditRow(null);
    toggle()
  }


  const lifeSaver = () => {
    setCategoryValue(categoryStore.data.find(obj => {
      return obj.id === editRow?.categoryId;
    }))
    setUnitValue(unit_types.find(obj => {
      return obj.title === editRow?.unitType;
    }))
  }


  const [status, setStatus] = useState(false);

  const onStatusChange = (e) => {
    setStatus(e.target.checked)
  }


  const priceFromat = (value) => {
    const price = value.replace(/[^\d&^.]/g, '');
    return price
  }

  return (
    <div>
      <Dialog fullScreen onClose={handleClose} aria-labelledby='full-screen-dialog-title' open={open}>
        <form onSubmit={handleSubmit(onSubmit)}>


          <DialogTitle id='full-screen-dialog-title'>
            <Box>

              <Typography variant='h6' component='span'>
                Edit Item
              </Typography>


              <FormControl sx={{ml: 8}}>
                <Controller
                  name='status'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <FormControlLabel
                      label='Status'
                      control={
                        <Switch
                          checked={status}
                          onChange={onStatusChange}
                        />
                      }
                    />
                  )}
                />
              </FormControl>
            </Box>
            <IconButton
              aria-label='close'
              onClick={handleClose}
              sx={{top: 8, right: 10, position: 'absolute', color: theme => theme.palette.grey[500]}}
            >
              <Close/>
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={5}>

              <Grid item xs={12} sm={12} md={12}>
                <FormControl error={Boolean(errors.isBag)}>
                  <FormLabel>Item Type</FormLabel>
                  <Controller
                    name='isBag'
                    control={control}
                    rules={{required: true}}
                    render={({field}) => (
                      <RadioGroup row {...field} aria-label='item_type' name='itemType'>
                        <FormControlLabel
                          value='false'
                          label='Regular'
                          sx={errors.isBag ? {color: 'error.main'} : null}
                          control={<Radio sx={errors.isBag ? {color: 'error.main'} : null}/>}
                        />
                        <FormControlLabel
                          value='true'
                          label='Subscription Based'
                          sx={errors.isBag ? {color: 'error.main'} : null}
                          control={<Radio sx={errors.isBag ? {color: 'error.main'} : null}/>}
                        />
                      </RadioGroup>
                    )}
                  />
                  {errors.isBag && (
                    <FormHelperText sx={{color: 'error.main'}} id='validation-basic-radio'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>


              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth sx={{mb: 6}}>
                  <Controller
                    error={Boolean(errors.category)}
                    name='category'
                    render={(props) => (
                      <Autocomplete
                        value={categoryValue}
                        options={categoryStore.data}

                        onChange={(_, data) => {
                          clearErrors('category');
                          props.field.onChange(data)
                          handleChange(data)
                        }}
                        id='category'
                        getOptionLabel={option => option.name}
                        renderInput={params => <TextField {...params} error={Boolean(errors.category)}
                                                          label='Select Category'/>}
                      />
                    )}
                    control={control}
                  />

                  {errors.category && (
                    <FormHelperText sx={{color: 'error.main'}} id='validation-basic-email'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>


              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <Controller
                    error={Boolean(errors.unit)}
                    name='unitType'
                    render={(props) => (
                      <Autocomplete
                        value={unitValue}
                        options={unit_types}

                        onChange={(_, data) => {
                          clearErrors('unit');
                          props.field.onChange(data)
                          handleSelectedUnitChange(data)
                        }}
                        id='unit'
                        getOptionLabel={option => option.title}
                        renderInput={params => <TextField {...params} error={Boolean(errors.unitType)} label='Unit'/>}
                      />
                    )}
                    control={control}
                  />

                  {errors.unitType && (
                    <FormHelperText sx={{color: 'error.main'}} id='validation-basic-email'>
                      This field is required
                    </FormHelperText>
                  )}


                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <FormControl fullWidth>
                  <Controller
                    name='name'
                    control={control}
                    rules={{required: true}}
                    render={({field: {value, onChange}}) => (
                      <TextField
                        value={value}
                        label='Item Name'
                        onChange={onChange}
                        error={Boolean(errors.name)}
                      />
                    )}
                  />
                  {errors.name && (
                    <FormHelperText sx={{color: 'error.main'}} id='validation-basic-first-name'>
                      This field is required
                    </FormHelperText>
                  )}

                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Card>
                  <CardHeader title='Description' sx={{pb: 4, '& .MuiCardHeader-title': {letterSpacing: '.15px'}}}/>
                  <CardContent>
                    <Grid container spacing={6}>
                      <Grid item xs={12}>
                        <FormControl fullWidth sx={{mb: 6}}>
                          <Controller
                            name='description'
                            control={control}
                            rules={{required: true}}
                            render={({field: {value, onChange}}) => (
                              <TextField
                                rows={6}
                                multiline
                                label='Description'
                                value={value}
                                onChange={onChange}
                                error={Boolean(errors.description)}
                              />
                            )}
                          />
                          {errors.description &&
                            <FormHelperText sx={{color: 'error.main'}}>{errors.description.message}</FormHelperText>}
                        </FormControl>

                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>

              </Grid>


              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <Controller
                    name='mrp'
                    control={control}
                    rules={{required: true}}
                    render={({field: {value, onChange}}) => (
                      <TextField
                        InputProps={{inputProps: {min: 0}}}
                        // type='number'
                        value={value}
                        label='Original Price'
                        onChange={(e) => {
                          clearErrors('mrp');
                          onChange(priceFromat(e.target.value))
                        }}
                        error={Boolean(errors.mrp)}
                      />
                    )}
                  />
                  {errors.mrp && (
                    <FormHelperText sx={{color: 'error.main'}} id='validation-basic-first-name'>
                      This field is required
                    </FormHelperText>
                  )}

                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel
                    id='discounted_type'
                    error={Boolean(errors.role)}
                    htmlFor='discounted_type'
                  >
                    Discount Type
                  </InputLabel>
                  <Controller
                    name='discounted_type'
                    control={control}
                    rules={{required: true}}
                    render={({field: {value, onChange}}) => (
                      <Select
                        disabled='true'
                        value={'test'}
                        label='Discount Type'

                        labelId='discount_type'
                      >
                        <MenuItem value=''>Null</MenuItem>
                        <MenuItem value='test'>discount type = %</MenuItem>
                        <MenuItem value='percentage'>Percentage</MenuItem>
                        <MenuItem value='flate'>Flate</MenuItem>

                      </Select>
                    )}
                  />

                </FormControl>
              </Grid>


              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <Controller
                    name='discount'
                    control={control}
                    rules={{required: true}}
                    render={({field: {value, onChange}}) => (
                      <TextField
                        InputProps={{inputProps: {min: 0}}}
                        value={value}
                        label='Discount Value'
                        onChange={(e) => {
                          clearErrors('discount');
                          onChange(priceFromat(e.target.value))
                        }}
                        error={Boolean(errors.discount)}
                      />
                    )}
                  />
                  {errors.discount && (
                    <FormHelperText sx={{color: 'error.main'}} id='validation-basic-first-name'>
                      This field is required
                    </FormHelperText>
                  )}

                </FormControl>
              </Grid>


              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <Controller
                    name='price'
                    control={control}
                    rules={{required: true}}
                    render={({field: {value, onChange}}) => (
                      <TextField

                        disabled='true'
                        type='number'
                        value={value}
                        label='Final Price'
                        onChange={onChange}
                        error={Boolean(errors.price)}
                      />
                    )}
                  />
                  {errors.price && (
                    <FormHelperText sx={{color: 'error.main'}} id='validation-basic-first-name'>
                      This field is required
                    </FormHelperText>
                  )}

                </FormControl>
              </Grid>


              <Grid item xs={12}>
                <FormControl fullWidth sx={{mb: 6}}>
                  <Controller
                    name='image'
                    render={(props) => (
                      <DropzoneWrapper error={Boolean(errors.image)}>
                        <Fragment>
                          <div {...getRootProps({className: 'dropzone'})}>
                            <input {...getInputProps()} />
                            <Box>
                              <Img width={300} alt='Upload img' src='/images/misc/upload.png'/>
                              <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                textAlign: ['center', 'center', 'center']
                              }}>
                                <HeadingTypography variant='h5'>Drop files here or click to upload.</HeadingTypography>
                                <Typography color='textSecondary'>Allowed *.jpeg, *.jpg, *.png</Typography>
                              </Box>
                            </Box>
                          </div>
                          {files.length ? (
                            <Fragment>
                              <List>{fileList}</List>
                              <div className='buttons'>
                                <Button sx={{mr: 3}} color='error' variant='outlined' onClick={handleRemoveAllFiles}>
                                  Remove
                                </Button>
                              </div>
                            </Fragment>
                          ) : null}
                        </Fragment>
                      </DropzoneWrapper>
                    )}
                    control={control}
                  />


                  {errors.image && <FormHelperText sx={{color: 'error.main'}}>{errors.image.message}</FormHelperText>}
                </FormControl>

              </Grid>

            </Grid>


          </DialogContent>
          <DialogActions>
            <Box sx={{display: 'flex', alignItems: 'center', pt: 5, pr: 7}}>
              <Button size='large' type='submit' variant='contained' sx={{mr: 3}}>
                Submit
              </Button>
              <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
                Cancel
              </Button>
            </Box>

          </DialogActions>
        </form>


        <Dialog
          open={openDialog}
          keepMounted
          onClose={handleCloseDialog}
          TransitionComponent={Transition}
          aria-labelledby='alert-dialog-slide-title'
          aria-describedby='alert-dialog-slide-description'
        >
          {dialogType == 'success' && (
            <DialogTitle id='alert-dialog-slide-title'>Success</DialogTitle>
          )}
          {dialogType == 'failed' && (
            <DialogTitle id='alert-dialog-slide-title'>Error</DialogTitle>
          )}
          {dialogType == 'warning' && (
            <DialogTitle id='alert-dialog-slide-title'>Warning</DialogTitle>
          )}

          <DialogContent>
            <DialogContentText id='alert-dialog-slide-description'>
              {dialogMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions className='dialog-actions-dense'>

            {dialogType == 'warning' && (
              <>
                <Button onClick={continueEditing}>Continue</Button>
                <Button onClick={handleCloseDialog}>Cancel</Button>
              </>
            )}
            {dialogType == 'success' && (
              <>
                <Button onClick={handleCloseDialog}>OK</Button>
              </>
            )}
            {dialogType == 'failed' && (
              <>
                <Button onClick={handleCloseDialog}>OK</Button>
              </>
            )}

          </DialogActions>
        </Dialog>


      </Dialog>
    </div>
  )


}

export default ItemAddDialog
