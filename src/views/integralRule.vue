<template>
  <div class="home">
    <h1>这里做宣传首页</h1>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Vue, Component /*, Watch*/ } from "vue-property-decorator";
@Component({
  name: "Home"
})
export default class Home extends Vue {
  private submitForm(): void {
    console.log();
  }
  // get myNameLength(): number {
  // }

  // @Watch("myNameLength")
  // getmyNameLength(ov: number, nv: number) {
  //   if (ov !== nv) {
  //     console.log(ov, nv, "+++++");
  //   }
  // }
}
</script>
