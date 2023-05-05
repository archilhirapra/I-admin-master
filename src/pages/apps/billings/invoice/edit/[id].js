// ** Third Party Imports
import axios from 'axios'

// ** Demo Components Imports
import Edit from 'src/views/apps/invoices/edit/Edit'
import 'react-datepicker/dist/react-datepicker.css'
import {useRouter} from 'next/router'


import authConfig from 'src/configs/auth'
import invoiceConfig from 'src/configs/invoice'

const InvoiceEdit = () => {
  const router = useRouter()
  const id = router.query.id
  return <Edit id={id}/>
}


export default InvoiceEdit
