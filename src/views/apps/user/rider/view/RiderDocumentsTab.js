// ** React Imports
import {Fragment} from 'react'
// ** Demo Component Imports
import RiderDocumentTable from './RiderDocumentTable'

const RiderDocumentsTab = ({id, rider}) => {
  return (
    <Fragment>
      <RiderDocumentTable id={id} rider={rider}/>
    </Fragment>
  )
}

export default RiderDocumentsTab
