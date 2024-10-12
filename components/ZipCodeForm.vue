<script setup>
import { ref } from 'vue'

const zipcode = ref('')
const emit = defineEmits(['on-submit'])

function handleSubmit(e) {
  if (document.activeElement) {
    document.activeElement.blur();
  }
  e.preventDefault()
  emit('on-submit', zipcode.value);
}
</script>

<template>
  <form @submit="handleSubmit">
    <b-input class="input" v-model="zipcode" placeholder="Zip code" />
    <b-button type="submit">Button</b-button>
  </form>
</template>

<style scoped>
form {
  display: flex;
  gap: 3px;
}

.input {
  max-width: 160px;
}
</style>
