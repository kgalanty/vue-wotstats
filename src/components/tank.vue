<template>
<div>
<div style="float:right" :class="isPremium">{{tankdetails.name}}</div>
</div>
</template>

<script>

export default {
  name: 'tank',
  props: ['tankdetails'],
methods:
{
  getClass: function(type)
  {
    switch(type)
    {
      case 'heavyTank':
        return { 'ht': true, 'tanktypeicon' :true}
      case 'mediumTank':
        return { 'mt': true, 'tanktypeicon' :true} 
      case 'SPG':
        return {'spg': true, 'tanktypeicon' :true}
      case 'AT-SPG':
        return {'td': true, 'tanktypeicon' :true}
      case 'lightTank':
        return {'lt': true, 'tanktypeicon' :true}
    }
  }
},
computed:
{
 isPremium()
 {
   return { isPremium: this.tankdetails.is_premium} ;
   
  // bg()
  // {
  //   return this.tankdet.images.small_icon 
  // },
  // tankdet() { return this.tankdetails; }
}

}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tanktypeicon {
   width: 15px;
height: 18px;
float:left;
}
.ht
{
background: url(data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTUgMTgiIHdpZHRoPSIxNSIgaGVpZ2h0PSIxOCI+PHN0eWxlPi5zdDB7ZmlsbDojZGZkOWI3fTwvc3R5bGU+PGcgaWQ9IlhNTElEXzFfIj48cGF0aCBpZD0iWE1MSURfOV8iIGNsYXNzPSJzdDAiIGQ9Ik0xMy4yIDYuOGwtNy41IDkuMUw3LjUgMTggMTUgOXoiLz48cGF0aCBpZD0iWE1MSURfMTBfIiBjbGFzcz0ic3QwIiBkPSJNMTAuMyAzLjRsLTcuNCA5LjEgMS44IDIuMSA3LjQtOXoiLz48cGF0aCBpZD0iWE1MSURfMTFfIiBjbGFzcz0ic3QwIiBkPSJNNy41IDBMMCA5bDEuOSAyLjIgNy40LTl6Ii8+PC9nPjwvc3ZnPg==) no-repeat 50% 50%;
}
.mt
{
      background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAxMiAxNSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgNy41TDkuNyA0LjdsLTYgNy41TDYgMTV6TTYgMEwwIDcuNWwyLjMgMi44IDYtNy41eiIgZmlsbD0iI0RGRDlCNyIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+) no-repeat 50% 50%;
}
.td
{
background:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMiAxMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCAwbDYgMTAgNi0xMHoiIGZpbGw9IiNERkQ5QjciIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==) no-repeat 50% 50%;
}
.spg
{
background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOCIgaGVpZ2h0PSI4IiB2aWV3Qm94PSIwIDAgOCA4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0wIDBoOHY4SDB6IiBmaWxsPSIjREZEOUI3IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=) no-repeat 50% 50%;

}
.lt
{
background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEiIGhlaWdodD0iMTMiIHZpZXdCb3g9IjAgMCAxMSAxMyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNS41IDBMMCA2LjUgNS41IDEzIDExIDYuNXoiIGZpbGw9IiNERkQ5QjciIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==) no-repeat 50% 50%;
}
div{
   float:right;
}
.isPremium
{
  color: gold;
  font-weight:bold;
}
</style>