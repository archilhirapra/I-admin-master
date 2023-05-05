// ** React Imports
import {useState, Fragment} from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Collapse from '@mui/material/Collapse'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import TableContainer from '@mui/material/TableContainer'

import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'


import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import FormControl from '@mui/material/FormControl'


import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import {styled, useTheme} from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Link from 'next/link'

import themeConfig from 'src/configs/themeConfig'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'


const MUITableCell = styled(TableCell)(({theme}) => ({
  borderBottom: 0,
  padding: `${theme.spacing(1, 0)} !important`
}))

const CalcWrapper = styled(Box)(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '&:not(:last-of-type)': {
    marginBottom: theme.spacing(2)
  }
}))


const createData = (name, calories, fat, carbs, protein, price, unit) => {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: 'Hat',
        customerId: '3456789065',
        amount: 3,
        unit: unit
      },
      {
        date: 'T-Shirt',
        customerId: '5646795584',
        amount: 1,
        unit: unit
      }
    ]
  }
}

const Row = props => {
  // ** Props
  const {row} = props

  // ** State
  const [open, setOpen] = useState(false)

  return (
    <Fragment>
      <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            {open ? <ChevronUp/> : <ChevronDown/>}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {row.name}
        </TableCell>
        <TableCell align='right'>{}</TableCell>
        <TableCell align='right'>{}</TableCell>
        <TableCell align='right'>{}</TableCell>
        <TableCell align='right'>{}</TableCell>
        <TableCell align='right'>{1000}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} sx={{py: '0 !important'}}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{m: 2}}>
              <Typography variant='h6' gutterBottom component='div'>
                Items List
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>Item Name</TableCell>
                    <TableCell>Item Quantity</TableCell>
                    <TableCell align='right'>Unit</TableCell>
                    <TableCell align='right'>Price ($)</TableCell>
                    <TableCell align='right'>(IQ x Price ) Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map(historyRow => (
                    <TableRow key={historyRow.date}>
                      <TableCell component='th' scope='row'>
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align='right'>{historyRow.amount}</TableCell>
                      <TableCell align='right'>{historyRow.unit}</TableCell>
                      <TableCell align='right'>{Math.round(historyRow.amount * row.price * 100) / 100}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}

const rows = [
  createData('Dry Cleaner', 159, 6.0, 24, 4.0, 3.99, 2),
  createData('Laundry', 237, 9.0, 37, 4.3, 4.99, 4),
  createData('Alterations', 262, 16.0, 24, 6.0, 3.79, 7),
  createData('HouseHold', 305, 3.7, 67, 4.3, 2.5),
  createData('Leather & Suede', 356, 16.0, 49, 3.9, 1.5),
  createData('Shoe Repair', 356, 16.0, 49, 3.9, 1.5)
]

const BookingItemTabView = () => {

  const [openUpdateStatus, setOpenUpdateStatus] = useState(false)
  const handleUpdateStatusOpen = () => setOpenUpdateStatus(true)
  const handleUpdateStatusClose = () => setOpenUpdateStatus(false)


  return (

    <Card>

      <Box>
        <CardContent>
          <Grid container>
            <Grid item sm={6} xs={12} sx={{mb: {sm: 0, xs: 4}}}>
              <Box sx={{display: 'flex', flexDirection: 'column'}}>
                {/* <Box sx={{ mb: 6, display: 'flex', alignItems: 'center' }}>

                </Box> */}
                <Box>
                  <Table sx={{maxWidth: '350px'}}>
                    <TableBody>
                      <TableRow>
                        <MUITableCell>
                          <Typography variant='h6'>Customer Id</Typography>
                        </MUITableCell>
                        <MUITableCell>
                          <Typography variant='h6'>{`${'4987va67s6d83'}`}</Typography>
                        </MUITableCell>
                      </TableRow>
                      <TableRow>
                        <MUITableCell>
                          <Typography variant='body2'>Customer Type:</Typography>
                        </MUITableCell>
                        <MUITableCell>
                          <Typography variant='body2'>{'Regular'}</Typography>
                        </MUITableCell>
                      </TableRow>
                      <TableRow>
                        <MUITableCell>
                          <Typography variant='body2'>Booking Status:</Typography>
                        </MUITableCell>
                        <MUITableCell>
                          <Typography variant='body2'>{'Canceled'}</Typography>
                        </MUITableCell>
                      </TableRow>
                      <TableRow>
                        <MUITableCell>
                          <Typography variant='body2'>Payment Id:</Typography>
                        </MUITableCell>
                        <MUITableCell>
                          <Typography variant='body2'>{'3a4a221'}</Typography>
                        </MUITableCell>
                      </TableRow>
                      <TableRow>
                        <MUITableCell>
                          <Typography variant='body2'>Payment Status:</Typography>
                        </MUITableCell>
                        <MUITableCell>
                          <Typography variant='body2'>{'Paid'}</Typography>
                        </MUITableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Box>
              </Box>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Box sx={{display: 'flex', justifyContent: {xs: 'flex-start', sm: 'flex-end'}}}>
                <Table sx={{maxWidth: '200px'}}>
                  <TableBody>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='h6'>Invoice</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='h6'>{`#${'4987'}`}</Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body2'>Invoice Status:</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='body2'>{'Generated'}</Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body2'>Date Issued:</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='body2'>{'13/10/2022'}</Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body2'>Date Due:</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='body2'>{'23/10/2022'}</Typography>
                      </MUITableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Grid>
          </Grid>
        </CardContent>

        <Divider sx={{mt: 6.5, mb: 0}}/>

        <TableContainer component={Paper}>
          <Table aria-label='collapsible table'>
            <TableHead>
              <TableRow>
                <TableCell/>
                <TableCell width="70%">Service Categories</TableCell>
                <TableCell/>
                <TableCell/>
                <TableCell/>
                <TableCell/>
                <TableCell align='right'>Total Items</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <Row key={row.name} row={row}/>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Divider sx={{mt: 4.5, mb: 0}}/>

        <CardContent sx={{pt: 8}}>
          <Grid container>
            <Grid item xs={12} sm={7} lg={9} sx={{order: {sm: 1, xs: 2}}}>
              <Box sx={{mb: 2, display: 'flex', alignItems: 'center'}}>
                <Typography
                  variant='body2'
                  sx={{mr: 2, color: 'text.primary', fontWeight: 600, letterSpacing: '.25px'}}
                >
                  Salesperson:
                </Typography>
                <Typography variant='body2'>Tommy Shelby</Typography>
              </Box>

              <Typography variant='body2'>Thanks for your business</Typography>
            </Grid>
            <Grid item xs={12} sm={5} lg={3} sx={{mb: {sm: 0, xs: 4}, order: {sm: 2, xs: 1}}}>
              <CalcWrapper>
                <Typography variant='body2'>Subtotal:</Typography>
                <Typography variant='body2' sx={{color: 'text.primary', letterSpacing: '.25px', fontWeight: 600}}>
                  $1800
                </Typography>
              </CalcWrapper>
              <CalcWrapper>
                <Typography variant='body2'>Discount:</Typography>
                <Typography variant='body2' sx={{color: 'text.primary', letterSpacing: '.25px', fontWeight: 600}}>
                  $28
                </Typography>
              </CalcWrapper>
              <CalcWrapper>
                <Typography variant='body2'>Tax:</Typography>
                <Typography variant='body2' sx={{color: 'text.primary', letterSpacing: '.25px', fontWeight: 600}}>
                  21%
                </Typography>
              </CalcWrapper>
              <Divider sx={{mt: 5, mb: 3}}/>
              <CalcWrapper>
                <Typography variant='body2'>Total:</Typography>
                <Typography variant='body2' sx={{color: 'text.primary', letterSpacing: '.25px', fontWeight: 600}}>
                  $1690
                </Typography>
              </CalcWrapper>
            </Grid>
          </Grid>
        </CardContent>


        <CardContent>
          <Typography variant='subtitle2' sx={{color: 'text.primary'}}>
            <strong>Note:</strong> It was a pleasure working with you and your team. We hope you will keep us in mind
            for future freelance projects. Thank You!
          </Typography>
        </CardContent>

      </Box>


      <CardContent>
        <Box sx={{mt: 0, width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
          <Link href={`/apps/rides/view/${'63406a3a70c911d0d4816d13'}`} passHref>
            <Button sx={{mr: 4}} component='a' variant='contained'>
              Assign Ride
            </Button>
          </Link>

          {/* <ReactToPdf scale={0.845} targetRef={PreviewRef} filename={`invoice-${data.invoice.id}.pdf`}> */}
          {/* {({ toPdf }) => { */}
          {/* return ( */}
          <Button sx={{mr: 4}} variant='contained' onClick={handleUpdateStatusOpen}>
            Update Status
          </Button>
          <Button variant='contained'>
            Edit Invoice
          </Button>
          {/* ) */}
          {/* }} */}
          {/* </ReactToPdf> */}
        </Box>
      </CardContent>


      <Dialog
        open={openUpdateStatus}
        onClose={handleUpdateStatusClose}
        aria-labelledby='user-view-edit'
        sx={{'& .MuiPaper-root': {width: '100%', maxWidth: 650, p: [2, 10]}}}
        aria-describedby='user-view-edit-description'
      >
        <DialogTitle id='user-view-edit' sx={{textAlign: 'center', fontSize: '1.5rem !important'}}>
          Status Update
        </DialogTitle>
        <DialogContent>
          <DialogContentText variant='body2' id='user-view-edit-description' sx={{textAlign: 'center', mb: 7}}>
            Please provide the status of booking.
          </DialogContentText>
          <form>
            <Grid container spacing={6}>

              <Grid item xs={12} sm={12}>
                <FormControl fullWidth>
                  <InputLabel id='user-view-status-label'>Status</InputLabel>
                  <Select
                    label='Status'
                    // defaultValue={data.status}
                    id='user-view-status'
                    labelId='user-view-status-label'
                  >
                    <MenuItem value='booking_confirmed'>Booking Confirmed</MenuItem>
                    <MenuItem value='out_for_pickup'>Out for Pickup</MenuItem>
                    <MenuItem value='pickup_failed'>Pickup Failed</MenuItem>
                    <MenuItem value='processing_laundry'>Processing Laundry</MenuItem>
                    <MenuItem value='processing_laundry_completed'>Processing Laundry Completed</MenuItem>
                    <MenuItem value='out_for_delivery'>Out For Delivery</MenuItem>
                    <MenuItem value='delivery_completed'>Delivery Completed</MenuItem>
                    <MenuItem value='delivery_failed'>Delivery Failed</MenuItem>
                    <MenuItem value='booking_completed'>Booking Completed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>


              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  rows={4}
                  multiline
                  label='Describe'

                  // error={Boolean(errors.description)}
                />

              </Grid>


            </Grid>
          </form>
        </DialogContent>
        <DialogActions sx={{justifyContent: 'center'}}>
          <Button variant='contained' sx={{mr: 1}} onClick={handleUpdateStatusClose}>
            Submit
          </Button>
          <Button variant='outlined' color='secondary' onClick={handleUpdateStatusClose}>
            Discard
          </Button>
        </DialogActions>
      </Dialog>


    </Card>


  )
}

export default BookingItemTabView
