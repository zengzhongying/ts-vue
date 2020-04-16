<template>
  <div class="headerContainer">
    <div class="item">
      <img
        v-if="isShowGoBack"
        class="gobackImg"
        @click="goBack"
        src="../assets/images/goback.png"
        alt
      />
      <img v-else class="homeImg" @click="goHome" src="../assets/images/home.png" alt />
      <p>{{pageName}}</p>
      <img class="menuImg" @click="showMenu" src="../assets/images/menu.png" alt />
    </div>
    <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false">
      <ul>
        <li>首页</li>
        <li>成员列表</li>
        <li>SS申请</li>
        <li>积分规则</li>
      </ul>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "Header"
})
export default class HelloWorld extends Vue {
  @Prop() private title!: string;
  private drawer: boolean = false;
  private showMenu(): void {
    this.drawer = true;
  }
  private goBack(): void {
    this.$router.go(-1);
  }
  private goHome(): void {
    this.$router.push({
      path: "/"
    });
  }
  get pageName() {
    return this.$route.name;
  }
  get isShowGoBack(): boolean {
    let result = false;
    switch (this.$route.name) {
      case "新增成员":
      case "编辑成员信息":
        result = true;
        break;
    }
    return result;
  }
}
</script>

<style scoped lang="less">
.headerContainer {
  z-index: 9999 !important;
  position: fixed;
  top: 0;
  background: #fff;
  color: #000;
  // opacity: .5;
  width: 100%;
  text-align: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  box-shadow: 0px 9px 10px -16px #000;
  z-index: 999;
  .item {
    width: 100%;
    position: relative;
    .gobackImg {
      position: absolute;
      left: 15px;
      top: calc(50% - 8px);
      cursor: pointer;
    }
    .homeImg {
      position: absolute;
      left: 15px;
      top: calc(50% - 8px);
      cursor: pointer;
    }
    .menuImg {
      position: absolute;
      right: 15px;
      top: calc(50% - 8px);
      cursor: pointer;
    }
  }
}
</style>
