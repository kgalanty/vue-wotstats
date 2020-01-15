<template>
<div>
  <span v-show="loading">Loading stats...</span>
  <table v-show="!loading" v-if="accountid != ''" class="table table-dark table-striped">
    <tr id="tableheader">
      <th  class="sticky-top">Tank</th>
      <th class="sticky-top">Type</th>
      <th  class="sticky-top" @click="sortBy('tier')">Tier</th>
      <th class="sticky-top">Mastery</th>
      <th class="sticky-top">Max Frags</th>
      <th class="sticky-top" @click="sortBy('all.battles')">Battles</th>
      <th class="sticky-top">Avg Dmg</th>
      <th class="sticky-top">Win%</th>
      <th class="sticky-top" @click="sortBy('WN8')">WN8</th>
    </tr>
    
    <tankstats :wn8exp="wn8exp" :stats="stats"></tankstats>
    </table>
    </div>
</template>

<script>
import tankstats from './tankstats.vue'
import json from '../json/wn8exp.json'
import tankopedia from '../json/tankopedia.json'

function fetchFromObject(obj, prop) {

    if(typeof obj === 'undefined') {
        return false;
    }

    var _index = prop.indexOf('.')
    if(_index > -1) {
        return fetchFromObject(obj[prop.substring(0, _index)], prop.substr(_index + 1));
    }

    return obj[prop];
}
export default {

  name: 'stats',
  props: ['accountid'],
  components: {
    tankstats
  },
   data: function() {
    return {
      loading: false,
      sortKey: 'battles',
      reverse: false,
      wn8exp: json.data,
      stats: this.accountid != '' ? this.fetchstats() : '',
      accstats: '',
      battlespertier:new Array,
      avgtier: 0
    }
  },
  watch: { 
    accountid: function(newVal) {
      //console.log(newVal, this.accountid);
      if(newVal == '') return;
      this.fetchstats(newVal);
      
      },
        accstats: function(nv)
        {
          this.calculateAccWN8(nv);
        }
      },
  methods: {
  
    sortBy: function(sortKey) {
      this.reverse = (this.sortKey == sortKey) ? ! this.reverse : false;
      this.sortKey = sortKey;
      this.stats.sort((a,b)=> {
        
        if(fetchFromObject(a, this.sortKey) > fetchFromObject(b, this.sortKey))
          return this.reverse ? 1 : -1;
        else 
          return this.reverse ? -1 : 1; 
});
    },
    fetchstats: function()
  {
    this.$store.commit('showLoading', true);
    this.loading = true;
       fetch("https://api.worldoftanks.eu/wot/tanks/stats/?application_id=280bec59e88c20ab755c99d4326b478a&account_id="+this.accountid+'&fields=all,max_frags,tank_id,mark_of_mastery')
      .then(resp => resp.json())
      .then(resp => {
          this.stats= resp.data[this.accountid].filter(el => el.all.battles > 0);
          this.fetchAccountInfo();
          this.loading = false;
          this.$store.commit('showLoading', false);
          
          this.battlespertier[1]= 0;
          this.battlespertier[2]= 0
          this.battlespertier[3]= 0
          this.battlespertier[4]= 0
          this.battlespertier[5]= 0
          this.battlespertier[6]= 0
          this.battlespertier[7]= 0
          this.battlespertier[8]= 0
          this.battlespertier[9]= 0
          this.battlespertier[10]= 0
          this.stats.map((x,index) => {
            this.stats[index].tier = tankopedia.data[x.tank_id].tier;
            this.battlespertier[this.stats[index].tier]+=x.all.battles;
          });
          
          return this.stats;
        });
  },
  fetchAccountInfo: function(){
    fetch("https://api.worldoftanks.eu/wot/account/info/?application_id=280bec59e88c20ab755c99d4326b478a&account_id="+this.accountid+'&fields=statistics.all')
    .then(resp => resp.json())
      .then(resp => {
        
        this.accstats = resp.data[this.accountid].statistics.all;

          var sum = 0;
          this.battlespertier.map((v,k)=> 
          {
            sum+=v*k;
          });
          this.avgtier = (sum/this.accstats.battles).toFixed(2);
        this.$store.commit('avgtier', this.avgtier);
        this.$store.commit('accountstats', resp.data[this.accountid].statistics.all);
      });
  },
      findByTankID(tankid)
    {
      var found = this.wn8exp.find(function(element) { 
         if(element.IDNum === tankid)
        {
          return element;
        }
      }); 
      return found;
    },
  calculateAccWN8: function()
  {
    /* eslint-disable no-unused-vars */
  const summary = this.accstats;
    let expDAMAGE = 0,
      expFRAGS = 0,
      expSPOT = 0,
      expDEF = 0,
      expWIN = 0;
      // console.log(this.stats)
    this.stats.forEach(v => {
      var expected = this.findByTankID(v.tank_id);
     
      expDAMAGE += expected.expDamage * v.all.battles;
      expSPOT += expected.expSpot * v.all.battles;
      expFRAGS += expected.expFrag * v.all.battles;
      expDEF += expected.expDef * v.all.battles;
      expWIN += 0.01 * expected.expWinRate * v.all.battles;

    });
    var rDAMAGE = summary.damage_dealt / expDAMAGE;
    var rSPOT = summary.spotted / expSPOT;
    var rFRAG = summary.frags / expFRAGS;
    var rDEF = summary.dropped_capture_points / expDEF;
    var rWIN = summary.wins / expWIN;
    var rWINc = Math.max(0, (rWIN - 0.71) / (1 - 0.71));
    var rDAMAGEc = Math.max(0, (rDAMAGE - 0.22) / (1 - 0.22));
    var rFRAGc = Math.max(0, Math.min(rDAMAGEc + 0.2, (rFRAG - 0.12) / (1 - 0.12)));
     var rSPOTc = Math.max(0, Math.min(rDAMAGEc + 0.1, (rSPOT - 0.38) / (1 - 0.38)));
    var rDEFc = Math.max(0, Math.min(rDAMAGEc + 0.1, (rDEF - 0.10) / (1 - 0.10)));
   const wn8 = 980 * rDAMAGEc + 210 * rDAMAGEc * rFRAGc + 155 * rFRAGc * rSPOTc + 75 * rDEFc * rFRAGc + 145 * Math.min(1.8, rWINc);
//console.log(wn8);
this.$store.commit('setWn8', Math.round(wn8*100)/100);

  }
  /* eslint-enable no-unused-vars */

},
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#tableheader th
{
   color: #fff;
    background-color: #343a40;

}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

</style>