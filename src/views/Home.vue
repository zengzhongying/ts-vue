<template>
  <div class="home">
    
    <div class="bgImage"></div>
    <vue-particles
      class="dynamic-bg"
      color="#fff"
      :particleOpacity="1"
      :particlesNumber="280"
      shapeType="circle"
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

    <!-- <div :class="isPlaying ? 'musicBtn playing' : 'musicBtn'" @click="changeStatus"></div> -->
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Vue, Component /*, Watch*/ } from "vue-property-decorator";
@Component({
  name: "Home"
})
export default class Home extends Vue {
  private isPlaying = true;
  private changeStatus(): void {
    this.isPlaying = !this.isPlaying;
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
.home {
  position: relative;
  height: 100%;
  .bgImage {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("../assets/images/home1.jpg");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    opacity: 0.6;
  }
  .dynamic-bg {
    height: 100%;
    position: absolute;
    top: 0;
    z-index: 2;
  }
  .musicBtn {
    cursor: pointer;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    position: absolute;
    background-image: url("../assets/images/music.png");
    background-size: 108% 100%;
    background-repeat: no-repeat;
    bottom: 80px;
    right: 30px;
    z-index: 3;
  }
  .playing {
    -webkit-animation: myRotate 3s linear infinite;
    animation: myRotate 3s linear infinite;
  }
  @-webkit-keyframes myRotate {
    0% {
      -webkit-transform: rotate(0deg);
    }
    50% {
      -webkit-transform: rotate(180deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
  @keyframes myRotate {
    0% {
      -webkit-transform: rotate(0deg);
    }
    50% {
      -webkit-transform: rotate(180deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
}
</style>
