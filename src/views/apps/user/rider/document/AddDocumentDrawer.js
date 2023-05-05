// ** React Imports
import {forwardRef, Fragment, useState} from 'react'
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
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'

import axios from 'axios'
import authConfig from 'src/configs/auth'
import documentConfig from 'src/configs/document'


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
// import { addUser } from 'src/store/apps/user'
// import { addCategory } from 'src/store/apps/services/categories'
import {addHelper} from 'src/store/apps/services/helpers'
import Switch from '@mui/material/Switch'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import {CircularProgress, Dialog} from '@mui/material'


// import Button from '@mui/material/Button'
// import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Slide from '@mui/material/Slide'
import DialogContentText from '@mui/material/DialogContentText'


import Autocomplete from '@mui/material/Autocomplete'

// ** Data
import {top100Films} from 'src/@fake-db/autocomplete'


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

const schema = yup.object().shape({
  title: yup.string().required(),
  image: yup.mixed().required(),
})

const defaultValues = {
  title: '',

}


const SidebarAddUser = props => {

  // ** Props
  const {open, toggle, userId, reloadDocument, setReloadDocument} = props


  // ** Hooks
  const dispatch = useDispatch()

  const {
    watch,
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


  const onSubmit = data => {

    setFilledFormData(data)
    setDialogType('warning');
    setDialogMessage('Do you really want to add this data?');
    handleClickOpenDialog()

  }

  const continueEditing = () => {
    let data = filledFormData
    setLoading(false);

    const headers = {
      Accept: 'application/json',
      // 'Content-Type': 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
    }

    const {title} = data


    axios
      .post(
        documentConfig.DocumentAddEndpoint,
        { userId: userId, title: title, isVerified: 1, image: files[0] },
        { headers }
      )
      .then(response => {
        setReloadDocument(reloadDocument + 1)

        setDialogType('success')
        setDialogMessage(response?.data?.message)
        handleClickOpenDialog()
      })
      .catch(e => {
        if (e?.response?.status == 409) {
          setDialogType('failed')
          setDialogMessage(e?.response?.data?.message)
          handleClickOpenDialog()
        } else {
          setDialogType('failed')
          setDialogMessage(
            typeof e?.response?.data?.message == undefined ? e?.response?.data?.message : 'Something went wrong'
          )
          handleClickOpenDialog()
        }
      })


  }


  const categoryAddedSuccess = () => {
    toggle()
    setFiles([])


    reset()
  }


  const handleClose = () => {

    toggle()
    setFiles([])


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
    if (file.type.startsWith('image')) {
      return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file)}/>
    } else {
      return <FileDocumentOutline/>
    }
  }

  const handleRemoveFile = file => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter(i => i.name !== file.name)
    setFiles([...filtered])
    setValue('image', undefined);
  }

  const fileList = files.map(file => (
    <ListItem key={file.name}>
      <div style={{overflow: 'hidden'}} className='file-details'>
        <div className='file-preview'>{renderFilePreview(file)}</div>
        <div>
          <Typography className='file-name'>{file.name}</Typography>
          <Typography className='file-size' variant='body2'>
            {Math.round(file.size / 100) / 10 > 1000
              ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
              : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
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
        <Typography variant='h6'>Add Document</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{cursor: 'pointer'}}/>
      </Header>

      <Box sx={{p: 5}}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{mb: 6}}>
            <Controller
              name='title'
              control={control}
              rules={{required: true}}
              render={({field: {value, onChange}}) => (
                <TextField
                  value={value}
                  label='Title'
                  onChange={onChange}
                  error={Boolean(errors.title)}
                />
              )}
            />
            {errors.title && <FormHelperText sx={{color: 'error.main'}}>{errors.title.message}</FormHelperText>}
          </FormControl>


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
                        <Box sx={{display: 'flex', flexDirection: 'column', textAlign: ['center', 'center', 'center']}}>
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
