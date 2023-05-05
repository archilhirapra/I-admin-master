// ** React Imports
import {useState} from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import {styled} from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'

// ** Icons Imports
import BellOutline from 'mdi-material-ui/BellOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import BookmarkOutline from 'mdi-material-ui/BookmarkOutline'
import InformationOutline from 'mdi-material-ui/InformationOutline'

// ** Demo Tabs Imports
import AppLink from 'src/pages/apps/settings/app-link'
import TabInfo from 'src/views/profile/account-settings/TabInfo'
import TabAccount from 'src/views/profile/account-settings/TabAccount'
import TabBilling from 'src/views/profile/account-settings/TabBilling'
import TabSecurity from 'src/views/profile/account-settings/TabSecurity'
import LoginMethod from 'src/views/profile/account-settings/LoginMethod'
import TabNotifications from 'src/views/profile/account-settings/TabNotifications'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

const Tab = styled(MuiTab)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({theme}) => ({
  lineHeight: 1.71,
  marginLeft: theme.spacing(2.5),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

const AccountSettings = () => {
  // ** State
  const [value, setValue] = useState('appLink')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }


  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={7} lg={8}>
        <Card>
          <TabContext value={value}>
            <TabList
              onChange={handleChange}
              aria-label='setting tabs'
              sx={{borderBottom: theme => `1px solid ${theme.palette.divider}`}}
            >
              <Tab
                value='appLink'
                label={
                  <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <AccountOutline sx={{fontSize: '1.125rem'}}/>
                    <TabName>App Link</TabName>
                  </Box>
                }
              />

            </TabList>

            <TabPanel sx={{p: 0}} value='appLink'>
              <AppLink/>
            </TabPanel>
          </TabContext>
        </Card>
      </Grid>
    </Grid>

  )
}

export default AccountSettings
