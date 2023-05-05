// ** React Imports
import {createContext, useEffect, useState} from 'react'

// ** Next Import
import {useRouter} from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  isInitialized: false,
  resendOtp: () => Promise.resolve(),
  verifyOtp: () => Promise.resolve(),
  loginInit: () => Promise.resolve(),
  login: () => Promise.resolve(),
  forgotPassword: () => Promise.resolve(),
  verifyOtpforgotPassword: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  setIsInitialized: () => Boolean,
  register: () => Promise.resolve()
}
const AuthContext = createContext(defaultProvider)


const AuthProvider = ({children}) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user)
  const [loading, setLoading] = useState(defaultProvider.loading)
  const [isInitialized, setIsInitialized] = useState(defaultProvider.isInitialized)
  // console.log(user);
  // ** Hooks
  const router = useRouter()
  useEffect(() => {
    const initAuth = async () => {
      setIsInitialized(true)
      const storedToken = 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
      if (storedToken) {
        setLoading(true)
        await axios
          .get(authConfig.meEndpoint, {
            headers: {
              Authorization: storedToken
            }
          })
          .then(async response => {
            setLoading(false)
            // console.log(response.data)
            setUser({...response.data.data.data})
          })
          .catch(() => {
            // console.log('help')
            localStorage.removeItem('userData')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('accessToken')
            setUser(null)
            setLoading(false)
          })
      } else {
        setLoading(false)
      }
    }
    initAuth()
  }, [])


  const handleResendOtp = (params, otpData) => {
    const data = [];
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
    axios
      .post(authConfig.resendOtpEndpoint, params, {headers: headers})
      .then(async res => {
        // window.localStorage.setItem(authConfig.storageTokenKeyName, res.data.accessToken)
        // console.log('res:', res);
        data['message'] = 'success'
        data['data'] = res
        otpData(data);

      })
      .catch(err => {
        // console.log(err);
        if (err.response.status == 401) {
          data['message'] = 'failed'
          data['error'] = err.response.data
          // console.log(data);
          otpData(data);

        } else {
          data['message'] = 'network-error'
          data['error'] = 'some thing went wrong'
          // console.log(data);
          otpData(data);
        }
      })
  }


  const handleLoginInitial = (params, userData) => {
    const data = [];
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Origin": "*"
    }
    axios
      .post(authConfig.loginEndpoint, params, {headers: headers})
      .then(async res => {
        window.localStorage.setItem(authConfig.storageTokenKeyName, res.data.accessToken)
        // console.log('res:', res);
        data['message'] = 'success'
        data['data'] = res
        userData(data);

      })
      .catch(err => {
        // console.log(err);

        if (err.response.status == 400) {
          // console.log('400');
          data['message'] = 'failed'
          data['type'] = 0 /* show in email field */
          data['error'] = err.response.data
          // console.log(data);
          userData(data);

        } else if (err.response.status == 404) {
          // console.log('404');
          data['message'] = 'failed'
          data['type'] = 0 /* show in email field */
          data['error'] = err.response.data
          // console.log(data);
          userData(data);

        } else if (err.response.status == 401) {
          // console.log('401');
          data['message'] = 'failed'
          data['type'] = 1 /* show in password field */
          data['error'] = err.response.data
          // console.log(data);
          userData(data);

        } else {
          // console.log('else');

          data['message'] = 'network-error'
          data['type'] = 0 /* show in email field */
          data['error'] = 'some thing went wrong'
          // console.log(data);
          userData(data);
        }
      })


  }

  const handleVerifyOtp = (params, errorCallback) => {
    const data = [];
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
    axios.post(authConfig.verifyOtpEndpoint, params, {headers: headers})
      .then(async res => {
        window.localStorage.setItem(authConfig.storageTokenKeyName, res.data.data.generatedToken)
        // console.log('res:', res);
      })
      .then(() => {
        axios
          .get(authConfig.meEndpoint, {
            headers: {
              Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
            }
          })
          .then(async response => {
            const returnUrl = router.query.returnUrl
            // console.log(response.data.data.data);
            setUser({...response.data.data.data})

            await window.localStorage.setItem('userData', JSON.stringify(response.data.data.data))
            const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
            // console.log('return url: ', returnUrl);
            // console.log('res from login: ', response);
            router.replace(redirectURL)
          })
      })
      .catch(err => {
        if (err.response.status == 401) {
          // console.log('401');
          data['message'] = 'failed'
          data['type'] = 1 /* show in password field */
          data['error'] = err.response.data
          // console.log(data);
          errorCallback(data);

        } else {
          // console.log('else');

          data['message'] = 'network-error'
          data['type'] = 0 /* show in email field */
          data['error'] = 'some thing went wrong'
          // console.log(data);
          errorCallback(data);
        }
      })
  }


  const handleLogin = (params, errorCallback) => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
    axios
      .post(authConfig.loginEndpoint, params, {headers: headers})
      .then(async res => {
        window.localStorage.setItem(authConfig.storageTokenKeyName, res.data.accessToken)
        // console.log('res:', res);
      })
      .then(() => {
        axios
          .get(authConfig.meEndpoint, {
            headers: {
              Authorization: window.localStorage.getItem(authConfig.storageTokenKeyName)
            }
          })
          .then(async response => {
            const returnUrl = router.query.returnUrl
            setUser({...response.data.data.data})
            await window.localStorage.setItem('userData', JSON.stringify(response.data.userData))
            const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
            // console.log('return url: ', returnUrl);
            // console.log('res from login: ', response);
            // router.replace(redirectURL)
          })
      })
      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    setUser(null)
    setIsInitialized(false)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
  }

  const handleRegister = (params, errorCallback) => {
    axios
      .post(authConfig.registerEndpoint, params)
      .then(res => {
        if (res.data.error) {
          if (errorCallback) errorCallback(res.data.error)
        } else {
          handleLogin({email: params.email, password: params.password})
        }
      })
      .catch(err => (errorCallback ? errorCallback(err) : null))
  }


  const handleForgotPassword = (params, userData) => {
    const data = [];
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
    axios
      .post(authConfig.resendOtpEndpoint, params, {headers: headers})
      .then(async res => {
        // console.log(res.data.data.acknowledgement);
        // console.log("hapse");
        if (res.data.data.acknowledgement === true) {
          // console.log("hapse true");
          data['message'] = 'success'
          data['data'] = res
          // console.log(data)
          userData(data);
          // console.log(data)
        } else {
          // console.log("else");
          data['message'] = 'failed'
          data['data'] = res
          userData(data);
        }
        // console.log(res.data.data.acknowledgement);

      })
      .catch(err => {
        // console.log(err);


        // console.log('else');

        data['message'] = 'network-error'
        data['type'] = 0 /* show in email field */
        data['error'] = 'some thing went wrong'
        // console.log(data);
        userData(data);

      })

  }

  const handleVerifyOtpforgotPassword = (params, userData) => {
    const data = [];
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
    axios
      .post(authConfig.forgetSetPassword, params, {headers: headers})
      .then(async res => {
        // console.log(res.data.data.acknowledgement);
        if (res.data.data.acknowledgement === true) {
          data['message'] = 'success'
          data['data'] = res
          userData(data);
        } else {
          data['message'] = 'failed'
          data['data'] = res
          userData(data);
        }
      })
      .catch(err => {
        // console.log(err);
        // console.log(err.response.status);

        if (err.response.status == 410 || err.response.status == 401 || err.response.status == 500) {
          // console.log('2'+ err.response.status);
          data['message'] = 'failed'
          // data['type'] = 0 /* show in email field */
          data['error'] = err.response.data
          // console.log(data);
          userData(data);

        } else {
          // console.log('else');

          data['message'] = 'network-error'
          // data['type'] = 0 /* show in email field */
          data['error'] = 'some thing went wrong'
          // console.log(data);
          userData(data);
        }
      })

  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    isInitialized,
    setIsInitialized,
    loginInit: handleLoginInitial,
    resendOtp: handleResendOtp,
    verifyOtp: handleVerifyOtp,
    login: handleLogin,
    forgotPassword: handleForgotPassword,
    verifyOtpforgotPassword: handleVerifyOtpforgotPassword,
    logout: handleLogout,
    register: handleRegister
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export {AuthContext, AuthProvider}
