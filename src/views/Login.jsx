import React, { useState, useEffect } from 'react'
import { Form, Input, Toast } from 'antd-mobile'
import { connect } from 'react-redux'
import action from '../store/action'
import './Login.less'
import ButtonAgain from '../components/ButtonAgain'
import NavBarAgain from '../components/NavBarAgain'
import api from '../api'
import _ from '../assets/utils'

/* 自定义表单校验规则  防止xss攻击，就是用户输入sql语句，可能会对数据库造成破坏*/
const validate = {
  phone(_, value) {
    //    value是输入的值
    value = value.trim()
    let reg = /^(?:(?:\+|00)86)?1\d{10}$/
    if (value.length === 0) return Promise.reject(new Error('手机号是必填项!'))
    //取反不匹配
    if (!reg.test(value)) return Promise.reject(new Error('手机号格式有误!'))
    return Promise.resolve()
  },
  code(_, value) {
    value = value.trim()
    let reg = /^\d{6}$/
    if (value.length === 0) return Promise.reject(new Error('验证码是必填项!'))
    if (!reg.test(value)) return Promise.reject(new Error('验证码格式有误!'))
    return Promise.resolve()
  },
}

const Login = function Login(props) {
 
  let { queryUserInfoAsync, navigate, usp } = props

  /* 状态 */
  //获取form实例
  const [formIns] = Form.useForm(),
    [disabled, setDisabled] = useState(false),
    [sendText, setSendText] = useState('发送验证码')
  // console.log(formIns)
  /* 表单提交 */
  const submit = async () => {
    try {
      //触发表单验证
      await formIns.validateFields()
      let { phone, code } = formIns.getFieldsValue()
      let { code: codeHttp, token } = await api.login(phone, code)
      // console.log(token);
      if (+codeHttp !== 0) {
        Toast.show({
          icon: 'fail',
          content: '登录失败',
        })
        //重置一组字段到 initialValues
        formIns.resetFields(['code'])
        return
      }
      // 登录成功:存储Token、存储登录者信息到redux、提示、跳转
      _.storage.set('tk', token)
      await queryUserInfoAsync() //派发任务,同步redux中的状态信息
      Toast.show({
        icon: 'success',
        content: '登录/注册成功',
      })

      // console.log(usp)
      // URLSearchParams 里get方法获取动态传参值 就是跳转地址 例如？to=/personal  /personal
      let to = usp.get('to')
      // console.log(to)
      to ? navigate(to, { replace: true }) : navigate(-1)
    } catch (_) {}
  }

  /* 发送验证码 */
  //timer存放倒计时
  let timer = null,
    num = 15
  const countdown = () => {
    num--
    if (num === 0) {
      //清除定时器
      clearInterval(timer)
      timer = null
      setSendText(`发送验证码`)
      setDisabled(false)
      return
    }
    setSendText(`${num}秒后重发`)
  }
  const send = async () => {
    try {
      //对指定的进行表单校验
      await formIns.validateFields(['phone'])
      //手机号校验成功
      let phone = formIns.getFieldValue('phone')
      let { code } = await api.sendPhoneCode(phone)
      if (+code !== 0) {
        Toast.show({
          icon: 'fail',
          content: '发送失败',
        })
        return
      }
      // 发送成功
      setDisabled(true)
      countdown()
      // !timer 就是timer===null,执行定时器
      if (!timer) timer = setInterval(countdown, 1000)
    } catch (_) {}
  }
  // 组件销毁的时候:把没有清除的定时器干掉，就是有可能我们没到0结束时间，就立即登陆成功，
  // 跳转其他页面组件定时器还在运行，所有组件销毁要把定时器清除
  useEffect(() => {
    return () => {
      if (timer) {
        clearInterval(timer)
        timer = null
      }
    }
  }, [])

  return (
    <div className="login-box">
      <NavBarAgain title="登录/注册" />
      <Form
        layout="horizontal"
        style={{ '--border-top': 'none' }}
        footer={
          <ButtonAgain color="primary" onClick={submit}>
            提交
          </ButtonAgain>
        }
        form={formIns}
        initialValues={{ phone: '', code: '' }}
      >
        <Form.Item
          name="phone"
          label="手机号"
          rules={[{ validator: validate.phone }]}
          required={true}
        >
          <Input placeholder="请输入手机号" />
        </Form.Item>

        <Form.Item
          name="code"
          label="验证码"
          rules={[{ validator: validate.code }]}
          extra={
            <ButtonAgain
              size="small"
              color="primary"
              disabled={disabled}
              onClick={send}
            >
              {sendText}
            </ButtonAgain>
          }
        >
          <Input />
        </Form.Item>
      </Form>
    </div>
  )
}
export default connect(null, action.base)(Login)
