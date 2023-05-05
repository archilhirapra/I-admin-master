// ** React Imports
import {Fragment} from 'react'
// ** Demo Component Imports
import CustomerOrdersTable from './CustomerOrdersTable'

const AdminDocumentsTab = ({id, rider}) => {
  return (
    <Fragment>
      <CustomerOrdersTable id={id} rider={rider}/>
    </Fragment>
  )
}

export default AdminDocumentsTab
