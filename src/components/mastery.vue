<template>
<div class="masteryOuter"><div :class="masteryRank" class="mastery_icon"></div></div>
</template>

<script>
export default {
  name: 'mastery',
  props: ['mark'],

computed:
{
 masteryRank()
 {
   if (this.mark == 4)
   {
     return {mastery_ace : true }
   }
   else if (this.mark == 3)
   {
     return {mastery_first : true }
   }
   else if (this.mark == 2)
   {
     return {mastery_sec : true }
   }
   else if (this.mark == 1)
   {
     return {mastery_third : true }
   }
   return { }
 }
}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.masteryOuter
{
  display:flex;
  align-items: center;
    -ms-flex-pack: center;
    justify-content: center;
}
.mastery_icon
{
  width: 30px;
    height: 30px;
    background-size: 100% 100%;
}
.mastery_ace
{
  background-image: url(https://eu-wotp.wgcdn.co/static/5.47.2_ef5947/wotp_static/img/core/frontend/scss/common/components/icons/img/rank_m.png);
}
.mastery_first
{
background-image: url(https://eu-wotp.wgcdn.co/static/5.47.2_ef5947/wotp_static/img/core/frontend/scss/common/components/icons/img/rank_01.png);
}
.mastery_sec
{
background-image: url(https://eu-wotp.wgcdn.co/static/5.47.2_ef5947/wotp_static/img/core/frontend/scss/common/components/icons/img/rank_02.png);
}
.mastery_third
{
background-image: url(https://eu-wotp.wgcdn.co/static/5.47.2_ef5947/wotp_static/img/core/frontend/scss/common/components/icons/img/rank_03.png);
}
</style>