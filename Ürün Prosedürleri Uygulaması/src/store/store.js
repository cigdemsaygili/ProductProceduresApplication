import Vue from "vue";
import Vuex from "vuex"

Vue.use(Vuex);
export const store = new Vuex.Store({
    state:{
        productInfo:{
            name:null,
            price:null,
            count:null,
            description:null
        },
        buying:0,
        sales:0,
        balance:0
    },
    getters:{
        getName(state){
            return state.buying
        },
        getValue(state){
            return state.productInfo.price;
        },
    },
    mutations:{
        setValue(state,payload){
            state.price = payload;
        }
    },
    actions:{
        setValueData({commit},payload){
            commit("setValue",payload)
        }
    }
})