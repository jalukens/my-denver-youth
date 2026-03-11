import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import type { Program } from '@/lib/types';
import { getCategoryIcon } from '@/lib/utils';

interface MiniMapProps {
  programs: Program[];
  onProgramClick?: (programId: string) => void;
}

const FAMILY_COORDINATES: [number, number] = [39.7549, -104.9772];

function createEmojiIcon(emoji: string) {
  return L.divIcon({
    html: `<div style="font-size: 20px; line-height: 1; text-align: center;">${emoji}</div>`,
    className: 'leaflet-emoji-icon',
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
}

const homeIcon = L.divIcon({
  html: '<div style="width: 12px; height: 12px; background: #1A7A6E; border-radius: 50%; border: 2px solid white; box-shadow: 0 1px 3px rgba(0,0,0,0.3);"></div>',
  className: 'leaflet-home-icon',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

export function MiniMap({ programs, onProgramClick }: MiniMapProps) {
  return (
    <div className="h-[200px] w-full rounded-xl overflow-hidden">
      <MapContainer
        center={FAMILY_COORDINATES}
        zoom={13}
        className="h-full w-full"
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Home marker */}
        <Marker position={FAMILY_COORDINATES} icon={homeIcon}>
          <Popup>Home</Popup>
        </Marker>

        {/* Program markers */}
        {programs.map((program) => (
          <Marker
            key={program.id}
            position={[
              program.location.coordinates.lat,
              program.location.coordinates.lng,
            ]}
            icon={createEmojiIcon(getCategoryIcon(program.category))}
            eventHandlers={{
              click: () => onProgramClick?.(program.id),
            }}
          >
            <Popup>{program.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
