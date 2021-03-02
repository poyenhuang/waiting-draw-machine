<template>
  <div id="app">
    <h1>Bank Counter</h1>
    <Counters />
  </div>
</template>

<script>
import Counters from './views/Counters.vue';

export default {
  name: 'App',
  components: {
    Counters,
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
