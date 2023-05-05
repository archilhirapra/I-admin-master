import {Box} from "@mui/material";
import {Icon} from "leaflet";
import "leaflet/dist/leaflet.css";
import {useState} from "react";
import {
  MapContainer,
  Marker,
  Polyline,
  Circle,
  Popup,
  TileLayer,
  useMapEvents
} from "react-leaflet";
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
  iconSize: [52, 52],
});
// #185ADB   line color
export default function Tab1() {
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
    <Box sx={{borderRadius: "100px", height: "80vh", position: "relative", display: "flex", flexDirection: "column"}}>
      <MapContainer
        zoomControl={false}
        style={{"flexGrow": "1", "position": "relative", "borderRadius": "12px"}}
        center={[42.9273618,
          -72.2853184]}
        zoom={20}>
        <TileLayer
          url="https://api.mapbox.com/styles/v1/devkkali/cl9bbbg6g002815l3y0jhfexu/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZGV2a2thbGkiLCJhIjoiY2w5YjB5am9sMGZkdTNxbGU5NmQ0azBxZiJ9.LyGxEiZiUQdpPcGn3iyBrA"/>


        {/* <LocationMarker /> */}


        <StartMarker/>
        <EndMarker/>
        <TrackMarkers/>
        {/* <Polyline pathOptions={limeOptions} positions={riderPath} /> */}
        <Polyline pathOptions={completedOptions} positions={completedPath}/>
        <Polyline pathOptions={incompletedOptions} positions={incompletedPath}/>
        {/* mapbox://styles/devkkali/cl9b1iq4s000715pukg7kpw7g */}


        {/* <div className="absolute bg-red-500 h-3 w-3 z-[5000] top-1/2 left-1/2"></div> */}
      </MapContainer>
    </Box>
  );
}

// [35.99422908383683, -78.89860655164998] [ 35.993127888164956, - 78.89895778869881]
function LocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click(e) {
      console.log(e.latlng);
      setPosition(e.latlng);
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
    move(e) {
      markCenter();
    },
  });

  const markCenter = () => {
    setPosition(map.getCenter());
  };
  // alert(position)
  return position === null ? null : (
    <Marker icon={myIcon} position={[-79.442718, 35.552391]}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

// function LocationMarker() {
//     const [position, setPosition] = useState(null);
//     const map = useMapEvents({
//         click(e) {
//             console.log(e.latlng);
//             setPosition(e.latlng);
//         },
//         locationfound(e) {
//             setPosition(e.latlng);
//             map.flyTo(e.latlng, map.getZoom());
//         },
//         move(e) {
//             markCenter();
//         },
//     });

//     const markCenter = () => {
//         setPosition(map.getCenter());
//     };
//     return position === null ? null : (
//         <Marker icon={myIcon}
//             position={[
//                 [
//                     2.551223,
//                     48.356148
//                 ],
//                 [
//                     2.551223,
//                     48.356148
//                 ]
//             ]}
//         >
//             <Popup>You are here</Popup>
//         </Marker>
//     );
// }
