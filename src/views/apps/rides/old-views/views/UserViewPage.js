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
// import UserViewRight from 'src/views/apps/user/admin/view/UserViewRight'
import RidesTabView from 'src/views/apps/rides/views/RidesTabView'

const UserView = ({id = 1, invoiceData}) => {
  // ** State
  const [error, setError] = useState(false)

  const [data, setData] = useState(null)
  useEffect(() => {
    axios
      .get('/apps/user', {params: {id}})
      .then(response => {
        setData(response.data)
        console.log('ffff', response)
        setError(false)
      })
      .catch(() => {
        setData(null)
        setError(true)
      })
  }, [id])
  if (data) {
    return (
      <Grid container spacing={6}>
        {/* <Grid item xs={12} md={5} lg={4}>
          <UserViewLeft data={data} />
        </Grid> */}
        <Grid item xs={12} md={12} lg={12}>
          <RidesTabView/>
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
