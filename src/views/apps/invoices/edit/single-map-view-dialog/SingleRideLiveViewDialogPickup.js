import {Box} from "@mui/material";
import {Icon} from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  Marker,
  Polyline,
  Circle,
  Popup,
  TileLayer,
  useMapEvents
} from "react-leaflet";


// ** React Imports
import {forwardRef, useEffect, useImperativeHandle, useState} from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Spinner from 'src/layouts/components/spinner'


// ** Icons Imports
import Close from 'mdi-material-ui/Close'


// import io from 'socket.io/node_modules/socket.io-client';


import io from 'socket.io-client'

// import io from 'socket.IO-client'
let socket


const startPoint = new Icon({
  iconUrl: "/images/marker/startpoint.png",
  iconSize: [52, 52],
});
const endPoint = new Icon({
  iconUrl: "/images/marker/endpoint.png",
  iconSize: [52, 52],
});
const trackPoint = new Icon({
  iconUrl: "/images/marker/trackpoint.png",
  iconSize: [32, 32],
});


const SingleRideLiveViewDialog = (props) => {
  // ** Props
  const {open, trackRiderId, toggle, title} = props

  const closeDialog = () => {
    // alert('close')
    socket.disconnect()
    setIsConnected(false)
    // console.log(socket)

    toggle()
  }


  // console.log('ref',ref)

  // const [dataToShow, setDataToShow] = useState((title == 'Pickup' ? (socketPickup) : (socketDelivery)))
  // if (title == 'Pickup') {
  //   setDataToShow(socketPickup)
  // }
  // else if (title == 'Delivery') {
  //   setDataToShow(socketDelivery)
  // }


  // console.log('from map', dataToShow)

  // useEffect(() => {
  //   console.log('data changed', dataToShow)
  // }, [socketPickup])


  const [isConnected, setIsConnected] = useState(false)


  const [socketPickup, setSocketPickUp] = useState(null)
  const [socketDelivery, setSocketDelivery] = useState(null)

  const [startCoordPickup, setStartCoordPickup] = useState([])
  const [startCoordDelivery, setStartCoordDelivery] = useState([])

  const [realStartCoordDelivery, setRealStartCoordDelivery] = useState()
  useEffect(() => socketInitializer(), [])
  // console.log(realStartCoordDelivery)

  const socketInitializer = () => {
    // console.log('1')
    // await fetch('/connection')
    // socket = io("https://cleaner-sweep.tk/connection")
    // socket.emit('getLocation')

    socket = io("https://cleaner-sweep.tk/connection", {
      // path: "/connection",
      autoConnect: true,
      transports: ["websocket"],
      auth: {
        token: "cf198546f1c8891b5e91c749b87387e5fef897f8bf8b2cfdfe05f429fe68cbac353b7535397049f39a6f372be972a679cf538492aa3321bc3960cdb56ff4fb63"
      }
    });


    // const socket = io("https://cleaner-sweep.tk/", {
    //   path: "/connection",
    //   autoConnect: true,
    //   transports: ["websocket"],
    //   auth: {
    //     token: "cf198546f1c8891b5e91c749b87387e5fef897f8bf8b2cfdfe05f429fe68cbac353b7535397049f39a6f372be972a679cf538492aa3321bc3960cdb56ff4fb63"
    //   }
    // });

    // const []

    // console.log('socket', socket)

    socket.on('connect', () => {
      console.log('connected', socket.id)
      socket.on('requestLocation', () => {
        console.log('request', trackRiderId)
        setIsConnected(true)
        socket.emit("getLocation", {riderId: trackRiderId}, (response, error) => {
          console.log(response.data.data); // ok
          setSocketPickUp(response.data.data.pickup)
          setStartCoordPickup(response.data.data.pickup.startCordinates)
          setSocketDelivery(response.data.data.deliver)
          setStartCoordDelivery(response.data.data.deliver.startCordinates)

          if (title == 'Pickup') {
            setRealStartCoordDelivery(response.data.data.pickup.startCordinates)
          } else if (title == 'Delivery') {
            setRealStartCoordDelivery(response.data.data.deliver.startCordinates)
          }
        });
      })
    })

    socket.on("connect_error", (err) => {
      // console.log(err.message)
      // if (err.message === "invalid credentials") {
      //   socket.auth.token = "cf198546f1c8891b5e91c749b87387e5fef897f8bf8b2cfdfe05f429fe68cbac353b7535397049f39a6f372be972a679cf538492aa3321bc3960cdb56ff4fb63";
      //   socket.connect();
      // }
    });
  }

  // console.log('pickup data:', socketPickup?.startCordinates[0])


  function TrackMarkers() {
    if (title == 'Pickup') {
      return socketPickup?.trackCordinates.map((coordinata, index) => {
        return (<Marker key={index} position={coordinata} icon={trackPoint}>
          {/* <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
              </Popup> */}
        </Marker>);
      });
    } else if (title == 'Delivery') {
      return socketDelivery?.trackCordinates.map((coordinata, index) => {
        return (<Marker key={index} position={coordinata} icon={trackPoint}>
          {/* <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
              </Popup> */}
        </Marker>);
      });
    }
  }

  function StartMarker() {
    if (title == 'Pickup') {
      return socketPickup?.startCordinates.map((coordinata, index) => {
        return (<Marker key={index} position={coordinata} icon={startPoint}></Marker>);
      });
    } else if (title == 'Delivery') {
      return socketDelivery?.startCordinates.map((coordinata, index) => {
        return (<Marker key={index} position={coordinata} icon={startPoint}></Marker>);
      });
    }
  }

  function EndMarker() {
    if (title == 'Pickup') {
      return socketPickup?.endCordinates.map((coordinata, index) => {
        return (<Marker key={index} position={coordinata} icon={endPoint}></Marker>);
      });
    } else if (title == 'Delivery') {
      return socketDelivery?.endCordinates.map((coordinata, index) => {
        return (<Marker key={index} position={coordinata} icon={endPoint}></Marker>);
      });
    }
  }

  const completedOptions = {color: '#FFA803', weight: 8}

  let originCoordinate = [[35.96149331417969, -78.95789966560584]]
  let trackCoordinate = []

  // console.log('hello#####################3', socketPickup?.trackCordinates)


  let mergedCoordinate = []
  if (title == 'Pickup') {
    if (socketPickup?.trackCordinates != undefined) {
      // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@3', socketPickup?.trackCordinates)
      trackCoordinate = socketPickup?.trackCordinates
      mergedCoordinate = [...startCoordPickup, ...trackCoordinate]
    }
  } else if (title == 'Delivery') {
    if (socketDelivery?.trackCordinates != undefined) {
      // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@3', socketPickup?.trackCordinates)
      trackCoordinate = socketDelivery?.trackCordinates
      mergedCoordinate = [...startCoordDelivery, ...trackCoordinate]
    }
  }


  const completedPath = [
    // [
    //   42.9273618,
    //   -72.2853184
    // ],
    // [
    //   42.9280535,
    //   -72.2775185
    // ]
  ]


  return (
    <div>
      <Dialog fullScreen onClose={() => closeDialog()} aria-labelledby='full-screen-dialog-title' open={open}>
        <DialogTitle id='full-screen-dialog-title'>
          <Typography variant='h6' component='span'>
            {title}
          </Typography>
          <IconButton
            aria-label='close'
            onClick={() => closeDialog()}
            sx={{top: 8, right: 10, position: 'absolute', color: theme => theme.palette.grey[500]}}
          >
            <Close/>
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{p: 0}} dividers>
          <Box sx={{height: "90vh", position: "relative", display: "flex", flexDirection: "column"}}>


            {realStartCoordDelivery ? (


              <MapContainer
                zoomControl={false}
                style={{"flexGrow": "1", "position": "relative"}}
                // center={socketPickup?.startCordinates[0]}
                center={(socketPickup?.startCordinates[0] ? socketPickup?.startCordinates[0] : [35.96149331417969, -78.95789966560584])}
                // zoom={20}>
                zoom={13}>
                <TileLayer
                  url="https://api.mapbox.com/styles/v1/devkkali/cl9bbbg6g002815l3y0jhfexu/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZGV2a2thbGkiLCJhIjoiY2w5YjB5am9sMGZkdTNxbGU5NmQ0azBxZiJ9.LyGxEiZiUQdpPcGn3iyBrA"/>

                <StartMarker/>
                <EndMarker/>
                <TrackMarkers/>
                <Polyline pathOptions={completedOptions} positions={mergedCoordinate}/>
                {/* <Polyline pathOptions={incompletedOptions} positions={incompletedPath} /> */}

              </MapContainer>


            ) : (
              isConnected ? (
                <>
                  <MapContainer
                    zoomControl={false}
                    style={{"flexGrow": "1", "position": "relative"}}
                    // center={socketPickup?.startCordinates[0]}
                    center={[35.96149331417969, -78.95789966560584]}
                    // zoom={20}>
                    zoom={13}>
                    <TileLayer
                      url="https://api.mapbox.com/styles/v1/devkkali/cl9bbbg6g002815l3y0jhfexu/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZGV2a2thbGkiLCJhIjoiY2w5YjB5am9sMGZkdTNxbGU5NmQ0azBxZiJ9.LyGxEiZiUQdpPcGn3iyBrA"/>
                    <Marker position={[35.96149331417969, -78.95789966560584]} icon={startPoint}></Marker>
                  </MapContainer>
                </>
              ) : (
                <>
                  <Spinner/>

                  {/* <h1>Loading...</h1> */}
                </>
              )
            )}


          </Box>

        </DialogContent>
        {/* <DialogActions>
          <Button onClick={toggle}>Save changes</Button>
        </DialogActions> */}
      </Dialog>
    </div>
  )


}

export default SingleRideLiveViewDialog
