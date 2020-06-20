const path = require('path')
module.exports={
    //基本路径
    publicPath: process.env.NODE_ENV === 'production'? '' : '/' ,
    //输出文件目录
    outputDir: process.env.NODE_ENV === 'production'? 'dist' : 'devdist' ,

    //eskint-loader 是否在保存时检查
    lintOnSave:false,

    /*
     * webpack配置，see  https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md  
    */

    chainWebpack:(config)=>{},

    configureWebpack:(config)=>{},

    //生产环境是否构成 sourceMap 文件

    //productSourceMap :false,

    //css相关配置

    css:{
        //是否使用css分离插件 ExtractTextPlugin
        extract:true,

        //开启 CSS source maps?
        sourceMap:false,

        //css预设器配置
        loaderOptions:{
            sass:{
                prependData:`@import "./src/styles/main.scss";`
            }
        },

        //启用 CSS modules for all css / pre-processor files
        modules:false,

    },

    parallel : require('os').cpus().lenght >1,

    //pwa插件相关设置
    pwa:{},

    //webpack-dev-servewr 相关设置
    devServer:{
        open:false, //编译完成后是否打开网页
        host:'localhost', //指定使用地址,默认127.0.0.0
        port:8080,//访问端口
        https:false, //编译失败刷新页面
        hot:true,//开启热加载
        hotOnly:false,
        proxy:null,//设置代理
        overlay:{ //全屏模式下是否显示脚本错误
            warnings:true,
            errors:true
        },
        before:app=>{

        }
    },

    //第三方插件设置
    pluginOptions:{

    }

}