// ** React Imports
import {Fragment, useState} from 'react'

// ** MUI Imports

import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TableContainer from '@mui/material/TableContainer'
import DialogContentText from '@mui/material/DialogContentText'


const RiderRiderInformationTab = () => {
  // ** States

  const [openAddressCard, setOpenAddressCard] = useState(false)

  return (
    <Fragment>
      <Card sx={{mb: 6}}>
        <CardHeader
          title='Rider Details'
          titleTypographyProps={{variant: 'h6'}}
          action={
            <Button variant='contained' onClick={() => setOpenAddressCard(true)}>
              Edit
            </Button>
          }
        />
        <CardContent>
          <Grid container spacing={6}>
            <Grid item xs={12} lg={6}>
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
                          Full Name :
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2'>Sourav Kumar</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                          Gender :
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2'>Male</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                          Date of Birth :
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2'>15-04-1996</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                          Father Name :
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2'>Sourav's Father</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                          Alternative Number:
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant='subtitle2'>0000000000</Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            <Grid item xs={12} lg={6}>
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
                          Blood Group:
                        </Typography>
                      </TableCell>
                      <TableCell>O+</TableCell>
                    </TableRow>

                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </CardContent>

        <Dialog
          open={openAddressCard}
          onClose={() => setOpenAddressCard(false)}
          aria-labelledby='user-address-edit'
          sx={{'& .MuiPaper-root': {width: '100%', maxWidth: 650, p: [2, 10]}}}
          aria-describedby='user-address-edit-description'
        >
          <DialogTitle id='user-address-edit' sx={{textAlign: 'center', fontSize: '1.5rem !important'}}>
            Edit Address
          </DialogTitle>
          <DialogContent>
            <DialogContentText variant='body2' id='user-address-edit-description' sx={{textAlign: 'center', mb: 7}}>
              Edit Address for future billing
            </DialogContentText>
            <form>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                  <TextField size='small' defaultValue='Pixinvent' label='Company Name'/>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField type='email' size='small' defaultValue='gertrude@gmail.com' label='Email'/>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField size='small' defaultValue='TAX-875623' label='Tax ID'/>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField size='small' defaultValue='SDF754K77' label='VAT Number'/>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    minRows={2}
                    size='small'
                    label='Billing Address'
                    defaultValue='100 Water Plant Avenue, Building 1303 Wake Island'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField size='small' defaultValue='+1(609) 933-44-22' label='Contact'/>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl size='small' fullWidth>
                    <InputLabel id='country-select'>Country</InputLabel>
                    <Select labelId='country-select' defaultValue='usa' label='Country'>
                      <MenuItem value='usa'>USA</MenuItem>
                      <MenuItem value='uk'>UK</MenuItem>
                      <MenuItem value='france'>France</MenuItem>
                      <MenuItem value='germany'>Germany</MenuItem>
                      <MenuItem value='japan'>Japan</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField size='small' defaultValue='Capholim' label='State'/>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField type='number' size='small' defaultValue='403114' label='Zip Code'/>
                </Grid>
              </Grid>
            </form>
          </DialogContent>
          <DialogActions sx={{justifyContent: 'center'}}>
            <Button variant='contained' sx={{mr: 1}} onClick={() => setOpenAddressCard(false)}>
              Submit
            </Button>
            <Button variant='outlined' color='secondary' onClick={() => setOpenAddressCard(false)}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
      <Card>
        <CardHeader
          title='Rider Insurance'
          titleTypographyProps={{variant: 'h6'}}
          action={
            <Button variant='contained' onClick={() => setOpenAddressCard(true)}>
              Edit
            </Button>
          }
        />
        <CardContent>
          <Grid container spacing={6}>
            <Grid item xs={12} lg={6}>
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
                          Rider Insurance:
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2'>Yes</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                          Insurance Number:
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2'>IRN87543256</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                          Insurance Expiry:
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2'>15-04-1996</Typography>
                      </TableCell>
                    </TableRow>

                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>


          </Grid>
        </CardContent>

        <Dialog
          open={openAddressCard}
          onClose={() => setOpenAddressCard(false)}
          aria-labelledby='user-address-edit'
          sx={{'& .MuiPaper-root': {width: '100%', maxWidth: 650, p: [2, 10]}}}
          aria-describedby='user-address-edit-description'
        >
          <DialogTitle id='user-address-edit' sx={{textAlign: 'center', fontSize: '1.5rem !important'}}>
            Edit Address
          </DialogTitle>
          <DialogContent>
            <DialogContentText variant='body2' id='user-address-edit-description' sx={{textAlign: 'center', mb: 7}}>
              Edit Address for future billing
            </DialogContentText>
            <form>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                  <TextField size='small' defaultValue='Pixinvent' label='Company Name'/>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField type='email' size='small' defaultValue='gertrude@gmail.com' label='Email'/>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField size='small' defaultValue='TAX-875623' label='Tax ID'/>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField size='small' defaultValue='SDF754K77' label='VAT Number'/>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    minRows={2}
                    size='small'
                    label='Billing Address'
                    defaultValue='100 Water Plant Avenue, Building 1303 Wake Island'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField size='small' defaultValue='+1(609) 933-44-22' label='Contact'/>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl size='small' fullWidth>
                    <InputLabel id='country-select'>Country</InputLabel>
                    <Select labelId='country-select' defaultValue='usa' label='Country'>
                      <MenuItem value='usa'>USA</MenuItem>
                      <MenuItem value='uk'>UK</MenuItem>
                      <MenuItem value='france'>France</MenuItem>
                      <MenuItem value='germany'>Germany</MenuItem>
                      <MenuItem value='japan'>Japan</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField size='small' defaultValue='Capholim' label='State'/>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField type='number' size='small' defaultValue='403114' label='Zip Code'/>
                </Grid>
              </Grid>
            </form>
          </DialogContent>
          <DialogActions sx={{justifyContent: 'center'}}>
            <Button variant='contained' sx={{mr: 1}} onClick={() => setOpenAddressCard(false)}>
              Submit
            </Button>
            <Button variant='outlined' color='secondary' onClick={() => setOpenAddressCard(false)}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    </Fragment>
  )
}

export default RiderRiderInformationTab
