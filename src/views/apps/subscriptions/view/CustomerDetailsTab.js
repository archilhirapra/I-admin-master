// ** React Imports
import { useState, Fragment } from 'react'
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

import dynamic from 'next/dynamic'

const CustomerMap = dynamic(() => import('./CustomerDetailsCompoents/CustomerMap'), {
  ssr: false
})

const CustomerDetailsTab = () => {
  const [plong, setplong] = useState('42.9273618')
  const [plat, setplat] = useState('-72.2853184')
  const [dlong, setdlong] = useState('42.9273618')
  const [dlat, setdlat] = useState('-72.2853184')

  const [maptype, setMapType] = useState('pickup')

  const [customerMapDialog, setCustomerMapDialogOpen] = useState(false)
  const toggleCustomerMapDialog = type => {
    if (type === 0) {
      setMapType('pickup')
    } else {
      setMapType('delivery')
    }
    // console.log()
    setCustomerMapDialogOpen(!customerMapDialog)
  }

  return (
    <>
      <Fragment>
        <Card sx={{ mb: 6 }}>
          <CardHeader
            title='Pickup Address'
            titleTypographyProps={{ variant: 'h6' }}
            action={
              <>
                <Button sx={{ mr: 4 }} variant='contained' onClick={() => toggleCustomerMapDialog(0)}>
                  Locate
                </Button>
              </>
            }
          />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item xs={12} lg={4}>
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
                            Address Type:
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='body2'>Home</Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                            House No :
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='body2'>105</Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                            Street:
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='body2'>Walley</Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                            Mobile No :
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='body2'>+1-85858585</Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                            Place Name:
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='subtitle2'>Strand Bookstore at Club Monaco</Typography>
                        </TableCell>
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
                          <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                            Place Address:
                          </Typography>
                        </TableCell>
                        <TableCell>Strand Bookstore at Club Monaco, 160 5th Ave</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                            Landmark:
                          </Typography>
                        </TableCell>
                        <TableCell>The Flatiron District</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                            Zip Code:
                          </Typography>
                        </TableCell>
                        <TableCell>10010</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                            Locality :
                          </Typography>
                        </TableCell>
                        <TableCell>Manhattan</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                            City :
                          </Typography>
                        </TableCell>
                        <TableCell>New York City</TableCell>
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
                          <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                            District:
                          </Typography>
                        </TableCell>
                        <TableCell>New York County</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                            Region:
                          </Typography>
                        </TableCell>
                        <TableCell>New York</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                            Country:
                          </Typography>
                        </TableCell>
                        <TableCell>United States</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card sx={{ mb: 6 }}>
          <CardHeader
            title='Delivery Address'
            titleTypographyProps={{ variant: 'h6' }}
            action={
              <>
                <Button sx={{ mr: 4 }} variant='contained' onClick={() => toggleCustomerMapDialog(1)}>
                  Locate
                </Button>
              </>
            }
          />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item xs={12} lg={4}>
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
                            Address Type:
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='body2'>Home</Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                            House No :
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='body2'>105</Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                            Street:
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='body2'>Walley</Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                            Mobile No :
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='body2'>+1-85858585</Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                            Place Name:
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='subtitle2'>Strand Bookstore at Club Monaco</Typography>
                        </TableCell>
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
                          <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                            Place Address:
                          </Typography>
                        </TableCell>
                        <TableCell>Strand Bookstore at Club Monaco, 160 5th Ave</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                            Landmark:
                          </Typography>
                        </TableCell>
                        <TableCell>The Flatiron District</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                            Zip Code:
                          </Typography>
                        </TableCell>
                        <TableCell>10010</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                            Locality :
                          </Typography>
                        </TableCell>
                        <TableCell>Manhattan</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                            City :
                          </Typography>
                        </TableCell>
                        <TableCell>New York City</TableCell>
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
                          <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                            District:
                          </Typography>
                        </TableCell>
                        <TableCell>New York County</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                            Region:
                          </Typography>
                        </TableCell>
                        <TableCell>New York</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                            Country:
                          </Typography>
                        </TableCell>
                        <TableCell>United States</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Fragment>
      <CustomerMap
        open={customerMapDialog}
        toggle={toggleCustomerMapDialog}
        mapType={maptype}
        plong={plong}
        plat={plat}
        dlong={dlong}
        dlat={dlat}
      />
    </>
  )
}

export default CustomerDetailsTab

// "district": "New York County",
// "region": "New York",
// "country": "United States"
