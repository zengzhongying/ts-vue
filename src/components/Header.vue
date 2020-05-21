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
    <el-drawer class="my-drawer" :visible.sync="drawer" :with-header="false" size="80%">
      <div v-if="showMemuList.length > 0">
        <el-card
          shadow="always"
          class="my-box-card box-card mb10"
          :key="index"
          v-for="(item, index) in showMemuList"
          @click.native="pageChange(item.menuName)"
        >{{item.menuName}}</el-card>
        <!-- <el-card shadow="always" class="my-box-card box-card mb10">
          <audio
            style="zIndex: 4"
            src="../assets/music/bgm.mp3"
            loop
            controls
            autoplay="autoplay"
            id="audio"
          >您的浏览器不支持音乐播放哟</audio>
        </el-card>-->
      </div>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import { /*Component, Prop,*/ Vue } from "vue-property-decorator";
import { Route } from "vue-router";
interface MenuItem {
  menuName: string;
  authentication: boolean;
}
@Component({
  name: "Header"
})
export default class Header extends Vue {
  @Action Set_user: any;
  // @Getter user: any;
  @State user: any;
  private title!: string;
  private drawer: boolean = false;
  private menuList: Array<MenuItem> = [
    { menuName: "首页", authentication: false },
    { menuName: "成员列表", authentication: false },
    { menuName: "SS申请", authentication: true },
    { menuName: "积分规则", authentication: false },
    { menuName: "我的", authentication: true },
    { menuName: "关于作者", authentication: false }
  ];
  //只有登录了的才有权限看到的菜单（只有成员才有权限）
  mounted() {
    const userInfo: any = localStorage.getItem("familyMember")
      ? localStorage.getItem("familyMember")
      : "{}";
    const obj: any = JSON.parse(userInfo);
    this.Set_user(obj);
    console.log(this.user, "??????????");
    // console.log(localStorage.getItem("familyMember"));
    // const userInfo: any = localStorage.getItem("familyMember")
    //   ? localStorage.getItem("familyMember")
    //   : "";
    // console.log(JSON.parse(userInfo));
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
  pageChange(menuName: string) {
    switch (menuName) {
      case "首页":
        this.goHome();
        break;
      case "成员列表":
        this.$router
          .push({
            path: "/member"
          })
          .catch(err => {
            console.log("路由跳转报错", err);
          });
        break;
      case "SS申请":
        this.$router
          .push({
            path: "/ssApply"
          })
          .catch(err => {
            console.log("路由跳转报错", err);
          });
        break;
      case "积分规则":
        this.$router
          .push({
            path: "/integralRule"
          })
          .catch(err => {
            console.log("路由跳转报错", err);
          });
        break;
      case "我的":
        this.$router
          .push({
            path: "/my"
          })
          .catch(err => {
            console.log("路由跳转报错", err);
          });
        break;
      case "登录":
        this.$router
          .push({
            path: "/login"
          })
          .catch(err => {
            console.log("路由跳转报错", err);
          });
        break;
      case "关于作者":
        this.$router
          .push({
            path: "/about"
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
  get isLogin(): boolean {
    // console.log(this.user.familyMember, '+++')
    return Object.keys(this.user.familyMember).length > 0;
  }
  get showMemuList(): Array<any> {
    console.log("是否登录呀：", this.isLogin);
    if (this.isLogin) {
      return this.menuList;
    } else {
      let list: Array<MenuItem> = [];
      this.menuList.forEach((item: MenuItem) => {
        if (!item.authentication) {
          list.push(item);
        }
      });
      list.push({ menuName: "登录", authentication: true });
      // console.log(list, ">>>>");
      return list;
    }
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
