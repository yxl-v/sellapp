//所有请求封装接口文件
import axios from 'axios'

// axios.defaults.baseURL='http://localhost:3000'
let req=axios.create({
    baseURL:'http://192.168.1.145:3000',//基本路径
    timeout:10000  //ms 请求10秒，如果10秒还没有请求到，就提示超时
})

export function getSeller(){
    return req.get('/api/seller')
}

export function getGoods(){
    return req.get('/api/goods')
}

export function getRatings(){
    return req.get('/api/ratings')
}