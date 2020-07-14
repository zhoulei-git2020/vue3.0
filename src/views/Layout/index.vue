<template>
    <div>
        <LayoutHeader/>
        <LayoutMain/>
        <LayoutNav/>
    </div>
</template>

<script>
import LayoutHeader from './Component/Header';
import LayoutMain from './Component/Main';
import LayoutNav from './Component/Nav'
export default {
    name:'layout',

    //组件注册区
    components:{
        LayoutHeader,
        LayoutMain,
        LayoutNav
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

</style>