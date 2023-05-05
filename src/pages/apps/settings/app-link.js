// ** React Imports
import {forwardRef, useState} from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import {styled} from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'


// ** Icons Imports
import Close from 'mdi-material-ui/Close'


import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm, Controller} from 'react-hook-form'


import 'react-datepicker/dist/react-datepicker.css'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import DatePicker from 'react-datepicker'
import {useEffect} from 'react'


import adminConfig from 'src/configs/admin'
import axios from 'axios'
import authConfig from 'src/configs/auth'


const CustomInput = forwardRef(({...props}, ref) => {
  return <TextField inputRef={ref} {...props} sx={{width: '100%'}}/>
})


const ImgStyled = styled('img')(({theme}) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(5),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({theme}) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({theme}) => ({
  marginLeft: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const TabAccount = () => {

  const schema = yup.object().shape({
    // android: yup.string().required(),
    // ios: yup.string().required(),
  })

  const defaultValues = {
    android: '',
    ios: '',
  }
  const {
    getValues,
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


  const [refresh, setRefresh] = useState(0)

  useEffect(() => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
    }
    axios
      .get(adminConfig.AppLinkEndpoint, {params: {}, headers})
      .then(response => {
        setData(response.data.data.data)
        let android = response.data.data.data.find((element) => element.deviceType == 'Android')
        let iOS = response.data.data.data.find((element) => element.deviceType == 'Ios')
        setValue('android', android?.apkLink)
        setValue('ios', iOS?.apkLink)
        setIsEditAndroid(false)
        setIsEditios(false)

      })
      .catch(() => {
        setData(null)
      })

  }, [refresh])


  const handleAndroidSave = () => {
    let android = getValues("android")
    if (getValues("android") == '') {
      android = '#'
    }
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
    }
    axios
      .post(adminConfig.AppLinkAddEndpoint, {apkLink: android, isAndroid: true}, {headers})
      .then(response => {
        setRefresh(refresh + 1)
      })
      .catch((e) => {
        console.log(e)
      })
  }
  const handleIosSave = () => {
    let ios = getValues("ios")
    if (getValues("ios") == '') {
      ios = '#'
    }
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
    }
    axios
      .post(adminConfig.AppLinkAddEndpoint, {apkLink: ios, isAndroid: false}, {headers})
      .then(response => {
        setRefresh(refresh + 1)
      })
      .catch((e) => {
        console.log(e)
      })
  }


  // ** State
  const [data, setData] = useState(null)

  const [isEditAndroid, setIsEditAndroid] = useState(false)
  const [isEditios, setIsEditios] = useState(false)

  const onEditAndroidClick = () => {
    setIsEditAndroid(true)
  }
  const onCancelAndroidClicked = () => {
    setIsEditAndroid(false)
  }
  const onEditiosClick = () => {
    setIsEditios(true)
  }
  const onCanceliosClicked = () => {
    setIsEditios(false)
  }


  return (
    <CardContent>
      <form>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={12}>
            <FormControl fullWidth>
              <Controller
                name='android'
                control={control}
                rules={{required: true}}
                render={({field: {value, onChange}}) => (
                  <TextField
                    disabled={!isEditAndroid}
                    // type='email'
                    value={value}
                    label='Androiod App Url'
                    onChange={onChange}
                    error={Boolean(errors.android)}
                  />
                )}
              />
              {errors.android && (
                <FormHelperText sx={{color: 'error.main'}} id='validation-basic-email'>
                  This field is required
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            {isEditAndroid ? (
              <>
                <Button onClick={handleAndroidSave} variant='contained' sx={{mr: 4}}>
                  Save
                </Button>
                <Button onClick={onCancelAndroidClicked} color='error' variant='contained' sx={{mr: 4}}>
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button onClick={onEditAndroidClick} variant='contained' sx={{mr: 4}}>
                  Edit
                </Button>
              </>
            )}

          </Grid>


          <Grid item xs={12} sm={12}>
            <FormControl fullWidth>
              <Controller
                name='ios'
                control={control}
                rules={{required: true}}
                render={({field: {value, onChange}}) => (
                  <TextField
                    disabled={!isEditios}
                    // type='email'
                    value={value}
                    label='iOS App Url'
                    onChange={onChange}
                    error={Boolean(errors.ios)}
                  />
                )}
              />
              {errors.ios && (
                <FormHelperText sx={{color: 'error.main'}} id='validation-basic-email'>
                  This field is required
                </FormHelperText>
              )}
            </FormControl>
          </Grid>


          <Grid item xs={12}>
            {isEditios ? (
              <>
                <Button onClick={handleIosSave} variant='contained' sx={{mr: 4}}>
                  Save
                </Button>
                <Button onClick={onCanceliosClicked} color='error' variant='contained' sx={{mr: 4}}>
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button onClick={onEditiosClick} variant='contained' sx={{mr: 4}}>
                  Edit
                </Button>
              </>
            )}

          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAccount
