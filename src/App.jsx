import { useState, useEffect, useReducer } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import L from 'leaflet';
import icon from './images/marker.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import SearchForm from './components/SearchForm/SearchForm';
import DetailsPane from './components/DetailsPane/DetailsPane';
import CustomDetails from './components/CustomDetails/CustomDetails';

import { reducer } from './reducer';
import { fetchIPDetails } from './api/api';

import styles from './App.module.css';

// change the default leaflet marker because it is having issues with base64 image path
let defaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = defaultIcon;

function App() {
  const [state, dispatch] = useReducer(reducer, {
    input: '',
    isPaneOpen: false,
    ipAddrData: null,
    error: ''
  });
  const [map, setMap] = useState(null);

  //load 
  useEffect(() => {
    fetchAndSaveIPData('');
  }, [])

  useEffect(() => {
    //hook that updates the map's center point based on the IP search coordinates returned from search
    if (state.ipAddrData) {
      map.flyTo([state.ipAddrData.location.lat, state.ipAddrData.location.lng]);
    }
  }, [map, state.ipAddrData])

  const fetchAndSaveIPData = async (input) => {
    const results = await fetchIPDetails(input);
    dispatch({ type: 'SET_FETCH_DATA', payload: results });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchAndSaveIPData(state.input);
  }

  const handleChange = (search) => {
    dispatch({ type: 'UPDATE_IP', payload: search });
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <h2 className={styles.header}>IP Tracker App</h2>
        <SearchForm submitCallback={handleSubmit} changeCallback={handleChange} error={state.error} />
        {state.isPaneOpen &&
          <DetailsPane>
            <CustomDetails heading='IP Address' value={state.ipAddrData ? state.ipAddrData.ip : '-'} />
            <CustomDetails heading='Location' value={state.ipAddrData ? `${state.ipAddrData.location.city}, ${state.ipAddrData.location.region}, ${state.ipAddrData.location.country}` : '-'} />
            <CustomDetails heading='Timezone' value={state.ipAddrData ? `UTC ${state.ipAddrData.location.timezone}` : '-'} />
            <CustomDetails heading='ISP' value={state.ipAddrData ? state.ipAddrData.isp : '-'} />
          </DetailsPane>
        }
      </div>
      <div>
        <MapContainer
          center={[50.8504, 4.3487]}
          zoom={13}
          scrollWheelZoom={true}
          whenCreated={setMap}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[state.ipAddrData?.location.lat || 50.8504, state.ipAddrData?.location.lng || 4.3487]}>
            <Popup>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
