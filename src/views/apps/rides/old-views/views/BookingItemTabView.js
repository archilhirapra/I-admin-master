// ** React Imports
import {useState, Fragment} from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import Collapse from '@mui/material/Collapse'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import TableContainer from '@mui/material/TableContainer'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'

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
  return (
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
  )
}

export default BookingItemTabView
