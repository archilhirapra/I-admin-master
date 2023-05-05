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
import {useState} from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'


// import marker from "./map-marker.svg";
const startPoint = new Icon({
  iconUrl: "/images/marker/startpoint.png",
  // iconSize: [25, 41],
  iconSize: [52, 52],
});
// import marker from "./map-marker.svg";
const endPoint = new Icon({
  iconUrl: "/images/marker/endpoint.png",
  // iconSize: [25, 41],
  iconSize: [52, 52],
});
// import marker from "./map-marker.svg";
const trackPoint = new Icon({
  iconUrl: "/images/marker/trackpoint.png",
  // iconSize: [25, 41],
  // iconSize: [52, 52],
  iconSize: [32, 32],
});
// #185ADB   line color


const SingleRideLiveViewDialog = props => {
  // ** Props
  const {open, toggle, title} = props


  const riderPath = [
    [
      42.9273618,
      -72.2853184
    ],
    [
      42.9280535,
      -72.2775185
    ],
    [
      42.9249409,
      -72.2786021
    ]
  ]
  const completedPath = [
    [
      42.9273618,
      -72.2853184
    ],
    [
      42.9280535,
      -72.2775185
    ]
  ]
  const incompletedPath = [
    [
      42.9280535,
      -72.2775185
    ],
    [
      42.9249409,
      -72.2786021
    ]
  ]
  // const limeOptions = { color: '#FFA803', weight: 8 }
  const completedOptions = {color: '#FFA803', weight: 8}
  const incompletedOptions = {color: '#FFD077', weight: 8}
  var startCordinates = [
    [
      42.9273618,
      -72.2853184
    ],
  ];
  var endCordinates = [
    [
      42.9249409,
      -72.2786021
    ],
  ];
  var trackCordinates = [
    [
      42.9280537,
      -72.275
    ],
    [
      42.9280535,
      -72.2775185
    ],
  ];

  function TrackMarkers() {
    return trackCordinates.map((coordinata, index) => {
      return (<Marker key={index} position={coordinata} icon={trackPoint}>
        {/* <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
            </Popup> */}
      </Marker>);
    });
  }

  function StartMarker() {
    return startCordinates.map((coordinata, index) => {
      return (<Marker key={index} position={coordinata} icon={startPoint}></Marker>);
    });
  }

  function EndMarker() {
    return endCordinates.map((coordinata, index) => {
      return (<Marker key={index} position={coordinata} icon={endPoint}></Marker>);
    });
  }


  return (
    <div>
      <Dialog fullScreen onClose={toggle} aria-labelledby='full-screen-dialog-title' open={open}>
        <DialogTitle id='full-screen-dialog-title'>
          <Typography variant='h6' component='span'>
            {title}
          </Typography>
          <IconButton
            aria-label='close'
            onClick={toggle}
            sx={{top: 8, right: 10, position: 'absolute', color: theme => theme.palette.grey[500]}}
          >
            <Close/>
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{p: 0}} dividers>
          <Box sx={{height: "90vh", position: "relative", display: "flex", flexDirection: "column"}}>
            <MapContainer
              zoomControl={false}
              style={{"flexGrow": "1", "position": "relative"}}
              center={[42.9273618,
                -72.2853184]}
              zoom={20}>
              <TileLayer
                url="https://api.mapbox.com/styles/v1/devkkali/cl9bbbg6g002815l3y0jhfexu/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZGV2a2thbGkiLCJhIjoiY2w5YjB5am9sMGZkdTNxbGU5NmQ0azBxZiJ9.LyGxEiZiUQdpPcGn3iyBrA"/>

              <StartMarker/>
              <EndMarker/>
              <TrackMarkers/>

              {/* <Polyline pathOptions={completedOptions} positions={completedPath} />
              <Polyline pathOptions={incompletedOptions} positions={incompletedPath} /> */}


            </MapContainer>
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
