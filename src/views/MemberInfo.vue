<template>
  <div class="memberContainer">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item :key="0" :name="0" title="操作">
        <div class="operation">
          <el-form :inline="true" :model="searchForm" class="demo-form-inline">
            <el-form-item label="序号:">
              <el-input-number
                class="w50 mr10 my-input-number"
                v-model="searchForm.sortNumber"
                :step="1"
                :min="1"
                :max="100"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="uid:">
              <el-input-number
                class="w100 mr10 my-input-number"
                v-model="searchForm.uid"
                :step="1"
                :min="0"
              ></el-input-number>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getMemberList">查询</el-button>
            </el-form-item>
            <el-form-item v-if="isAdmin">
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
              v-if="isAdmin"
              style="color: #409EFF;"
              class="fr mr10 curp"
              @click.stop="editMember(item.uid)"
            >编辑</span>
            <span
              v-if="isAdmin"
              style="color: red;"
              class="fr mr10 curp"
              @click.stop="delMember(item.uid)"
            >删除</span>
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
              <p style="color: #999" v-if="item.integralDetail.length == 0">暂无明细</p>
              <li
                v-else
                :key="key"
                v-for="(i, key) in item.integralDetail"
                :class="i.mark > 0 ? 'color-green' : 'color-red'"
              >{{`${i.mark > 0 ? '+' : ''}${i.mark} ${i.desc}`}}</li>
            </ul>
          </li>
        </ul>
        <el-form></el-form>
      </el-collapse-item>
    </el-collapse>
    <!-- <el-button @click="submitForm">提交</el-button> -->
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import { Vue /*, Component, Watch*/ } from "vue-property-decorator";
import Service from "../api/member";
@Component({
  name: "MemberInfo"
})
export default class Home extends Vue {
  @State user: any;
  private activeNames: Array<number> = [];
  private searchForm = {
    sortNumber: undefined,
    uid: undefined
  };
  private memberList: any = [];
  async getMemberList() {
    this.memberList = await Service.getMemberList(this.searchForm);
  }
  async mounted() {
    this.getMemberList();
  }
  addMember() {
    this.$router.push({
      path: "/addMember"
    });
  }
  delMember(uid: number) {
    this.$confirm("确定删除该族员", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
      center: true
    })
      .then(() => {
        Service.delMember({ uid: uid }).then((res: any) => {
          if (res.success) {
            this.$message({
              type: "success",
              message: "删除成功!",
              duration: 1000
            });
            this.getMemberList();
          } else {
            this.$message({
              type: "error",
              message: "删除失败" + res.msg,
              duration: 1000
            });
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
  editMember(uid: string) {
    this.$router.push({
      path: "/editMember",
      query: { uid: uid }
    });
  }
  handleChange(val: string) {
    console.log(val);
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
