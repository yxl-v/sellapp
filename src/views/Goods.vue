<template>
<div id="goods">
    <div class="goods-div">
        <div class="left-div">
            <ul class="content">
              <div v-for="(v,index) in this.data" :key="index" @click="choosefoods(index)" :class="{selected:index==curSelected}">
              <img style="width:16px" v-show="v.type==1" src="../assets/imgs/icon1.png">
              <img style="width:16px" v-show="v.type==2" src="../assets/imgs/icon2.png">
              <span>{{v.name}}</span>
            </div>
            </ul>
        </div>
        <div class="right-div">
            <ul class="content">
              <ul :id="index" v-for="(v1,index) in this.data" :key="index">
                <li class="title">{{v1.name}}</li>
                <li class="food" v-for="(v2,i2) in v1.foods" :key="i2">
                    <img :src="v2.icon">
                    <div class="txt">
                        <p>{{v2.name}}</p>
                        <p>{{v2.description}}</p>
                        <p><span>月售：{{v2.sellCount}}份</span>
                        <span class="good">好评率{{v2.rating}}%</span></p>
                        <p><span class="newprice">￥{{v2.price}}</span>
                        <span class="oldprice">￥{{v2.oldPrice}}</span>
                        <span class="add"><Icon type="md-add-circle" /></span></p>
                    </div>
                </li>
            </ul>
            </ul>
        </div>
    </div>
    </div>
</template>

<script>
import { getGoods } from "../api/apis.js";
import BScroll from "better-scroll";

export default {
  data() {
    return {
      data: [],
      curSelected:0
    };
  },
  created() {
    getGoods().then(res => {
      this.data = res.data.data;
    });
  },
  mounted() {
    new BScroll(document.querySelector(".left-div"),{
      click:true
    });
    this.rightDiv=new BScroll(document.querySelector(".right-div"));
  },
  methods:{
    choosefoods(index){
      this.curSelected=index;

      this.rightDiv.scrollToElement(document.getElementById(index),600)
    }
  },
};
</script>

<style lang="less">
.selected{
  color: #f50;
}
.goods-div {
  display: flex;
  height: 100%;
  .left-div {
    width: 100px;
    padding: 0px 10px;
    height: 350px;
    background: #f5f5f5;
    overflow: auto;
    overflow: hidden;
    div {
      width: 80px;
      padding: 15px 0px;
      border-bottom: 1px solid #ccc;
      text-align: center;
    }
  }
  .right-div {
    flex: 1;
    height: 500px;
    overflow: scroll;
    overflow: hidden;
    ul,
    li {
      list-style: none;
    }
    .title {
      width: 100%;
      height: 25px;
      line-height: 25px;
      text-indent: 1em;
      background: #f5f5f5;
      border-left: 2px solid #ccc;
    }
    .food {
      width: 100%;
      padding: 15px;
      display: flex;
      border-bottom: 1px solid #ccc;
      position: relative;
      img {
        width: 80px;
        height: 80px;
      }
      .txt {
        margin-left: 20px;
        p:first-child {
          font-weight: bolder;
          font-size: 17px;
        }
        .good {
          display: inline-block;
          margin-left: 10px;
        }
        p:last-child {
          .newprice {
            font-size: 17px;
            font-weight: bold;
            color: red;
          }
          .oldprice {
            font-size: 15px;
            color: grey;
            display: inline-block;
            margin-left: 15px;
            text-decoration: line-through;
          }
          .add {
            font-size: 24px;
            color: #00a1dc;
            position: absolute;
            right: 14px;
          }
        }
      }
    }
  }
}
</style>