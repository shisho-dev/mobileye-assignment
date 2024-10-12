<template>
  <div class="map-container" ref="mapContainer"></div>
</template>

<script>
import { onMounted, ref } from 'vue';
import mapboxgl from 'mapbox-gl';
import { MG_API_KEY } from '../consts'
export default {
  name: 'MapComponent',
  props: {
    items: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const mapContainer = ref(null);
    const map = ref(null);
    const popup = ref(null);

    onMounted(() => {

      mapboxgl.accessToken = MG_API_KEY;
      map.value = new mapboxgl.Map({
        container: mapContainer.value
      });

      map.value.on('load', () => {
        map.value.addSource('polygon', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: props.items.features[0].geometry.coordinates
            }
          }
        });

        map.value.addLayer({
          id: 'polygon-layer',
          type: 'fill',
          source: 'polygon',
          layout: {},
          paint: {
            'fill-color': '#888888',
            'fill-opacity': 0.5
          }
        });

        const coordinates = props.items.features[0].geometry.coordinates[0];
        const bounds = coordinates.reduce((bounds, coord) => {
          return bounds.extend(coord);
        }, new mapboxgl.LngLatBounds());

        map.value.fitBounds(bounds, {
          padding: 20,
          maxZoom: 15
        });

        map.value.on('click', 'polygon-layer', (e) => {
          const cityName = props.items.features[0].properties.city;
          const stateName = props.items.features[0].properties.state;

          // Create a popup
          popup.value = new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`<h3>${cityName}, ${stateName}</h3>`)
            .addTo(map.value);
        });
      });
    });

    return {
      mapContainer,
    };
  },
};
</script>

<style scoped>
.map-container {
  margin-top: 40px;
  width: 100%;
  max-height: 500px;
  height: 66vh;
}
</style>
