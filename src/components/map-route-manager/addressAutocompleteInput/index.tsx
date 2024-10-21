import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { MapProvider } from "../providers/map-provider";
import LoaderIcon from "../../../assets/icons/loader";

export default function AddressAutocompleteInput({
  value,
  setValue,
  setCoordinates,
  label,
  placeholder,
}: // setAddress,
{
  value: string;
  setValue: any;
  setCoordinates: Function;
  label?: string;
  placeholder?: string;
  // setAddress: Function;
}) {
  const extractCoordinates = async (address: string) => {
    setValue(address);

    // const country = address?.split(",")?.at(-1)?.replace(" ", "");
    try {
      const results = await geocodeByAddress(address);
      const { lat, lng } = await getLatLng(results[0]);
      setCoordinates({ lat, lng });
    } catch (error) {
      // console.log("errors");
      // setValue({ address, coords: { lat: 0, lng: 0 } });
    }
  };

  return (
    <MapProvider>
      <PlacesAutocomplete
        value={value}
        onChange={setValue}
        onSelect={extractCoordinates}
      >
        {({
          getInputProps,
          suggestions,
          getSuggestionItemProps,
          loading,
        }: {
          getInputProps: any;
          suggestions: any;
          getSuggestionItemProps: any;
          loading: boolean;
        }) => (
          <div className="add-rmm-w-full">
            {label && <label htmlFor="address-searcher">{label}</label>}
            <input
              required={true}
              id="location-search"
              type="text"
              {...getInputProps({
                id: "location-search",
                placeholder: placeholder ? placeholder : "apartment location",
              })}
              className="add-rmm-search-input"
            />
            <div>
              {loading && (
                <div className="">
                  <LoaderIcon className="add-rmm-loading" />
                </div>
              )}
              <ul>
                {suggestions.map(
                  (suggestion: {
                    active: boolean;
                    placeId: string;
                    description: string;
                  }) => {
                    const className = ` add-rmm-list ${
                      suggestion.active ? " add-rmm-list-active" : ""
                    }`;
                    return (
                      <li
                        key={suggestion.placeId}
                        {...getSuggestionItemProps(suggestion, {
                          className,
                        })}
                      >
                        {suggestion.description}
                      </li>
                    );
                  }
                )}
              </ul>
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </MapProvider>
  );
}
