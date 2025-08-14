"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  MapComponent: () => MapComponent,
  useShops: () => useShops
});
module.exports = __toCommonJS(index_exports);

// src/MapComponent.tsx
var import_react_google_maps = require("@vis.gl/react-google-maps");
var import_react = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
var MapComponent = ({
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
  onDragStart
}) => {
  const map = (0, import_react_google_maps.useMap)();
  (0, import_react.useEffect)(() => {
    if (map) {
      onMapLoad(map);
    }
  }, [map, onMapLoad]);
  (0, import_react.useEffect)(() => {
    if (!map || !tripData || tripData.segments.length === 0) return;
    const path = tripData.segments.flatMap((segment) => [segment.start, segment.end]);
    const polyline = new google.maps.Polyline({
      path,
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 4,
      icons: [{
        icon: {
          path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
          scale: 3,
          strokeColor: "#FF0000"
        },
        offset: "100%",
        repeat: "20px"
      }]
    });
    polyline.setMap(map);
    return () => {
      polyline.setMap(null);
    };
  }, [map, tripData]);
  const castleIcon = {
    url: "/castle.png",
    // Assuming this path is correct from public folder
    scaledSize: { width: 30, height: 30 }
  };
  const personIcon = {
    url: "/home.png",
    // Assuming this path is correct from public folder
    scaledSize: { width: 30, height: 30 }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_react_google_maps.Map,
    {
      mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID,
      defaultCenter: userLocation || { lat: 35.681236, lng: 139.767125 },
      defaultZoom: 10,
      gestureHandling: "greedy",
      disableDefaultUI: false,
      style: { flexGrow: 1, height: "100%" },
      onDragstart: onDragStart,
      children: [
        shops.map((shop) => !shop.isOnline && shop.lat && shop.lng && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_google_maps.AdvancedMarker, { position: { lat: shop.lat, lng: shop.lng }, onClick: () => setSelectedShop(shop), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_google_maps.Pin, { background: "#FFD700", borderColor: "#000000", glyphColor: "#000000" }) }, shop.id)),
        castles.map((castle) => castle.lat && castle.lng && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_google_maps.AdvancedMarker, { position: { lat: castle.lat, lng: castle.lng }, onClick: () => setSelectedCastle(castle), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", { src: castleIcon.url, alt: castle.name, style: { width: castleIcon.scaledSize.width, height: castleIcon.scaledSize.height } }) }) }, castle.id)),
        personPosition && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_google_maps.AdvancedMarker, { position: personPosition, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", { src: personIcon.url, alt: "\u73FE\u5728\u5730", style: { width: personIcon.scaledSize.width, height: personIcon.scaledSize.height } }) }),
        selectedShop && selectedShop.lat && selectedShop.lng && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_google_maps.InfoWindow, { position: { lat: selectedShop.lat, lng: selectedShop.lng }, onClose: () => {
          setSelectedShop(null);
        }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: selectedShop.name }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: selectedShop.address }),
          selectedShop.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: selectedShop.description }),
          selectedShop.url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: selectedShop.url, target: "_blank", rel: "noopener noreferrer", children: "\u8A73\u7D30\u3092\u898B\u308B" }) }),
          selectedShop.distance !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
            "\u73FE\u5728\u5730\u304B\u3089\u306E\u8DDD\u96E2: ",
            selectedShop.distance.toFixed(2),
            " km"
          ] })
        ] }) }),
        selectedCastle && selectedCastle.lat && selectedCastle.lng && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_google_maps.InfoWindow, { position: { lat: selectedCastle.lat, lng: selectedCastle.lng }, onClose: () => {
          setSelectedCastle(null);
        }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: selectedCastle.name }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
            "\u7DEF\u5EA6: ",
            selectedCastle.lat.toFixed(4),
            ", \u7D4C\u5EA6: ",
            selectedCastle.lng.toFixed(4)
          ] }),
          selectedCastle.distance !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
            "\u73FE\u5728\u5730\u304B\u3089\u306E\u8DDD\u96E2: ",
            selectedCastle.distance.toFixed(2),
            " km"
          ] })
        ] }) })
      ]
    }
  );
};

// src/useShops.ts
var import_react2 = require("react");
var ONLINE_SHOP_DISTANCE = 20;
var calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};
var useShops = (userLocation) => {
  const [shops, setShops] = (0, import_react2.useState)([]);
  const [loading, setLoading] = (0, import_react2.useState)(true);
  const [error, setError] = (0, import_react2.useState)(null);
  (0, import_react2.useEffect)(() => {
    if (!userLocation) return;
    const fetchShopsAndGeocode = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/shops");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const fetchedShops = await response.json();
        const geocodedShops = await Promise.all(
          fetchedShops.map(async (shop, index) => {
            let shopWithId = {
              ...shop,
              id: 1e6 + index,
              type: "shop"
            };
            if (shop.isOnline) {
              shopWithId.distance = ONLINE_SHOP_DISTANCE;
            } else if (shop.address && !shop.lat && !shop.lng) {
              const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
              if (apiKey) {
                try {
                  const geocodeResponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(shop.address)}&key=${apiKey}`);
                  const geocodeData = await geocodeResponse.json();
                  if (geocodeData.status === "OK" && geocodeData.results && geocodeData.results.length > 0) {
                    const { lat, lng } = geocodeData.results[0].geometry.location;
                    shopWithId.lat = lat;
                    shopWithId.lng = lng;
                  } else {
                    shopWithId.distance = ONLINE_SHOP_DISTANCE;
                  }
                } catch (e) {
                  shopWithId.distance = ONLINE_SHOP_DISTANCE;
                }
              }
            }
            if (shopWithId.lat && shopWithId.lng && !shopWithId.isOnline) {
              shopWithId.distance = calculateDistance(userLocation.lat, userLocation.lng, shopWithId.lat, shopWithId.lng);
            }
            return shopWithId;
          })
        );
        setShops(geocodedShops);
      } catch (e) {
        setError(e.message);
        console.error("Error fetching or geocoding shops:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchShopsAndGeocode();
  }, [userLocation]);
  return { shops, loading, error };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MapComponent,
  useShops
});
