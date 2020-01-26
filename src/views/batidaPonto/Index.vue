<template>
    <div>
        <row :gutter="20" style="text-align: center; font-weight: bolder">
            <i-col :sm="8">
                <Card class="card-batida-remoto">
                    <p>{{ totalHorasTrabalhadas }}</p>
                    <p>Horas Trabalhadas</p>
                </Card>
            </i-col>
            <i-col :sm="8">
                <Card class="card-batida-remoto">
                    <p>{{ diaSemana }}</p>
                    <p style="color: #2db7f5">{{ descricaoData }}</p>
                </Card>
            </i-col>
            <i-col :sm="8">
                <Card class="card-batida-remoto">
                    <Tooltip placement="right" width="400">
                        <p>{{ hora }}</p>
                        <Button type="success" @click="registrar">Registrar</Button>
                        <div slot="content">
                            O horário considerado para <br>
                            registrar o ponto será o do <br>
                            servidor, por isso poderá <br>
                            ter divergência  com o <br>
                            horário da sua máquina após<br>
                            salvar
                        </div>
                    </Tooltip>
                </Card>
                    
            </i-col>
        </row>

        <br>
        <row :gutter="20">
            <i-col :sm="24">
                <Card>
                    <filtro-data-hora-trabalhadas 
                        v-model="filtro"  
                        @filtrar="filtrar"/>
                </Card>
            </i-col>
        </row>
        
        <br>
        <grid-horas-trabalhadas/>
    </div>
</template>

<script>
import {format} from 'date-fns';
import {mapActions, mapState} from 'vuex';
import FiltroDataHoraTrabalhadas from '../../components/batidaPonto/FiltroDataHoraTrabalhadas'
import GridHorasTrabalhadas from '../../components/batidaPonto/GridHorasTrabalhadas'
import {WAppAPI} from '../../lib/helpers/wappAPI'
export default {
    data(){
        return{
            hora: '00:00:00',
            filtro: {
                dataInicio: new Date(format(new Date(), 'YYYY-MM-01 00:00:00')),
                dataFim: new Date(format(new Date(), 'YYYY-MM-DD 00:00:00'))
            }
        }
    },
    components:{
        GridHorasTrabalhadas,
        FiltroDataHoraTrabalhadas
    },
    computed:{
        ...mapState({
            horasTrabalhadas: state => state.batidaPonto.horasTrabalhadas,
            statusWApp: state => state.statusWApp
        }),
        totalHorasTrabalhadas(){
            const total = this.horasTrabalhadas.reduce((t, item)=>t+=item.totalSeconds, 0)
            var dias, horas, minutos, segundos;
            segundos = total;
            minutos = Math.floor(segundos / 60);
            segundos = segundos % 60;
            horas = Math.floor(minutos / 60);
            minutos = minutos % 60;
            dias = Math.floor(horas / 24);
            horas = horas % 24;
            horas += dias * 24;
            return (
                 `00${horas}`.slice(-2) + ':'
                +`00${minutos}`.slice(-2) + ':'
                +`00${segundos}`.slice(-2)
            );
        },
        diaSemana(){
            const diasSemana = [
                'Domingo',
                'Segunda',
                'Terça',
                'Quarta',
                'Quinta',
                'Sexta',
                'Sábado',
            ]

            return diasSemana[format(new Date(), 'd')]
        },
        descricaoData(){
            const months = [
                'Janeiro',
                'Fevereiro',
                'Março',
                'Abril',
                'Maio',
                'Junho',
                'Julho',
                'Agosto',
                'Setembro',
                'Dezembro'
            ];
            const currentDate = new Date();
            const day = currentDate.getDate();
            const month = currentDate.getMonth();
            const year  = currentDate.getFullYear();
            
            return `${('00' + day).slice(-2)} de ${months[month]} de ${year}`;
        }
    },
    methods:{
        ...mapActions(['registrarPonto', 'buscarHorasTrabalhadas']),
        registrar(){
            const registrarPonto = this.registrarPonto;
            const filtrar = this.filtrar;
            const telefone = this.$auth.user().telefone;
            const wappApi = new WAppAPI(this.$auth.token());
            let statusWApp = this.statusWApp;
            this.$Modal.confirm({
                title: 'Ponto Remoto',
                content: 'Essa ação não poderá ser revertida',
                async onOk(){
                    try{
                        this.$Spin.show();
                        await registrarPonto();    
                        if(statusWApp == 1){
                            let param = {msg: 'Ponto Registrado!', tel:telefone} ;                        
                            wappApi.enviarMensagem(param);
                        }                    

                        await filtrar();
                    }finally{
                        setTimeout(this.$Spin.hide, 500)
                    }
                }
            });
        },
        async filtrar(){
            try{
                this.$Spin.show();
                this.filtro.dataFim = new Date(format(this.filtro.dataFim, 'YYYY-MM-DD 23:59:59'));
                this.filtro.dataInicio = new Date(format(this.filtro.dataInicio, 'YYYY-MM-DD 00:00:00'));
                await this.buscarHorasTrabalhadas(this.filtro);
            }finally{
                setTimeout(this.$Spin.hide, 500)
            }
        }
    },
    async created(){
        const loop = true;
        this.filtrar();
        while(loop){
            this.hora = format(new Date(), 'HH:mm:ss');
            await new Promise(r=>setTimeout(r, 1000));
        }
    }
}
</script>

<style scoped>
.card-batida-remoto{
    min-height: 90px;
    font-size: 190%;
}
</style>