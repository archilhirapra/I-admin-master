// ** React Imports
import {useState, useEffect} from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'

// ** Third Party Components
import axios from 'axios'

// ** Demo Components Imports
import UserViewLeft from 'src/views/profile/UserViewLeft'
import UserViewRight from 'src/views/profile/UserViewRight'
import AccountSetting from 'src/views/profile/account-settings/'
import {useAuth} from 'src/hooks/useAuth'

const UserView = () => {
  const {user} = useAuth()
  // ** State
  const [error, setError] = useState(false)
  // const [data, setData] = useState({
  //   avatar: "/images/avatars/1.png",
  //   company: "Oozz PVT LTD",
  //   contact
  //     :
  //     "(321) 264-4599",
  //   country
  //     :
  //     "Russia",
  //   currentPlan
  //     :
  //     "enterprise",
  //   email
  //     :
  //     "msicely2@who.int",
  //   fullName
  //     :
  //     "Marjory Sicely",
  //   id
  //     :
  //     3,
  //   role
  //     :
  //     "maintainer",
  //   status
  //     :
  //     "active",
  //   username
  //     :
  //     "msicely2",
  // })
  // const [data, setData] = useState(null)
  // useEffect(() => {
  //   axios
  //     .get('/apps/user', { params: {} })
  //     .then(response => {
  //       setData(response.data)
  //       console.log('ffff', response)
  //       setError(false)
  //     })
  //     .catch(() => {
  //       setData(null)
  //       setError(true)
  //     })
  // }, [])
  if (user) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12} md={5} lg={4}>
          <UserViewLeft data={user}/>
        </Grid>
        <Grid item xs={12} md={7} lg={8}>
          {/* <UserViewRight /> */}
          <AccountSetting data={user}/>
        </Grid>
      </Grid>
    )
  } else if (error) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Alert severity='error'>
            User with the id: {} does not exist. Please check the list of users:{' '}
            <Link href='/apps/user/list'>User List</Link>
          </Alert>
        </Grid>
      </Grid>
    )
  } else {
    return null
  }
}

export default UserView
