// ** React Imports
import {useState} from 'react'
import dynamic from "next/dynamic";

// ** MUI Imports
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import Tab2 from './Tab2'
import BookingItemTabView from './BookingItemTabView';
import RidesDetailsTabView from './RidesDetailsTabView';

const LiveTracking = dynamic(() => import("./LiveTracking"), {
  ssr: false
});

const TabsFullWidth = () => {
  // ** State
  const [value, setValue] = useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <TabContext value={value}>
      <TabList variant='scrollable' onChange={handleChange} aria-label='full width tabs example'>
        <Tab value='1' label='Details'/>

        {/* <Tab value='2' label='Live Tracking' /> */}

      </TabList>
      <TabPanel value='1'>
        <RidesDetailsTabView/>
      </TabPanel>
      <TabPanel value='2'>
        {/* <LiveTracking /> */}
      </TabPanel>
    </TabContext>
  )
}

export default TabsFullWidth
