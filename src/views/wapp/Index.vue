<template>
    <div>
        <row v-if="statusWApp === 2">
            <i-col :sm="10">
                <Card>
                    <img v-if="imgBase64" :src="imgBase64"/>
                    <p v-else>Carregando...</p>
                </Card>
            </i-col>
        </row>
        <row v-if="statusWApp === 0">
            <i-col :sm="24">
                <Alert type="warning">
                    WhatsApp
                    <template slot="desc">Verifique se seu aparelhos está conectdo a rede</template>
                </Alert>
            </i-col>
        </row>
        <row v-if="statusWApp === 1">
            <i-col :sm="24">
                <Alert type="success">
                    WhatsApp
                    <template slot="desc">Rodando sem problemas</template>
                </Alert>
            </i-col>
        </row>
    </div>
</template>

<script>
import {WAppAPI} from '../../lib/helpers/wappAPI'
import {mapState} from 'vuex'
export default {
    data(){
        return {
            imgBase64: null
        }
    },
    watch:{
        async statusWApp(newValue){
            if(newValue === 2){
                const wappAPI = new WAppAPI(this.$auth.token());
                const {data} = await wappAPI.login();
                this.imgBase64 = data.data
            }
        }
    },
    computed:{
        ...mapState({
            statusWApp: state => state.statusWApp
        })
    },
    async created(){
        if(this.statusWApp === 2){
            const wappAPI = new WAppAPI(this.$auth.token());
            const {data} = await wappAPI.login();
            this.imgBase64 = data.data
        }
    }
}
</script>