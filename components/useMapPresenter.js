import { ref, onMounted } from "vue";
import mapboxgl from "mapbox-gl";
import { MG_API_KEY } from "../consts";

export function useMapPresenter(items) {
  const mapContainer = ref(null);
  const map = ref(null);
  const popup = ref(null);

  onMounted(() => {
    mapboxgl.accessToken = MG_API_KEY;
    map.value = new mapboxgl.Map({
      container: mapContainer.value,
      style: "mapbox://styles/mapbox/streets-v11",
    });

    map.value.on("load", () => {
      map.value.addSource("polygon", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: items.features[0].geometry.coordinates,
          },
        },
      });

      map.value.addLayer({
        id: "polygon-layer",
        type: "fill",
        source: "polygon",
        layout: {},
        paint: {
          "fill-color": "#888888",
          "fill-opacity": 0.5,
        },
      });

      const coordinates = items.features[0].geometry.coordinates[0];
      const bounds = coordinates.reduce(
        (bounds, coord) => bounds.extend(coord),
        new mapboxgl.LngLatBounds()
      );

      map.value.fitBounds(bounds, {
        padding: 20,
        maxZoom: 20,
      });

      map.value.on("mouseenter", "polygon-layer", (e) => {
        const cityName = items.features[0].properties.city;
        const stateName = items.features[0].properties.state;

        popup.value = new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(`<h3>${cityName}, ${stateName}</h3>`)
          .addTo(map.value);

        map.value.getCanvas().style.cursor = "pointer";
      });

      map.value.on("mouseleave", "polygon-layer", () => {
        if (popup.value) {
          popup.value.remove();
          popup.value = null;
        }
        map.value.getCanvas().style.cursor = "";
      });
    });
  });

  return {
    mapContainer,
  };
}
