<template>
  <div id="app" style="min-width: 100%; min-height: 100%">
    <router-view v-if="!$auth.check()"/>
    <layout v-else>
       <router-view/>
    </layout>
  </div>
</template>

<script>
import Layout from './components/Layouts/Layout'
import {mapMutations} from 'vuex'

export default {
  components:{
    Layout
  },
  watch:{
    async check(newValue){
      if(newValue){
        await this.$connect()
      }
      else{
        this.$disconnect()
      }
    }
  },
  computed:{
    check(){
      return this.$auth.check();
    } 
  },
  methods:{
    ...mapMutations(['CHANGE_STATUS_WAPP']),
  },
  created(){
    this.$options.sockets.onmessage = (data) => {
      const resp = JSON.parse(data.data);
      switch(resp.method){
        case 'status-wapp': 
          this.CHANGE_STATUS_WAPP(resp.data)
          break;
      }
    }
  }
}
</script>

<style scoped>
#app {
  margin: 0;
  padding: 0;
  background-color: #F8F8F8
}
</style>

