import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import type { Restaurant } from "../types";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface Props {
  restaurants: Restaurant[];
  onSelectRestaurant: (restaurant: Restaurant) => void;
  onLocationChange: (address: string) => void;
}

// Handles click anywhere on map
const MapClickHandler = ({
  onLocationChange,
  setClickedPos,
}: {
  onLocationChange: (address: string) => void;
  setClickedPos: (pos: [number, number]) => void;
}) => {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      setClickedPos([lat, lng]);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
        );
        const data = await res.json();
        const address =
          data.display_name.split(",").slice(0, 3).join(",") ||
          `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
        onLocationChange(address);
      } catch {
        onLocationChange(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
      }
    },
  });
  return null;
};

const MapView = ({
  restaurants,
  onSelectRestaurant,
  onLocationChange,
}: Props) => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null,
  );
  const [clickedPos, setClickedPos] = useState<[number, number] | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserLocation([latitude, longitude]);
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
          );
          const data = await res.json();
          const address = data.display_name.split(",").slice(0, 3).join(",");
          onLocationChange(address);
        } catch {
          onLocationChange("Lagos, Nigeria");
        }
      },
      () => {
        setUserLocation([6.5244, 3.3792]);
        onLocationChange("Lagos, Nigeria");
      },
    );
  }, []);

  if (!userLocation)
    return (
      <div
        style={{
          textAlign: "center",
          padding: 40,
          color: "var(--text2)",
          fontFamily: "var(--mono)",
          fontSize: 13,
        }}
      >
        📍 Getting your location...
      </div>
    );

  return (
    <MapContainer
      center={userLocation}
      zoom={12}
      style={{ height: 380, width: "100%", borderRadius: 16 }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapClickHandler
        onLocationChange={onLocationChange}
        setClickedPos={setClickedPos}
      />
      <Circle
        center={userLocation}
        radius={800}
        pathOptions={{
          color: "orange",
          fillColor: "orange",
          fillOpacity: 0.1,
        }}
      />
      {/* Clicked position marker */}
      {clickedPos && (
        <Marker position={clickedPos}>
          <Popup>📍 Selected location</Popup>
        </Marker>
      )}
      {/* Restaurant markers */}
      {restaurants.map((r) => (
        <Marker
          key={r.id}
          position={[r.lat, r.lng]}
          eventHandlers={{
            click: () => {
              onSelectRestaurant(r);
            },
          }}
        >
          <Popup>
            <div style={{ minWidth: 160 }}>
              <strong style={{ fontSize: 14 }}>{r.name}</strong>
              <br />
              <span style={{ fontSize: 12, color: "#666" }}>{r.address}</span>
              <br />
              <span style={{ fontSize: 12 }}>
                ⭐ {r.rating} · 🕐 {r.deliveryTime}
              </span>
              <br />
              <span
                style={{
                  fontSize: 12,
                  color: r.isOpen ? "green" : "red",
                  fontWeight: 600,
                }}
              >
                {r.isOpen ? "● Open now" : "● Closed"}
              </span>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
