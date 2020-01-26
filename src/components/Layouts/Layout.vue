<template>
    <div class="layout" style="overflow: auto">
        <Layout style="min-height: 100%">
            <Sider  ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
                <menu-options :isCollapsed="isCollapsed"/>
            </Sider>
            <Layout>
                <Header :style="{padding: 0}" class="layout-header-bar">
                    <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
                    <Icon @click.native="$auth.logout()" class="exit" type="ios-exit" :style="{margin: '0 20px'}"/> 
                </Header> 
                <Content :style="{margin: '20px', minHeight: '260px'}">
                   <slot></slot>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    import MenuOptions from './MenuOptions'
    export default {
        data () {
            return {
                isCollapsed: false
            }
        }, 
        components:{
            MenuOptions
        },
        computed: {
            rotateIcon () {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },
        },
        methods: {
            collapsedSider () {
                this.$refs.side1.toggleCollapse();
            }
        }
    }
</script>

<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: absolute;
        border-radius: 4px;
        overflow: hidden;
        width: 100%;
        height: 100%;
    } 
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    .menu-icon{
        transition: all .3s;
    }
    .rotate-icon{
        transform: rotate(-90deg);
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
        cursor: pointer;
    }

    .exit{
        color: #ed4014;
        font-size: 24px;
        cursor: pointer;
        float: right;
        margin: 20px!important
    }
</style>