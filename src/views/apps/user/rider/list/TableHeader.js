// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

// ** Icons Imports
import ExportVariant from 'mdi-material-ui/ExportVariant'

const TableHeader = props => {
  // ** Props
  const {handleFilter, toggle, value, toggleLiveView} = props

  return (
    <Box sx={{p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between'}}>

      <Box sx={{display: 'flex', flexWrap: 'wrap', alignItems: 'center'}}>
        <TextField
          size='small'
          value={value}
          sx={{mr: 6, mb: 2}}
          placeholder='Search Rider'
          onChange={e => handleFilter(e.target.value)}
        />

        <Button sx={{mb: 2, mr: 3}} onClick={toggle} variant='contained'>
          Add Rider
        </Button>
        {/* <Button sx={{ mb: 2 }} onClick={toggleLiveView} variant='contained'>
          Live Location
        </Button> */}

      </Box>
    </Box>
  )
}

export default TableHeader
