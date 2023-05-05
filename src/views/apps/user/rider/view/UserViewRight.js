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
import {Motorbike, ShieldCar} from 'mdi-material-ui'

// ** Demo Components Imports
import UserViewBilling from 'src/views/apps/user/rider/view/UserViewBilling'
import UserViewOverview from 'src/views/apps/user/rider/view/UserViewOverview'
import ChangeMobilEmail from 'src/views/apps/user/rider/view/ChangeMobileEmailTab'
import TabSecurity from 'src/views/apps/user/rider/view/TabSecurity'
import UserViewConnection from 'src/views/apps/user/rider/view/UserViewConnection'
import UserViewNotification from 'src/views/apps/user/rider/view/UserViewNotification'


import RiderVehicleInformationTab from 'src/views/apps/user/rider/view/RiderVehicleInformationTab'
import RiderRiderInformationTab from 'src/views/apps/user/rider/view/RiderRiderInformationTab'
import ChangeMobileEmailTab from 'src/views/apps/user/rider/view/ChangeMobileEmailTab'
import RiderDocumentsTab from 'src/views/apps/user/rider/view/RiderDocumentsTab'
import RiderRidesListTab from './RiderRidesTab'

// ** Styled Tab component
const Tab = styled(MuiTab)(({theme}) => ({
  minHeight: 48,
  flexDirection: 'row',
  '& svg': {
    marginBottom: '0 !important',
    marginRight: theme.spacing(1)
  }
}))

const UserViewRight = ({id, rider, refresh, setRefresh}) => {
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
        {/* <Tab value='rides' label='Rides' icon={<AccountOutline sx={{ fontSize: '18px' }} />} /> */}
        <Tab value='documents' label='Documents' icon={<LinkVariant sx={{fontSize: '18px'}}/>}/>
        <Tab value='change-mobile' label='Change Mobile' icon={<ShieldCar sx={{fontSize: '18px'}}/>}/>

      </TabList>
      <Box sx={{mt: 3}}>
        {/* <TabPanel sx={{ p: 0 }} value='rides'>
          <RiderRidesListTab />
        </TabPanel> */}
        <TabPanel sx={{p: 0}} value='rider-information'>
        </TabPanel>
        <TabPanel sx={{p: 0}} value='vehicle-information'>
        </TabPanel>
        <TabPanel sx={{p: 0}} value='documents'>
          <RiderDocumentsTab id={id} rider={rider}/>
        </TabPanel>
        <TabPanel sx={{p: 0}} value='change-mobile'>

          <ChangeMobilEmail id={id} rider={rider} refresh={refresh} setRefresh={setRefresh}/>
        </TabPanel>
        <TabPanel sx={{p: 0}} value='notification'>
        </TabPanel>
      </Box>
    </TabContext>
  )
}

export default UserViewRight
