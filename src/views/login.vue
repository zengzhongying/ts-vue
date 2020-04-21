<template>
  <div class="login">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="uid:" prop="uid">
        <el-input class="w200" v-model="ruleForm.uid"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input class="w200" type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登陆</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
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
  name: "Login"
})
export default class Login extends Vue {
  mounted() {
    //如果用户已经登录，通过url进入到登录界面  则强制跳转到我的信息页面
    if (localStorage.getItem("familyMember") != undefined) {
      this.$router.replace({
        path: "/my"
      });
    }
  }
  @Action Set_user: any;
  private ruleForm = {
    uid: undefined,
    password: ""
  };
  private checkUid = (rule: any, value: number, callback: any) => {
    if (!value) {
      callback(new Error("uid不能为空"));
    } else {
      console.log(value);
      if (!Number.isInteger(+value)) {
        callback(new Error("请输入正确的uid"));
      } else {
        callback();
      }
    }
  };
  private rules: object = {
    uid: [{ required: true, validator: this.checkUid, trigger: "blur" }],
    password: [{ required: true, message: "请输入密码", trigger: "blur" }]
  };

  private submitForm(): void {
    (this.$refs["ruleForm"] as HTMLFormElement).validate((valid: boolean) => {
      if (valid) {
        const obj = {
          uid: this.ruleForm.uid,
          password: this.ruleForm.password
        };
        Service.login(obj).then((res: any) => {
          if (res.success) {
            this.$message.success("登录成功");
            localStorage.setItem("familyMember", JSON.stringify(res.info));

            this.Set_user({ ...res.info });
            this.$router.replace({
              path: "/"
            });
          } else {
            this.$message.error("登录失败");
          }
        });
      } else {
        this.$message.warning("请填写正确的uid和密码");
        return false;
      }
    });
  }
  private resetForm(): void {
    (this.$refs["ruleForm"] as HTMLFormElement).resetFields();
  }
}
</script>

<style lang="less">
.login {
  padding-top: 20px;
}
</style>

