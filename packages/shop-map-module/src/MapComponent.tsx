'use client';

'use client';

import { Map, AdvancedMarker, InfoWindow, Pin, useMap } from '@vis.gl/react-google-maps'; // Removed Polyline
import { useState, useMemo, useEffect } from 'react';
import { Shop, Castle, Location, LatLngLiteral, TripType, TripData } from './types'; // Import all necessary types
import homeIconUrl from './home.png';

interface MapComponentProps {
  shops: Shop[];
  userLocation: LatLngLiteral | null;
  castles: Castle[];
  selectedCastle: Castle | null;
  setSelectedCastle: (castle: Castle | null) => void;
  selectedShop: Shop | null;
  setSelectedShop: (shop: Shop | null) => void;
  targetLocations: Location[];
  personPosition: LatLngLiteral | null;
  tripType: TripType;
  tripData: TripData | null;
  onMapLoad: (map: google.maps.Map) => void;
  onDragStart: () => void;
}

export const MapComponent: React.FC<MapComponentProps> = ({
  shops,
  userLocation,
  castles,
  selectedCastle,
  setSelectedCastle,
  selectedShop,
  setSelectedShop,
  targetLocations,
  personPosition,
  tripType,
  tripData,
  onMapLoad,
  onDragStart,
}) => {
  const map = useMap(); // Get the map instance

  useEffect(() => {
    if (map) {
      onMapLoad(map);
    }
  }, [map, onMapLoad]);

  // Polyline management using vanilla Google Maps API
  useEffect(() => {
    if (!map || !tripData || tripData.segments.length === 0) return;

    const path = tripData.segments.flatMap(segment => [segment.start, segment.end]);

    const polyline = new google.maps.Polyline({
      path: path,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 4,
      icons: [{
        icon: {
          path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
          scale: 3,
          strokeColor: '#FF0000',
        },
        offset: '100%',
        repeat: '20px'
      }],
    });

    polyline.setMap(map);

    return () => {
      polyline.setMap(null);
    };
  }, [map, tripData]);

  const castleIcon = {
    url: '/castle.png', // Assuming this path is correct from public folder
    scaledSize: { width: 30, height: 30 },
  };

  const personIcon = {
    url: homeIconUrl.src,
    scaledSize: { width: 30, height: 30 },
  };

  return (
    <Map
      mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID!}
      defaultCenter={userLocation || { lat: 35.681236, lng: 139.767125 }}
      defaultZoom={10}
      gestureHandling={'greedy'}
      disableDefaultUI={false}
      style={{ flexGrow: 1, height: '100%' }}
      onDragstart={onDragStart} // Pass onDragStart (corrected typo)
    >
      {/* Render Shops */}
      {shops.map((shop) => (
        !shop.isOnline && shop.lat && shop.lng && (
          <AdvancedMarker key={shop.id} position={{ lat: shop.lat, lng: shop.lng }} onClick={() => setSelectedShop(shop)}>
            <Pin background={'#FFD700'} borderColor={'#000000'} glyphColor={'#000000'} />
          </AdvancedMarker>
        )
      ))
      }

      {/* Render Castles */}
      {castles.map((castle) => (
        castle.lat && castle.lng && (
          <AdvancedMarker key={castle.id} position={{ lat: castle.lat, lng: castle.lng }} onClick={() => setSelectedCastle(castle)}>
            <div><img src={castleIcon.url} alt={castle.name} style={{ width: castleIcon.scaledSize.width, height: castleIcon.scaledSize.height }} /></div>
          </AdvancedMarker>
        )
      ))}

      {/* Render Person Position */}
      {personPosition && (
        <AdvancedMarker position={personPosition}>
          <img src={personIcon.url} alt="現在地" style={{ width: personIcon.scaledSize.width, height: personIcon.scaledSize.height }} />
        </AdvancedMarker>
      )}

      {/* Render InfoWindow for selected shop */}
      {selectedShop && selectedShop.lat && selectedShop.lng && (
        <InfoWindow position={{ lat: selectedShop.lat, lng: selectedShop.lng }} onClose={() => { setSelectedShop(null); }}>
          <div>
            <h3>{selectedShop.name}</h3>
            <p>{selectedShop.address}</p>
            {selectedShop.description && <p>{selectedShop.description}</p>}
            {selectedShop.url && <p><a href={selectedShop.url} target="_blank" rel="noopener noreferrer">詳細を見る</a></p>}
            {selectedShop.distance !== undefined && (
              <p>現在地からの距離: {selectedShop.distance.toFixed(2)} km</p>
            )}
          </div>
        </InfoWindow>
      )}

      {/* Render InfoWindow for selected castle */}
      {selectedCastle && selectedCastle.lat && selectedCastle.lng && (
        <InfoWindow position={{ lat: selectedCastle.lat, lng: selectedCastle.lng }} onClose={() => { setSelectedCastle(null); }}>
          <div>
            <h3>{selectedCastle.name}</h3>
            <p>緯度: {selectedCastle.lat.toFixed(4)}, 経度: {selectedCastle.lng.toFixed(4)}</p>
            {selectedCastle.distance !== undefined && (
              <p>現在地からの距離: {selectedCastle.distance.toFixed(2)} km</p>
            )}
          </div>
        </InfoWindow>
      )}
    </Map>
  );
};
