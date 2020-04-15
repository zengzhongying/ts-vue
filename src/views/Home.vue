<template>
  <div class="home">
    <h1>这里做宣传首页</h1>
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
