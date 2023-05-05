// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

// ** Icons Imports
import ExportVariant from 'mdi-material-ui/ExportVariant'

const TableHeader = props => {
  // ** Props
  const {handleFilter, toggle, value} = props

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

      </Box>
    </Box>
  )
}

export default TableHeader
