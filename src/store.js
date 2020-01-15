import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        wn8: 0,
        stats: [],
        showLoading: false,
        accountstats: [],
        nickname: '',
        avgtier: 0
    },
    mutations: 
    {
        avgtier(state, avgtier)
        {
            state.avgtier = avgtier;
        },
        setWn8(state, wn8)
        {
            state.wn8 = wn8;
        },
        setNickname(state, playernickname)
        {
            state.nickname = playernickname;
        },
        showLoading(state, isloading)
        {
            state.showLoading = isloading;
        },
        accountstats(state, stats)
        {
            state.accountstats = stats;
        }
    }
});
