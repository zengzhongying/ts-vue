import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
// import Home from "../views/Home.vue";
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/login",
    name: "成员登录",
    component: () => import("../views/login.vue")
  },
  {
    path: "/resetPwd",
    name: "修改密码",
    component: () => import("../views/resetPwd.vue")
  },
  {
    path: "/",
    name: "诚招大佬",
    component: () => import("../views/Home.vue")
  },
  {
    path: "/member",
    name: "成员列表",
    component: () => import("../views/MemberInfo.vue")
  },
  {
    path: "/addMember",
    name: "新增成员",
    component: () => import("../views/addMember.vue")
  },
  {
    path: "/editMember",
    name: "编辑成员信息",
    component: () => import("../views/editMember.vue")
  },
  {
    path: "/ssApply",
    name: "SS申请列表",
    component: () => import("../views/ssList.vue")
  },
  {
    path: "/integralRule",
    name: "积分规则",
    component: () => import("../views/integralRule.vue")
  },
  {
    path: "/my",
    name: "我的",
    component: () => import("../views/my.vue")
  },
  {
    path: "/about",
    name: "关于作者",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
