// ** Third Party Imports
import axios from 'axios'
import {useRouter} from 'next/router'
// ** Demo Components Imports
import UserViewPage from 'src/views/apps/user/admin/view/UserViewPage'

const UserView = ({id}) => {
  const router = useRouter()
  const ida = router.query.id
  // console.log('asdfasdfasdfasdf',ida)
  return <UserViewPage id={ida}/>
}

// export const getStaticPaths = async () => {
//   const res = await axios.get('/apps/users/list')
//   const userDate = await res.data.allData

//   const paths = userDate.map(item => ({
//     params: { id: `${item.id}` }
//   }))

//   return {
//     paths,
//     fallback: false
//   }
// }


export default UserView
