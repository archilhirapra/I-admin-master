// ** React Imports
import {useState} from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import TimeSlotPickupList from 'src/views/apps/time-slots/pickup/PickupList'
import TimeSlotDeliveryList from 'src/views/apps/time-slots/delivery/DeliveryList'


const TabsFullWidth = () => {
  // ** State
  const [value, setValue] = useState('2')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <TabContext value={value}>
      <TabList variant='scrollable' onChange={handleChange} aria-label='full width tabs example'>
        <Tab value='2' label='Holiday'/>
      </TabList>
      {/* <TabPanel value='1'>
        <TimeSlotPickupList />
      </TabPanel> */}
      <TabPanel value='2'>
        <TimeSlotDeliveryList/>
      </TabPanel>
    </TabContext>
  )
}

export default TabsFullWidth
