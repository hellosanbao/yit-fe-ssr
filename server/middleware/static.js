const send = require('koa-send')
/**
 * @desc 静态资源管理中间件
 * @param route 客户端请求的路由
 * @param root 静态资源根目录
 *  */ 
module.exports = (route,root='/')=>{
    return async (ctx,next)=>{
        if(ctx.path.indexOf(route)==0){
            await send(ctx,ctx.path.replace(route,''),{root})
        }else{
            await next()
        }
    }
}