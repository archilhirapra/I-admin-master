// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

// ** Icons Imports
import ExportVariant from 'mdi-material-ui/ExportVariant'

const TableHeader = props => {
  // ** Props
  const {handleFilter, toggle, value, minValue, maxValue, handleMin, handleMax} = props

  const priceFromat = (value) => {
    const price = value.replace(/[^\d&^.]/g, '');
    return price
  }

  return (
    <Box sx={{p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between'}}>

      <Box sx={{display: 'flex', flexWrap: 'wrap', alignItems: 'center'}}>
        <TextField
          size='small'
          value={value}
          sx={{mr: 6, mb: 2}}
          placeholder='Search Invoice'
          onChange={e => handleFilter(e.target.value)}
        />

        <Button sx={{mb: 2, mr: 6}} onClick={toggle} variant='contained'>
          Add Order
        </Button>
        {/* <TextField
          size='small'
          value={minValue}
          sx={{ mr: 6, mb: 2 }}
          placeholder='Minimum Price'
          // onChange={e => handleFilter(e.target.value)}
          onChange={(e) => handleMin(priceFromat(e.target.value))}
        />
        <TextField
          size='small'
          value={maxValue}
          sx={{ mr: 6, mb: 2 }}
          placeholder='Maximum Price'
          onChange={e => handleMax(priceFromat(e.target.value))}
        /> */}
      </Box>
    </Box>
  )
}

export default TableHeader
