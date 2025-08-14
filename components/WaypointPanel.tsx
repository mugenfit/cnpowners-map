'use client';

import React, { useState } from 'react';

interface Castle {
  id: number;
  name: string;
  lat: number;
  lng: number;
  distance?: number;
  type: 'castle';
}

interface Shop {
  id: number;
  name: string;
  address: string;
  url?: string;
  description?: string;
  lat?: number;
  lng?: number;
  distance?: number;
  type: 'shop';
  isOnline?: boolean;
  category?: string;
}

type Location = Castle | Shop;

interface WaypointPanelProps {
  availableLocations: Location[];
  targetLocations: Location[];
  addTargetLocation: (location: Location) => void;
  removeTargetLocation: (locationId: number) => void;
  moveTargetLocation: (locationId: number, direction: 'up' | 'down') => void;
  tripType: 'outbound' | 'inbound';
}

const WaypointPanel: React.FC<WaypointPanelProps> = ({
  availableLocations,
  targetLocations,
  addTargetLocation,
  removeTargetLocation,
  moveTargetLocation,
  tripType,
}) => {
  const [selectedLocationId, setSelectedLocationId] = useState<string>('');

  const handleAddClick = () => {
    if (selectedLocationId) {
      const location = availableLocations.find(loc => loc.id === parseInt(selectedLocationId));
      if (location) {
        addTargetLocation(location);
        setSelectedLocationId('');
      }
    }
  };

  const getLocationPrefix = (loc: Location) => {
    if (loc.type === 'castle') return '城: ';
    if (loc.isOnline) return 'オンライン: ';
    if (loc.category === '移動販売') return '移動販売: ';
    return '店舗: ';
  };

  return (
    <div style={{ padding: '10px', background: '#f9f9f9', borderBottom: '1px solid #ccc', width: '350px' }}>
      <div style={{ marginTop: '20px', padding: '10px', background: '#f0f0f0', borderTop: '1px solid #ccc' }}>
        <h4>{tripType === 'outbound' ? '経由地を追加' : '出発地を追加'}</h4>
        <div style={{ display: 'flex', marginBottom: '10px', alignItems: 'center' }}>
          <select value={selectedLocationId} onChange={(e) => setSelectedLocationId(e.target.value)} style={{ flexGrow: 1, padding: '8px', borderRadius: '5px', border: '1px solid #ccc', minWidth: 0 }}>
            <option value="">-- 場所を選択してください --</option>
            {availableLocations.sort((a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity)).map((loc) => (
              <option key={loc.id} value={loc.id}>
                {getLocationPrefix(loc)}{loc.name} {loc.distance !== undefined ? `(${loc.distance.toFixed(2)} km)` : ''}
              </option>
            ))}
          </select>
          <button onClick={handleAddClick} style={{ marginLeft: '10px', padding: '8px 15px', flexShrink: 0 }}>追加</button>
        </div>
        <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
          <h5>現在のルート:</h5>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {targetLocations.map((loc, index) => (
              <li key={loc.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px', gap: '5px' }}>
                <span style={{ flex: 1, minWidth: 0, overflowWrap: 'break-word' }}>{index + 1}. {getLocationPrefix(loc)}{loc.name}</span>
                <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                  <button onClick={() => moveTargetLocation(loc.id, 'up')} disabled={index === 0} style={{ padding: '3px 8px' }}>↑</button>
                  <button onClick={() => moveTargetLocation(loc.id, 'down')} disabled={index === targetLocations.length - 1} style={{ padding: '3px 8px', margin: '0 5px' }}>↓</button>
                  <button onClick={() => removeTargetLocation(loc.id)} style={{ padding: '3px 8px' }}>削除</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WaypointPanel;