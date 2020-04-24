<template>
  <div id="app">
    <Header></Header>
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
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
html,
body {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
#app {
  height: 100%;
  padding-top: 42px;
  box-sizing: border-box;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
