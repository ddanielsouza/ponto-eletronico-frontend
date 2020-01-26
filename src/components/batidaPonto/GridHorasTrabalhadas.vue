<template>
    <Table border :columns="columns" :data="dataSource" class="table-grid">
        <template slot-scope="{ row, index }" slot="horarios">
            <Tag v-for="(item, i) in dataSource[index].pontosBatidos" :key="i"> {{ item }} </Tag>
        </template>
    </Table>
</template>
<script>
import {mapState} from 'vuex'
import {format} from 'date-fns';

export default {
    data () {
        return {
            columns: [
                {
                    title: 'Data',
                    key: 'data'
                },
                {
                    title: 'Horários',
                    slot: 'horarios',
                },
                {
                    title: 'Horas Trabalhadas',
                    key: 'horaTrabalhadas'
                }
            ],
        }
    },
    computed:{
        ...mapState({
            horasTrabalhadas: state => state.batidaPonto.horasTrabalhadas
        }),
        dataSource(){
            return (this.horasTrabalhadas || []).map(ht => {
                return {
                    data: format(new Date(ht.data + '  00:00:00'), 'DD/MM/YYYY'),
                    pontosBatidos: ht.pontosBatidos.map(pb => format(pb, 'HH:mm:ss')),
                    horaTrabalhadas: ht.horaTrabalhadas
                }
            })
        }
    },
    methods: {
        editar(index){
            this.$emit('editar', this.dataSource[index]);
        }
    }
}
</script>
<style scoped>
.table-grid{
    min-width: 750px
}
</style>