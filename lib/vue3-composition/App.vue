<template>
  <div>
    <h1>Hello World</h1>
    <p>Width: {{ width }}</p>
    <p>Height: {{ height }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useWindowResize } from './hooks/useWindowResize'
const count = ref(0)
const { width, height } = useWindowResize()
</script>