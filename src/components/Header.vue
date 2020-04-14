<template>
  <div class="headerContainer">
    <p>成员列表</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "Header"
})
export default class HelloWorld extends Vue {
  @Prop() private title!: string;
}
</script>

<style scoped lang="less">
</style>
