// ** React Imports
import {forwardRef, Fragment, useState, useEffect} from 'react'
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
// import { addUser } from 'src/store/apps/user'
import {addAdmin, editAdmin} from 'src/store/apps/admin'
// import { addCategory } from 'src/store/apps/services/categories'
import Switch from '@mui/material/Switch'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import {CircularProgress, Dialog, Input} from '@mui/material'


import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'


import Divider from '@mui/material/Divider';

// import Button from '@mui/material/Button'
// import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Slide from '@mui/material/Slide'
import DialogContentText from '@mui/material/DialogContentText'
import {IconPictureAsPdf} from '@aws-amplify/ui-react'

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

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required(),
  mobileNo: yup.string().required(),
  aMobileNo: yup.string().required('Alternative mobile number is required'),
  dob: yup.string().required(),
  gender: yup.string().required(),
  fatherName: yup.string().required(),
  blood: yup.string().required(),
  role: yup.string().required(),
  status: yup.string().required(),
})

const defaultValues = {
  name: '',
  email: '',
  mobileNo: '',
  aMobileNo: '',
  dob: '',
  gender: '',
  fatherName: '',
  blood: '',
  role: '',
  status: '',

}

const EditAdminDrawer = props => {

  const {open, toggle, editId, setEditId, editRow, setEditRow} = props


  editRow?.subscriptionData.map((item, index) => {
  })


  const handleClose = () => {
    setEditRow(null)
    toggle()
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
        <Typography variant='h6'>Subscription</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{cursor: 'pointer'}}/>
      </Header>

      <Box sx={{p: 5}}>

        <Grid container spacing={5}>

          {editRow?.subscriptionData.map((item, index) => {
            return (
              <Fragment>
                <TableContainer sx={{p: 5}}>
                  <Table size='small' sx={{width: '95%'}}>
                    <TableBody
                      sx={{
                        '& .MuiTableCell-root': {
                          border: 0,
                          pt: 2,
                          pb: 2,
                          pl: '0 !important',
                          pr: '0 !important',
                          '&:first-of-type': {
                            width: 148
                          }
                        }
                      }}
                    >
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                            Order Id :
                          </Typography>
                        </TableCell>
                        <TableCell>{item?.orderId}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                            Plan Id :
                          </Typography>
                        </TableCell>
                        <TableCell>{item?.planId}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                            Start Date:
                          </Typography>
                        </TableCell>
                        <TableCell>{item?.startDate}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                            End Date :
                          </Typography>
                        </TableCell>
                        <TableCell>{item?.endDate}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                            Price:
                          </Typography>
                        </TableCell>
                        <TableCell>${item?.price}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                            Duration:
                          </Typography>
                        </TableCell>
                        <TableCell>{item?.duration}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                            Used Days:
                          </Typography>
                        </TableCell>
                        <TableCell>{item?.usedDays}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                            Pending Days:
                          </Typography>
                        </TableCell>
                        <TableCell>{item?.pendingDays}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                            note:
                          </Typography>
                        </TableCell>
                        <TableCell>{item?.note}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                            Pickup:
                          </Typography>
                        </TableCell>
                        <TableCell>{item?.pickup}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                            Delivery:
                          </Typography>
                        </TableCell>
                        <TableCell>{item?.delivery}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                            Payment Id:
                          </Typography>
                        </TableCell>
                        <TableCell>{item?.paymentId}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                            Status:
                          </Typography>
                        </TableCell>
                        <TableCell>{item?.status}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                            Created At:
                          </Typography>
                        </TableCell>
                        <TableCell>{item?.createdAt}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                            Updated At:
                          </Typography>
                        </TableCell>
                        <TableCell>{item?.updatedAt}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <Grid item xs={12}>
                  <Divider xs={12}/>
                </Grid>


              </Fragment>
            )

          })}


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
            {false ? (
              <Box sx={{display: "flex", justifyContent: "center"}}>
                <CircularProgress disableShrink sx={{textAlign: "center", justifyContent: "center"}}/>
              </Box>

            ) : (
              <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

                <Button size='large' variant='contained' onClick={handleClose}>
                  Close
                </Button>
              </Box>
            )}

          </Grid>
        </BoxStyle>
      </Box>

    </Drawer>
  )
}

export default EditAdminDrawer
