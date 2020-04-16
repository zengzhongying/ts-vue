<template>
  <div id="app">
    <Header></Header>
    <router-view />
  </div>
</template>

<script lang="ts">
import "./assets/public.less";
import Header from "./components/Header.vue";
import { Vue, Component /*, Watch*/ } from "vue-property-decorator";
@Component({
  components: {
    Header
  }
})
export default class App extends Vue {}
</script>


<style>
html,
body,
p,
h1,
ul,
li {
  margin: 0;
  padding: 0;
}
#app {
  margin-top: 42px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
</style>
