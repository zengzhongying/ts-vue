<template>
  <div class="editMember">
    <el-form label-position="right" label-width="100px" :model="form" :rules="rules" ref="ruleForm">
      <el-form-item label="昵称:">
        <el-input class="w200" disabled v-model="form.userName"></el-input>
      </el-form-item>
      <el-form-item label="积分:" prop="integral">
        <el-input-number disabled class="w200 my-input-number" v-model="form.integral" :step="1"></el-input-number>
      </el-form-item>
      <el-form-item label="积分明细:">
        <div>
          <p v-if="form.integralDetail.length == 0">暂无明细</p>
          <p
            :class="item.mark > 0 ? 'color-green' : 'color-red'"
            v-else
            v-for="(item, index) in form.integralDetail"
            :key="index"
          >{{`${item.mark > 0 ? '+' : ''}${item.mark} ${item.desc}`}}</p>
        </div>
      </el-form-item>
      <el-form-item label="积分加减:" prop="integralOpreate">
        <el-input-number class="w200" v-model="form.integralOpreate.mark" :step="1"></el-input-number>
        <el-input class="w200 mt10" v-model="form.integralOpreate.desc" placeholder="加减积分描述"></el-input>
        <el-button class="btn mt10" type="primary" @click="addIntegralRecord">添加明细</el-button>
      </el-form-item>
      <el-form-item label="uid:" prop="uid">
        <el-input-number disabled class="w200 my-input-number" v-model="form.uid" :step="1"></el-input-number>
      </el-form-item>
      <el-form-item label="忍阶:">
        <el-input class="w200" disabled v-model="form.level"></el-input>
      </el-form-item>
      <el-form-item label="序号:" prop="sortNumber">
        <el-input-number
          :min="0"
          :max="100"
          class="w200 my-input-number"
          v-model="form.sortNumber"
          :step="1"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="管理:">
        <el-select class="w200" v-model="form.isAdmin" placeholder="请选择">
          <el-option label="是" :value="true"></el-option>
          <el-option label="否" :value="false"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="btn-container">
      <el-button class="btn" type="primary" @click="saveMemberInfo" :loading="btnLoading">保存</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import { Vue /*, Component, Watch*/ } from "vue-property-decorator";
import Service from "../api/member";
//構建表單結構體
interface integralOpreateItem {
  mark: number;
  desc: string;
}
interface Form {
  uid: number | undefined;
  userName: string;
  level: string;
  sortNumber: number | undefined;
  integral: number | undefined;
  isApplySS: boolean;
  // password: string;
  isAdmin: boolean;
  integralDetail: Array<object>;
  integralOpreate: integralOpreateItem;
}
@Component({
  name: "EditMember"
})
export default class Home extends Vue {
  @State user: any;
  private validateIntegralOpreate: any = (
    rule: any,
    value: any,
    callback: any
  ) => {
    if (value.mark == undefined) {
      callback(new Error("请输入积分"));
    } else if (value.mark == 0) {
      callback(new Error("加减积分不能为0"));
    } else {
      callback();
    }
  };
  private btnLoading = false;
  private form: Form = {
    uid: undefined,
    userName: "",
    level: "",
    sortNumber: undefined,
    integral: 0,
    isApplySS: false,
    // password: "123456789",
    isAdmin: false,
    integralDetail: [],
    integralOpreate: {
      mark: 0,
      desc: ""
    }
  };
  private rules: object = {
    integralOpreate: [
      {
        required: true,
        validator: this.validateIntegralOpreate,
        trigger: "blur"
      }
    ],
    sortNumber: [{ required: true, message: "请输入族员序号", trigger: "blur" }]
  };

  async mounted() {
    if (!this.isAdmin) {
      this.$message.warning("你不是管理员");
      this.$router.replace({
        path: "/member"
      });
      return;
    }
    const res: any = await Service.getUserName(+this.$route.query.uid);
    if (res.success) {
      this.form.uid = +this.$route.query.uid;
      this.form.userName = res.data.name;
      this.form.level = res.data.title;
    }
    const userInfo: any = await Service.getMemberList({
      uid: +this.$route.query.uid
    });
    this.form.sortNumber = userInfo[0].sortNumber;
    this.form.integral = userInfo[0].integral;
    this.form.integralDetail = userInfo[0].integralDetail;
    this.form.isAdmin = userInfo[0].isAdmin;
    console.log(userInfo, "userInfo");
  }
  addIntegralRecord() {
    (this.$refs["ruleForm"] as HTMLFormElement).validateField(
      "integralOpreate",
      (errmessage: string) => {
        if (errmessage == "") {
          const obj = {
            mark: this.form.integralOpreate.mark,
            desc: this.form.integralOpreate.desc
          };
          //只存10条近期的积分加减记录
          if (this.form.integralDetail.length < 10) {
            //ts类型排除掉undefined类型
            if (this.form.integral != undefined) {
              this.form.integral = obj.mark + this.form.integral;
            }
            this.form.integralDetail.push(obj);
          } else {
            if (obj.mark != 0) {
              this.form.integralDetail.shift();
              this.form.integralDetail.push(obj);
              //ts类型排除掉undefined类型
              if (this.form.integral != undefined) {
                this.form.integral = obj.mark + this.form.integral;
              }
            }
          }
        }
      }
    );
  }
  saveMemberInfo() {
    (this.$refs["ruleForm"] as HTMLFormElement).validateField(
      "sortNumber",
      (errmessage: string) => {
        if (errmessage == "") {
          this.btnLoading = true;
          const obj = {
            uid: +this.$route.query.uid,
            memberInfo: {
              uid: this.form.uid,
              userName: this.form.userName,
              level: this.form.level,
              sortNumber: this.form.sortNumber,
              integral: this.form.integral,
              isApplySS: this.form.isApplySS,
              isAdmin: this.form.isAdmin,
              integralDetail: this.form.integralDetail
            }
          };
          Service.editMember(obj).then((res: any) => {
            if (res.success) {
              this.btnLoading = false;
              this.$message.success("修改成功");
            } else {
              this.btnLoading = false;
              this.$message.error("修改失败" + res.msg);
            }
          });
        }
      }
    );
  }
  get isAdmin(): boolean {
    console.log(this.user.familyMember, "+++");
    return (
      Object.keys(this.user.familyMember).length > 0 &&
      this.user.familyMember.isAdmin
    );
  }
}
</script>

<style lang="less">
.editMember {
  padding-top: 20px;
  padding-bottom: 30px;

  .btn-container {
    width: 100%;
    position: fixed;
    bottom: 0;
    padding: 20px 0;
    padding-bottom: 0;
    .btn {
      width: 100%;
    }
  }
}
</style>
