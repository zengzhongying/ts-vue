declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

//less文件
declare module '*.less';

declare module "vue-particles" {
  let VueParticles: any;
  export = VueParticles;
}