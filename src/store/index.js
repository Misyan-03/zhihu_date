import { legacy_createStore, applyMiddleware } from 'redux'
import reduxLogger from 'redux-logger'
import reduxThunk from 'redux-thunk'
import reduxPromise from 'redux-promise'
import reducer from './reducer'

// 根据不同的环境，使用不同的中间件
// reduxLogger 派发日志
let middleware = [reduxThunk, reduxPromise],
  env = process.env.NODE_ENV
//只有开发环境需要reduxLogger 派发日志
if (env === 'development') {
  middleware.push(reduxLogger)
}

// 创建store容器
// applyMiddleware 中间件
const store = legacy_createStore(reducer, applyMiddleware(...middleware))
export default store
