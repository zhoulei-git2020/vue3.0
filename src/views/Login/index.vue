<template>
  <div id="login">
      <div class = "login-warp">
          <ul class="menu-tab">
              <li class="current" v-for="item in menuTab" :key="item.id" >{{item.txt}}</li>
          </ul>
      </div>
  </div>
</template>

<script>
export default {
    name:'login',
   
   //数据
   data(){
        return{
            menuTab:[
                {txt:'登陆'},
                {txt:'注册'}
            ]
        }
    },

    //创建完成时
    created(){

    },

    //挂载完成时
    mounted(){

    },

    //方法 
    methods:{

    }
}
</script>

<style lang="scss" scoped>
    #login {         
        height: 100vh;
       background-color: #344a5f; 
    }
    .login-warp{
        width:330px;
        margin: auto;
    }
    .menu-tab{
       text-align: center; 
       li{
           display: inline-block;
           width:88px;
           line-height:36px ; 
           font-size: 14px;
           color: #fff;
           border-radius: 2px;
           cursor: pointer; //鼠标移动上面变成手势
       }
       .current{
           background-color: rgba(0,0,0,.1);
       }
    }
</style>