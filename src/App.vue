<template>

  <div id="app">
    <topbar @updateaccountid="updateaccountid"></topbar>
    <generalStats v-show="!this.$store.state.showLoading && this.$store.state.wn8"></generalStats>
    <stats :accountid="accountid"></stats>
    
  </div>
</template>

<script>
import stats from './components/stats.vue'
import topbar from './components/topbar.vue'
import generalStats from './components/generalstats.vue'
export default {
  name: 'app',
  components: {
    topbar, stats,generalStats
  },
  methods: {
   updateaccountid: function(id){
     this.accountid = id;
   }
  },
   data() {
      return {
        accountid: ''
      }
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
