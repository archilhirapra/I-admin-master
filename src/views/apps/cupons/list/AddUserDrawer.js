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
import {addCupon} from 'src/store/apps/cupons'
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


const CustomInput = forwardRef(({...props}, ref) => {
  return <TextField inputRef={ref} {...props} sx={{width: '100%'}}/>
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
    start: yup.string().required(),
    end: yup.string().required(),
    description: yup.string().required(),
    terms: yup.string().required(),
    discount: yup.number().required(),
    minimumAmount: yup.number().required(),

  })

  const defaultValues = {
    name: '',
    start: '',
    end: '',
    description: '',
    terms: '',
    discount: '',
    minimumAmount: '',
    percentage: false,
    isOnce: false,
    isVisible: false,
    isExpired: false,
    isExist: false,
    isNewOnly: false,
    isSpecial: false,

  }


  // ** Props
  const {open, toggle, editId, setEditId, editRow, setEditRow} = props


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
    setDialogMessage('Do you really want to add this data?');
    handleClickOpenDialog()

  }


  const continueEditing = () => {
    handleCloseDialog()

    let data = filledFormData
    setLoading(false);
    // return
    const {
      name,
      start,
      end,
      discount,
      percentage,
      isOnce,
      description,
      terms,
      minimumAmount,
      isExpired,
      isExist,
      isNewOnly,
      isSpecial,
      isVisible
    } = data
    let startDate = new Date(start).toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit',});
    let endDate = new Date(end).toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit',});

    dispatch(addCupon({
      name,
      start: startDate,
      end: endDate,
      discount,
      percentage,
      isOnce,
      description,
      terms,
      minimumAmount,
      isVisible,
      isExpired,
      isExist,
      isNewOnly,
      isSpecial
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
    setLoading(false)
    toggle()
    reset()
  }


  const handleClose = () => {
    setLoading(false)
    toggle()
    reset()
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
        <Typography variant='h6'>Add Coupon</Typography>
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
              <Controller
                name='start'
                control={control}
                rules={{required: true}}
                render={({field: {value, onChange}}) => (
                  <DatePickerWrapper>
                    <DatePicker
                      // dateFormat={'dd/MM/yyyy'}

                      autoComplete='off'
                      selected={value}
                      showYearDropdown
                      showMonthDropdown
                      onChange={e => onChange(e)}
                      placeholderText='MM/DD/YYYY'
                      customInput={
                        <CustomInput
                          value={value}
                          onChange={onChange}
                          label='Start'
                          error={Boolean(errors.start)}
                        />
                      }
                    />
                  </DatePickerWrapper>
                )}
              />
              {errors.start && (
                <FormHelperText sx={{mx: 3.5, color: 'error.main'}} id='validation-basic-dob'>
                  This field is required
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='end'
                control={control}
                rules={{required: true}}
                render={({field: {value, onChange}}) => (
                  <DatePickerWrapper>
                    <DatePicker
                      autoComplete='off'
                      selected={value}
                      showYearDropdown
                      showMonthDropdown
                      onChange={e => onChange(e)}
                      // dateFormat={'dd/MM/yyyy'}
                      placeholderText='MM/DD/YYYY'
                      customInput={
                        <CustomInput
                          value={value}
                          onChange={onChange}
                          label='End'
                          error={Boolean(errors.end)}
                        />
                      }
                    />
                  </DatePickerWrapper>
                )}
              />
              {errors.end && (
                <FormHelperText sx={{mx: 3.5, color: 'error.main'}} id='validation-basic-dob'>
                  This field is required
                </FormHelperText>
              )}
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name='description'
                  control={control}
                  rules={{required: true}}
                  render={({field: {value, onChange}}) => (
                    <TextField
                      rows={4}
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
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name='terms'
                  control={control}
                  rules={{required: true}}
                  render={({field: {value, onChange}}) => (
                    <TextField
                      rows={4}
                      multiline
                      label='Terms'
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.terms)}
                    />
                  )}
                />
                {errors.terms && <FormHelperText sx={{color: 'error.main'}}>{errors.terms.message}</FormHelperText>}
              </FormControl>
            </Grid>


            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name='minimumAmount'
                  control={control}
                  rules={{required: true}}
                  render={({field: {value, onChange}}) => (
                    <TextField
                      // type={'number'}
                      InputProps={{inputProps: {min: 0}}}
                      value={value}
                      label='Minimum Amount'
                      // onChange={onChange}
                      onChange={(e) => {
                        // clearErrors('mrp');
                        onChange(priceFromat(e.target.value))
                      }}
                      error={Boolean(errors.minimumAmount)}
                    />
                  )}
                />
                {errors.minimumAmount && (
                  <FormHelperText sx={{color: 'error.main'}} id='validation-basic-first-name'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name='discount'
                  control={control}
                  rules={{required: true}}
                  render={({field: {value, onChange}}) => (
                    <TextField
                      // type={'number'}
                      InputProps={{inputProps: {min: 0}}}
                      value={value}
                      label='Discount'
                      // onChange={onChange}
                      onChange={(e) => {
                        // clearErrors('mrp');
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

            <Grid item xs={12}>
              <FormControl>
                <Controller
                  name='isOnce'
                  control={control}
                  rules={{required: true}}
                  render={({field: {value, onChange}}) => (
                    <FormControlLabel
                      label='Is Once'
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
            <Grid item xs={12}>
              <FormControl>
                <Controller
                  name='percentage'
                  control={control}
                  rules={{required: true}}
                  render={({field: {value, onChange}}) => (
                    <FormControlLabel
                      label='Percentage'
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
            <Grid item xs={12}>
              <FormControl>
                <Controller
                  name='isVisible'
                  control={control}
                  rules={{required: true}}
                  render={({field: {value, onChange}}) => (
                    <FormControlLabel
                      label='Is Visibility'
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
            <Grid item xs={12}>
              <FormControl>
                <Controller
                  name='isExpired'
                  control={control}
                  rules={{required: true}}
                  render={({field: {value, onChange}}) => (
                    <FormControlLabel
                      label='Is Expired'
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
            <Grid item xs={12}>
              <FormControl>
                <Controller
                  name='isExist'
                  control={control}
                  rules={{required: true}}
                  render={({field: {value, onChange}}) => (
                    <FormControlLabel
                      label='Is Exist'
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
            <Grid item xs={12}>
              <FormControl>
                <Controller
                  name='isNewOnly'
                  control={control}
                  rules={{required: true}}
                  render={({field: {value, onChange}}) => (
                    <FormControlLabel
                      label='Is New Only'
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
            <Grid item xs={12}>
              <FormControl>
                <Controller
                  name='isSpecial'
                  control={control}
                  rules={{required: true}}
                  render={({field: {value, onChange}}) => (
                    <FormControlLabel
                      label='Is Special'
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
