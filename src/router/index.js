/* eslint-disable */
import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "login",
    hidden:true,
    meta:{
        name:"主页"
    }
  },
  {
    path: "/login",
    name: "Login",
    hidden:true,
    meta:{
      name:"登陆"
    },
    component: ()=>import("../views/Login/index.vue")
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // },
  /*****************************控制台路由**********************************/
  {
    path: "/console",
    name: "Console",
    redirect: "index",
    meta:{
      name:"控制台"
    },
    component: ()=>import("../views/Layout/index.vue"),
    children:[
      {
        path: "/console",
        name: "Console",
        meta:{
          name:"首页"
        },
        component: ()=>import("../views/Console/index.vue"),
      }
    ]

  },  
/*--------------------------------------------------------------------------*/ 

/*****************************信息管理路由**********************************/
{
  path: "/info",
  name: "Info",
  meta:{
    name:"信息管理"
  },
  component: ()=>import("../views/Layout/index.vue"),
  children:[
    {
      path: "/infoIndex",
      name: "InfoIndex",
      meta:{
        name:"列表"
      },
      component: ()=>import("../views/Info/index.vue"),
    },
    {
      path: "/infoCategory",
      name: "InfoCategory",
      meta:{
        name:"分类"
      },
      component: ()=>import("../views/Info/infoCategory.vue"),
    },
  ]

},  
/*--------------------------------------------------------------------------*/ 

/*****************************用户管理路由**********************************/
{
  path: "/user",
  name: "User",
  meta:{
    name:"用户管理"
  },
  component: ()=>import("../views/Layout/index.vue"),
  children:[
    {
      path: "/userIndex",
      name: "UserIndex",
      meta:{
        name:"用户列表"
      },
      component: ()=>import("../views/User/index.vue"),
    },
  ]

},  
/*--------------------------------------------------------------------------*/ 
];

const router = new VueRouter({
  routes
});

export default router;
