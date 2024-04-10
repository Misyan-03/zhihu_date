import React, { Suspense, useState, useEffect } from 'react'
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom'
import routes from './routes'
import { Mask, DotLoading, Toast } from 'antd-mobile'
import store from '../store'
import action from '../store/action'

/* 统一路由配置 getState()获取公共状态信息*/
const isCheckLogin = (path) => {
  let {
    base: { info },
  } = store.getState()
  let checkList = ['/personal', '/store', '/update']
  return !info && checkList.includes(path)
}

const Element = function Element(props) {  
  // console.log(props)
  let { component: Component, meta, path } = props
  //取反，true需要做动态校验，false不需要做校验的地址直接显示组件， true取反变为false,就显示Mask遮罩层，
  let isShow = !isCheckLogin(path)
  //让它每次重新更新，获取最新数据，自己实现
  let [_, setRandom] = useState(0)

  // 登录态校验,不加依赖性，每次组件更新都会执行
  useEffect(() => {
    //不需要做登录态校验
    if (isShow) return
    ;(async () => {
      //如果info值不存在，并且跳转的地址是三个中的一个。从服务器获取登录信息
      //需要做登录态校验
      let infoAction = await action.base.queryUserInfoAsync()
      // console.log(infoAction)
      let info = infoAction.info
      // 如果获取后还是不存在:没有登录
      if (!info) {
        Toast.show({
          icon: 'fail',
          content: '请先登录',
        })
        // 跳转到登录页
        navigate(
          {
            pathname: '/login',
            search: `?to=${path}`,
            
          },{
            replace:true  //跳转到登录页面后，就不要回到原来的页面了，而是跳转到登录页面。
          }

        )
        return
      }
      // 如果获取到了信息,说明是登录的,我们派发任务把action获取的信息存储到容器中
      store.dispatch(infoAction)
      setRandom(+new Date())  //手动更新Element组件 
    })()
  })

  // 修改页面的TITLE
  let { title = '知乎日报-WebApp' } = meta || {}
  document.title = title
  // 获取路由信息,基于属性传递给组件
  const navigate = useNavigate(),
  location = useLocation(),
  params = useParams(),
  [usp] = useSearchParams()

  return (
    <>
      {isShow ? (
        <Component
          navigate={navigate}
          location={location}
          params={params}
          usp={usp}
        />
      ) : (
        <Mask visible={true}>
          <div style={{ color: '#00b578' }}>
            <DotLoading color="currentColor" />
            <span>正在加载</span>
          </div>
        </Mask>
      )}
    </>
  )
}
//根组件
export default function RouterView() {
  return (
    <Suspense
      fallback={
        <Mask visible={true}>
          <div style={{ color: '#00b578' }}>
            <DotLoading color="currentColor" />
            <span>正在加载</span>
          </div>
        </Mask>
      }
    >
      <Routes>
        {routes.map((item) => {
          let { name, path } = item
          return (
            <Route key={name} path={path} element={<Element {...item} />} />
          )
        })}
      </Routes>
    </Suspense>
  )
}
