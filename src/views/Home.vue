<template>
  <div class="home">
    <div style="height: 100%;">
      <div id="iSlider-wrapper"></div>
    </div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Vue, Component /*, Watch*/ } from "vue-property-decorator";
@Component({
  name: "Home"
})
export default class Home extends Vue {
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

<style lang="less">
.home {
  height: 100%;
  .el-carousel {
    height: 100%;
  }
  .el-carousel__item {
    width: 100%;
    height: 100%;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
}
</style>
