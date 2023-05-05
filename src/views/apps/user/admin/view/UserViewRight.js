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
// ** Icons Imports
import {Motorbike, ShieldCar} from 'mdi-material-ui'

// ** Demo Components Imports
import UserViewBilling from 'src/views/apps/user/admin/view/UserViewBilling'
import UserViewOverview from 'src/views/apps/user/admin/view/UserViewOverview'
import UserViewSecurity from 'src/views/apps/user/admin/view/UserViewSecurity'
import UserViewConnection from 'src/views/apps/user/admin/view/UserViewConnection'
import UserViewNotification from 'src/views/apps/user/admin/view/UserViewNotification'
import AdminDocumentsTab from './AdminDocumentsTab'
// import CustomerOdersTab from './CustomerOrdersTab'
import AdminViewNotification from './AdminViewNotification copy'
import ChangeMobileEmailTab from './ChangeMobileEmailTab'
import AdminAdminInformationTab from './AdminAdminInformationTab'

// ** Styled Tab component
const Tab = styled(MuiTab)(({theme}) => ({
  minHeight: 48,
  flexDirection: 'row',
  '& svg': {
    marginBottom: '0 !important',
    marginRight: theme.spacing(1)
  }
}))

const UserViewRight = ({id, rider}) => {
  // ** State
  const [value, setValue] = useState('documents')

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
        <Tab value='documents' label='Documents' icon={<LinkVariant sx={{fontSize: '18px'}}/>}/>
      </TabList>
      <Box sx={{mt: 3}}>
        <TabPanel sx={{p: 0}} value='user-information'>
        </TabPanel>
        <TabPanel sx={{p: 0}} value='documents'>
          <AdminDocumentsTab id={id} rider={rider}/>
        </TabPanel>
        <TabPanel sx={{p: 0}} value='notification'>
        </TabPanel>
      </Box>
    </TabContext>
  )
}

export default UserViewRight
