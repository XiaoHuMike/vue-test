import request from '@/utils/request'
// 获取品牌管理数据接口
export const reqTradeMarkList = (page, limit) => request({ url: `/admin/product/baseTrademark/${page}/${limit}`, method: 'get' })
// 添加或修改品牌管理接口
export const reqAddOrUpdateTradeMark = (tradeMark) => {
  // 带给服务器数据携带ID---修改
  if (tradeMark.id) {
    return request({ url: '/admin/product/baseTrademark/update', method: 'put', data: tradeMark })
  } else {
    // 新增品牌
    return request({ url: '/admin/product/baseTrademark/save', method: 'post', data: tradeMark })
  }
}
