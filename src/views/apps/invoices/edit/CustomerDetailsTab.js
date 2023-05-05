// ** React Imports
import {useState, Fragment} from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import Typography from '@mui/material/Typography'


import dynamic from "next/dynamic";

const CustomerMap = dynamic(() => import("./CustomerDetailsCompoents/CustomerMap"), {
  ssr: false
});


const CustomerDetailsTab = ({data, itemAddedRefresh, setItemAddedRefresh}) => {
  const [plong, setplong] = useState('42.9273618');
  const [plat, setplat] = useState('-72.2853184');


  const [maptype, setMapType] = useState('pickup')

  const [customerMapDialog, setCustomerMapDialogOpen] = useState(false)
  const toggleCustomerMapDialog = (type) => {
    if (type === 0) {
      setMapType('pickup')
      setplong(data?.pickupAddressData?.long)
      setplat(data?.pickupAddressData?.lat)
    } else {
      setMapType('delivery')
      setplong(data?.deliveryAddressData?.long)
      setplat(data?.deliveryAddressData?.lat)
    }
    setCustomerMapDialogOpen(!customerMapDialog)
  }


  return (
    <>
      <Fragment>
        <Card sx={{mb: 6}}>
          <CardHeader
            title='Pickup Address'
            titleTypographyProps={{variant: 'h6'}}
            action={
              <>
                <Button sx={{mr: 4}} variant='contained' onClick={() => toggleCustomerMapDialog(0)}>
                  Locate
                </Button>

              </>

            }
          />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item xs={12} lg={4}>
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
                            Address Type:
                          </Typography>
                        </TableCell>
                        <TableCell>{data?.pickupAddressData?.addressType}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                            House No :
                          </Typography>
                        </TableCell>
                        <TableCell>{data?.pickupAddressData?.houseNo}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                            Street:
                          </Typography>
                        </TableCell>
                        <TableCell>{data?.pickupAddressData?.street}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                            Mobile No :
                          </Typography>
                        </TableCell>
                        <TableCell>{data?.pickupAddressData?.mobileNo}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                            Place Name:
                          </Typography>
                        </TableCell>
                        <TableCell>{data?.pickupAddressData?.placeName}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>

              <Grid item xs={12} lg={4}>
                <TableContainer>
                  <Table size='small'>
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
                            Place Address:
                          </Typography>
                        </TableCell>
                        <TableCell>{data?.pickupAddressData?.placeAddress}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                            Landmark:
                          </Typography>
                        </TableCell>
                        <TableCell>{data?.pickupAddressData?.landmark}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                            Zip Code:
                          </Typography>
                        </TableCell>
                        <TableCell>{data?.pickupAddressData?.pincode}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                            Locality :
                          </Typography>
                        </TableCell>
                        <TableCell>{data?.pickupAddressData?.locality}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                            City :
                          </Typography>
                        </TableCell>
                        <TableCell>{data?.pickupAddressData?.city}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>

              <Grid item xs={12} lg={4}>
                <TableContainer>
                  <Table size='small'>
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
                            District:
                          </Typography>
                        </TableCell>
                        <TableCell>{data?.pickupAddressData?.district}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                            Region:
                          </Typography>
                        </TableCell>
                        <TableCell>{data?.pickupAddressData?.region}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                            Country:
                          </Typography>
                        </TableCell>
                        <TableCell>{data?.pickupAddressData?.country}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </CardContent>


        </Card>
        <Card sx={{mb: 6}}>
          <CardHeader
            title='Delivery Address'
            titleTypographyProps={{variant: 'h6'}}
            action={
              <>
                <Button sx={{mr: 4}} variant='contained' onClick={() => toggleCustomerMapDialog(1)}>
                  Locate
                </Button>

              </>

            }
          />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item xs={12} lg={4}>
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
                            Address Type:
                          </Typography>
                        </TableCell>
                        <TableCell>{data?.deliveryAddressData?.addressType}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                            House No :
                          </Typography>
                        </TableCell>
                        <TableCell>{data?.deliveryAddressData?.houseNo}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                            Street:
                          </Typography>
                        </TableCell>
                        <TableCell>{data?.deliveryAddressData?.street}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                            Mobile No :
                          </Typography>
                        </TableCell>
                        <TableCell>{data?.deliveryAddressData?.mobileNo}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                            Place Name:
                          </Typography>
                        </TableCell>
                        <TableCell>{data?.deliveryAddressData?.placeName}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>

              <Grid item xs={12} lg={4}>
                <TableContainer>
                  <Table size='small'>
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
                            Place Address:
                          </Typography>
                        </TableCell>
                        <TableCell>{data?.deliveryAddressData?.placeAddress}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                            Landmark:
                          </Typography>
                        </TableCell>
                        <TableCell>{data?.deliveryAddressData?.landmark}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                            Zip Code:
                          </Typography>
                        </TableCell>
                        <TableCell>{data?.deliveryAddressData?.pincode}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                            Locality :
                          </Typography>
                        </TableCell>
                        <TableCell>{data?.deliveryAddressData?.locality}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                            City :
                          </Typography>
                        </TableCell>
                        <TableCell>{data?.deliveryAddressData?.city}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>

              <Grid item xs={12} lg={4}>
                <TableContainer>
                  <Table size='small'>
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
                            District:
                          </Typography>
                        </TableCell>
                        <TableCell>{data?.deliveryAddressData?.district}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                            Region:
                          </Typography>
                        </TableCell>
                        <TableCell>{data?.deliveryAddressData?.region}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                            Country:
                          </Typography>
                        </TableCell>
                        <TableCell>{data?.deliveryAddressData?.country}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </CardContent>


        </Card>


      </Fragment>
      <CustomerMap open={customerMapDialog} toggle={toggleCustomerMapDialog} mapType={maptype} plong={plong}
                   plat={plat}/>
    </>
  )
}

export default CustomerDetailsTab


// "district": "New York County",
// "region": "New York",
// "country": "United States"
