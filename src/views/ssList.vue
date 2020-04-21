<template>
  <div class="ssList"></div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Vue, Component /*, Watch*/ } from "vue-property-decorator";
@Component({
  name: "SSList"
})
export default class Home extends Vue {
  private submitForm(): void {
    console.log();
  }

  // @Watch("myNameLength")
  // getmyNameLength(ov: number, nv: number) {
  //   if (ov !== nv) {
  //     console.log(ov, nv, "+++++");
  //   }
  // }
}
</script>

<style lang="less">
.ssList {
  padding-top: 44px;
}
</style>
