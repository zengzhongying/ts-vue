<template>
  <div class="login">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="uid:" prop="uid">
        <el-input class="w200" v-model="ruleForm.uid"></el-input>
      </el-form-item>
      <el-form-item label="原密码:" prop="password">
        <el-input
          class="w200"
          :type="this.isShow.show ? 'text' : 'password'"
          v-model="ruleForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码:" prop="newPassword">
        <el-input
          class="w200"
          :type="this.isShow.show ? 'text' : 'password'"
          v-model="ruleForm.newPassword"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="再次确认:" prop="confirmPassword">
        <el-input
          class="w200"
          :type="this.isShow.show ? 'text' : 'password'"
          v-model="ruleForm.confirmPassword"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="warning" @click="tabShow">{{this.isShow.text}}</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确认修改</el-button>
        <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import Component from "vue-class-component";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import { Vue /*, Component, Watch*/ } from "vue-property-decorator";
import Service from "../api/member";
@Component({
  name: "ResetPwd"
})
export default class Login extends Vue {
  mounted() {}
  @Action Set_user: any;
  private isShow = {
    text: "显示密码",
    show: false
  };
  private ruleForm = {
    uid: undefined,
    password: "",
    newPassword: "",
    confirmPassword: ""
  };
  private checkUid = (rule: any, value: number, callback: any) => {
    if (!value) {
      callback(new Error("uid不能为空"));
    } else {
      if (!Number.isInteger(+value)) {
        callback(new Error("请输入正确的uid"));
      } else {
        callback();
      }
    }
  };
  private checkNewPwd = (rule: any, value: any, callback: any) => {
    if (!value) {
      callback(new Error("新密码不能为空"));
    } else {
      if (value.length < 6) {
        callback(new Error("新密码长度至少为6位"));
      }
      callback();
    }
  };
  private checkConfirmPwd = (rule: any, value: any, callback: any) => {
    if (!value) {
      callback(new Error("请再次确认密码"));
    } else {
      if (value != this.ruleForm.newPassword) {
        callback(new Error("两次输入的密码不同，请确认"));
      } else {
        callback();
      }
    }
  };
  private rules: object = {
    uid: [{ required: true, validator: this.checkUid, trigger: "blur" }],
    password: [{ required: true, message: "请输入原密码", trigger: "blur" }],
    newPassword: [
      { required: true, validator: this.checkNewPwd, trigger: "blur" }
    ],
    confirmPassword: [
      { required: true, validator: this.checkConfirmPwd, trigger: "blur" }
    ]
  };
  private tabShow(): void {
    if (this.isShow.show) {
      this.isShow = {
        text: "显示密码",
        show: false
      };
    } else {
      this.isShow = {
        text: "隐藏密码",
        show: true
      };
    }
  }
  private submitForm(): void {
    (this.$refs["ruleForm"] as HTMLFormElement).validate((valid: boolean) => {
      if (valid) {
        const obj = {
          uid: this.ruleForm.uid,
          password: this.ruleForm.password,
          newPassword: this.ruleForm.newPassword
        };
        Service.resetPwd(obj).then((res: any) => {
          if (res.success) {
            this.$message({
              type: "success",
              message: "密码修改成功,请重新登录",
              duration: 500
            });
            // 清除旧数据
            localStorage.removeItem("familyMember");
            this.Set_user({});
            this.$router.replace({
              path: "/login"
            });
          } else {
            this.$message.error(res.msg);
          }
        });
      } else {
        this.$message.warning("请填写正确的uid和密码");
        return false;
      }
    });
  }
  // private resetForm(): void {
  //   (this.$refs["ruleForm"] as HTMLFormElement).resetFields();
  // }
}
</script>

<style lang="less">
.login {
  padding-top: 20px;
}
</style>

