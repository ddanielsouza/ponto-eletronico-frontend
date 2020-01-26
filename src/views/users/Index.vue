<template>
    <div>
        <Menu mode="horizontal" >
            <MenuItem name="1" @click.native="showModalAddUser = true; edicao = false; user = {}">
                <Icon type="ios-add-circle" /> 
                Novo Usuário
            </MenuItem>
        </Menu>

        <br>
        <div style="overflow: auto">
            <grid-user @editar="openEdicao"/>
        </div>

        <Modal v-model="showModalAddUser" :mask-closable="false">
            <form-user v-model="user" @salvar="salvar"/>
            <p slot="footer"/>
        </Modal>
    </div>
</template>

<script>
import {mapActions} from 'vuex';
import GridUser from '../../components/users/GridUser'
import FormUser from '../../components/users/Form';

export default {
    data(){
        return {
            showModalAddUser: false,
            edicao: false,
            user: {}
        }
    },
    components: {
        GridUser,
        FormUser
    },
    methods:{
        ... mapActions(['getUsers', 'registerUser', 'updateUser']),
        async salvar(){
            try{
                this.$Spin.show();
                this.edicao ? await this.updateUser(this.user) : await this.registerUser(this.user);
                this.showModalAddUser = false;
                await this.getUsers();
            }finally{
                setTimeout(this.$Spin.hide, 500)
            }
        },
        openEdicao(user){
            this.showModalAddUser = true;
            this.edicao = true;
            this.user = user;
        }
    },
    async created(){
        try{
            this.$Spin.show();
            await this.getUsers();
        }finally{
            setTimeout(this.$Spin.hide, 500)
        }
    }
}
</script>