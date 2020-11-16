import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import L from 'leaflet';
import icon from './images/marker.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import Input from './components/Input/Input'
import DetailsPane from './components/DetailsPane/DetailsPane'
import CustomDetails from './components/CustomDetails/CustomDetails'

import styles from './App.module.css'

const IPIFY_API_KEY = process.env.REACT_APP_IPIFY_API_KEY;

// change the default leaflet marker because it is having issues with base64 image path
let defaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = defaultIcon;

function App() {
  const [ip, setIP] = useState('');
  const [isPaneOpen, setIsPaneOpen] = useState(false);
  const [ipAddrData, setIPAddrData] = useState(null);
  const [error, setError] = useState('');
  const [map, setMap] = useState(null);

  useEffect(() => {
    //hook that updates the map's center point based on the IP search coordinates returned from search
    if (ipAddrData) {
      map.flyTo([ipAddrData.location.lat, ipAddrData.location.lng]);
    }
  }, [map, ipAddrData])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await (await fetch(`https://geo.ipify.org/api/v1?apiKey=${IPIFY_API_KEY}&ipAddress=${ip}`)).json();
    if (data.code >= 400) {
      //Error - submitted wrong IP
      setError(data.messages);
      setIsPaneOpen(false);
    } else {
      setIPAddrData(data);
      setIsPaneOpen(true);
      setError('');
    }
  }

  const handleChange = (e) => {
    setIP(e.target.value);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <h2 className={styles.header}>IP Tracker App</h2>
        <div className={styles.inputDiv}>
          <form onSubmit={handleSubmit}>
            <Input className='ip-search' placeholder='Enter IP to search...' onChange={handleChange} value={ip} />
            {error &&
              <p className='error'>{error}</p>
            }
          </form>
        </div>
        {isPaneOpen &&
          <DetailsPane>
            <CustomDetails heading='IP Address' value={ipAddrData ? ipAddrData.ip : '-'} />
            <CustomDetails heading='Location' value={ipAddrData ? `${ipAddrData.location.city}, ${ipAddrData.location.region}, ${ipAddrData.location.country}` : '-'} />
            <CustomDetails heading='Timezone' value={ipAddrData ? `UTC ${ipAddrData.location.timezone}` : '-'} />
            <CustomDetails heading='ISP' value={ipAddrData ? ipAddrData.isp : '-'} />
          </DetailsPane>
        }
      </div>
      <div>
        <MapContainer
          center={[50.85045, 4.34878]}
          zoom={12}
          scrollWheelZoom={true}
          whenCreated={setMap}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[ipAddrData?.location.lat || 50.85045, ipAddrData?.location.lng || 4.34878]}>
            <Popup>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
