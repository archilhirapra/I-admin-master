// ** React Imports
import {useEffect} from 'react'

// ** Next Imports
import {useRouter} from 'next/router'

// ** Spinner Import
// import Spinner from 'src/@core/components/spinner'
import Spinner from 'src/layouts/components/spinner'

// ** Hook Imports
import {useAuth} from 'src/hooks/useAuth'

export const getHomeRoute = role => {
  if (role === 'client') return '/acl'
  else return '/analytics'
}

const Home = () => {

  // ** Hooks
  const auth = useAuth()
  const router = useRouter()


  useEffect(() => {
    // console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh')
    if (!router.isReady) {
      // print('not readyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy');
      return
    }
    // console.log(auth.user)

    if (auth.user && auth.user.role) {
      // console.log(auth.user);
      const homeRoute = getHomeRoute(auth.user.role)

      // Redirect user to Home URL
      router.replace(homeRoute)
    }
    // console.log('tets');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Spinner/>
}

export default Home
