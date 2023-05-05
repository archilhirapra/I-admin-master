// ** React Imports
import {Fragment} from 'react'
// ** Demo Component Imports
import AdminDocumentTable from './AdminDocumentTable'

const AdminDocumentsTab = ({id, rider}) => {
  return (
    <Fragment>
      <AdminDocumentTable id={id} rider={rider}/>
    </Fragment>
  )
}

export default AdminDocumentsTab
