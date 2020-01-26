<template>
    <Table border :columns="columns" :data="dataSource" class="table-grid">
        <template slot-scope="{ row, index }" slot="action">
            <Button type="warning" size="small" style="margin-right: 5px" @click="editar(index)">Editar</Button>
        </template>
    </Table>
</template>
<script>
import {mapState} from 'vuex'
export default {
    data () {
        return {
            columns: [
                {
                    title: 'Name',
                    key: 'name'
                },
                {
                    title: 'E-mail',
                    key: 'email'
                },
                {
                    title: 'Privilégio',
                    key: 'privilegio'
                },
                {
                    title: 'Telefone',
                    key: 'telefone'
                },
                {
                    title: '',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
        }
    },
    computed:{
        ...mapState({
            users: state => state.users.users
        }),
        dataSource(){
            return (this.users || []).map(user => {
                return {
                    name: user.name,
                    email: user.email,
                    telefone: user.telefone,
                    privilegio: user.privilegio.descricao,
                    privilegio_id: user.privilegio_id,
                    id: user.id,
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