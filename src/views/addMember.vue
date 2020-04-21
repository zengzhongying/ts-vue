<template>
  <div class="addMember">
    <el-form label-position="right" label-width="100px" :model="form" :rules="rules" ref="ruleForm">
      <el-form-item label="uid:" prop="uid">
        <el-input-number @blur="uidBlur" class="w200 my-input-number" v-model="form.uid" :step="1"></el-input-number>
      </el-form-item>
      <el-form-item label="昵称:">
        <el-input class="w200" disabled v-model="form.userName"></el-input>
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
      <el-form-item label="积分:" prop="integral">
        <el-input-number class="w200 my-input-number" v-model="form.integral" :step="1"></el-input-number>
      </el-form-item>
      <el-form-item label="管理:">
        <el-select class="w200" v-model="form.isAdmin" placeholder="请选择">
          <el-option label="是" :value="true"></el-option>
          <el-option label="否" :value="false"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="btn-container">
      <el-button class="btn" type="primary" @click="addMember" :loading="btnLoading">确认添加</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import { Vue /*, Component, Watch*/ } from "vue-property-decorator";
import Service from "../api/member";
//構建表單結構體
interface Form {
  uid: number | undefined;
  userName: string;
  level: string;
  sortNumber: number | undefined;
  integral: number | undefined;
  isApplySS: boolean;
  password: string;
  isAdmin: boolean;
  integralDetail: Array<object>;
}
@Component({
  name: "Home"
})
export default class Home extends Vue {
  @State user: any;
  private btnLoading = false;
  private form: Form = {
    uid: undefined,
    userName: "",
    level: "",
    sortNumber: undefined,
    integral: 0,
    isApplySS: false,
    password: "123456789",
    isAdmin: false,
    integralDetail: []
  };
  private rules: object = {
    uid: [{ required: true, message: "请输入Uid", trigger: "blur" }],
    sortNumber: [
      { required: true, message: "请输入族员序号", trigger: "blur" }
    ],
    integral: [{ required: true, message: "请输入积分", trigger: "blur" }]
  };

  mounted() {
    if (!this.isAdmin) {
      this.$message.warning("你不是管理员");
      this.$router.replace({
        path: "/member"
      });
      return;
    }
  }
  async uidBlur() {
    if (this.form.uid != undefined) {
      const res: any = await Service.getUserName(this.form.uid);
      if (res.success) {
        this.form.userName = res.data.name;
        this.form.level = res.data.title;
      }
    }
  }

  addMember() {
    (this.$refs["ruleForm"] as HTMLFormElement).validate((valid: boolean) => {
      if (valid) {
        this.btnLoading = true;
        Service.addMember(this.form).then((res: any) => {
          if (res.success) {
            this.$message.success({
              message: "添加成功",
              center: true
            });
            this.btnLoading = false;
            this.form = {
              uid: undefined,
              userName: "",
              level: "",
              sortNumber: undefined,
              integral: undefined,
              isApplySS: false,
              password: "123456789",
              isAdmin: false,
              integralDetail: []
            };
          } else {
            this.$message.error({
              message: "添加失败" + res.msg,
              center: true
            });
            this.btnLoading = false;
          }
        });
      }
    });
  }

  get isAdmin(): boolean {
    console.log(this.user.familyMember, "+++");
    return (
      Object.keys(this.user.familyMember).length > 0 &&
      this.user.familyMember.isAdmin
    );
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
.addMember {
  padding-top: 20px;
  .btn-container {
    padding: 20px 10px;
    .btn {
      width: 100%;
    }
  }
}
</style>
