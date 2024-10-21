/* global google */
import { useState } from "react";
import { DirectionsRenderer } from "@react-google-maps/api";
import { MapProvider } from "./providers/map-provider";
import AddressAutocompleteInput from "./addressAutocompleteInput";
import Map from "./maps";
import "./index.css";

export default function RouteMapManager() {
  const [zoom, setZoom] = useState(17);

  const [originAddress, setOriginAddress] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [destinationCoords, setDestinationCoords] = useState({
    lat: 6.5481843,
    lng: 3.3580007,
  });
  const [originCoords, setOriginCoords] = useState({
    lat: 6.5481843,
    lng: 3.3580007,
  });

  const [directionsResponse, setDirectionsResponse] = useState<any>();
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  async function calculateRoute() {
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      // origin: originRef.current!.value,
      origin: originCoords,
      destination: destinationCoords, // { lat: 9.082, lng: 8.6753 },
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    // console.log(results);

    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance!.text);
    setDuration(results.routes[0].legs[0].duration!.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
  }

  return (
    <div className="add-rmm-parent-ctn">
      <div className="add-rmm-address-search-ctn">
        <AddressAutocompleteInput
          value={originAddress}
          setValue={setOriginAddress}
          setCoordinates={setOriginCoords}
          label="Origin"
          placeholder="Enter origin"
        />
        <AddressAutocompleteInput
          value={destinationAddress}
          setValue={setDestinationAddress}
          setCoordinates={setDestinationCoords}
          label="Destination"
          placeholder="Enter destination"
        />
      </div>
      <div className="add-rmm-button-ctn">
        <button
          className="add-rmm-button"
          onClick={() => {
            calculateRoute();
          }}
        >
          Get route
        </button>

        <button className="add-rmm-button" onClick={clearRoute}>
          Clear route
        </button>
      </div>
      <div className="add-rmm-distance-ctn">
        <p className="">
          Distance: <span className="add-rmm-text-danger">{distance}</span>
        </p>
        <p className="">
          Duration: <span className="add-rmm-text-danger">{duration}</span>
        </p>
      </div>
      <MapProvider>
        <Map center={originCoords} zoom={zoom}>
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </Map>
      </MapProvider>
    </div>
  );
}
