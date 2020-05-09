<template>
  <div class="my">
    <el-card class="box-card w90p">
      <div slot="header" class="clearfix">
        <span>基础信息</span>
      </div>
      <el-row class="myRow">
        <el-col :span="12">昵称: {{userInfo.userName}}</el-col>
        <el-col :span="12">忍阶: {{userInfo.level}}</el-col>
      </el-row>
      <el-row class="myRow">
        <el-col :span="12">序号: {{userInfo.sortNumber}}</el-col>
        <el-col :span="12">积分: {{userInfo.integral}}</el-col>
      </el-row>
      <el-row class="myRow">
        <el-col :span="12">是否为管理: {{userInfo.isAdmin ? "是" : "否"}}</el-col>
        <el-col :span="12">是否申请ss: {{userInfo.isApplySS ? "是" : "否"}}</el-col>
      </el-row>
      <el-row class="myRow">
        <el-col :span="24">
          积分明细:
          <ul class="second-item mt20" style="paddingLeft: 20px;">
            <p
              style="color: #999"
              v-if="userInfo.integralDetail && userInfo.integralDetail.length == 0"
            >暂无明细</p>
            <li
              class="mb10"
              v-else
              :key="key"
              v-for="(i, key) in userInfo.integralDetail"
              :class="i.mark > 0 ? 'color-green' : 'color-red'"
            >{{`${i.mark > 0 ? '+' : ''}${i.mark} ${i.desc}`}}</li>
          </ul>
        </el-col>
      </el-row>
    </el-card>

    <el-button type="danger" class="btn" @click="loginOut">注销</el-button>
    <el-button type="warning" class="btn" @click="resetPwd">重置密码</el-button>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import Component from "vue-class-component";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import { Vue /*, Component, Watch*/ } from "vue-property-decorator";
import Service from "../api/member";
@Component({
  name: "My"
})
export default class Home extends Vue {
  @Action Set_user: any;
  @State user: any;

  private userInfo: object = {};
  async mounted() {
    const memberRes: any = await Service.getMemberList({
      uid: this.user.familyMember.uid
    });
    localStorage.setItem("familyMember", JSON.stringify(memberRes[0]));
    this.Set_user({ ...memberRes[0] });
    this.userInfo = this.user.familyMember;
  }

  private loginOut() {
    localStorage.removeItem("familyMember");
    //清空vuex中的数据
    this.Set_user({});
    this.$router.replace({
      path: "/"
    });
  }
  // 重置密码
  private resetPwd() {
    this.$router.push({
      path: "/resetPwd"
    });
  }
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
  .btn {
    display: block;
    width: 90%;
    margin: 0 auto;
    margin-top: 20px;
  }
  .myRow {
    margin-bottom: 20px;
  }
}
</style>
