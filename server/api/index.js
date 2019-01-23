const axios = require('axios')
const querystring = require('querystring')
const baseURL = 'https://cnodejs.org/api/v1'
const commonHeaders = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'host': 'cnodejs.org'
}
module.exports = (router) => {
  router.post('/login', async ctx => {
    const body = ctx.request.body
    await axios({
      baseURL,
      url: '/accesstoken',
      method: ctx.request.method,
      headers: { ...ctx.request.headers, ...commonHeaders },
      data: querystring.stringify(body)
    })
      .then((res) => {
        // 登录成功后将accesstoken种到cookie中
        ctx.cookies.set('_k', body.accesstoken)
        ctx.body = res.data
      })
      .catch((err) => {
        ctx.body = err.response.data
      })
  })
  router.all('/*', async ctx => {
    const requestUrl = ctx.path.replace('/api', '')
    await axios({
      baseURL,
      url: requestUrl,
      method: ctx.request.method,
      headers: { ...ctx.request.headers, ...commonHeaders },
      param: {
        ...ctx.request.query,
        accesstoken: ctx.cookies.get('_k') || ''
      },
      data: {
        ...querystring.stringify(ctx.request.body),
        accesstoken: ctx.cookies.get('_k') || ''
      }
    })
      .then((res) => {
        ctx.body = res.data
      })
      .catch((err) => {
        ctx.body = err.response.data
      })
  })
}
