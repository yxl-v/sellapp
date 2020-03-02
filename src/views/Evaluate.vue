<template>
    <div id="evaluate">
         <!-- 评分 -->
         <div class="eve-num">
             <div class="eve-left">
                 <p class="eve-left-1">3.9</p>
                 <p class="eve-left-2">综合评分</p>
                 <p class="eve-left-3">高于周边商家69.2%</p>
             </div>
             <div class="eve-right">
                <p class="eve-right-1">商品评价<Rate class="pf" disabled v-model="valueDisabled1" /><span style="color: #f5a623">3.9</span></p>
                <p class="eve-right-2">服务态度<Rate class="pf" disabled v-model="valueDisabled2" /><span style="color: #f5a623">4.0</span></p>
                <p class="eve-right-3">送达时间<span>44分钟</span></p>
            </div>
         </div>
        <div class="null"></div>
         <!-- 评价 -->
         <div class="eve-all">
             <!-- 按钮 -->
             <div class="btn-all">
                 <Button type="primary">全部110</Button>
                 <Button type="info">满意20</Button>
                 <Button>不满意98</Button>
             </div>
             <p class="onlysee"><Icon type="md-checkmark-circle" />只看有内容的评价</p>
             <!-- 内容 -->
             <div class="content">
                  <div v-for="(v,i) in evaluatelist" :key="i" class="conts">
                      <div class="uesrimg"><img :src="v.avatar" alt=""></div>
                      <div class="txt">
                          <p class="user-time">
                              <span class="username">{{v.username}}</span>
                              <span class="time">{{v.rateTime}}</span>
                          </p>
                          <p class="howtime"><Rate :value.sync="v.score"></Rate>{{v.deliveryTime}}分钟送达</p>
                          <p class="content-text">{{v.text}}</p>
                          <p class="recommend"><Icon type="ios-thumbs-up" />
                            <span v-for="(x,i) in v.recommend" :key='i'>{{x}}</span>
                          </p>
                      </div>
                  </div>
             </div>
         </div>
    </div>
</template>

<script>
import { getRatings } from "../api/apis.js";
// import BScroll from "better-scroll";
export default {
  data() {
    return {
      valueDisabled1: 3.9,
      valueDisabled2: 4.0
    };
  },
  created() {
    getRatings().then(res => {
      this.$store.commit('initEvaluateList', res.data.data);
      this.evaluatelist.forEach(function(v) {
        function newtime(sjx) {
          var sj = new Date(sjx);
          var year = sj.getFullYear();
          var month = sj.getMonth() + 1;
          if (month < 10) {
            month = "0" + month;
          }
          var day = sj.getDate();
          if (day < 10) {
            day = "0" + day;
          }
          var hours = sj.getHours();
          if (hours < 10) {
            hours = "0" + hours;
          }
          var minutes = sj.getMinutes();
          if (minutes < 10) {
            minutes = "0" + minutes;
          }
          var seconds = sj.getSeconds();
          if (seconds < 10) {
            seconds = "0" + seconds;
          }
          return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        }
        v.rateTime = newtime(v.rateTime);
      });
    });
  },
  // mounted() {
  //   new BScroll(document.getElementById("#evaluate"));
  // },
  computed: {
    evaluatelist(){
      return this.$store.state.evaluatelist
    }
  },
};
</script>

<style lang="less" scoped>
//评分
.eve-num {
  display: flex;
  margin: 20px 10px;
  .eve-left {
    flex: 0.3;
    text-align: center;
    border-right: 1px solid #ccc;
    padding-right: 18px;
    .eve-left-1 {
      font-size: 30px;
      color: #fd9c00;
    }
    .eve-left-2 {
      font-size: 16px;
      color: black;
    }
  }
  .eve-right {
    padding-left: 12px;
    flex: 0.7;
    font-size: 16px;
    line-height: 32px;
    color: black;
    .pf {
      font-size: 18px;
    }
    .eve-right-3 {
      span {
        color: rgb(148, 146, 146);
        margin-left: 15px;
      }
    }
  }
}
.null {
  width: 100%;
  height: 15px;
  background: #f3f6f6;
  border-top: 1px solid #e5e8e8;
  border-bottom: 1px solid #e5e8e8;
}
//评价
.eve-all {
  // 按钮
  .btn-all {
    margin-top: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e5e8e8;
    .ivu-btn {
      margin-left: 15px;
    }
  }
  //onlysee
  .onlysee {
    font-size: 16px;
    padding: 13px;
    color: rgb(129, 129, 129);
    border-bottom: 1px solid #e5e8e8;
  }
  //评价内容
  .content {
    .conts {
      display: flex;
      padding: 18px 0px;
      border-bottom: 1px solid #ccc;
      //   头像
      .uesrimg {
        width: 60px;
        height: 60px;
        padding: 0px 10px 0px 10px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }
      //文字
      .txt {
        flex: 1;
        padding-right: 20px;
        .user-time {
          display: flex;
          justify-content: space-between;
          .username {
            font-size: 16px;
            color: #000;
          }
        }
        .content-text {
          color: #000;
          font-size: 16px;
          line-height: 20px;
          padding: 8px 0px;
          font-weight: 500;
        }
        .recommend {
          .ivu-icon-ios-thumbs-up {
            color: #00a1dc;
            line-height: 14px;
            font-size: 18px;
            vertical-align: middle;
          }
          span {
            display: inline-block;
            margin-left: 5px;
            margin-top: 3px;
            padding: 3px;
            font-size: 14px;
            height: 20px;
            line-height: 14px;
            max-width: 75px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            border: 1px solid #ccc;
            vertical-align: middle;
          }
        }
      }
    }
  }
}
</style>