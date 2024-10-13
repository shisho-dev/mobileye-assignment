<template>
  <div class="map-container" ref="mapContainer"></div>
</template>

<script>
import { useMapPresenter } from './useMapPresenter';

export default {
  name: 'MapComponent',
  props: {
    items: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { mapContainer } = useMapPresenter(props.items);

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
