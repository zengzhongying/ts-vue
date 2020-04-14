<template>
  <div class="memberContainer">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="一致性 Consistency" name="1">
        <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
        <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
      </el-collapse-item>
    </el-collapse>
    <!-- <el-button @click="submitForm">提交</el-button> -->
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
  private activeNames = ["1"];
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

  handleChange(val: string) {
    console.log(val);
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
.memberContainer {
}
</style>
