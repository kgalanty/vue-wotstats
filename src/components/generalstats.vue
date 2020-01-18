<template>
<div>
  <div style="">{{ this.$store.state.accountstats }}</div>
  <div class="container-fluid">
  <div class="row">
    <div class="wn8badge col-12 col-sm-4" :style="{backgroundColor: wn8color}">{{ this.$store.state.wn8 }}</div>
    <div class="nick col-12 col-sm-8">{{ this.$store.state.nickname }}</div>
    </div>

  </div>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm">
        <span class="indicator">{{ this.$store.state.accountstats.battles }}</span>
        <span class="indicatordesc" >Total Battles</span>
      </div>
      <div class="col-sm">
        <span class="indicator">{{ wins }}</span>
        <span class="indicatordesc">Battles won</span>
      </div>
      <div class="col-sm">
        <span class="indicator">{{ survived }}</span>
        <span class="indicatordesc">Survived Battles</span>
      </div>
       <div class="col-sm">
        <span class="indicator">{{ this.$store.state.avgtier }}</span>
        <span class="indicatordesc">Average Tier</span>
      </div>
    </div>
    <div class="row">
           <!-- <div class="col-sm">
        <span class="indicator">{{ this.$store.state.accountstats.max_frags }}</span>
      </div> -->
       <div class="col-sm">
        <span class="indicator">{{ this.$store.state.accountstats.hits_percents }} %</span>
        <span class="indicatordesc" >Hits</span>
      </div>
      <div class="col-sm">
          <span class="indicator">{{ avgexp }}</span>
          <span class="indicatordesc">Average exp</span>
        </div>
        <div class="col-sm">
          <span class="indicator">{{ avgfrags }}</span>
          <span class="indicatordesc">Average frags</span>
        </div>
        <div class="col-sm">
          <span class="indicator">{{ avgdamage_dealt }}</span>
          <span class="indicatordesc">Average damage dealt</span>
        </div>
      </div>
      </div>
       <div class="container-fluid">
        <div class="row">
              <tankhalloffame class="col-sm" :tank="max_xp" desc="max XP"></tankhalloffame>
              <tankhalloffame class="col-sm" :tank="max_dmg" desc="max damage"></tankhalloffame>
              <tankhalloffame class="col-sm" :tank="max_frags" desc="max frags"></tankhalloffame>
            
         </div>
      </div>
  </div>
</template>

<script>
import tankopedia from '../json/tankopedia.json'
import tankhalloffame from './tankhalloffame.vue'
export default {
  name: 'generalstats',
  props: [''],
  components: {
    tankhalloffame
  },
data: function() {
		return {
  
      
    } 
  },
computed:
{

  max_xp(){ 
    return tankopedia.data[this.$store.state.accountstats.max_xp_tank_id] 
    },
 max_dmg(){ 
    return tankopedia.data[this.$store.state.accountstats.max_damage_tank_id] 
    },
     max_frags(){ 
    return tankopedia.data[this.$store.state.accountstats.max_frags_tank_id] 
    },
  max_xp_tank_id()
  {
    return tankopedia.data[this.$store.state.accountstats.max_xp_tank_id];
  },
  max_frags_tank_id()
  {
    return tankopedia.data[this.$store.state.accountstats.max_frags_tank_id];
  },
  wins()
  {
    return ((this.$store.state.accountstats.wins/ this.$store.state.accountstats.battles)*100).toFixed(2)+' %'
  },
  survived(){
    return ((this.$store.state.accountstats.survived_battles/ this.$store.state.accountstats.battles)*100).toFixed(2)+' %'
  },
  avgexp()
  {
 return this.$store.state.accountstats.battle_avg_xp
  },
  avgfrags()
  {
    return (this.$store.state.accountstats.frags/this.$store.state.accountstats.battles).toFixed(2)
  },
  avgdamage_dealt()
  {
    return (this.$store.state.accountstats.damage_dealt/this.$store.state.accountstats.battles).toFixed(2)
  },
   wn8color()
    {
      var color  = 'rgb(0, 0, 0)';
      
    if (this.$store.state.wn8 >= 300 && this.$store.state.wn8 < 600) {
      color  = 'rgb(205, 51, 51)';
    } else if (this.$store.state.wn8 >= 600 && this.$store.state.wn8 < 900) {
      color  = 'rgb(215, 121, 0)';
    } else if (this.$store.state.wn8 >= 900 && this.$store.state.wn8 < 1250) {
      color  = 'rgb(215, 182, 0)';
    } else if (this.$store.state.wn8 >= 1250 && this.$store.state.wn8 < 1600) {
      color  = 'rgb(109, 149, 33)';
    } else if (this.$store.state.wn8 >= 1600 && this.$store.state.wn8 < 1900) {
      color  = 'rgb(76, 118, 46)';
    }else if (this.$store.state.wn8 >= 1900 && this.$store.state.wn8 < 2350) {
      color  = 'rgb(74, 146, 183)';
    } else if (this.$store.state.wn8 >= 2350 && this.$store.state.wn8 < 2900) {
      color  = 'rgb(131, 87, 157)';
    } else if (this.$store.state.wn8 >= 2900 ) {
      color  = 'rgb(90, 49, 117)';
    }
      return color;
    },
}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.indicatordesc
{
  font-size:14px;
  display:block;
}
.indicator
{
  font-size:28px;
  display:block;
}
.nick
{
  font-size:28px;
  text-align:left;
}
.wn8badge
{
  float: left;
    width: 20%;
    font-size: 28px;
    color: white; 
}
</style>