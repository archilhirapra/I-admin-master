// ** React Imports
import {useState, useEffect} from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'

// ** Third Party Components
import axios from 'axios'
import authConfig from 'src/configs/auth'
import riderConfig from 'src/configs/rider'

// ** Demo Components Imports
import UserViewLeft from 'src/views/apps/user/rider/view/UserViewLeft'
import UserViewRight from 'src/views/apps/user/rider/view/UserViewRight'

const UserView = ({id}) => {
  // ** State
  const [error, setError] = useState(false)

  const [data, setData] = useState(null)
  const [vehicle, setvehicle] = useState(null)

  const [refresh, setRefresh] = useState(0)

  useEffect(() => {
    setData(null);
    const data = [];
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
    }
    axios
      .get(riderConfig.GetRiderEndpoint, {params: {riderId: id}, headers})
      .then(response => {
        axios
          .get(riderConfig.GetRiderVehicleEndPoint, {params: {riderId: id}, headers})
          .then(vresponse => {
            setvehicle(vresponse.data.data.data)
          })
          .catch(() => {
            setvehicle(null)
            setError(true)
          })
        setData(response.data.data.data)
        setAccountStatus(response.data.data.data.activeStatus)
        setError(false)
      })
      .catch(() => {
        setData(null)
        setError(true)
      })
  }, [id, refresh])

  const [accountStatus, setAccountStatus] = useState(data?.activeStatus)

  if (data) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12} md={5} lg={4}>
          <UserViewLeft id={id} data={data} vehicle={vehicle} accountStatus={accountStatus}
                        setAccountStatus={setAccountStatus} refresh={refresh} setRefresh={setRefresh}/>
        </Grid>
        <Grid item xs={12} md={7} lg={8}>
          <UserViewRight id={id} rider={data} refresh={refresh} setRefresh={setRefresh}/>
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
