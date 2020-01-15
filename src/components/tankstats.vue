<template>
<tbody>
   <tr v-for="(stat,index) in stats" :key="index"> 
   <td class="tankicon" :style="{ backgroundImage: 'url('+getTankIcon(stat.tank_id)+')' }">
     <tank :tankdetails="getTankDetails(stat.tank_id)"></tank>
     </td>
     <td>
       <tanktype :type="getTanktype(stat.tank_id)"></tanktype>
     </td>
   <td>{{getTier(stat.tank_id) }}</td>
   <td><mastery :mark="stat.mark_of_mastery"></mastery></td>
   <td>{{ stat.max_frags }}</td>
   <td>{{ stat.all.battles }}</td>
   <td>{{ avgdmg(stat.all.damage_dealt, stat.all.battles) }}</td>
    <td>{{ winratio(stat.all.wins, stat.all.battles) }} %</td>
    <td class="wn8cell" :style="{ backgroundImage: 'linear-gradient(to right, '+getBgColor(index) +' 0%, rgba(0, 0, 0, 0) 73%)'}">
      {{ getWN8(index) }}</td>
     </tr>
   </tbody>
</template>

<script>
import mastery from './mastery.vue'
import tank from './tank.vue'
import tanktype from './tanktype.vue'
import tankopedia from '../json/tankopedia.json'
export default {
  name: 'tankstats',
  props: ['stats', 'wn8exp'],
  components: {
    mastery,tank,tanktype
  },
  data: function() {
    return {
      wnavg: []
  }
  },

  methods:
  {
    getTanktype(tank_id)
    {
        return this.getTankDetails(tank_id).type;
    },
    getWN8(i)
    {
      //if (this.wnavg.length < this.stats.length) this.wnavg.push(this.stats[i].WN8);
      return this.stats[i].WN8;
    },
    getTier(tankid)
    {
      const tankdetails = this.getTankDetails(tankid);
      if(typeof tankdetails != 'undefined')
      {
        
        return tankdetails.tier;
      }
      console.log(tankdetails);
      return '';
    },
    getTankIcon(tankid)
    {
      const tankdetails = this.getTankDetails(tankid);
      if(typeof tankdetails != 'undefined')
      {
        return tankdetails.images.small_icon;
      }
      return '';
    },
    getTankDetails(tankid)
    {
      try{
        if(typeof tankopedia.data[tankid] != 'undefined')
        {
        return tankopedia.data[tankid];
        }
        console.log(tankopedia.data, tankid);
      }
      catch(e)
      {
        console.log(e);  
      }
      
    },
    getBgColor(i)
    {
      this.stats[i].WN8 = this.calculateWN8(this.stats[i].tank_id, this.stats[i].all);
      return this.setBGcolor(this.stats[i].WN8);
    },
    setBGcolor(WN8)
    {
      var color  = 'rgb(0, 0, 0)';
      
    if (WN8 >= 300 && WN8 < 600) {
      color  = 'rgb(205, 51, 51)';
    } else if (WN8 >= 600 && WN8 < 900) {
      color  = 'rgb(215, 121, 0)';
    } else if (WN8 >= 900 && WN8 < 1250) {
      color  = 'rgb(215, 182, 0)';
    } else if (WN8 >= 1250 && WN8 < 1600) {
      color  = 'rgb(109, 149, 33)';
    } else if (WN8 >= 1600 && WN8 < 1900) {
      color  = 'rgb(76, 118, 46)';
    }else if (WN8 >= 1900 && WN8 < 2350) {
      color  = 'rgb(74, 146, 183)';
    } else if (WN8 >= 2350 && WN8 < 2900) {
      color  = 'rgb(131, 87, 157)';
    } else if (WN8 >= 2900 ) {
      color  = 'rgb(90, 49, 117)';
    }
      return color;
    },
    calculateWN8(tankid, tankstats)
    {
      const expStats = this.findByTankID(tankid);
      var rFrag = parseFloat((tankstats.frags/tankstats.battles)/expStats.expFrag);
      var rDef = parseFloat(tankstats.dropped_capture_points/tankstats.battles/expStats.expDef);
      var rSpot = parseFloat(tankstats.spotted/tankstats.battles/expStats.expSpot);
      var rDmg = parseFloat(tankstats.damage_dealt/tankstats.battles/expStats.expDamage);
      var rWinrate = parseFloat((tankstats.wins/tankstats.battles*100)/expStats.expWinRate);

      var dmgF = Math.max(0,(rDmg - 0.22) / (1 - 0.22) );
      var fragFactor = Math.max(0,Math.min(dmgF + 0.2,(rFrag - 0.12)/(1 - 0.12)));
      var defFactor = Math.max(0, Math.min(dmgF + 0.1, (rDef- 0.10) / (1 - 0.10)));
      var spotFactor = Math.max(0, Math.min(dmgF + 0.1, (rSpot- 0.38) / (1 - 0.38)));
      var winFactor = Math.max(0,(rWinrate - 0.71) / (1 - 0.71) );
      var WN8 = 980*dmgF + 210*dmgF*fragFactor + 155*fragFactor*spotFactor + 75*defFactor*fragFactor + 145*Math.min(1.8,winFactor);
      WN8 = parseFloat(WN8.toFixed(2));
      return WN8;
    },
    // setbg()
    // {
    //   this.stats.map(t => {
    //   var wn8 = parseFloat(this.calculateWN8(t.tank_id, t.all));
    //   t.WN8=wn8;
    //   t.bg = this.setBGcolor(wn8);
    // });
    // },
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
    avgdmg: function(dmg, battles)
    {
      return (dmg/battles).toFixed(2);
    },
    winratio: function(wins,battles)
    {
      return (wins/battles * 100).toFixed(2);
    }
  },

  created: function()
  {
   
    
  }
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table td
{
  padding:.5rem .5rem;
}
.tankicon
{
  background-position:0%;
  background-repeat: no-repeat
}
td.wn8cell
{
  font-weight:bold;
}
</style>