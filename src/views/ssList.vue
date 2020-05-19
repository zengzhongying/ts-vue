<template>
  <div class="ssList">
    <el-tag type="warning" class="mb10">请不要随意添加SS悬赏，如经发现，扣除相应积分</el-tag>
    <el-tag type="warning" class="mb10">未在此申请的SS不加积分(需提前2天申请)</el-tag>
    <p v-if="ssList.length == 0" style="color: #999; textAlign: center;">家族暂无SS</p>
    <el-collapse v-model="activeNames" v-else>
      <el-collapse-item :name="index" v-for="(item, index) in ssList" :key="index">
        <template slot="title">
          <div style="width: 100%; paddingRight: 10px;">
            {{item.boss}}
            <span
              v-if="isAdmin"
              class="fr"
              style="color: #409EFF;"
              @click.stop="ssDone(item)"
            >完成</span>
            <span v-if="isAdmin" class="fr mr10" style="color: red;" @click.stop="ssDel(item)">删除</span>
            <span
              class="fr mr10"
              style="color: blue;"
              @click.stop="joinSS(item)"
              v-if="(user.familyMember.uid != item.leader.uid) && showJoinBtn"
            >申请上车</span>
            <span
              class="fr mr10"
              style="color: #F5B041;"
              @click.stop="cancelJoinSS(item)"
              v-if="(item.member.some(el => el.uid == user.familyMember.uid)) && showCancelJoinBtn"
            >下车</span>
          </div>
        </template>
        <el-row>
          <el-col class="mb10" :span="12">车头：{{item.leader.sortNumber}}-{{item.leader.userName}}</el-col>
          <el-col class="mb10" :span="12" style="color: green">时间：{{item.time}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <p>乘客：</p>
            <ul v-if="item.member.length > 0">
              <li
                :class="i.uid == user.familyMember.uid ? 'fl mr10 memberList color-red': 'fl mr10 memberList'"
                :key="k"
                v-for="(i, k) in item.member"
              >{{i.sortNumber}}-{{i.userName}}</li>
            </ul>
            <span class="ml10" style="color: #999;" v-else>暂无</span>
          </el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>
    <el-button class="addSSBtn" type="primary" icon="el-icon-edit" circle @click="addSS"></el-button>

    <el-dialog
      title="我要当车头"
      :visible.sync="dialogVisible"
      width="90%"
      :close-on-click-modal="false"
    >
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="80px">
        <el-form-item label="SS名称" prop="boss">
          <el-select v-model="form.boss" placeholder="请选择SS名称">
            <el-option label="蝙蝠王" value="蝙蝠王"></el-option>
            <el-option label="大宝剑" value="大宝剑"></el-option>
            <el-option label="般若王" value="般若王"></el-option>
            <el-option label="火式神" value="火式神"></el-option>
            <el-option label="屠戮者" value="屠戮者"></el-option>
            <el-option label="雷神龙" value="雷神龙"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开车时间" prop="time">
          <el-date-picker
            format="yyyy-MM-dd HH:mm"
            :picker-options="pickerOptions"
            type="datetime"
            placeholder="选择日期时间"
            v-model="form.time"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import { State, Action } from "vuex-class";
import { Vue /*, Component, Watch*/ } from "vue-property-decorator";
import Service from "../api/ss";
import moment from "moment";
interface SSItem {
  _id: string;
  time: string;
  boss: string;
  leader: object;
}
@Component({
  name: "SSList"
})
export default class Home extends Vue {
  @State user: any;
  @Action Set_user: any;
  private activeNames: Array<number> = [];
  private dialogVisible = false;
  private ssList: Array<SSItem> = [];
  private pickerOptions = {
    disabledDate(time: any) {
      return time.getTime() < Date.now() + 24 * 60 * 60 * 1000; //如果没有后面的-8.64e7就是不可以选择今天的
    }
  };
  private form = {
    time: "", //时间
    leader: "", //车头
    boss: "" //boss名称
  };
  private rules = {
    boss: [{ required: true, message: "请选择你的SS名称", trigger: "change" }],
    time: [{ required: true, message: "请选择你想打的时间", trigger: "blur" }]
  };
  private async getSSList() {
    const res: any = await Service.getSSList();
    this.ssList = res;
    //默认全部展开
    this.ssList.forEach((i, j) => {
      this.activeNames.push(j);
    });
  }
  private async getUserInfo() {
    const res: any = await Service.getMemberList({
      uid: this.user.familyMember.uid
    });
    console.log(res, "res");
    localStorage.setItem("familyMember", JSON.stringify(res[0]));
    this.Set_user({ ...res[0] });
  }
  mounted() {
    //如果没有登录 非族员强制进入此页面则强制退出
    if (!this.isLogin) {
      this.$router.replace({
        path: "/"
      });
      return;
    }
    this.getSSList();
  }
  private ssDel(item: SSItem): void {
    this.$confirm("确定删除此SS", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
      center: true
    })
      .then(() => {
        Service.delSS(item).then((res: any) => {
          if (res.success) {
            this.$message.success("删除成功");
            this.getUserInfo();
            this.getSSList();
          } else {
            this.$message.error("删除失败:" + res.msg);
          }
        });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除",
          duration: 1000
        });
      });
  }
  private ssDone(item: SSItem): void {
    this.$confirm("此SS已由家族成员完成", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
      center: true
    })
      .then(() => {
        Service.doneSS(item).then((res: any) => {
          if (res.success) {
            this.$message.success(res.msg);
            this.getUserInfo();
            this.getSSList();
          } else {
            this.$message.error("失败:" + res.msg);
          }
        });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消完成",
          duration: 1000
        });
      });
  }
  private joinSS(item: SSItem): void {
    if (moment(new Date().getTime()) > moment(item.time)) {
      this.$message.error({
        message: "此车已经过期了",
        center: true
      });
      return;
    }
    Service.joinSS({
      uid: this.user.familyMember.uid,
      _id: item._id //每车的id, mongo生成的
    }).then((res: any) => {
      if (res.success) {
        this.$message.success({
          message: res.msg,
          center: true
        });
        // 上车成功后刷新用户信息和ss列表
        this.getUserInfo();
        this.getSSList();
      } else {
        this.$message.error({
          message: "上车失败：" + res.msg,
          center: true
        });
      }
    });
  }
  private cancelJoinSS(item: SSItem): void {
    Service.cancelJoinSS({
      uid: this.user.familyMember.uid,
      _id: item._id //每车的id, mongo生成的
    }).then((res: any) => {
      if (res.success) {
        this.$message.success({
          message: res.msg,
          center: true
        });
        // 更新用户信息和ss列表
        this.getUserInfo();
        this.getSSList();
      } else {
        this.$message.error({
          message: res.msg,
          center: true
        });
      }
    });
  }
  private async addSS() {
    // console.log(this.user.familyMember);
    this.dialogVisible = true;
    this.form.leader = this.user.familyMember;
    await this.$nextTick(); //等待生成了表单节点后再调用resetFields方法 防止报错
    (this.$refs["ruleForm"] as HTMLFormElement).resetFields();
    // (this.$refs["ruleForm"] as HTMLFormElement).clearValidate();
  }

  private sureAdd(): void {
    (this.$refs["ruleForm"] as HTMLFormElement).validate((valid: boolean) => {
      if (valid) {
        const obj = {
          time: moment(this.form.time).format("YYYY-MM-DD HH:mm"),
          leader: this.form.leader, //车头
          boss: this.form.boss //boss名称
        };
        Service.addSS(obj).then((res: any) => {
          if (res.success) {
            this.$message.success({
              message: "添加成功",
              center: true
            });
            this.form = {
              time: "", //时间
              leader: "", //车头
              boss: "" //boss名称
            };
            this.getSSList();
            this.dialogVisible = false;
          } else {
            this.$message.error({
              message: "添加失败：" + res.msg,
              center: true
            });
          }
        });
      }
    });
  }
  get isLogin(): boolean {
    return Object.keys(this.user.familyMember).length > 0;
  }
  get isAdmin(): boolean {
    return (
      Object.keys(this.user.familyMember).length > 0 &&
      this.user.familyMember.isAdmin
    );
  }
  get showJoinBtn(): boolean {
    return !this.user.familyMember.isApplySS;
  }

  get showCancelJoinBtn(): boolean {
    return this.user.familyMember.isApplySS;
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
  // position: relative;
  padding: 15px 10px;
  .addSSBtn {
    position: fixed;
    bottom: 80px;
    right: 30px;
    z-index: 99;
  }
  .memberList {
    list-style: none;
  }
}
</style>
