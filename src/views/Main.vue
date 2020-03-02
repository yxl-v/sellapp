<template>
    <div class="main">
        <!-- 容器页面 -->
        <!-- 头部 -->
        <div class="top" :style="{backgroundImage:'url('+merchantlist.avatar+')'}">
            <!-- 商家信息 -->
            <div class="message">
                <div class="img">
                    <img :src="merchantlist.avatar" alt="">
                </div>
                <div class="txt">
                    <p><span class="pp">品牌</span><span class="title">{{merchantlist.name}}</span></p>
                    <p><span>{{merchantlist.description}}</span> / <span>{{merchantlist.deliveryTime}}分钟送达</span></p>
                    <p><span class="jian">减</span>{{merchantlist.supports?merchantlist.supports[0].description:''}}</p>
                </div>
                <div class="picture">5个></div>
            </div>
            <!-- 公告 -->
            <div class="ad">
                <span class="ad_box">公告</span>
                {{merchantlist.bulletin}}
            </div>
        </div>

        <div class="router-link-div">
            <div><router-link to="/goods">商品</router-link></div>
            <div><router-link to="/evaluate">评价</router-link></div>
            <div><router-link to="/merchant">商家</router-link></div>
        </div>
        <!-- 二路由出口 -->
        <router-view class="out"></router-view>

        <!-- 购物车条 -->
        <div id="shopcar-bar">
            <div class="car" @click="canshow=!canshow">
                <div class="carnum" v-show="goodscarsum==0?false:true">{{goodscarsum}}</div>
                <img src="../assets/imgs/shopping_cart.svg" alt="">
            </div>
            <p><span :class="goodsoneAllmoney==0?false:'allmeony'">￥{{goodsoneAllmoney}}</span>另需配送费￥4元</p>
            <div class="shopping"><strong :class="goodsoneAllmoney<20?false:'xxx'" v-text="goodsoneAllmoney<20?car20:cargo"></strong></div> 
        </div>
        <!-- 购物车 -->
        <transition  name="slide-fade">
          <div id="shopcar" v-show="canshow">
              <p class="nullcar" v-show="datas==''?true:false">购物车里什么都没有哦~</p>
              <p v-show="datas==''?false:true">已经装入口袋了哦（配送费4元）</p>
             <div class="carcontent" v-for="(v,i) in datas"  :key='i' >
              <div class="goodsimg"><img :src='v.image' ></div>
              <div class="gootstxt">
                  <p class="goots-title">{{v.name}}</p>
                  <p class="pay" >
                      <span class="money01" >￥{{v.price}}x{{v.num}}</span>
                      <!-- <span class="money01" >{{goodpriceall}}</span> -->
                      <!-- <span class="money02">￥{{v.oldPrice*v.num}}</span> -->
                      <span class="add">
                        <Icon class="cutadd" type="md-remove-circle" v-show="v.num> 0" @click="carchangedel(v.name,i)" />
                        <strong class="number">{{v.num}}</strong>
                        <Icon class="cutadd" type="md-add-circle"  v-show="v.num> 0" @click="carchangeadd(v.name,i)"/>   
                      </span>
                  </p>
              </div>
            </div>
          </div>
        </transition>
    </div>
</template>

<script>
import { getSeller } from "../api/apis.js";
export default {
  data() {
    return {
      //购物车显示判断的变量
      canshow: false,
      carnullshow: false,
      //页头数据，防止报错
      data: { supports: [{ description: "" }] },
      //购物车单价和
      goodpriceall: "",
      cargo: "立即付款",
      car20: "20元起送"
    };
  },
  created() {
    getSeller().then(res => {
      this.$store.commit("initMerchantList", res.data.data);
    });
  },
  methods: {
    carchangedel(name, i) {
      this.$store.commit("carchangedel", { name, i });
    },
    carchangeadd(name, i) {
      this.$store.commit("carchangeadd", { name, i });
      console.log(this.goodsoneAllmoney);
    }
  },
  computed: {
    merchantlist() {
      return this.$store.state.merchantlist;
    },
    //获取vuex中的购物车数据
    datas() {
      //数组对象去重
      let map = new Map();
      for (const item of this.$store.getters.carGoodsNum) {
        if (!map.has(item.name)) {
          map.set(item.name, item);
        }
      }
      return [...map.values()];
    },
    //获取vuex中的购物车商品数量的数据
    /*  goodscarsum() {
      return this.$store.getters.Sum;
    }, */
    // 购物车商品数量
    goodscarsum() {
      var sum = 0;
      for (let j = 0; j < this.datas.length; j++) {
        sum += this.datas[j].num;
      }
      return sum;
    },
    //购物车商品总价
    goodsoneAllmoney() {
      var sum = 0;
      var list = [];
      for (let j = 0; j < this.datas.length; j++) {
        list.push(this.datas[j].num * this.datas[j].price);
      }
      for (let x = 0; x < list.length; x++) {
        sum += list[x];
      }
      return sum;
    }
  }
};
</script>

<style lang="less" scoped>
a:hover{
  color: #f50;
}
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

//购物车条
#shopcar-bar {
  width: 100%;
  height: 60px;
  background: #131d27;
  position: fixed;
  bottom: 0;
  display: flex;
  z-index: 9;
  .car {
    width: 60px;
    height: 60px;
    background: #2a353a;
    padding: 6px 10px 10px 8px;
    border: 8px solid #131d27;
    border-radius: 50%;
    position: absolute;
    top: -15px;
    left: 15px;
    .carnum {
      width: 18px;
      height: 18px;
      text-align: center;
      font-weight: 600;
      border-radius: 50%;
      position: absolute;
      background: red;
      left: 30px;
      top: -12px;
      color: white;
    }
    img {
      width: 30px;
      height: 35px;
    }
  }
  p {
    flex: 1;
    padding-left: 80px;
    margin-top: 16px;
    span {
      margin-right: 8px;
      padding-right: 8px;
      border-right: 1px solid #888;
      font-size: 18px;
      font-weight: 600;
    }
  }
  .shopping {
    height: 100%;
    width: 100px;
    text-align: center;
    line-height: 60px;
    background: #2a353a;
    color: #888;
    font-weight: 600;
    font-size: 16px;
    .xxx {
      color: gray;
      display: inline-block;
      width: 100%;
      height: 100%;
      background: #f8c74e;
    }
  }
}
// 购物车
#shopcar {
  width: 100%;
  max-height: 320px;
  overflow: scroll;
  padding: 14px 24px 24px 24px;
  background: white;
  border-top: 14px solid rgba(238, 184, 59, 0.3);
  border-radius: 25px 25px 0 0;
  position: fixed;
  bottom: 60px;
  z-index: 6;
  .nullcar {
    font-size: 18px;
    color: #f50;
    text-align: center;
  }
  .carcontent {
    display: flex;
    height: 95px;
    padding: 15px;
    border-bottom: 1px solid #888;
    .goodsimg {
      width: 60px;
      height: 60px;
      margin-right: 5px;
      img {
        width: 60px;
        height: 60px;
      }
    }
    .gootstxt {
      line-height: 20px;
      
      .goots-title {
        color: #000;
        font-size: 16px;
        margin-bottom: 15px;
      }
      .goods-num {
        min-width: 160px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .pay {
        .money01 {
          font-size: 18px;
          font-weight: 600;
          color: red;
        }

        .money02 {
          padding-left: 6px;
          text-decoration: line-through;
        }
        .add {
            position: absolute;
            right: 14px;
            .cutadd {
              font-size: 24px;
              color: #00a1dc;
            }
            .number {
              font-size: 16px;
            }
          }
      }
    }
  }
}

/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 0.4s ease;
}
.slide-fade-leave-active {
  transition: all 0.4s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(200px);
  opacity: 0;
}
</style>