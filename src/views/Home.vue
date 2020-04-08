<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <el-input type="text" v-model="myname"></el-input> -->
    <el-form :model="form">
      <el-form-item label="item1">
        <el-input v-model="form.familyName" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="item2">
        <el-input v-model="form.uid" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="item3">
        <el-input v-model="form.nickName" placeholder="请输入内容"></el-input>
      </el-form-item>
    </el-form>
    <el-button @click="submitForm">提交</el-button>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Vue, Component /*, Watch*/ } from "vue-property-decorator";
//構建表單結構體
interface Form {
  familyName: string;
  uid: number;
  nickName: string;
}
@Component({
  name: "Home"
})
export default class Home extends Vue {
  private myname = "嘻嘻哈哈";
  private form: Form = {
    familyName: "zzyFamily",
    uid: 997,
    nickName: "莫離."
  };
  private submitForm(): void {
    console.log(this.form);
  }
  get myNameLength(): number {
    return this.myname.length;
  }

  // @Watch("myNameLength")
  // getmyNameLength(ov: number, nv: number) {
  //   if (ov !== nv) {
  //     console.log(ov, nv, "+++++");
  //   }
  // }
}
</script>
