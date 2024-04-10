import React, { useState, useEffect, useRef } from 'react'
import _ from '../assets/utils'
import './Home.less'
import {
  Swiper,
  Image,
  Divider,
  DotLoading,
  Toast,
  SafeArea,
} from 'antd-mobile'
import { Link } from 'react-router-dom'
import api from '../api'
// 头部
import HomeHead from '../components/HomeHead'
//新闻列表
import NewsItem from '../components/NewsItem'
//骨架屏二次封装
import SkeletonAgain from '../components/SkeletonAgain'

const Home = function Home() {
  /* 创建所需状态 */
  let [today, setToday] = useState(_.formatTime(null, '{0}{1}{2}')),
    [bannerData, setBannerData] = useState([]),
    [newsList, setNewsList] = useState([])
  let loadMore = useRef()

  /* 第一次渲染完毕:向服务器发送数据请求 */
  useEffect(() => {
    ;(async () => {
      try {
        let { date, top_stories, stories } = await api.queryNewsLatest()
        setToday(date)
        setBannerData(top_stories)
        // 更新新闻列表状态
        newsList.push({
          date,
          stories,
        })
        // [...newsList]保证改的不是旧地址，是个新地址
        setNewsList([...newsList])
      } catch (_) {}
    })()
  }, [])

  /* 第一次渲染完毕:设置监听器,实现触底加载 */
  useEffect(() => {
    let ob = new IntersectionObserver(async (changes) => {
      // console.log(changes);
      // isIntersecting true/false 代表出现视口中/消失视口中
      let { isIntersecting } = changes[0]
      if (isIntersecting) {
        // 加载更多的按钮出现在视口中「也就是触底了」
        try {
          //获取数组最后一位的时间,queryNewsBefore
          let time = newsList[newsList.length - 1]['date']
          let res = await api.queryNewsBefore(time)
          // console.log(res)
          newsList.push(res)
          // setNewsList修改状态值,要用新地址,react优化策略,
          // 修改相同值,只触发一次,对于对象我们可以改变地址,值使用函数
          setNewsList([...newsList])
        } catch (_) {}
      }
    })

    // console.log(ob)
    //把dom给变量,组件释放时还存在
    let loadMoreBox = loadMore.current
    //监听的元素
    ob.observe(loadMore.current)

    // 在组件销毁释放的时候:手动销毁监听器
    return () => {
      ob.unobserve(loadMoreBox) //停止监听  //loadMore.current=null
      ob = null //设空
    }
  }, [])

  return (
    <div className="home-box">
      {/* 头部 ,today传8位年月日*/}
      <HomeHead today={today} />
      {/* 轮播图 */}
      <div className="swiper-box">
        {bannerData.length > 0 ? (
          <Swiper
            autoplay={true}
            loop={true}
            style={{
              '--border-radius': '8px',
            }}
          >
            {bannerData.map((item, index) => {
              // console.log(item + '12')
              let { id, image, title, hint } = item
              return (
                <Swiper.Item
                  key={id}
                  onClick={() => {
                    Toast.show(`你点击了卡片 ${index + 1}`)
                  }}
                >
                  <Link to={{ pathname: `/detail/${id}` }}>
                    <div style={{ display: 'inline-block' }}>
                      <Image src={image} lazy draggable={true} />
                    </div>

                    <div className="desc">
                      <h3 className="title">{title}</h3>
                      <p className="author">{hint}</p>
                    </div>
                  </Link>
                </Swiper.Item>
              )
            })}
          </Swiper>
        ) : null}
      </div>
      {/* 新闻列表 */}
      {newsList.length === 0 ? (
        <SkeletonAgain />
      ) : (
        <>
          {newsList.map((item, index) => {
            let { date, stories } = item
            return (
              <div className="news-box" key={date}>
                {/* 第一条数据我们不需要渲染日期 */}
                {index !== 0 ? (
                  <Divider
                    contentPosition="left"
                    style={{
                      color: '#1677ff',
                      borderColor: '#1677ff',
                      borderStyle: 'dashed',
                      fontSize: '15px',
                    }}
                  >
                    {_.formatTime(date, '{1}月{2}日')}
                  </Divider>
                ) : null}
                <div className="list">
                  {stories.map((cur) => {
                    // console.log(cur)
                    // NewsItem自定义封装新闻列表
                    return <NewsItem key={cur.id} info={cur} />
                  })}
                </div>
              </div>
            )
          })}
        </>
      )}

      {/* 加载更多 */}
      <div
        className="loadmore-box"
        ref={loadMore}
        style={{
          // 有数据渲染，没数据隐藏
          display: newsList.length === 0 ? 'none' : 'block',
          color: 'skyblue',
        }}
      >
        <DotLoading color="currentColor" />
        数据加载中
      </div>
      <SafeArea position="bottom" />
    </div>
  )
}
export default Home
