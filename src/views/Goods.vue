<template>
<div id="goods">
    <div class="goods-div">
        <div class="left-div">
            <ul class="content">
              <div v-for="(v,i) in goodslist" :key="i" @click="choosefoods(i)" :class="{selected:i==curSelected}">
              <img style="width:16px" v-show="v.type==1" src="../assets/imgs/icon1.png">
              <img style="width:16px" v-show="v.type==2" src="../assets/imgs/icon2.png">
              <span>{{v.name}}</span>
            </div>
            </ul>
        </div>
        <div class="right-div">
            <ul class="content">
              <ul :id="i" v-for="(v1,i) in goodslist" :key="i">
                <li class="title">{{v1.name}}</li>
                <li class="food" v-for="(v2,i2) in goodslist[i].foods" :key="i2">
                    <img :src="v2.icon">
                    <div class="txt">
                        <p>{{v2.name}}</p>
                        <p>{{v2.description}}</p>
                        <p><span>月售：{{v2.sellCount}}份</span>
                        <span class="good">好评率{{v2.rating}}%</span></p>
                        <p><span class="newprice">￥{{v2.price}}</span>
                        <span class="oldprice">￥{{v2.oldPrice}}</span>
                        <span class="add">
                          <Icon class="cutadd" type="md-remove-circle" v-show="v2.num> 0" @click="clickCut(i,i2)"/>
                              <strong class="number" v-show="v2.num > 0">{{v2.num}}</strong>
                          <Icon class="cutadd" type="md-add-circle" @click="clickAdd(i,i2)"/>
                          </span>
                          </p>
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
      curSelected: 0
    };
  },
  created() {
    getGoods().then(res => {
      this.$store.commit("initGoodsList", res.data.data);
    });
  },
  mounted() {
    new BScroll(document.querySelector(".left-div"), {
      click: true
    });
    this.rightDiv = new BScroll(document.querySelector(".right-div"), {
      click: true,
      probeType: 3 //实时派发滚动事件
    });
    this.rightDiv.on("scroll", ({ y }) => {
      let _y = Math.abs(y);

      //获取div的高度，计算所有div的高度，而且还要高频获取（反复获取，要考验性能）
      for (let divObj of this.getDivMath) {
        //根据计算完毕的DIV对象，判断y的区间端，如果处于某一个区间端，那就把左侧索引设置为对应的位置
        if (_y >= divObj.min && _y < divObj.max) {
          this.curSelected = divObj.index;
          return; //结束剩下的所有循环
        }
      }
    });
  },
  methods: {
    choosefoods(i) {
      this.curSelected = i;

      this.rightDiv.scrollToElement(document.getElementById(i), 600);
    },
    // 数量减少
    clickCut(i, i2) {
      this.$store.commit("numChangeCut", { i, i2 });
    },
    clickAdd(i, i2) {
      this.$store.commit("numChangeAdd", { i, i2 });
    }
  },
  computed: {
    //获取div的高度，计算所有div的高度，而且还要高频获取（反复获取，要考验性能）
    getDivMath() {
      //算法
      let arr = [];
      let total = 0; //之前div所有高度的累计
      //获取div的高度，根据数组索引，获取每一个div的高度
      for (let i = 0; i < this.goodslist.length; i++) {
        let curDivHeight = document.getElementById(i).offsetHeight;
        //min:之前div的高度累计 max:之前div累加的高度+自身的高度
        arr.push({ min: total, max: total + curDivHeight, index: i });
        //每循环一次累计之前div的高度
        total += curDivHeight;
      }
      return arr;
    },
    //获取vuex中的共享数据
    goodslist() {
      return this.$store.state.goodslist;
    }
  }
};
</script>

<style lang="less">
.selected {
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
}
</style>