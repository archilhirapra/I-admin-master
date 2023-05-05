// ** React Imports
import {forwardRef, useEffect, useState} from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'

import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

import {fetchRiderList} from 'src/store/apps/rider'
import {useDispatch, useSelector} from 'react-redux'
import {auto} from '@popperjs/core'
import dynamic from "next/dynamic"

const SingleRideLiveTracking = dynamic(() => import("src/views/apps/rides/single-map-view-dialog/SingleRideLiveViewDialog"), {
  ssr: false
});


const RidesDetailsTabView = () => {
  const dispatch = useDispatch()
  const [singleLiveViewDialog, setSingleLiveViewDialogOpen] = useState(false)

  useEffect(() => {
    dispatch(fetchRiderList({}))
    // console.log(categoryStore);
  }, [])

  const riderStore = useSelector(state => state.rider)
  console.log(riderStore);


  const [pickUpRiderValue, setPickUpRiderValue] = useState(null)

  const handleChangePickUpRider = (newValue) => {
    setPickUpRiderValue(newValue)
  }


  const [dialogTitle, setDialogTitle] = useState('');
  const toggleSingleLiveViewDialog = () => {
    setDialogTitle('Pickup');
    setSingleLiveViewDialogOpen(!singleLiveViewDialog)
  }


  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sm={12} md={4}>
        {/* <Grid style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }} item xs={12} sm={12} md={4} sx={{ height: '86vh', overflow: 'auto' }}> */}

        <Card sx={{mb: 6, mr: 4}}>
          <CardHeader
            title='Ride Details'
            titleTypographyProps={{variant: 'h6'}}
          />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item xs={12} lg={12}>
                <TableContainer>
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
                            Customer Name :
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='body2'>customer Name</Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                            Booking Id:
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='body2'>123331</Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                            Ride Id :
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='body2'>3242342</Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                            Ride Type :
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='body2'>Pickup</Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                            Same Day Pickup :
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='body2'>Yes</Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                            Same Day Delivery :
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='body2'>No</Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                            Generated By :
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='body2'>Ram</Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                            Created At :
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='subtitle2'>11/21/2022</Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                            Updated At :
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='subtitle2'>11/21/2022</Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                            Ride Status :
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='subtitle2'>Active</Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                            Pickup Assigned To :
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='subtitle2'>hari</Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                            Delivery Assigned To :
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='subtitle2'>shyam</Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                            Return Assigned To :
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='subtitle2'>krishna</Typography>
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
        <Card sx={{mb: 6, mr: 4}}>
          <CardHeader
            title='Pickup Rider'
            titleTypographyProps={{variant: 'h6'}}
          />
          <CardContent>
            <Grid container spacing={6}>

              <Grid container item sm={12} xs={12}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Autocomplete sx={{mb: 2, ml: 2}}
                                  value={pickUpRiderValue}
                      // sx={{ width: 250 }}
                                  options={riderStore.data}

                                  onChange={(_, data) => {
                                    handleChangePickUpRider(data)
                                  }}
                                  getOptionLabel={option => option.name}
                                  renderInput={params => <TextField {...params} label='Select Category'/>}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={2} md={2} sx={{alignSelf: 'center'}}>
                  <FormControl fullWidth>
                    <Button sx={{mb: 2, ml: 2}} variant='contained'>
                      Assign
                    </Button>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={2} md={2} sx={{alignSelf: 'center'}}>
                  <FormControl fullWidth>
                    <Button onClick={toggleSingleLiveViewDialog} sx={{mb: 2, ml: 2}} variant='contained'>
                      Track
                    </Button>
                  </FormControl>
                </Grid>

              </Grid>

              <Grid item xs={12} lg={12}>
                <TableContainer>
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
                            Pickup Status :
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='body2'>Active</Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                            Eta :
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='body2'>30 min</Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                            Rider Name :
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='body2'>ASdf</Typography>
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
      <SingleRideLiveTracking open={singleLiveViewDialog} toggle={toggleSingleLiveViewDialog} title={dialogTitle}/>
    </Grid>
  )
}

export default RidesDetailsTabView
