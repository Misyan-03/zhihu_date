import React, { useMemo, useEffect } from 'react'
import timg from '../assets/images/timg.jpg'
import './HomeHead.less'
import { connect } from 'react-redux'
import action from '../store/action'
import { useNavigate } from 'react-router-dom'

const HomeHead = function HomeHead(props) {
  const navigate = useNavigate()

  /* 计算时间中的月和日 */
  let { today, info, queryUserInfoAsync } = props
  let time = useMemo(() => {
    //通过正则取数字
    let [, year, month, day] = today.match(/^\d{0}(\d{4})(\d{2})(\d{2})$/),
      area = [
        '零','一', '二', '三', '四','五','六','七','八','九','十','十一','十二',
      ]
    return {
      year: +year + '年',
      month: area[+month] + '月',
      day: +day + '日',
    }
  }, [today])

  // 第一次渲染完:如果info中没有信息,我们尝试派发一次,获取到登陆者信息
  useEffect(() => {
    if (!info) {
      queryUserInfoAsync()
    }
  }, [])

  return (
    <header className="home-head-box">
      {/* 时间，标题 */}
      <div className="info">
        <div className="time">
          <span>{time.year}</span>
          <div className="month_day">
            <span>{time.month}</span>
            <span>{time.day}</span>
          </div>
        </div>
        <h2 className="title">新闻日报</h2>
      </div>
      {/* {头像} */}
      <div
        className="picture"
        onClick={() => {
          navigate('/personal')
        }}
      >
        <img src={info ? info.pic : timg} alt="" />
      </div>
    </header>
  )
}
export default connect((state) => state.base, action.base)(HomeHead)
