<template>
  <div class="addMember">
    <el-form label-position="right" label-width="100px" :model="form">
      <el-form-item label="uid:">
        <el-input-number @blur="uidBlur" class="w200" v-model="form.uid" :step="1"></el-input-number>
      </el-form-item>
      <el-form-item label="昵称:">
        <el-input class="w200" disabled v-model="form.userName"></el-input>
      </el-form-item>
      <el-form-item label="忍阶:">
        <el-input class="w200" disabled v-model="form.level"></el-input>
      </el-form-item>
      <el-form-item label="序号:">
        <el-input-number :min="0" :max="100" class="w200" v-model="form.sortNumber" :step="1"></el-input-number>
      </el-form-item>
      <el-form-item label="积分:">
        <el-input-number class="w200" v-model="form.integral" :step="1"></el-input-number>
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
// @ is an alias to /src
import { Vue, Component /*, Watch*/ } from "vue-property-decorator";
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

  async uidBlur() {
    if (this.form.uid != undefined) {
      let res: any = await Service.getUserName(this.form.uid);
      if (res.success) {
        this.form.userName = res.data.name;
        this.form.level = res.data.title;
      }
    }
  }

  async addMember() {
    this.btnLoading = true;
    let res: any = await Service.addMember(this.form);
    if (res.success) {
      this.$message.success({
        message: "添加成功",
        center: true,
        offset: 200
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
        center: true,
        offset: 200
      });
      this.btnLoading = false;
    }
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
  margin-top: 20px;
  .btn-container {
    padding: 20px 10px;
    .btn {
      width: 100%;
    }
  }
}
</style>
