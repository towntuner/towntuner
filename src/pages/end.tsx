import Banner from "@/components/Banner";
import { Button, TextInput, Textarea } from "@tremor/react";
import Image from "next/image";
import { useRef, useState } from "react";
import Map, { MapRef, Marker } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import { MapPinIcon } from "@heroicons/react/16/solid";

export default function end() {
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const mapRef = useRef<MapRef>(null);

  const [lat, setLat] = useState<number>(52.39352036290725);
  const [lng, setLng] = useState<number>(13.12835004501224);

  const handleMapClick = (event: any) => {
    console.log(event.lngLat.lat, event.lngLat.lng);

    mapRef.current?.flyTo({
      center: [event.lngLat.lng, event.lngLat.lat],
      zoom: 14,
    });

    setLat(event.lngLat.lat);
    setLng(event.lngLat.lng);
  };
  return (
    <main>
      <Banner title="Vielen Dank!"></Banner>
      <div className="grid justify-items-center">
        <div className="grid justify-items-center p-5 m-5 bg-green-200 rounded-md">
          <p className="text-xl ">
            Thank you for participating in our survey! Your feedback is
            important to us.
          </p>
          <p className="text-l m-5 text-green-500">
            ✅ Your answers are saved and will be used to improve the project.
          </p>
          <Image alt="log" src="/logo.png" width={100} height={100} />
        </div>
      </div>
      <div className="grid justify-items-center">
        {/*
        TODO: Submit Data and show a thank you message
        */}

        <div
          className={`content-center p-5 m-5 rounded-md ${
            hasSubmitted ? "bg-green-200" : "bg-blue-200"
          }`}
        >
          <p className="text-xl m-2">
            Would you like to receive information about projects in your area?
          </p>
          {hasSubmitted ? (
            <>
              <div className="content-center">
                <p className="text-l m-5 text-green-500 justify-center">
                  ✅ Thank you! We will keep you up-to-date!{" "}
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-5">
                <div>
                  <label
                    htmlFor="email"
                    className="text-tremor-default text-tremor-content dark:text-dark-tremor-content"
                  >
                    Your email
                  </label>
                  <TextInput name="email" placeholder="muster@mann.de" />
                </div>
                <div className="my-5">
                  <Map
                    mapStyle="mapbox://styles/mapbox/streets-v11"
                    style={{
                      width: "100%",
                      height: "400px",
                      position: "relative",
                    }}
                    initialViewState={{
                      longitude: lng,
                      latitude: lat,
                      zoom: 13,
                    }}
                    onClick={handleMapClick}
                    ref={mapRef}
                    mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                  >
                    {lat && lng && (
                      <Marker
                        longitude={lng}
                        latitude={lat}
                        anchor="bottom"
                        key="marker"
                      >
                        <MapPinIcon className="w-16 h-16" color="blue" />
                      </Marker>
                    )}
                  </Map>
                </div>
                <div className="flex items-end justify-end">
                  <input name="question" hidden readOnly></input>
                  <Button
                    type="submit"
                    onClick={() => {
                      setHasSubmitted(true);
                    }}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
