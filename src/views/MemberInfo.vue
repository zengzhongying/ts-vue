<template>
  <div class="memberContainer">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item :key="0" :name="0" title="操作">
        <div class="operation">
          <el-form :inline="true" :model="form" class="demo-form-inline">
            <el-form-item label="序号:">
              <el-input-number class="w50 mr10" v-model="form.sortNumber" :step="1"></el-input-number>
            </el-form-item>
            <el-form-item label="uid:">
              <el-input-number class="w100 mr10" v-model="form.uid" :step="1"></el-input-number>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="search">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addMember">添加成员</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-collapse-item>
      <el-collapse-item :key="index+1" v-for="(item, index) in memberList" :name="index+1">
        <template slot="title">
          <div style="width: 100%">
            {{`${item.sortNumber}-${item.userName}`}}
            <span
              style="color: #409EFF;"
              class="fr mr10"
            >编辑</span>
          </div>
        </template>
        <ul class="first-item">
          <li class>
            <span>uid:</span>
            {{item.uid}}
          </li>
          <li>
            <span>忍阶:</span>
            {{item.level}}
          </li>
          <li>
            <span>积分:</span>
            {{item.integral}}
          </li>
          <li>
            <span>是否为管理员:</span>
            {{item.isAdmin ? "是" : "否"}}
          </li>
          <li>
            <span>是否申请ss:</span>
            {{item.isApplySS ? "是" : "否"}}
          </li>
          <li>
            <span>积分详情:</span>
            <ul class="second-item">
              <li class="color-green">家族战帅的一比 +5</li>
              <li class="color-green">家族战帅的一比 +5</li>
              <li class="color-green">ss+猛男 +5</li>
            </ul>
          </li>
        </ul>
      </el-collapse-item>
    </el-collapse>
    <!-- <el-button @click="submitForm">提交</el-button> -->
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Vue, Component /*, Watch*/ } from "vue-property-decorator";
import Service from "../api/member";
@Component({
  name: "MemberInfo"
})
export default class Home extends Vue {
  private activeNames = [];
  private form = {
    sortNumber: undefined,
    uid: undefined
  };
  private memberList: any = [];
  async mounted() {
    this.memberList = await Service.getMemberList();
    // let res = await Service.getUserName(311484178);
    // let res2 = await Service.addMember({
    //   uid: 12345678,
    //   userName: "夜の小喵",
    //   level: "極忍",
    //   sortNumber: 31,
    //   integral: 50,
    //   isApplySS: false,
    //   password: "123",
    //   isAdmin: false,
    //   integralDetail: []
    // });
  }

  search() {
    console.log(this.form, "form!");
  }
  addMember() {
    this.$router.push({
      path: "/addMember"
    });
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
  padding: 10px 5px;
  .operation {
    border-top: 1px solid #eee;
    padding-top: 10px;
  }
  .first-item {
    padding-left: 20px;
    font-size: 14px;
    .second-item {
      padding-left: 10px;
    }
  }
}
</style>
