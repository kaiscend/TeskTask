<template>
  <div id="app">
    <router-view />
    <!-- Маршруты определяются в router/index.js -->
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
/* Основные стили приложения */
#app {
  font-family: Arial, sans-serif;
  margin-top: 20px;
}
</style>
