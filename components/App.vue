<script>
import ZipCodeForm from './ZipCodeForm.vue';
import MapComponent from './MapComponent.vue';
import apiService from '../services/apiService';
export default {
  components: {
    ZipCodeForm,
    MapComponent
  },
  data() {
    return {
      loading: false,
      errorMessage: false,
      items: null
    };
  },
  methods: {
    async onSubmit(zipcode) {
      this.loading = true;
      this.items = null;
      try {
        const data = await apiService.getByZipCode(zipcode);
        this.items = data;
      } catch (err) {
        this.errorMessage = err;
        this.$bvModal.show("error-modal")
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<template>
  <div class="container">
    <b-overlay :show="loading" rounded="sm">
      <ZipCodeForm @on-submit="onSubmit" />
      <MapComponent v-if="items" :items="items" />
    </b-overlay>
  </div>

  <b-modal id="error-modal" title="Error">
    <p>{{ errorMessage }}</p>
  </b-modal>
</template>

<style scoped>
.container {
  padding: 16px;
}
</style>
