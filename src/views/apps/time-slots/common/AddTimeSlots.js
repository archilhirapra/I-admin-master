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


import Divider from '@mui/material/Divider';


// ** MUI Imports
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
import {addHoliday} from 'src/store/apps/time-slot'
import Switch from '@mui/material/Switch'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import {CircularProgress, Dialog, Grid} from '@mui/material'


import 'react-datepicker/dist/react-datepicker.css'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import DatePicker from 'react-datepicker'


import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Slide from '@mui/material/Slide'
import DialogContentText from '@mui/material/DialogContentText'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})


const BoxStyle = styled(Box)(({theme}) => ({
  backgroundColor: theme.palette.mode === 'dark' ? "#30334e" : "#ffffff",
}))


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


const AddTimeSlots = props => {

  const schema = yup.object().shape({
    date: yup.string().required(),
  })

  const defaultValues = {
    date: '',
  }


  // ** Props
  const {open, toggle,} = props


  // ** Hooks
  const dispatch = useDispatch()


  const {
    register,
    reset,
    control,
    setValue,
    setError,
    handleSubmit,
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
    let data = filledFormData
    setLoading(true);
    const {date} = data
    let formatedDate = new Date(data.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    let finaldata = {
      date: formatedDate,
      isFullHoliday: allSwitchValues.fullHoliday,
      isHalf: allSwitchValues.halfHoliday,
      timeSlots: [
        {
          time: '05:00 AM - 06:00 AM',
          isActive: allSwitchValues.time5ato6a
        },
        {
          time: '06:00 AM - 07:00 AM',
          isActive: allSwitchValues.time6ato7a
        },
        {
          time: '07:00 AM - 08:00 AM',
          isActive: allSwitchValues.time7ato8a
        },
        {
          time: '08:00 AM - 09:00 AM',
          isActive: allSwitchValues.time8ato9a
        },
        {
          time: '09:00 AM - 10:00 AM',
          isActive: allSwitchValues.time9ato10a
        },
        {
          time: '10:00 AM - 11:00 AM',
          isActive: allSwitchValues.time10ato11a
        },
        {
          time: '11:00 AM - 12:00 PM',
          isActive: allSwitchValues.time11ato12p
        },
        {
          time: '12:00 PM - 01:00 PM',
          isActive: allSwitchValues.time12pto1p
        },
        {
          time: '01:00 PM - 02:00 PM',
          isActive: allSwitchValues.time1pto2p
        },
        {
          time: '02:00 PM - 03:00 PM',
          isActive: allSwitchValues.time2pto3p
        },
        {
          time: '03:00 PM - 04:00 PM',
          isActive: allSwitchValues.time3pto4p
        },
        {
          time: '04:00 PM - 05:00 PM',
          isActive: allSwitchValues.time4pto5p
        },
        {
          time: '05:00 PM - 06:00 PM',
          isActive: allSwitchValues.time5pto6p
        },
        {
          time: '06:00 PM - 07:00 PM',
          isActive: allSwitchValues.time6pto7p
        },
        {
          time: '07:00 PM - 08:00 PM',
          isActive: allSwitchValues.time7pto8p
        },


        // {
        //     time: '09:00-11:00',
        //     isActive: allSwitchValues.time9t11
        // },
        // {
        //     time: '11:00-13:00',
        //     isActive: allSwitchValues.time11t1
        // },
        // {
        //     time: '13:00-15:00',
        //     isActive: allSwitchValues.time1t3
        // },
        // {
        //     time: '15:00-17:00',
        //     isActive: allSwitchValues.time3t5
        // },
        // {
        //     time: '17:00-19:00',
        //     isActive: allSwitchValues.time5t7
        // },
        // {
        //     time: '19:00-21:00',
        //     isActive: allSwitchValues.time7t9
        // },
      ]
    }


    dispatch(addHoliday(finaldata)).then((data) => {

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
        // alert(data?.payload?.message)
      }


    })

  }


  const categoryAddedSuccess = () => {
    reset()
    setAllSwitchValues(
      {
        fullHoliday: false,
        halfHoliday: false,
        time5ato6a: true,
        time6ato7a: true,
        time7ato8a: true,
        time8ato9a: true,
        time9ato10a: true,
        time10ato11a: true,
        time11ato12p: true,
        time12pto1p: true,
        time1pto2p: true,
        time2pto3p: true,
        time3pto4p: true,
        time4pto5p: true,
        time5pto6p: true,
        time6pto7p: true,
        time7pto8p: true,
        // time9t11: true,
        // time11t1: true,
        // time1t3: true,
        // time3t5: true,
        // time5t7: true,
        // time7t9: true,
      }
    )
    setLoading(false)
    toggle()
  }


  const handleClose = () => {
    reset()
    setAllSwitchValues(
      {
        fullHoliday: false,
        halfHoliday: false,
        time5ato6a: false,
        time6ato7a: false,
        time7ato8a: false,
        time8ato9a: false,
        time9ato10a: false,
        time10ato11a: false,
        time11ato12p: false,
        time12pto1p: false,
        time1pto2p: false,
        time2pto3p: false,
        time3pto4p: false,
        time4pto5p: false,
        time5pto6p: false,
        time6pto7p: false,
        time7pto8p: false,
        // time9t11: true,
        // time11t1: true,
        // time1t3: true,
        // time3t5: true,
        // time5t7: true,
        // time7t9: true,
      }
    )

    setLoading(false)
    toggle()
  }


  const [allSwitchValues, setAllSwitchValues] = useState({
    fullHoliday: false,
    halfHoliday: false,
    time5ato6a: true,
    time6ato7a: true,
    time7ato8a: true,
    time8ato9a: true,
    time9ato10a: true,
    time10ato11a: true,
    time11ato12p: true,
    time12pto1p: true,
    time1pto2p: true,
    time2pto3p: true,
    time3pto4p: true,
    time4pto5p: true,
    time5pto6p: true,
    time6pto7p: true,
    time7pto8p: true,

    // time9t11: true,
    // time11t1: true,
    // time1t3: true,
    // time3t5: true,
    // time5t7: true,
    // time7t9: true,
  });


  const changeHandler = e => {
    setAllSwitchValues({...allSwitchValues, [e.target.name]: e.target.checked})
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
        <Typography variant='h6'>Add Time Slot</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{cursor: 'pointer'}}/>
      </Header>

      <Box sx={{p: 5}}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container>

            <Grid item xs={12} sx={{mb: 6}}>
              <Controller
                name='date'
                control={control}
                rules={{required: true}}
                render={({field: {value, onChange}}) => (
                  <DatePickerWrapper>
                    <DatePicker
                      minDate={new Date()}
                      excludeDates={props?.disableDate}
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
                          label='Date'
                          error={Boolean(errors.date)}
                        />
                      }
                    />
                  </DatePickerWrapper>
                )}
              />
              {errors.date && (
                <FormHelperText sx={{mx: 3.5, color: 'error.main'}} id='validation-basic-dob'>
                  This field is required
                </FormHelperText>
              )}
            </Grid>


            <Grid item xs={12} container>
              <Grid item xs={8} sm={8} lg={8}>
                <Typography>Full Holiday</Typography>
              </Grid>

              <Grid item xs={4} sm={4} lg={4}>
                <Box sx={{mb: 2}}>
                  <FormControlLabel control={<Switch name='fullHoliday' checked={allSwitchValues.fullHoliday}
                                                     onChange={changeHandler}/>}/>
                </Box>
              </Grid>
            </Grid>


            {allSwitchValues.fullHoliday ? (<></>) : (
              <>
                <Grid item xs={12}>
                  <Divider xs={12}/>
                </Grid>
                <Grid item xs={12} container>
                  <Grid item xs={8} sm={8} lg={8}>
                    <Typography>Half Holiday</Typography>
                  </Grid>

                  <Grid item xs={4} sm={4} lg={4}>
                    <Box sx={{mb: 2}}>
                      <FormControlLabel control={<Switch name='halfHoliday' checked={allSwitchValues.halfHoliday}
                                                         onChange={changeHandler}/>}/>
                    </Box>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Divider xs={12}/>
                </Grid>


                <Grid item container>
                  <Grid item xs={8} sm={8} lg={8}>
                    <Typography>05:00 Am - 06:00 Am</Typography>
                  </Grid>

                  <Grid item xs={4} sm={4} lg={4}>
                    <Box sx={{mb: 6}}>
                      <FormControlLabel control={<Switch name='time5ato6a' checked={allSwitchValues.time5ato6a}
                                                         onChange={changeHandler}/>}/>
                    </Box>
                  </Grid>

                </Grid>
                <Grid item container>
                  <Grid item xs={8} sm={8} lg={8}>
                    <Typography>06:00 Am - 07:00 Am</Typography>
                  </Grid>

                  <Grid item xs={4} sm={4} lg={4}>
                    <Box sx={{mb: 6}}>
                      <FormControlLabel control={<Switch name='time6ato7a' checked={allSwitchValues.time6ato7a}
                                                         onChange={changeHandler}/>}/>
                    </Box>
                  </Grid>

                </Grid>
                <Grid item container>
                  <Grid item xs={8} sm={8} lg={8}>
                    <Typography>07:00 Am - 08:00 Am</Typography>
                  </Grid>

                  <Grid item xs={4} sm={4} lg={4}>
                    <Box sx={{mb: 6}}>
                      <FormControlLabel control={<Switch name='time7ato8a' checked={allSwitchValues.time7ato8a}
                                                         onChange={changeHandler}/>}/>
                    </Box>
                  </Grid>

                </Grid>
                <Grid item container>
                  <Grid item xs={8} sm={8} lg={8}>
                    <Typography>08:00 Am - 09:00 Am</Typography>
                  </Grid>

                  <Grid item xs={4} sm={4} lg={4}>
                    <Box sx={{mb: 6}}>
                      <FormControlLabel control={<Switch name='time8ato9a' checked={allSwitchValues.time8ato9a}
                                                         onChange={changeHandler}/>}/>
                    </Box>
                  </Grid>

                </Grid>
                <Grid item container>
                  <Grid item xs={8} sm={8} lg={8}>
                    <Typography>09:00 Am - 10:00 Am</Typography>
                  </Grid>

                  <Grid item xs={4} sm={4} lg={4}>
                    <Box sx={{mb: 6}}>
                      <FormControlLabel control={<Switch name='time9ato10a' checked={allSwitchValues.time9ato10a}
                                                         onChange={changeHandler}/>}/>
                    </Box>
                  </Grid>

                </Grid>
                <Grid item container>
                  <Grid item xs={8} sm={8} lg={8}>
                    <Typography>10:00 Am - 11:00 Am</Typography>
                  </Grid>

                  <Grid item xs={4} sm={4} lg={4}>
                    <Box sx={{mb: 6}}>
                      <FormControlLabel control={<Switch name='time10ato11a' checked={allSwitchValues.time10ato11a}
                                                         onChange={changeHandler}/>}/>
                    </Box>
                  </Grid>

                </Grid>
                <Grid item container>
                  <Grid item xs={8} sm={8} lg={8}>
                    <Typography>11:00 Am - 12:00 Pm</Typography>
                  </Grid>

                  <Grid item xs={4} sm={4} lg={4}>
                    <Box sx={{mb: 6}}>
                      <FormControlLabel control={<Switch name='time11ato12p' checked={allSwitchValues.time11ato12p}
                                                         onChange={changeHandler}/>}/>
                    </Box>
                  </Grid>

                </Grid>
                <Grid item container>
                  <Grid item xs={8} sm={8} lg={8}>
                    <Typography>12:00 Pm - 01:00 Pm</Typography>
                  </Grid>

                  <Grid item xs={4} sm={4} lg={4}>
                    <Box sx={{mb: 6}}>
                      <FormControlLabel control={<Switch name='time12pto1p' checked={allSwitchValues.time12pto1p}
                                                         onChange={changeHandler}/>}/>
                    </Box>
                  </Grid>

                </Grid>
                <Grid item container>
                  <Grid item xs={8} sm={8} lg={8}>
                    <Typography>01:00 Pm - 02:00 Pm</Typography>
                  </Grid>

                  <Grid item xs={4} sm={4} lg={4}>
                    <Box sx={{mb: 6}}>
                      <FormControlLabel control={<Switch name='time1pto2p' checked={allSwitchValues.time1pto2p}
                                                         onChange={changeHandler}/>}/>
                    </Box>
                  </Grid>

                </Grid>
                <Grid item container>
                  <Grid item xs={8} sm={8} lg={8}>
                    <Typography>02:00 Pm - 03:00 Pm</Typography>
                  </Grid>

                  <Grid item xs={4} sm={4} lg={4}>
                    <Box sx={{mb: 6}}>
                      <FormControlLabel control={<Switch name='time2pto3p' checked={allSwitchValues.time2pto3p}
                                                         onChange={changeHandler}/>}/>
                    </Box>
                  </Grid>

                </Grid>
                <Grid item container>
                  <Grid item xs={8} sm={8} lg={8}>
                    <Typography>03:00 Pm - 04:00 Pm</Typography>
                  </Grid>

                  <Grid item xs={4} sm={4} lg={4}>
                    <Box sx={{mb: 6}}>
                      <FormControlLabel control={<Switch name='time3pto4p' checked={allSwitchValues.time3pto4p}
                                                         onChange={changeHandler}/>}/>
                    </Box>
                  </Grid>

                </Grid>
                <Grid item container>
                  <Grid item xs={8} sm={8} lg={8}>
                    <Typography>04:00 Pm - 05:00 Pm</Typography>
                  </Grid>

                  <Grid item xs={4} sm={4} lg={4}>
                    <Box sx={{mb: 6}}>
                      <FormControlLabel control={<Switch name='time4pto5p' checked={allSwitchValues.time4pto5p}
                                                         onChange={changeHandler}/>}/>
                    </Box>
                  </Grid>

                </Grid>
                <Grid item container>
                  <Grid item xs={8} sm={8} lg={8}>
                    <Typography>05:00 Pm - 06:00 Pm</Typography>
                  </Grid>

                  <Grid item xs={4} sm={4} lg={4}>
                    <Box sx={{mb: 6}}>
                      <FormControlLabel control={<Switch name='time5pto6p' checked={allSwitchValues.time5pto6p}
                                                         onChange={changeHandler}/>}/>
                    </Box>
                  </Grid>

                </Grid>
                <Grid item container>
                  <Grid item xs={8} sm={8} lg={8}>
                    <Typography>06:00 Pm - 07:00 Pm</Typography>
                  </Grid>

                  <Grid item xs={4} sm={4} lg={4}>
                    <Box sx={{mb: 6}}>
                      <FormControlLabel control={<Switch name='time6pto7p' checked={allSwitchValues.time6pto7p}
                                                         onChange={changeHandler}/>}/>
                    </Box>
                  </Grid>

                </Grid>
                <Grid item container>
                  <Grid item xs={8} sm={8} lg={8}>
                    <Typography>07:00 Pm - 08:00 Pm</Typography>
                  </Grid>

                  <Grid item xs={4} sm={4} lg={4}>
                    <Box sx={{mb: 6}}>
                      <FormControlLabel control={<Switch name='time7pto8p' checked={allSwitchValues.time7pto8p}
                                                         onChange={changeHandler}/>}/>
                    </Box>
                  </Grid>

                </Grid>


                {/* <Grid item container >
                                    <Grid item xs={8} sm={8} lg={8} >
                                        <Typography>9:00 Am - 11:00 Am</Typography>
                                    </Grid>

                                    <Grid item xs={4} sm={4} lg={4} >
                                        <Box sx={{ mb: 6 }}>
                                            <FormControlLabel control={<Switch name='time9t11' checked={allSwitchValues.time9t11} onChange={changeHandler} />} />
                                        </Box>
                                    </Grid>

                                </Grid>
                                <Grid item container >
                                    <Grid item xs={8} sm={8} lg={8} >
                                        <Typography>11:00 Am - 01:00 Pm</Typography>
                                    </Grid>

                                    <Grid item xs={4} sm={4} lg={4} >
                                        <Box sx={{ mb: 6 }}>
                                            <FormControlLabel control={<Switch name='time11t1' checked={allSwitchValues.time11t1} onChange={changeHandler} />} />
                                        </Box>
                                    </Grid>

                                </Grid>
                                <Grid item container >
                                    <Grid item xs={8} sm={8} lg={8} >
                                        <Typography>01:00 Pm - 03:00 Pm</Typography>
                                    </Grid>

                                    <Grid item xs={4} sm={4} lg={4} >
                                        <Box sx={{ mb: 6 }}>
                                            <FormControlLabel control={<Switch name='time1t3' checked={allSwitchValues.time1t3} onChange={changeHandler} />} />
                                        </Box>
                                    </Grid>

                                </Grid>
                                <Grid item container >
                                    <Grid item xs={8} sm={8} lg={8} >
                                        <Typography>03:00 Pm - 05:00 Pm</Typography>
                                    </Grid>

                                    <Grid item xs={4} sm={4} lg={4} >
                                        <Box sx={{ mb: 6 }}>
                                            <FormControlLabel control={<Switch name='time3t5' checked={allSwitchValues.time3t5} onChange={changeHandler} />} />
                                        </Box>
                                    </Grid>

                                </Grid>
                                <Grid item container >
                                    <Grid item xs={8} sm={8} lg={8} >
                                        <Typography>05:00 Pm - 07:00 Pm</Typography>
                                    </Grid>

                                    <Grid item xs={4} sm={4} lg={4} >
                                        <Box sx={{ mb: 6 }}>
                                            <FormControlLabel control={<Switch name='time5t7' checked={allSwitchValues.time5t7} onChange={changeHandler} />} />
                                        </Box>
                                    </Grid>

                                </Grid>
                                <Grid item container >
                                    <Grid item xs={8} sm={8} lg={8} >
                                        <Typography>07:00 Pm - 09:00 Pm</Typography>
                                    </Grid>

                                    <Grid item xs={4} sm={4} lg={4} >
                                        <Box sx={{ mb: 6 }}>
                                            <FormControlLabel control={<Switch name='time7t9' checked={allSwitchValues.time7t9} onChange={changeHandler} />} />
                                        </Box>
                                    </Grid>

                                </Grid> */}
              </>
            )}


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

export default AddTimeSlots
