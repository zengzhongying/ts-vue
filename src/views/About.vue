<template>
  <div class="about">
    <vue-particles
      class="dynamic-bg"
      color="#F1C40F"
      :particleOpacity="0.6"
      :particlesNumber="180"
      shapeType="star"
      :particleSize="3"
      linesColor="#fff"
      :linesWidth="1"
      :lineLinked="false"
      :lineOpacity="0"
      :linesDistance="300"
      :moveSpeed="3"
      :hoverEffect="false"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="repulse"
    ></vue-particles>
    <el-card class="myInfo box-card w90p mb10">
      <p class="mb10">游戏信息：</p>
      <el-row class="mb10">
        <el-col :span="12">昵称：莫离。</el-col>
        <el-col :span="12">uid：311484178</el-col>
      </el-row>
      <el-row class="mb10">
        <el-col :span="12">家族职位：族长。</el-col>
        <el-col :span="12">人气：max</el-col>
      </el-row>
      <el-row>
        <el-col :span="24">游戏座右铭：聚时莫言离。</el-col>
      </el-row>
    </el-card>
    <el-card class="myInfo box-card w90p mb10">
      <p class="mb10">个人信息：</p>
      <el-row class="mb10">
        <el-col :span="12">昵称：携程吴彦祖</el-col>
        <el-col :span="12">职业：程序猿</el-col>
      </el-row>
      <el-row class="mb10">
        <el-col :span="12">性别：男</el-col>
        <el-col :span="12">爱好：女</el-col>
      </el-row>
      <el-row>
        <el-col :span="24">座右铭：明骚易躲，闷骚难防。</el-col>
      </el-row>
    </el-card>
    <el-card class="myInfo box-card w90p mb10">
      <p class="mb10">另外：</p>
      <el-row class="mb10">
        <el-col :span="24">家族求大佬，急急急</el-col>
      </el-row>
      <el-row class="mb10">
        <el-col :span="24">本人也求大佬，求天无大佬带带弟弟</el-col>
      </el-row>
      <el-row class="mb10">
        <el-col :span="24">语音可深沉可逗比，你喜欢的样子我都有</el-col>
      </el-row>
      <el-row>
        <el-col :span="24">此系统为业余时间所做，比较粗糙，如发现bug，请联系扣扣：1363421830</el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script lang="ts">
import { Vue, Component /*, Watch*/ } from "vue-property-decorator";
@Component({
  name: "About"
})
export default class About extends Vue {}
</script>

<style lang="less">
.about {
  height: 100%;
  box-sizing: border-box;
  position: relative;
  background: #000;
  padding-top: 20px;
  .dynamic-bg {
    height: 100%;
    position: absolute;
    top: 0;
    z-index: 2;
  }
  .myInfo {
    margin: 0 auto;

    opacity: 0.8;
  }
}
</style>