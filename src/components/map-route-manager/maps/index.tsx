import { GoogleMap } from "@react-google-maps/api";
import { ReactNode, useMemo } from "react";

export default function Map({
  children,
  zoom = 10,
  center = { lat: 9.082, lng: 8.6753 },
}: {
  children?: ReactNode;
  zoom: number;
  center: { lat: number; lng: number };
}) {
  // default map properties
  const mapFieldsOptions = useMemo(
    () => ({
      disableDefaultUI: true,
      fullscreenControl: false,
      scaleControl: false,
      zoomControl: false,
      mapTypeControl: true, // false to remove options to switch btwn satellite and  road maps
      mapTypeId: "hybrid", //"hybrid", "roadmap", "satellite", "terrain"
    }),
    []
  );
  return (
    <div className="add-rmm-w-full">
      <GoogleMap
        // ref={mapRef}

        zoom={zoom}
        center={center}
        mapContainerClassName="add-rmm-w-full add-rmm-h-full"
        options={mapFieldsOptions}
      >
        {children}
      </GoogleMap>
    </div>
  );
}
