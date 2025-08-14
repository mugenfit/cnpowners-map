'use client';

import { useState } from 'react';
import { MapComponent, useShops, Shop } from '@miyazawanaotaka/shop-map-module';

interface ShopMapProps {
  userLocation: { lat: number; lng: number } | null;
}

const ShopMap: React.FC<ShopMapProps> = ({ userLocation }) => {
  const { shops, loading: shopsLoading, error: shopsError } = useShops(userLocation);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  if (shopsLoading) {
    return <div>Loading shops...</div>;
  }

  if (shopsError) {
    return <div>Error loading shops: {shopsError.message}</div>;
  }

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <MapComponent
        userLocation={userLocation}
        shops={shops}
        selectedShop={selectedShop}
        setSelectedShop={setSelectedShop}
        onMapLoad={setMap}
        // The following props are not used in this simplified component,
        // but are kept here for reference from the original MapComponent.
        castles={[]}
        selectedCastle={null}
        setSelectedCastle={() => {}}
        targetLocations={[]}
        personPosition={null}
        tripType={'outbound'}
        tripData={null}
        onDragStart={() => {}}
      />
    </div>
  );
};

export default ShopMap;
