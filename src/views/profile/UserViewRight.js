// ** React Imports
import {useState} from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import {styled} from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'

// ** Icons Imports
import LockOutline from 'mdi-material-ui/LockOutline'
import BellOutline from 'mdi-material-ui/BellOutline'
import LinkVariant from 'mdi-material-ui/LinkVariant'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import BookmarkOutline from 'mdi-material-ui/BookmarkOutline'

// ** Demo Components Imports
import UserViewSecurity from 'src/views/profile/UserViewSecurity'


// ** Styled Tab component
const Tab = styled(MuiTab)(({theme}) => ({
  minHeight: 48,
  flexDirection: 'row',
  '& svg': {
    marginBottom: '0 !important',
    marginRight: theme.spacing(1)
  }
}))

const UserViewRight = () => {
  // ** State
  const [value, setValue] = useState('overview')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <TabContext value={value}>
      <TabList
        variant='scrollable'
        scrollButtons='auto'
        onChange={handleChange}
        aria-label='forced scroll tabs example'
        sx={{borderBottom: theme => `1px solid ${theme.palette.divider}`}}
      >
        <Tab value='overview' label='Overview' icon={<AccountOutline sx={{fontSize: '18px'}}/>}/>
        <Tab value='security' label='Security' icon={<LockOutline sx={{fontSize: '18px'}}/>}/>
        {/* <Tab value='notification' label='Notification' icon={<BellOutline sx={{ fontSize: '18px' }} />} /> */}
        <Tab value='documents' label='Documents' icon={<BellOutline sx={{fontSize: '18px'}}/>}/>
      </TabList>
      <Box sx={{mt: 3}}>
        <TabPanel sx={{p: 0}} value='overview'>
          {/* <UserViewOverview invoiceData={invoiceData} /> */}
        </TabPanel>
        <TabPanel sx={{p: 0}} value='security'>
          <UserViewSecurity/>
        </TabPanel>
        {/* <TabPanel sx={{ p: 0 }} value='notification'>
          <UserViewNotification />
        </TabPanel> */}
        <TabPanel sx={{p: 0}} value='documents'>
          {/* <UserViewConnection /> */}
        </TabPanel>
      </Box>
    </TabContext>
  )
}

export default UserViewRight
