import React from "react";
import './NewsItem.less';
import { Image } from 'antd-mobile';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const NewsItem = function NewsItem(props) {
    let { info } = props;
    if (!info) return null;
    let { id, title, hint, images, image } = info;
    // 如果images为空，就把image赋值给images，如果images不为空，就不做任何处理
    // images = images || image; 
    //因为在收藏列表接口返回image字段是个单独字符串不是数组，可以把他追加images中，变为数组，进行渲染
    if (!images) images = [image];
    // isArray判断是否为数组，不是就变成空数组
    if (!Array.isArray(images)) images = [];
    return <div className="news-item-box">
        <Link to={{ pathname: `/detail/${id}` }}>
            <div className="content">
                <h4 className="title">{title}</h4>
                {hint ? <p className="author">{hint}</p> : null}
            </div>
            <Image src={images[0]} lazy />
        </Link>
    </div>;
};
/* 属性规则处理 */
NewsItem.defaultProps = {
    info: null
};
NewsItem.propTypes = {
    info: PropTypes.object
};

export default NewsItem;