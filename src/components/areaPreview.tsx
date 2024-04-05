import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
import marker from "./blue_circle.png";

export default function AreaPreview(props: { zoomLevel?: number, longitude: number, latitude: number }) {
  const zoomLevel = props.zoomLevel ?? 12;
  return (
    <Map
      mapboxAccessToken = {process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      initialViewState={{
        longitude: props.longitude,
        latitude: props.latitude,
        zoom: zoomLevel,
      }}
      maxBounds={[
        [props.longitude, props.latitude],
        [props.longitude, props.latitude],
      ]}
      maxZoom={zoomLevel}
      minZoom={zoomLevel}
      style={{ width: 600, height: 600 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      <Marker longitude={props.longitude} latitude={props.latitude}>
        <Image src={marker} alt="marker" width={250} />
      </Marker>
    </Map>
  );
}
