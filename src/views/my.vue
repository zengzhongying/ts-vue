<template>
  <div class="my">
    <el-card class="box-card w90p">
      <div slot="header" class="clearfix">
        <span>基础信息</span>
      </div>
    </el-card>
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
  mounted() {
    
    // if (localStorage.getItem("user")) {
    // } else {
    // }
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
<style lang="less">
.my {
  padding-top: 10px;
  .box-card {
    margin: 0 auto;
    .el-card__header {
      padding: 10px 20px !important;
    }
  }
}
</style>
