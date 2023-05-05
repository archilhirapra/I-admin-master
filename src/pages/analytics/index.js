import CardStatisticsCharacter from 'src/@core/components/card-statistics/card-stats-with-image'
import AnalyticsTotalTransactions from 'src/views/analytics/AnalyticsTotalTransactions'
import EcommerceActivityTimeline from 'src/views/analytics/EcommerceActivityTimeline'
import EcommerceSalesThisMonth from 'src/views/analytics/EcommerceSalesThisMonth'
import EcommerceSalesOverview from 'src/views/analytics/EcommerceSalesOverview'
import EcommerceWeeklySalesBg from 'src/views/analytics/EcommerceWeeklySalesBg'
import EcommerceSalesThisYear from 'src/views/analytics/EcommerceSalesThisYear'
import EcommerceSalesThisWeek from 'src/views/analytics/EcommerceSalesThisWeek'
import ClockTimeFiveOutline from 'mdi-material-ui/ClockTimeFiveOutline'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import MapMarkerDistance from 'mdi-material-ui/MapMarkerDistance'
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import CustomAvatar from 'src/@core/components/mui/avatar'
import AlertOutline from 'mdi-material-ui/AlertOutline'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import CardContent from '@mui/material/CardContent'
import TrendingUp from 'mdi-material-ui/TrendingUp'
import Typography from '@mui/material/Typography'
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ClockFast from 'mdi-material-ui/ClockFast'
import {styled} from '@mui/material/styles'
import adminConfig from 'src/configs/admin'
import authConfig from 'src/configs/auth'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import {useEffect} from 'react'
import {useState} from 'react'
import axios from 'axios'

const Avatar = styled(CustomAvatar)(({theme}) => ({
  width: 40,
  height: 40,
  marginRight: theme.spacing(4)
}))
const trend = "positive"
const TrendIcon = trend === 'positive' ? ChevronUp : ChevronDown


const Services = () => {

  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    const data = [];
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
    }
    axios
      .get(adminConfig.AnalyticsEndpoint, {headers})
      .then(response => {
        setAnalyticsData(response.data.data.data)
      })
      .catch(() => {
        setAnalyticsData(null)
      })

  }, [])


  return (
    <ApexChartWrapper>
      <KeenSliderWrapper>
        <Grid container spacing={6} className='match-height'>
          <Grid item xs={12} md={4} sm={6}>
            <Card>
              <CardContent sx={{py: theme => `${theme.spacing(4.125)} !important`}}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                  <Avatar skin='light' color={"success"} variant='rounded'>
                    <TrendingUp/>
                  </Avatar>
                  <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Box sx={{display: 'flex', flexWrap: 'wrap', alignItems: 'center'}}>
                      <Typography variant='h6'>{analyticsData?.completedDelivery}</Typography>
                    </Box>
                    <Typography variant='caption'>Delivery Completed</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4} sm={6}>
            <Card>
              <CardContent sx={{py: theme => `${theme.spacing(4.125)} !important`}}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                  <Avatar skin='light' color={"success"} variant='rounded'>
                    <ClockTimeFiveOutline/>
                  </Avatar>
                  <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Box sx={{display: 'flex', flexWrap: 'wrap', alignItems: 'center'}}>
                      <Typography variant='h6'>{analyticsData?.pendingDelivery}</Typography>
                    </Box>
                    <Typography variant='caption'>Delivery Pending</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4} sm={6}>
            <Card>
              <CardContent sx={{py: theme => `${theme.spacing(4.125)} !important`}}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                  <Avatar skin='light' color={"success"} variant='rounded'>
                    <TrendingUp/>
                  </Avatar>
                  <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Box sx={{display: 'flex', flexWrap: 'wrap', alignItems: 'center'}}>
                      <Typography variant='h6'>{analyticsData?.completedPickUp}</Typography>
                    </Box>
                    <Typography variant='caption'>Pickups Completed</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4} sm={6}>
            <Card>
              <CardContent sx={{py: theme => `${theme.spacing(4.125)} !important`}}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                  <Avatar skin='light' color={"success"} variant='rounded'>
                    <ClockTimeFiveOutline/>
                  </Avatar>
                  <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Box sx={{display: 'flex', flexWrap: 'wrap', alignItems: 'center'}}>
                      <Typography variant='h6'>{analyticsData?.pendingPickUp}</Typography>
                    </Box>
                    <Typography variant='caption'>Pickups Pending</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4} sm={6}>
            <Card>
              <CardContent sx={{py: theme => `${theme.spacing(4.125)} !important`}}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                  <Avatar skin='light' color={"success"} variant='rounded'>
                    <AlertOutline/>
                  </Avatar>
                  <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Box sx={{display: 'flex', flexWrap: 'wrap', alignItems: 'center'}}>
                      <Typography variant='h6'>{analyticsData?.cancelledDelivery}</Typography>
                    </Box>
                    <Typography variant='caption'>Delivery Cancelled</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4} sm={6}>
            <Card>
              <CardContent sx={{py: theme => `${theme.spacing(4.125)} !important`}}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                  <Avatar skin='light' color={"success"} variant='rounded'>
                    <AlertOutline/>
                  </Avatar>
                  <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Box sx={{display: 'flex', flexWrap: 'wrap', alignItems: 'center'}}>
                      <Typography variant='h6'>{analyticsData?.cancelledPickUp}</Typography>
                    </Box>
                    <Typography variant='caption'>Pickups Cancelled</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>


          <Grid item xs={12} md={6}>
            <EcommerceSalesOverview salesOverview={analyticsData?.salesOverview}/>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CardStatisticsCharacter
              data={{
                stats: analyticsData?.male,
                title: 'Male',
                chipColor: 'primary',
                chipText: 'Year of ' + analyticsData?.year,
                src: '/images/cards/card-stats-img-1.png'
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CardStatisticsCharacter
              data={{
                stats: analyticsData?.female,
                title: 'Female',
                chipColor: 'primary',
                chipText: 'Year of ' + analyticsData?.year,
                src: '/images/cards/card-stats-img-2.png'
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <EcommerceSalesThisWeek series={analyticsData?.weeklySalesSeries} sales={analyticsData?.salesThisWeek}/>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <EcommerceSalesThisMonth series={analyticsData?.monthlySalesSeries} sales={analyticsData?.salesThisMonth}/>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <EcommerceSalesThisYear series={analyticsData?.yearlySalesSeries} sales={analyticsData?.salesThisYear}/>
          </Grid>

          <Grid item xs={12}>
            <AnalyticsTotalTransactions weeklyTransaction={analyticsData?.WeeklyTransaction}
                                        transactionReport={analyticsData?.transactionReport}/>
          </Grid>

          <Grid item xs={12} md={5} sx={{order: [2, 2, 1]}}>

          </Grid>
          <Grid item xs={12} sm={6} md={4} sx={{order: [1, 1, 2]}}>

          </Grid>
          <Grid item xs={12} md={8} sx={{order: 3}}>

          </Grid>
          <Grid item xs={12} md={4} sx={{order: 3}}>

          </Grid>
        </Grid>
      </KeenSliderWrapper>
    </ApexChartWrapper>
  )
}

export default Services
