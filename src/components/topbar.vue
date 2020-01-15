<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark ">
        <a class="navbar-brand">WoT Stats</a>
        <!-- <input type="text" placeholder="From (Restaurant)" name="restaurant" class="form-control col-2"> -->
        <input type="text" v-model="nickname" name="nick" placeholder="Nickname" class="form-control col-6 col-4 ">
        <button type="button" class="btn btn-success" @click="searchNickname">Search</button>
    </nav>
</template>

<script>
export default {
  name: 'topbar',
  props: {},
  methods:
  {
    handleResponse: function(resp)
    {
      if(resp.status == 'ok')
      {
        if(resp.meta.count ===1) {
            this.stats = resp;
            this.accountid = resp.data[0].account_id;
            this.emitEventChanged();
            this.$store.commit('setNickname', resp.data[0].nickname)
        }
     
      }
    },
    emitEventChanged () {
      this.$emit('updateaccountid', this.accountid);
    },
    searchNickname: function()
    {
      fetch('https://api.worldoftanks.eu/wot/account/list/?application_id=280bec59e88c20ab755c99d4326b478a&search='+this.nickname+'&type=exact')
      .then(resp => resp.json())
      .then(resp => {
          
          this.handleResponse(resp);
        });
    },

  },
  data: function() 
  {
    return { 
      nickname: '',
      stats: {},
      accountid: ''
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
