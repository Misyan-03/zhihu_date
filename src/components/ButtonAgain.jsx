import React, { useState } from 'react'
import { Button } from 'antd-mobile'

const ButtonAgain = function ButtonAgain(props) {
  // props里有children属性，相当于插槽出口，是定义在组件里的内容
  //   console.log(props)
  /* props中包含了调用<Button>组件时候的属性 ，props是只读的冻结的，我们可以浅拷贝*/
  let options = { ...props }
  //   console.log(options)
  let { children, onClick } = options
  //options里拿到children渲染完就不需要了，可以移除里面的children字段
  delete options.children

  /* 状态 */
  let [loading, setLoading] = useState(false)
  const clickHandle = async () => {
    //改成加载
    setLoading(true)
    //加try-catch不管处理是否成功，都会把Loading效果关闭
    try {
      //执行提交按钮
      await onClick()
    } catch (_) {}
    //改成未加载
    setLoading(false)
  }
  //调用<ButtonAgain />组件 如果传递了onClick，我们也处理，没有传递我们就不处理
  if (onClick) {
    //改成自己写的方法
    options.onClick = clickHandle
  }

  return (
    // {...options}剩下的全部传给button
    <Button {...options} loading={loading}>
      {children}
    </Button>
  )
}
export default ButtonAgain
