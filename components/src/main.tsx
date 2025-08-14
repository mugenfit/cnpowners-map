import React from 'react';
import ReactDOM from 'react-dom/client';
import { APIProvider } from '@vis.gl/react-google-maps';
import MapComponent from '../MapComponent';

// Mock Data for demonstration
const userLocation = { lat: 35.681236, lng: 139.767125 }; // Tokyo Station
const castles = [
  { id: 1, name: 'Edo Castle', lat: 35.685175, lng: 139.752799, type: 'castle' as const },
  { id: 2, name: 'Osaka Castle', lat: 34.687315, lng: 135.526201, type: 'castle' as const },
];
const shops = [
    { id: 1, name: 'Cool Souvenir Shop', address: 'Near Tokyo Station', lat: 35.681, lng: 139.767, type: 'shop' as const },
];
const mockTripData = {
    segments: [
        {
            start: { lat: 35.681236, lng: 139.767125 },
            end: { lat: 35.685175, lng: 139.752799 }
        }
    ]
};

const App = () => {
  const [selectedCastle, setSelectedCastle] = React.useState(null);
  const [selectedShop, setSelectedShop] = React.useState(null);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''}>
            <MapComponent
                userLocation={userLocation}
                castles={castles}
                shops={shops}
                selectedCastle={selectedCastle}
                setSelectedCastle={setSelectedCastle}
                selectedShop={selectedShop}
                setSelectedShop={setSelectedShop}
                targetLocations={[]}
                personPosition={null}
                tripType={'outbound'}
                tripData={mockTripData}
                onMapLoad={(map) => console.log('Map loaded:', map)}
                onDragStart={() => console.log('Map drag started')}
            />
        </APIProvider>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
