// ** MUI Imports
import Card from '@mui/material/Card'
import {useTheme} from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'

// ** Util Import
import {hexToRGBA} from 'src/@core/utils/hex-to-rgba'

const altSeries = [{data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}]

const EcommerceSalesThisYear = (props) => {
  const {series, sales} = props;
  // ** Hook
  const theme = useTheme()

  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: {show: false},
      dropShadow: {
        top: 14,
        blur: 4,
        left: 0,
        enabled: true,
        opacity: 0.12,
        color: theme.palette.primary.main
      }
    },
    tooltip: {enabled: false},
    grid: {
      xaxis: {
        lines: {show: false}
      },
      yaxis: {
        lines: {show: false}
      },
      padding: {
        top: -12,
        left: -2,
        right: 8,
        bottom: -10
      }
    },
    stroke: {
      width: 5,
      lineCap: 'round'
    },
    markers: {size: 0},
    colors: [hexToRGBA(theme.palette.primary.main, 1)],
    xaxis: {
      labels: {show: false},
      axisTicks: {show: false},
      axisBorder: {show: false}
    },
    yaxis: {
      min: 0,
      labels: {show: false}
    }
  }

  return (
    <Card>
      <CardContent sx={{pb: '0 !important'}}>
        <Typography variant='h6' sx={{mb: 2.5}}>
          Sales this Year
        </Typography>
        <Typography variant='body2'>Total Sales This Year</Typography>
        <Typography variant='h6'>${sales}</Typography>

        <ReactApexcharts type='line' height={115} options={options} series={series ? (series) : (altSeries)}/>
      </CardContent>
    </Card>
  )
}

export default EcommerceSalesThisYear
