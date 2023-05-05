// ** React Imports
import {forwardRef, Fragment, useEffect, useState} from 'react'
// ** Spinner Import
// import Spinner from 'src/@core/components/spinner'
import Spinner from 'src/layouts/components/spinner'
// ** MUI Imports
// import Box from '@mui/material/Box'
import List from '@mui/material/List'
// import Button from '@mui/material/Button'
import ListItem from '@mui/material/ListItem'
// import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
// import Typography from '@mui/material/Typography'

// ** Icons Imports
// import Close from 'mdi-material-ui/Close'
import FileDocumentOutline from 'mdi-material-ui/FileDocumentOutline'

// ** Third Party Components
import toast from 'react-hot-toast'
import {useDropzone} from 'react-dropzone'
// import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'
import DropzoneWrapper from 'src/layouts/components/react-dropzone'


// ** MUI Imports
import Grid from '@mui/material/Grid'
import FormLabel from '@mui/material/FormLabel'
// import OutlinedInput from '@mui/material/OutlinedInput'
import 'react-datepicker/dist/react-datepicker.css'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import DatePicker from 'react-datepicker'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import Checkbox from '@mui/material/Checkbox'
import InputAdornment from '@mui/material/InputAdornment'

import Cleave from 'cleave.js/react'
import 'cleave.js/dist/addons/cleave-phone.us'
import CleaveWrapper from 'src/@core/styles/libs/react-cleave'


import Drawer from '@mui/material/Drawer'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import {styled} from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

// ** Third Party Imports
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm, Controller} from 'react-hook-form'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Store Imports
import {useDispatch} from 'react-redux'

// ** Actions Imports
import {addPlan, editPlan} from 'src/store/apps/plans'
import Switch from '@mui/material/Switch'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import {CircularProgress, Dialog} from '@mui/material'


import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Slide from '@mui/material/Slide'
import DialogContentText from '@mui/material/DialogContentText'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})


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


const BoxStyle = styled(Box)(({theme}) => ({
  backgroundColor: theme.palette.mode === 'dark' ? "#30334e" : "#ffffff",
}))

// Styled FormControlLabel component
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


const Header = styled(Box)(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))


const SidebarAddUser = props => {

  const schema = yup.object().shape({
    name: yup.string().required(),
    pickup: yup.number().required(),
    delivery: yup.number().required(),
    monthly: yup.number().required(),
    quarterly: yup.number().required(),
    yearly: yup.number().required(),
    tag: yup.string().required(),
    status: yup.string().required(),
    image: yup.mixed().required(),

  })

  const defaultValues = {
    name: '',
    pickup: 0,
    delivery: 0,
    monthly: 0,
    quarterly: 0,
    yearly: 0,
    tag: '',
    status: false,
  }


  // ** Props
  const {open, toggle, editId, setEditId, editRow, setEditRow} = props


  useEffect(() => {

    setValue('name', editRow?.name)
    setValue('pickup', editRow?.pickup)
    setValue('delivery', editRow?.delivery)
    setValue('monthly', editRow?.month)
    setValue('quarterly', editRow?.quarterly)
    setValue('yearly', editRow?.year)
    setValue('tag', editRow?.tag)
    setValue('status', editRow?.isVisible)
    setValue('image', editRow?.icon)
    setFiles([editRow?.icon])
  }, [editRow])

  // ** Hooks
  const dispatch = useDispatch()


  const {
    register,
    reset,
    control,
    setValue,
    setError,
    handleSubmit,
    clearErrors,
    formState: {errors}
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })


  const [loading, setLoading] = useState(false);


  const [openDialog, setOpenDialog] = useState(false)
  const [dialogType, setDialogType] = useState('success')
  const [dialogMessage, setDialogMessage] = useState('')
  const [filledFormData, setFilledFormData] = useState(null)
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


  const onSubmit = data => {

    setFilledFormData(data)
    setDialogType('warning');
    setDialogMessage('Do you really want to edit this data?');
    handleClickOpenDialog()

  }


  const continueEditing = () => {
    handleCloseDialog()

    let data = filledFormData
    setLoading(false);
    // return
    const {name, pickup, delivery, monthly, yearly, quarterly, status, tag} = data
    dispatch(editPlan({
      planId: editId,
      name,
      pickup,
      delivery,
      month: monthly,
      year: yearly,
      quarterly,
      tag,
      isVisible: status,
      image: files[0]
    })).then((data) => {
      setLoading(false);
      if (data?.payload?.status == "success") {
        // alert(data?.payload?.message)
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
    setLoading(false)
    toggle()
    setEditRow(null)
    reset()
  }


  const handleClose = () => {
    setLoading(false)
    toggle()
    setEditRow(null)
    reset()
  }


  /** upload files */


    // ** State
  const [files, setFiles] = useState([])

  // ** Hooks
  const {getRootProps, getInputProps} = useDropzone({
    multiple: false,
    // maxFiles: 2,
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


  const priceFromat = (value) => {
    const price = value.replace(/[^\d&^.]/g, '');
    return price
  }


  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{keepMounted: true}}
      sx={{'& .MuiDrawer-paper': {width: {xs: 300, sm: 400}}}}
    >
      <Header>
        <Typography variant='h6'>Edit Subscription Plan</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{cursor: 'pointer'}}/>
      </Header>

      <Box sx={{p: 5}}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name='name'
                  control={control}
                  rules={{required: true}}
                  render={({field: {value, onChange}}) => (
                    <TextField
                      value={value}
                      label='Name'
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
              <FormControl fullWidth>
                <Controller
                  name='pickup'
                  control={control}
                  rules={{required: true}}
                  render={({field: {value, onChange}}) => (
                    <TextField
                      value={value}
                      InputProps={{inputProps: {min: 0}}}
                      type='number'
                      label='Total Pickups'
                      onChange={onChange}
                      error={Boolean(errors.pickup)}
                    />
                  )}
                />
                {errors.pickup && (
                  <FormHelperText sx={{color: 'error.main'}} id='validation-basic-first-name'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name='delivery'
                  control={control}
                  rules={{required: true}}
                  render={({field: {value, onChange}}) => (
                    <TextField
                      value={value}
                      InputProps={{inputProps: {min: 0}}}
                      type='number'
                      label='Total Delivery'
                      onChange={onChange}
                      error={Boolean(errors.delivery)}
                    />
                  )}
                />
                {errors.delivery && (
                  <FormHelperText sx={{color: 'error.main'}} id='validation-basic-first-name'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name='monthly'
                  control={control}
                  rules={{required: true}}
                  render={({field: {value, onChange}}) => (
                    <TextField
                      value={value}
                      InputProps={{inputProps: {min: 0}}}
                      // type='number'
                      label='Monthly Price'
                      // onChange={onChange}
                      onChange={(e) => {
                        onChange(priceFromat(e.target.value))
                      }}
                      error={Boolean(errors.monthly)}
                    />
                  )}
                />
                {errors.monthly && (
                  <FormHelperText sx={{color: 'error.main'}} id='validation-basic-first-name'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name='quarterly'
                  control={control}
                  rules={{required: true}}
                  render={({field: {value, onChange}}) => (
                    <TextField
                      value={value}
                      InputProps={{inputProps: {min: 0}}}
                      // type='number'
                      label='Quarterly Price'
                      // onChange={onChange}
                      onChange={(e) => {
                        onChange(priceFromat(e.target.value))
                      }}
                      error={Boolean(errors.quarterly)}
                    />
                  )}
                />
                {errors.quarterly && (
                  <FormHelperText sx={{color: 'error.main'}} id='validation-basic-first-name'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>


            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name='yearly'
                  control={control}
                  rules={{required: true}}
                  render={({field: {value, onChange}}) => (
                    <TextField
                      value={value}
                      InputProps={{inputProps: {min: 0}}}
                      // type='number'
                      label='Yearly'
                      // onChange={onChange}
                      onChange={(e) => {
                        onChange(priceFromat(e.target.value))
                      }}
                      error={Boolean(errors.yearly)}
                    />
                  )}
                />
                {errors.yearly && (
                  <FormHelperText sx={{color: 'error.main'}} id='validation-basic-first-name'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>


            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name='tag'
                  control={control}
                  rules={{required: true}}
                  render={({field: {value, onChange}}) => (
                    <TextField
                      value={value}
                      label='Tag'
                      onChange={onChange}
                      error={Boolean(errors.tag)}
                    />
                  )}
                />
                {errors.tag && (
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


            <Grid item xs={12}>
              <FormControl fullWidth sx={{mb: 6}}>
                <Controller
                  name='status'
                  control={control}
                  rules={{required: true}}
                  render={({field: {value, onChange}}) => (
                    <FormControlLabel
                      label='Status'
                      control={
                        <Switch
                          checked={value}
                          onChange={onChange}
                        />
                      }
                    />
                  )}
                />
              </FormControl>
            </Grid>


          </Grid>
          <Box sx={{height: 60}}>

          </Box>
          <BoxStyle
            sx={{zIndex: 1, width: {xs: 260, sm: 360}}}
            style={{
              position: "fixed",
              bottom: 0,
              paddingBottom: 20,
              paddingTop: 10,

            }}
          >


            <Grid item xs={12}>

              {loading ? (
                <Box sx={{display: "flex", justifyContent: "center"}}>
                  <CircularProgress disableShrink sx={{textAlign: "center", justifyContent: "center"}}/>
                </Box>

              ) : (
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                  <Button size='large' type='submit' variant='contained' sx={{mr: 3}}>
                    Submit
                  </Button>
                  <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
                    Cancel
                  </Button>
                </Box>
              )}
            </Grid>
          </BoxStyle>

        </form>
      </Box>


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


    </Drawer>
  )
}

export default SidebarAddUser
