// ** React Imports
import { forwardRef, useState } from 'react'

// ** MUI Imports
import Image from 'mdi-material-ui'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import Table from '@mui/material/Table'
import DialogContentText from '@mui/material/DialogContentText'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import FormHelperText from '@mui/material/FormHelperText'
import Slide from '@mui/material/Slide'
// ** Icons Imports
// import { Image } from "mdi-material-ui";
import Close from 'mdi-material-ui/Close'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'

import { styled } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'

import riderConfig from 'src/configs/rider'
import documentConfig from 'src/configs/document'
import { useEffect } from 'react'

import axios from 'axios'
import authConfig from 'src/configs/auth'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const schema = yup.object().shape({
  reason: yup.string().required()
})

const defaultValues = {
  reason: ''
}

const DocumentViewDialog = props => {
  // ** Props
  const { open, toggle, row, setDocument, rider, viewId, reloadDocument, setReloadDocument } = props

  const [riderVehicleData, setRiderVehicleData] = useState(null)

  const [statusreload, setStatusreload] = useState(0)
  const [changeStatus, setChangeStatus] = useState('')

  useEffect(() => {
    if (statusreload == 0) {
      if (row?.isVerified == true) {
        setVerified('Accepted')
      } else {
        setVerified('Rejected')
      }
    } else {
      setVerified(changeStatus)
    }
  }, [row, statusreload])

  useEffect(() => {
    if (viewId != null) {
      const data = []

      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
      }
      axios
        .get(riderConfig.GetRiderVehicleEndPoint, { params: { riderId: viewId }, headers })
        .then(response => {
          setRiderVehicleData(response.data.data.data)
        })
        .catch(() => {
          setRiderVehicleData(null)
        })
    }
  }, [viewId])

  const {
    watch,
    register,
    reset,
    control,
    setValue,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const [openDialog, setOpenDialog] = useState(false)
  const [openAcceptDialog, setOpenAcceptDialog] = useState(false)
  const [dialogType, setDialogType] = useState('success')
  const [dialogMessage, setDialogMessage] = useState('')

  const handleClickOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleClickOpenAcceptDialog = () => {
    setOpenAcceptDialog(true)
  }

  const handleCloseDialog = () => {
    if (dialogType == 'success') {
      // categoryAddedSuccess();
      setOpenDialog(false)
      handleRejcectClose()
      // toggle()
    } else if (dialogType == 'warning') {
      setDialogMessage('')
      setLoading(false)
    }
    setOpenDialog(false)
  }

  const handleCloseAcceptDialog = () => {
    if (dialogType == 'success') {
      setOpenAcceptDialog(false)
    } else if (dialogType == 'successdelete') {
      setOpenAcceptDialog(false)
      toggle()
    }
    setOpenAcceptDialog(false)
  }

  const [openRejectionForm, setOpenRejectionForm] = useState(false)

  const handleRejcectOpen = () => {
    setOpenRejectionForm(true)
  }

  const handleRejcectClose = () => {
    reset()
    setOpenRejectionForm(false)
  }

  const [verified, setVerified] = useState('')

  const onSubmit = data => {
    // const data = [];
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
    }

    axios
      .put(
        documentConfig.DocumentUpdatepoint,
        {
          proofId: row.id,
          isVerified: false,
          description: data.reason
        },
        { headers }
      )
      .then(response => {
        setDialogType('success')
        setDialogMessage(response?.data?.message)
        setStatusreload(statusreload + 1)
        setChangeStatus('Rejected')
        handleClickOpenDialog()
        setReloadDocument(reloadDocument + 1)
      })
      .catch(e => {
        setDialogType('failed')
        setDialogMessage(e?.response?.data?.message)
        handleClickOpenDialog()
      })
  }

  const onAccept = () => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
    }

    axios
      .put(documentConfig.DocumentUpdatepoint, { proofId: row.id, isVerified: 1 }, { headers })
      .then(response => {
        setStatusreload(statusreload + 1)
        setChangeStatus('Accepted')

        setDialogType('success')
        setDialogMessage(response?.data?.message)

        handleClickOpenAcceptDialog()
        setReloadDocument(reloadDocument + 1)
      })
      .catch(e => {
        setDialogType('failed')
        setDialogMessage(e?.response?.data?.message)
        handleClickOpenAcceptDialog()
      })
  }

  const onpending = () => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
    }

    axios
      .put(documentConfig.DocumentUpdatepoint, { proofId: row.id, isVerified: 0 }, { headers })
      .then(response => {
        setStatusreload(statusreload + 1)
        setChangeStatus('warning')
        setDialogType('success')
        setDialogMessage(response?.data?.message)

        handleClickOpenAcceptDialog()
        setReloadDocument(reloadDocument + 1)
      })
      .catch(e => {
        setDialogType('failed')
        setDialogMessage(e?.response?.data?.message)
        handleClickOpenAcceptDialog()
      })
  }

  const onpendingClicked = () => {
    setDialogType('warning')
    setDialogMessage('Do you really want to edit this data?')
    handleClickOpenAcceptDialog()
  }

  const onDeleteClicked = () => {
    setDialogType('warning')
    setDialogMessage('Do you really want to edit this data?')
    handleClickOpenAcceptDialog()
  }

  const onDelete = () => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
    }

    axios
      .delete(documentConfig.DocumentRemoveEndpoint + '?proofId=' + row.id, { headers })
      .then(response => {
        setDialogType('successdelete')
        setDialogMessage(response?.data?.message)

        handleClickOpenAcceptDialog()
        setReloadDocument(reloadDocument + 1)
      })
      .catch(e => {
        setDialogType('failed')
        setDialogMessage(e?.response?.data?.message)
        handleClickOpenAcceptDialog()
      })
  }

  return (
    <div>
      <Dialog
        fullScreen
        onClose={() => {
          setStatusreload(0)
          toggle()
        }}
        aria-labelledby='full-screen-dialog-title'
        open={open}
      >
        <DialogTitle id='full-screen-dialog-title'>
          <Grid>
            <Typography variant='h6' component='span'>
              Document View
            </Typography>
            <Typography color='info' component='span' sx={{ ml: 8 }}>
              {/* {(row.isVerified == true ? 'Accepted' : 'Rejected')} */}
              {verified}
            </Typography>
            <Button onClick={onAccept} variant='contained' color='success' sx={{ ml: 6 }}>
              Accept
            </Button>
            <Button onClick={onpending} variant='contained' color='info' sx={{ ml: 6 }}>
              Pending
            </Button>
            <Button onClick={handleRejcectOpen} variant='contained' color='error' sx={{ ml: 6 }}>
              Reject
            </Button>
            <Button onClick={onDeleteClicked} variant='contained' color='error' sx={{ ml: 6 }}>
              Delete
            </Button>
          </Grid>

          <IconButton
            aria-label='close'
            onClick={() => {
              setStatusreload(0)
              toggle()
            }}
            sx={{ top: 8, right: 10, position: 'absolute', color: theme => theme.palette.grey[500] }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 6 }} dividers>
          <Grid container spacing={6}>
            <Grid
              style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
              item
              xs={12}
              sm={12}
              md={4}
              sx={{ height: '86vh', overflow: 'auto' }}
            >
              <Card sx={{ mb: 6, mr: 4 }}>
                <CardHeader title='Details' titleTypographyProps={{ variant: 'h6' }} />
                <CardContent>
                  <Grid container spacing={6}>
                    <Grid item xs={12} lg={12}>
                      <TableContainer>
                        <Table size='small' sx={{ width: '95%' }}>
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
                                <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                                  Full Name :
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography variant='body2'>{rider?.name}</Typography>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                                  Username :
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography variant='body2'>{rider?.username}</Typography>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                                  Mobile No. :
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography variant='body2'>
                                  {rider?.countryCode}
                                  {rider.mobileNo}
                                </Typography>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                                  Alternative Mobile No. :
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography variant='body2'>
                                  {rider?.countryCode}
                                  {rider.alternativeMobile}
                                </Typography>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                                  Date of Birth :
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography variant='body2'>{rider?.dob}</Typography>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                                  Gender :
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography variant='subtitle2'>{rider?.gender}</Typography>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                                  Father Name :
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography variant='subtitle2'>{rider?.fatherName}</Typography>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={12} md={8}>
              <Box
                component='img'
                sx={{
                  width: '92%'
                }}
                alt='The house from the offer.'
                src={row?.image}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <Dialog
          open={openAcceptDialog}
          keepMounted
          onClose={handleCloseAcceptDialog}
          TransitionComponent={Transition}
          aria-labelledby='alert-dialog-slide-title'
          aria-describedby='alert-dialog-slide-description'
        >
          {dialogType == 'success' && <DialogTitle id='alert-dialog-slide-title'>Success</DialogTitle>}
          {dialogType == 'successdelete' && <DialogTitle id='alert-dialog-slide-title'>Success</DialogTitle>}
          {dialogType == 'failed' && <DialogTitle id='alert-dialog-slide-title'>Error</DialogTitle>}
          {dialogType == 'warning' && <DialogTitle id='alert-dialog-slide-title'>Warning</DialogTitle>}

          <DialogContent>
            <DialogContentText id='alert-dialog-slide-description'>{dialogMessage}</DialogContentText>
          </DialogContent>
          <DialogActions className='dialog-actions-dense'>
            {dialogType == 'warning' && (
              <>
                <Button onClick={onDelete}>Continue</Button>
                <Button onClick={handleCloseAcceptDialog}>Cancel</Button>
              </>
            )}
            {dialogType == 'success' && (
              <>
                <Button onClick={handleCloseAcceptDialog}>OK</Button>
              </>
            )}
            {dialogType == 'successdelete' && (
              <>
                <Button onClick={handleCloseAcceptDialog}>OK</Button>
              </>
            )}
            {dialogType == 'failed' && (
              <>
                <Button onClick={handleCloseAcceptDialog}>OK</Button>
              </>
            )}
          </DialogActions>
        </Dialog>
      </Dialog>

      <Dialog
        open={openRejectionForm}
        onClose={handleRejcectClose}
        aria-labelledby='user-view-edit'
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650, p: [2, 10] } }}
        aria-describedby='user-view-edit-description'
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle id='user-view-edit' sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
            Rejection Form
          </DialogTitle>
          <DialogContent>
            <DialogContentText variant='body2' id='user-view-edit-description' sx={{ textAlign: 'center', mb: 7 }}>
              Please provide the reason of rejection.
            </DialogContentText>

            <Grid container spacing={6}>
              <Grid item xs={12} sm={12}>
                <FormControl fullWidth sx={{ mb: 6 }}>
                  <Controller
                    name='reason'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        fullWidth
                        rows={4}
                        multiline
                        value={value}
                        label='Reason'
                        onChange={onChange}
                        // placeholder=''
                        error={Boolean(errors.reason)}
                      />
                    )}
                  />
                  {errors.reason && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.reason.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center' }}>
            <Button type='submit' variant='contained' sx={{ mr: 1 }}>
              Submit
            </Button>
            <Button variant='outlined' color='secondary' onClick={handleRejcectClose}>
              Discard
            </Button>
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
          {dialogType == 'success' && <DialogTitle id='alert-dialog-slide-title'>Success</DialogTitle>}
          {dialogType == 'failed' && <DialogTitle id='alert-dialog-slide-title'>Error</DialogTitle>}
          {dialogType == 'warning' && <DialogTitle id='alert-dialog-slide-title'>Warning</DialogTitle>}

          <DialogContent>
            <DialogContentText id='alert-dialog-slide-description'>{dialogMessage}</DialogContentText>
          </DialogContent>
          <DialogActions className='dialog-actions-dense'>
            {dialogType == 'warning' && (
              <>
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

export default DocumentViewDialog
