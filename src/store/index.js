import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        goodslist:[],//商品列表
        evaluatelist:[],//评价列表
        merchantlist:{},//商家信息
    },
    //改变-它是改变state数据的唯一方式
    mutations:{
        // 初始化商品数组
        initGoodsList(state, newArr) {
            state.goodslist = newArr
        },
        initEvaluateList(state,newArr){
            state.evaluatelist = newArr
        },
        initMerchantList(state,Obj){
            state.merchantlist = Obj
        },

        //页面商品数量增加
        numChangeAdd(state, v2) {
            state.goodslist[v2.i].foods[v2.i2].num += 1;
        },
        //页面商品数量减少
        numChangeCut(state, v2) {
            state.goodslist[v2.i].foods[v2.i2].num -= 1;
        },

        //购物车商品数量减
        carchangedel(state, v2) {
            for (let i of state.goodslist) {
                for (let j of i.foods) {
                    if (j.name == v2.name) {
                        j.num--;
                    }
                }
            }
        },
        // 购物车商品数量加
        carchangeadd(state, v2) {
            for (let i of state.goodslist) {
                for (let j of i.foods) {
                    if (j.name == v2.name) {
                        j.num++;
                    }
                }
            }
        }
    },
    //vuex版的计算属性（和computed原理一样，会缓存数据，只要引用数据不变就不会重新运算）
    // getters: {
    //     //getter和mutation一样，每一个getter函数，都会接受state形参
    //     getAdult(state) {
    //         // state.list
    //         return state.list.filter(obj => obj.age >= 18)
    //     }
    // }
    getters: {
        //必要有state形参
        //返回选择的商品
        carGoodsNum(state) {
            var nums = [];
            for (let i = 0; i < state.goodslist.length; i++) {
                for (let j = 0; j < state.goodslist[i].foods.length; j++) {
                    nums.push(state.goodslist[i].foods[j]);
                }
            }
           
            return [...new Set(nums.filter(obj => obj.num > 0))];
            
        },
        //返回选择的商品的数量
        /* Sum(state) {
            var sum = 0;
            var nums = [];
            for (let i = 0; i < state.list.length; i++) {
                for (let j = 0; j < state.list[i].foods.length; j++) {
                    nums.push(state.list[i].foods[j].num);
                }
            }
            var a = nums.filter(obj => obj > 0);
            for (let i = 0; i < a.length; i++) {
                sum += a[i]
            }
            return sum;
        } */
    }
})
