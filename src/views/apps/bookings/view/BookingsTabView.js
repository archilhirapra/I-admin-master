// ** React Imports
import {useState} from 'react'
import dynamic from "next/dynamic";

// ** MUI Imports
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import OverviewTab from 'src/views/apps/bookings/view/OverviewTab';
import InvoiceTab from 'src/views/apps/bookings/view/InvoiceTab';
import CustomerDetailsTab from 'src/views/apps/invoices/edit/CustomerDetailsTab';
import BookingItemsTab from 'src/views/apps/bookings/view/BookingItemsTab';
import HelpAndSupportTab from 'src/views/apps/bookings/view/HelpAndSupportTab';


const BookingsTabView = () => {
  // ** State
  const [value, setValue] = useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <TabContext value={value}>
      <TabList variant='scrollable' onChange={handleChange} aria-label='full width tabs example'>
        {/* <Tab value='1' label='Overview' /> */}
        <Tab value='1' label='Booking Details'/>
        {/* <Tab value='2' label='Customer Addresses' /> */}
      </TabList>
      <TabPanel value='1'>
        <BookingItemsTab/>
      </TabPanel>
      {/* <TabPanel value='2'>
        <CustomerDetailsTab />
      </TabPanel>
      <TabPanel value='3'>
        <InvoiceTab />
      </TabPanel> */}

    </TabContext>
  )
}

export default BookingsTabView
