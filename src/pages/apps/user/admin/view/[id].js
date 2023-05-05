// ** Third Party Imports
import axios from 'axios'
import {useRouter} from 'next/router'
// ** Demo Components Imports
import UserViewPage from 'src/views/apps/user/admin/view/UserViewPage'

const UserView = ({id}) => {
  const router = useRouter()
  const ida = router.query.id
  return <UserViewPage id={ida}/>
}


export default UserView
