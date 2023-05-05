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
// import UserViewLeft from 'src/views/apps/user/admin/view/UserViewLeft'
import UserViewLeft from 'src/views/apps/user/customer/view/UserViewLeft'
import UserViewRight from 'src/views/apps/user/customer/view/UserViewRight'

import authConfig from 'src/configs/auth'
import adminConfig from 'src/configs/admin'
import customerConfig from 'src/configs/customer'


const UserView = ({id}) => {


  // ** State
  const [error, setError] = useState(false)

  const [data, setData] = useState(null)
  const [accountStatus, setAccountStatus] = useState(null)

  const [suspendRefresh, setSuspendRefresh] = useState(0)
  useEffect(() => {
    const data = [];
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
    }
    axios
      .get(customerConfig.CustomerListEndpoint, {params: {userId: id}, headers})
      .then(response => {


        setData(response.data.data.data)
        setAccountStatus(response.data.data.data[0].status)
        setError(false)
      })
      .catch((error) => {
        setData(null)
        setError(true)
      })
  }, [id, suspendRefresh])


  if (data) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12} md={5} lg={4}>
          <UserViewLeft id={id} data={data[0]} accountStatus={accountStatus} setAccountStatus={setAccountStatus}
                        suspendRefresh={suspendRefresh} setSuspendRefresh={setSuspendRefresh}/>
        </Grid>
        <Grid item xs={12} md={7} lg={8}>
          <UserViewRight id={id} rider={data}/>
        </Grid>
      </Grid>
    )
  } else if (error) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Alert severity='error'>
            User with the id: {id} does not exist. Please check the list of users:{' '}
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
