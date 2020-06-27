<template>
  <div id="login">
      <div class = "login-warp">
          <ul class="menu-tab">
              <li :class="{'current':item.current}" v-for="item in menuTab" :key="item.id" @click="togglemenu(item)" >{{item.txt}}</li>
          </ul>
          <!--  表单 start-->
        <el-form :model="ruleForm" status-icon :rules="rules" ref="loginFrom"  class="login-form" size="medium">
            
            <el-form-item  prop="username" class="item-from">
                <label  for="username">邮箱</label>
                <el-input id="username" type="text"  v-model="ruleForm.username" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item  prop="password" class="item-from">
                <label for="password">密码</label>
                <el-input id="password" type="password" v-model="ruleForm.password" autocomplete="off" minlenght="6" maxlength="20"></el-input>
            </el-form-item>

             <el-form-item  prop="passwords" class="item-from" v-show="model === 'register'">
                <label for="passwords">重复密码</label>
                <el-input id="passwords" type="password" v-model="ruleForm.passwords" autocomplete="off" minlenght="6" maxlength="20"></el-input>
            </el-form-item>

            <el-form-item  prop="code" class="item-from">
                <label for="code">验证码</label>
               <!-- Layout 布局 start-->
                    <el-row :gutter="11">
                        <el-col :span="15"><el-input id="code" v-model.number="ruleForm.code" minlenght="6" maxlength="6"></el-input></el-col>
                        <el-col :span="9">
                            <el-button type="success" class="block" @click="getSms()" :disabled="codeButtonStatus.status">{{codeButtonStatus.text}}</el-button>
                        </el-col>
                    </el-row>
               <!-- Layout 布局 end-->   
            </el-form-item>

            <el-form-item>
                
                <el-button type="danger" @click="submitForm('ruleForm')" class="login-btn block"  v-bind:disabled="loginButtonStatus">{{model==='login'?'登陆':'注册'}}</el-button>
     
            </el-form-item>

        </el-form>
          <!--  表单 end-->
      </div>
      
  </div>
</template>


<script>

import {GetSms} from '@/api/login.js'
import {reactive,ref, isRef} from '@vue/composition-api'
import {VaildateScript} from '@/utils/vaildate.js'
import axios from 'axios'
export default {
    name:'login',
    

    setup(props,context){
        //Vue3.0放置data数据，生命周期，自定义函数
        const menuTab = reactive([
            {txt:'登陆',current:false,type:'login'},
            {txt:'注册',current:false,type:'register'}
        ])
        const model = ref('login')
        // console.log(model.value)
        // console.log(isRef(model)?'是一个对象':'不是一个对象')
    },




   //数据
   data(){
    /*表单验证 start*/

      //验证用户名邮箱
      var validateUsername = (rule, value, callback) => {
          let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/; //邮箱正则
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else if(!reg.test(value)){
          callback(new Error('用户名格式有误'));
        } else {
          callback(); //返回true
        }
      };

    //验证密码
      var validatePassword = (rule, value, callback) => {
        //过滤后的数据
        this.ruleForm.password = VaildateScript(value)
        value = this.ruleForm.password
        let reg = /^(?!\D+$)(?![^a-a-zA-Z]+$)\S{6,20}$/  //密码正则 6至20位数字加字母
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (!reg.test(value)) {
          callback(new Error('密码为6至20位数字+字母'));
        } else {
          callback();
        }
      };

    //验证重复密码
      var validatePasswords = (rule, value, callback) => {
        //过滤后的数据s
        this.ruleForm.passwords = VaildateScript(value)
        value = this.ruleForm.passwords
        if (value === '') {
          callback(new Error('重复密码不为空'));
        } else if (value != this.ruleForm.password) {
          callback(new Error('重复密码与密码不相同'));
        } else {
          callback();
        }
      };

    //验证验证码
     var validateCode = (rule, value, callback) => {
        this.ruleForm.password = VaildateScript(value)
        value = this.ruleForm.password
         let reg = /^[a-z0-9)]{6}$/                      //验证码正则
        if (value === '') {
          return callback(new Error('验证码不能为空'));
        } else if (!reg.test(value)){
            callback(new Error('验证码格式不正确'));
        }else{
            callback();
        }

      };

    /*表单验证数据 end*/

        return{

            menuTab:[ //登陆和注册状态信息
                {txt:'登陆',current:false,type:'login'},
                {txt:'注册',current:false,type:'register'}
            ],
            codeButtonStatus:{
               
              //获取验证码按钮的状态属性
              status :false,
              //获取验证码按钮的状态文字
              text:'获取验证码',
            },
            //获取验证码倒计时
            timer:null,


              //注册登陆按钮提交状态属性
              loginButtonStatus :  true,
            //模块值
             model:'login',


            

           

            /*表单验证 start*/
         ruleForm: {
            username: '',
            password: '',
            passwords: '',
            code: ''
        },
        rules: {
            username: [
                { validator: validateUsername, trigger: 'blur' } //失去焦点触发 validatePass 方法
            ],
            password: [
                { validator: validatePassword, trigger: 'blur' }
            ],
            code: [
                { validator: validateCode, trigger: 'blur' }
            ],
             passwords: [
                { validator: validatePasswords, trigger: 'blur' }
            ],
        }
            /*表单验证数据 end*/
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
        //遍历去除高光
        togglemenu(data){
            this.menuTab.forEach(elem=>{
                elem.current = false
            })

            //选中高光
            data.current = true
            //修改模块值
            this.model = data.type

            //注册登陆切换时重置表单
            //两种写法任选其一
            //this.$refs.loginFrom.resetFields();  
            this.$refs['loginFrom'].resetFields();
        },


        /*表单方法 estart*/
        submitForm(formName) {
            // this.$refs[formName].validate((valid) => {
            // if (valid) {
            //     alert('submit!');
            // } else {
            //     console.log('error submit!!');
            //     return false;
            // }
            // });

        
            
            

        },
        /*表单方法 end*/

        /*获取验证码接口的操作 start */
           getSms(){
            
           

             let data = {
                 username:this.ruleForm.username, //发送当前用户名
                 module:this.model                //发送当前的状态(登陆还是注册)
             }

            this.codeButtonStatus.status =true //点击发送验证码按钮后修改获取验证码状态为不可用
            this.codeButtonStatus.text = "发送中" ////点击发送验证码按钮后修改获取验证码文字


            setTimeout(()=>{
              
                GetSms(data).then((response)=>{
                  console.log(response.data);  //获取到服务器成功的消息并弹窗
                  this.$message({ //正确的小时提示
                    showClose:true,
                    message:response.data.message,
                    type:'success'
                  })
                  this.loginButtonStatus = false  //启用登陆或注册按钮
                  //请求成功调用定时器，启用倒计时
                 this.countDown(60)
              }).catch(error =>{
                 console.log(error) //获取服务器失败的消息并弹窗           
              })


            },2000)

           },

          /**
           * 获取验证码按钮点击后的倒计时操作
           */
           countDown(number){
            //setTime只执行一次
            //setInterval 不断执行,需要条件才停止
          let count = number      
           this.timer =  setInterval(()=>{
            count--
            console.log(count);
            
            if(count === 0){
             clearInterval(count)
            }
            this.codeButtonStatus.text = `倒计时${count}`;
            },1000)


           }



        /*获取验证码接口的操作 end */







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
        padding-top: 25vh;

        
    }
    .menu-tab{
       text-align: center; 
       li{
           display: inline-block;
           width:88px;
           line-height:36px ; 
           font-size: 28px;
           color: #fff;
           border-radius: 2px;
           cursor: pointer; //鼠标移动上面变成手势
           margin-right: 50px;
       }
       .current{
           background-color:rgba(241, 179, 7, 0.5);
           border-radius: 5px;

       }
    }
    .login-form{
        margin-top: 29px;
        label{
            display: block;
            margin-bottom: 3px;
            font-size: 14px;
            color: #fff;
        }
        .item-from{
           margin-bottom: 13px; 
        }
        .block{
            display: block;
            width: 100%;
        }
        .login-btn{
            margin-top: 19px;
        }
    }

   

</style>