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
    <el-drawer
      class="my-drawer"
      title="我是标题"
      :visible.sync="drawer"
      :with-header="false"
      size="80%"
    >
      <el-card
        shadow="always"
        class="my-box-card box-card mb10"
        :key="index"
        v-for="(item, index) in menuList"
        @click.native="pageChange(index)"
      >{{item}}</el-card>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Route } from "vue-router";
@Component({
  name: "Header"
})
export default class HelloWorld extends Vue {
  @Prop() private title!: string;
  private drawer: boolean = false;
  private menuList: Array<string> = [
    "首页",
    "成员列表",
    "SS申请",
    "积分规则",
    "我的"
  ];
  mounted() {
    console.log(localStorage.getItem("familyMember"));
    const userInfo: any = localStorage.getItem("familyMember")
      ? localStorage.getItem("familyMember")
      : "";
    console.log(JSON.parse(userInfo));
  }
  private showMenu(): void {
    this.drawer = true;
  }
  private goBack(): void {
    this.$router.go(-1);
  }
  private goHome(): void {
    this.$router
      .push({
        path: "/"
      })
      .catch(err => {
        console.log("路由跳转报错", err);
      });
  }
  pageChange(index: number) {
    switch (index) {
      case 0:
        this.goHome();
        break;
      case 1:
        this.$router
          .push({
            path: "/member"
          })
          .catch(err => {
            console.log("路由跳转报错", err);
          });
        break;
      case 2:
        this.$router
          .push({
            path: "/ssApply"
          })
          .catch(err => {
            console.log("路由跳转报错", err);
          });
        break;
      case 3:
        this.$router
          .push({
            path: "/integralRule"
          })
          .catch(err => {
            console.log("路由跳转报错", err);
          });
        break;
      case 4:
        this.$router
          .push({
            path: "/my"
          })
          .catch(err => {
            console.log("路由跳转报错", err);
          });
        break;
    }
    this.drawer = false;
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
