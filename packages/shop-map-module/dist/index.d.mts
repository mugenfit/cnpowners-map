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
    segmentDistance?: number;
    category?: string;
}
interface Castle {
    id: number;
    name: string;
    lat: number;
    lng: number;
    distance?: number;
    type: 'castle';
    segmentDistance?: number;
}
type Location = Shop | Castle;
type LatLngLiteral = {
    lat: number;
    lng: number;
};
type TripType = 'outbound' | 'inbound';
interface TripData {
    segments: Array<{
        start: LatLngLiteral;
        end: LatLngLiteral;
        distance: number;
    }>;
    totalDistance: number;
    title: string;
}

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
declare const MapComponent: React.FC<MapComponentProps>;

declare const useShops: (userLocation: {
    lat: number;
    lng: number;
} | null) => {
    shops: Shop[];
    loading: boolean;
    error: string | null;
};

export { type Castle, type Location, MapComponent, type Shop, useShops };
