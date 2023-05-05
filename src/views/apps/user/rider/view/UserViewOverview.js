// ** React Imports
import {Fragment} from 'react'
// ** Demo Component Imports
import RiderDocumentTable from './RiderDocumentTable'

const UserViewOverview = ({invoiceData}) => {
  return (
    <Fragment>
      <RiderDocumentTable invoiceData={invoiceData}/>
    </Fragment>
  )
}

export default UserViewOverview
