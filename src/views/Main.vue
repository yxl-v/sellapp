<template>
    <div class="main">
        <!-- 容器页面 -->
        <!-- 头部 -->
        <div class="top" :style="{backgroundImage:'url('+data.avatar+')'}">
            <!-- 商家信息 -->
            <div class="message">
                <div class="img">
                    <img :src="data.avatar" alt="">
                </div>
                <div class="txt">
                    <p><span class="pp">品牌</span><span class="title">{{data.name}}</span></p>
                    <p><span>{{data.description}}</span> / <span>{{data.deliveryTime}}分钟送达</span></p>
                    <p><span class="jian">减</span>{{data.supports?data.supports[0].description:''}}</p>
                </div>
                <div class="picture">5个></div>
            </div>
            <!-- 公告 -->
            <div class="ad">
                <span class="ad_box">公告</span>
                {{data.bulletin}}
            </div>
        </div>

        <div class="router-link-div">
            <div><router-link to="/goods">商品</router-link></div>
            <div><router-link to="/evaluate">评价</router-link></div>
            <div><router-link to="/merchant">商家</router-link></div>
        </div>
        <!-- 二路由出口 -->
        <router-view class="out"></router-view>

        <div class="shopcar-bar">
           <div class="shopcar-box1">
             <router-link to="/Shopcar"><img src="../assets/imgs/car.png"></router-link>
             <span class="price">￥0</span>
             <span class="song">另需配送费￥4元</span>
           </div>
           <div class="shopcar-box2">
             ￥20起送
           </div>
        </div>
    </div>
</template>

<script>
import { getSeller } from "../api/apis.js";
export default {
  data() {
    return {
      data: {}
    };
  },
  created() {
    getSeller().then(res => {
      this.data = res.data.data;
    });
  }
};
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
}
.top {
  width: 100%;
  height: 170px;
  .message {
    width: 100%;
    height: 140px;
    padding: 20px 30px 20px 20px;
    display: flex;
    justify-content: space-around;
    background: rgba(78, 77, 77, 0.7);
    position: relative;
    .img {
      width: 35%;
      height: 70px;
      img {
        width: 70px;
        height: 70px;
        margin-top: 5px;
      }
    }
    .txt {
      width: 65%;
      height: auto;
      color: white;
      margin-left: 5px;
      .title {
        font-size: 18px;
        font-weight: bold;
      }
      .pp {
        display: inline-block;
        background: red;
        color: white;
        font-weight: bold;
        font-size: 13px;
        width: 34px;
        height: 20px;
        text-align: center;
        margin-right: 10px;
      }
      p:nth-last-of-type(2) {
        margin: 5px 0px;
      }
      p:last-of-type {
        font-size: 13px;
      }
      .jian {
        display: inline-block;
        background: white;
        color: red;
        width: 16px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        margin-right: 5px;
      }
    }
    .picture {
      width: 50px;
      height: 30px;
      background: rgba(15, 10, 10, 0.4);
      color: white;
      text-align: center;
      line-height: 30px;
      border-radius: 25px;
      font-size: 12px;
      margin-top: 55px;
      position: absolute;
      bottom: 10px;
      right: 20px;
    }
  }
  .ad {
    width: 100%;
    height: 30px;
    padding: 0px 10px;
    color: white;
    text-align: center;
    line-height: 30px;
    font-size: 12px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    background: rgba(5, 4, 4, 0.7);
    .ad_box {
      display: inline-block;
      width: 26px;
      height: 14px;
      font-weight: bold;
      text-align: center;
      line-height: 14px;
      font-size: 11px;
      background: white;
      color: black;
      margin-right: 4px;
    }
  }
}

.router-link-div {
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #ccc;
  div {
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    color: black;
  }
}
.shopcar-bar {
  position: fixed;
  width: 100%;
  height: 60px;
  bottom: 0;
  background: #141c27;
  display: flex;
  justify-content: space-between;
  .shopcar-box1 {
    width: 70%;
    height: 30px;
    padding: 15px 0px;
    font-weight: bold;
    text-align: center;
    line-height: 30px;
    position: relative;
    img {
      width: 60px;
      height: 60px;
      position: absolute;
      left: 20px;
      top: -18px;
      display: inline-block;
      border: 5px solid #141c27;
      border-radius: 50%;
    }
    .price {
      display: inline-block;
      width: 50px;
      height: 30px;
      line-height: 30px;
      font-size: 18px;
      border-right: 1px solid gray;
      margin-left: 50px;
    }
    .song {
      display: inline-block;
      width: 100px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      font-size: 13px;
      margin-left: 10px;
    }
  }
  .shopcar-box2 {
    width: 30%;
    height: 60px;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    line-height: 60px;
    color: rgb(146, 146, 146);
    background: rgb(58, 57, 57);
  }
}
</style>