<template>
    <div id="header-wrap">
        顶部
    </div>
</template>

<script>
export default {
         //组件注册区
    components:{
      
    },

        //数据区
     data(){
         return{

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
@import '../../../styles/config.scss';
  #header-wrap{
     position: fixed;
     top:0;
     right: 0;
     left: $navMenu;
     height: 75px;
     background-color: #fff;
     -webkit-box-shadow:0 3px 16px 0 rgba(0,0,0, .1);




  }  
</style>