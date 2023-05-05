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

const RidesLiveViewDialog = props => {
  // ** Props
  const {open, toggle} = props


  return (
    <div>
      <Dialog fullScreen onClose={toggle} aria-labelledby='full-screen-dialog-title' open={open}>
        <DialogTitle id='full-screen-dialog-title'>
          <Typography variant='h6' component='span'>
            Group Live Location
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


              {/* <LocationMarker /> */}


              {/* <StartMarker />
              <EndMarker />
              <TrackMarkers />

              <Polyline pathOptions={completedOptions} positions={completedPath} />
              <Polyline pathOptions={incompletedOptions} positions={incompletedPath} /> */}


              {/* mapbox://styles/devkkali/cl9b1iq4s000715pukg7kpw7g */}


              {/* <div className="absolute bg-red-500 h-3 w-3 z-[5000] top-1/2 left-1/2"></div> */}
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

export default RidesLiveViewDialog
