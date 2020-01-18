<template>
<div v-if="tank">
   <span class="indicatordesc">Tank with {{ desc }}</span>
   <img :src="tank.images.big_icon">
  <span class="indicatordesc">{{ tank.name }}</span>
</div>
</template>

<script>
export default {
  name: 'tankhalloffame',
  props: ['tank', 'desc'],

computed:
{
 
}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.indicatordesc
{
  font-size:14px;
  display:block;
}
</style>