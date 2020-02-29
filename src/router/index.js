import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes=[
    {
        path:'/',
        name:'Main',
        component:Main,
        children:[
            //商品
            {path:'/goods',name:'goods',component:()=>import('../views/Goods.vue')},
            //评价
            {path:'/evaluate',name:'evaluate',component:()=>import('../views/Evaluate.vue')},
            //商家
            {path:'/merchant',name:'merchant',component:()=>import('../views/Merchant.vue')},
            //购物车
            {path:'/Shopcar',name:'shopcar',component:()=>import('../views/Shopcar.vue')}
        ]

    },
]

const router =new VueRouter({
    routes
})

export default router