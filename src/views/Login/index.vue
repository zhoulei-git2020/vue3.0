<template>
  <div id="login">
      <div class = "login-warp">
          <ul class="menu-tab">
              <li :class="{'current':item.current}" v-for="item in menuTab" :key="item.id" @click="togglemneu(item)" >{{item.txt}}</li>
          </ul>
          <!--  表单 start-->
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  class="login-form" size="medium">
            
            <el-form-item  prop="username" class="item-from">
                <label >邮箱</label>
                <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item  prop="password" class="item-from">
                <label >密码</label>
                <el-input type="text" v-model="ruleForm.password" autocomplete="off" minlenght="6" maxlength="20"></el-input>
            </el-form-item>

            <el-form-item  prop="code" class="item-from">
                <label >验证码</label>
               <!-- Layout 布局 start-->
                    <el-row :gutter="11">
                        <el-col :span="15"><el-input v-model.number="ruleForm.code" minlenght="6" maxlength="6"></el-input></el-col>
                        <el-col :span="9">
                            <el-button type="success" class="block">获取验证码</el-button>
                        </el-col>
                    </el-row>
               <!-- Layout 布局 end-->   
            </el-form-item>

            <el-form-item>
                
                <el-button type="danger" @click="submitForm('ruleForm')" class="login-btn block ">提交</el-button>
     
            </el-form-item>

        </el-form>
          <!--  表单 end-->
      </div>
  </div>
</template>

<script>
export default {
    name:'login',
   
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
          let reg = /^(?!\D+$)(?![^a-a-zA-Z]+$)\S{6,20}$/  //密码正则 6至20位数字加字母
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (!reg.test(value)) {
          callback(new Error('密码胃6至20位数字+字母'));
        } else {
          callback();
        }
      };

    //验证验证码
     var validateCode = (rule, value, callback) => {
         let reg = /^[a-z0-9]{6}$/
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
            menuTab:[
                {txt:'登陆',current:false},
                {txt:'注册',current:false}
            ],

            /*表单验证 start*/
         ruleForm: {
            username: '',
            password: '',
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
            ]
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
        togglemneu(data){
            this.menuTab.forEach(elem=>{
                elem.current = false
            })

            //选中高光
            data.current = true
        },

        /*表单方法 estart*/

        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

        /*表单方法 end*/


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