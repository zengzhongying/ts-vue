<template>
  <div class="about">
    <h1>This is an about page</h1>
    <input type="text" v-model="name" />
    <p>{{nameLength}}</p>
  </div>
</template>
<script lang="ts">
import { Vue, Component /*, Watch*/ } from "vue-property-decorator";
@Component({
  // name: "About"
})
export default class About extends Vue {
  private name = "zzy";

  get nameLength(): number {
    return this.name.length;
  }
}
</script>
