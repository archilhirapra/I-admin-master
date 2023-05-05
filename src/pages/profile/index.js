// ** Third Party Imports
import axios from 'axios'

// ** Demo Components Imports
import UserViewPage from 'src/views/profile/UserViewPage'

const ProfileView = () => {
  return <UserViewPage id='1'/>
}

// export const getStaticProps = async () => {
//   const res = await axios.get('/apps/invoice/invoices')
//   const invoiceData = res.data.allData

//   return {
//     props: {
//       invoiceData
//     }
//   }
// }

export default ProfileView
