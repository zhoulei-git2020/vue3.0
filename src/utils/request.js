import {Message} from 'element-ui';
/**
 * 拦截器
 */
//创建axios，赋值变量给service
import axios from 'axios'
const BASEURL = process.env.NODE_ENV === 'production'? '' : '/devapi';
const service = axios.create({
    baseURL:BASEURL, //请求地址
    timeout:1000,                           //请求超时时间
});




//添加请求拦截器
service.interceptors.request.use(function(config){
    //在发送请求前做些什么
    return config;
},function(error){
    //对错误做些什么
    return Promise.reject(error)
})

//添加响应拦截器
service.interceptors.response.use(function(response){
    //对响应数据做些什么
    let data = response.data    
    if(data.resCode !== 0){
        Message.error(data.message)
        return Promise.reject(data.message)
    }else{
       return response
    }
    
},function(error){
    //对响应错误做些什么
    return Promise.reject(error)
})



export default service;