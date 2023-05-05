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
import EditCard from './EditCard';
import RidesDetailsTabView from './RidesDetailsTabView';


const EditTabView = ({data, pickupAssignedTo, itemAddedRefresh, setItemAddedRefresh}) => {
  // ** State


  const [value, setValue] = useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <TabContext value={value}>
      <TabList variant='scrollable' onChange={handleChange} aria-label='full width tabs example'>
        <Tab value='1' label='Invoice details'/>
        <Tab value='2' label='Customer Addresses'/>
        {/* <Tab value='3' label='Ride Details' /> */}

      </TabList>

      <TabPanel value='1'>
        <EditCard data={data} itemAddedRefresh={itemAddedRefresh} setItemAddedRefresh={setItemAddedRefresh}/>
      </TabPanel>
      <TabPanel value='2'>
        <CustomerDetailsTab data={data} itemAddedRefresh={itemAddedRefresh} setItemAddedRefresh={setItemAddedRefresh}/>
      </TabPanel>
      {/* <TabPanel value='3'>
        <RidesDetailsTabView data={data} pickupAssignedTo={pickupAssignedTo} itemAddedRefresh={itemAddedRefresh} setItemAddedRefresh={setItemAddedRefresh} />
      </TabPanel> */}
    </TabContext>
  )
}

export default EditTabView
