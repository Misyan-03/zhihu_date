import React, { useState } from 'react'
import { HashRouter ,BrowserRouter} from 'react-router-dom'
import RouterView from './router'
//基于react开发出来的react缓存组件，类似于类似vue的keepalive包裹vue-router的效果功能
import { KeepAliveProvider } from 'keepalive-react-component'

const App = function App() {
  return (
    <BrowserRouter>
      <KeepAliveProvider>
        <RouterView />
      </KeepAliveProvider>
    </BrowserRouter>
  )
}
export default App
