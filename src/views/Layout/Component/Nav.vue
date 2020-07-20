<template>
    <div id="nav-wrap">
        <el-menu
        default-active="1-4-1" 
        class="el-menu-vertical-demo" 
        @open="handleOpen" 
        @close="handleClose" 
        :collapse="isCollapse" 
        background-color='transparent' 
        text-color='#fff' 
        active-text-color="#fff"
        router>
            <template v-for="(item,index) in routers">
                <el-submenu v-if="!item.hidden" :key="item.id" :index="index+''">
                    <!-- 一级菜单 -->
                    <template slot="title">
                    <i :class="item.meta.icon"></i>
                    <span slot="title">{{item.meta.name}}</span>
                    </template>
                    <!-- 子菜单 -->
                    <el-menu-item v-for="subItem in item.children" :key="subItem.id" :index="subItem.path">{{subItem.meta.name}}</el-menu-item>
                </el-submenu>
            </template>
        </el-menu>
    </div>
</template>
<script>
import {reactive,ref, isRef,toRefs,onMounted} from '@vue/composition-api'
export default {
    name:'navMenu',
    
     //组件注册区
    components:{
      
    },

        //数据区
     data(){
         return{
            isCollapse: false,
            routers:reactive(this.$router.options.routes) //路由信息对象数组
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
    
        handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }

    }



}
</script>

<style lang="scss" scoped>
@import '../../../styles/config.scss';
   #nav-wrap{
       position: fixed;
       top:0;
       left: 0;
       width: $navMenu;
       height: 100vh;
       background-color: #344a5f;
   }
</style>