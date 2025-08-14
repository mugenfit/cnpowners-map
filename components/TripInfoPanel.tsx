
'use client';

import React from 'react';

interface TripData {
  start: { lat: number; lng: number };
  end: { lat: number; lng: number };
  distance: number;
  title: string;
}

interface TripInfoPanelProps {
  tripData: TripData | null;
  totalDistanceWalked: number;
  strideLength: number;
}

const TripInfoPanel: React.FC<TripInfoPanelProps> = ({ tripData, totalDistanceWalked, strideLength }) => {
  if (!tripData) return null;

  const remainingDistance = Math.max(0, tripData.distance - totalDistanceWalked);
  const remainingDays = Math.ceil((new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const dailyAverage = remainingDays > 0 ? (remainingDistance / remainingDays) : 0;

  return (
    <div style={{ flex: 1, marginLeft: '20px' }}>
      <h4>{tripData.title}</h4>
      <p>目標まで残り: {remainingDistance.toFixed(2)} km</p>
      <p>月末まであと: {remainingDays} 日</p>
      {remainingDistance > 0 && remainingDays > 0 && <p>1日あたり約 {dailyAverage.toFixed(2)} km ({Math.round((dailyAverage * 1000) / strideLength)} 歩) 進む必要があります。</p>}
      {remainingDistance <= 0 && <p style={{ color: 'green', fontWeight: 'bold' }}>目標達成です！</p>}
    </div>
  );
};

export default TripInfoPanel;
