import * as TYPES from '../action-types';
import _ from '../../assets/utils';

let initial = {
    list: null 
};
export default function storeReducer(state = initial, action) {
    state = _.clone(state);
    switch (action.type) {
        case TYPES.STORE_LIST:  // 设置收藏列表
            state.list = action.list;
            break;
        case TYPES.STORE_REMOVE:  // 移除某一项收藏
            if (Array.isArray(state.list)) {  
                state.list = state.list.filter(item => {
                    return +item.id !== +action.id;  //过滤掉id相同
                }); 
            }
            break;
        default:
    }
    return state;
};
