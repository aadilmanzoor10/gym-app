'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import {
  GoogleMap,
  Marker,
  useLoadScript,
  InfoWindow,
} from '@react-google-maps/api';
import { api } from '@/lib/api';

interface Gym {
  id: number;
  name: string;
  location: string;
  coordinates: [number, number];
}

const containerStyle = {
  width: '100%',
  height: '500px',
};

const distanceOptions = [2, 5, 10, 20];

function haversineDistance(
  coords1: { lat: number; lng: number },
  coords2: { lat: number; lng: number }
): number {
  const R = 6371; // km
  const dLat = ((coords2.lat - coords1.lat) * Math.PI) / 180;
  const dLng = ((coords2.lng - coords1.lng) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((coords1.lat * Math.PI) / 180) *
      Math.cos((coords2.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function GymMapPage() {
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [selectedGym, setSelectedGym] = useState<Gym | null>(null);
  const [radius, setRadius] = useState<number>(10);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  useEffect(() => {
    const fetchGyms = async () => {
      try {
        const res = await api.get('/api/gyms');
        setGyms(res.data as Gym[]);
      } catch (error) {
        console.error('Failed to load gyms:', error);
      }
    };

    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setUserLocation({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            });
          },
          (err) => {
            console.error('Geolocation error:', err);
            setUserLocation({ lat: 31.5204, lng: 74.3587 });
          }
        );
      } else {
        setUserLocation({ lat: 31.5204, lng: 74.3587 });
      }
    };

    fetchGyms();
    getUserLocation();
  }, []);

  const filteredGyms = useMemo(() => {
    if (!userLocation) return [];
    return gyms.filter((gym) => {
      const distance = haversineDistance(userLocation, {
        lat: gym.coordinates[0],
        lng: gym.coordinates[1],
      });
      return distance <= radius;
    });
  }, [gyms, userLocation, radius]);

  const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      setUserLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    }
  }, []);

  if (!isLoaded) return <p className="p-6 text-gray-600">Loading map...</p>;

  if (!userLocation)
    return (
      <p className="p-6 text-red-500">
        Please allow location access to see nearby gyms.
      </p>
    );

  return (
    <main className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-indigo-700">🏋️ Nearby Gyms</h1>
        <div className="flex gap-2 items-center">
          <label htmlFor="radius" className="text-gray-600 text-sm">
            Radius:
          </label>
          <select
            id="radius"
            value={radius}
            onChange={(e) => setRadius(parseInt(e.target.value))}
            className="border px-2 py-1 rounded text-sm"
          >
            {distanceOptions.map((r) => (
              <option key={r} value={r}>
                {r} km
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="rounded-lg overflow-hidden shadow border">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={userLocation}
          zoom={12}
          onClick={handleMapClick}
        >
          <Marker
            position={userLocation}
            icon={{
              url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
            }}
          />

          {filteredGyms.map((gym) => (
            <Marker
              key={gym.id}
              position={{ lat: gym.coordinates[0], lng: gym.coordinates[1] }}
              onClick={() => setSelectedGym(gym)}
              icon={{
                url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
              }}
            />
          ))}

          {selectedGym && (
            <InfoWindow
              position={{
                lat: selectedGym.coordinates[0],
                lng: selectedGym.coordinates[1],
              }}
              onCloseClick={() => setSelectedGym(null)}
            >
              <div>
                <h2 className="font-bold text-lg">{selectedGym.name}</h2>
                <p className="text-sm">{selectedGym.location}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>

      <p className="text-sm text-gray-500">
        Click anywhere on the map to change your location and see gyms nearby.
      </p>
    </main>
  );
}
