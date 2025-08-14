# Reusable Shop Map Component

This directory contains a reusable React component for displaying a map with shop locations.

## `ShopMap.tsx`

This is the main component to use. It wraps the core map functionality from the `@miyazawanaotaka/shop-map-module` and provides a simple interface for use in any React project.

### How to Use

To use the `ShopMap` component, you need to import it and render it in your application. It requires a `userLocation` prop to be passed to it.

**Props:**

- `userLocation` (object | null): The latitude and longitude of the user's current location. Example: `{ lat: 35.681236, lng: 139.767125 }`

### Example Usage

```tsx
import ShopMap from './ShopMap';

const MyPage = () => {
  const userLocation = { lat: 35.681236, lng: 139.767125 }; // Example location

  return (
    <div>
      <h1>My Shop Map</h1>
      <div style={{ height: '600px', width: '100%' }}>
        <ShopMap userLocation={userLocation} />
      </div>
    </div>
  );
};

export default MyPage;
```

### Dependencies

Make sure your project has the following dependencies installed:

- `react`
- `react-dom`
- `@miyazawanaotaka/shop-map-module` (This is a private package, ensure you have access to it)
- `@vis.gl/react-google-maps`

### Environment Variables

This component requires a Google Maps API key with a Map ID to be configured in your project's environment variables.

Create a `.env.local` file in the root of your project and add the following line:

```
NEXT_PUBLIC_GOOGLE_MAP_ID=your-google-map-id
```

Replace `your-google-map-id` with your actual Google Map ID.
