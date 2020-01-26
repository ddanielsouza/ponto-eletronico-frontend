<template>
  <Menu
    :active-name="this.$router.currentRoute.name"
    theme="dark"
    width="auto"
    :class="menuitemClasses"
  >
    <MenuItem name="home" to="/" v-if="check('home')">
      <Icon type="ios-home" />
      <span>Home</span>
    </MenuItem>
    <MenuItem name="indexBatidaPonto" to="/batida-ponto" v-if="check('indexBatidaPonto')">
      <Icon type="md-alarm" />
      <span>Frequência</span>
    </MenuItem>
    <MenuItem name="indexWApp" to="/wapp" v-if="check('indexWApp')">
      <Icon type="logo-whatsapp" />
      <span>WhatsApp</span>
    </MenuItem>
    <MenuItem name="indexUsuarios" to="/usuarios" v-if="check('indexUsuarios')">
      <Icon type="ios-people" />
      <span>Usuarios</span>
    </MenuItem>
    
  </Menu>
</template>

<script>
export default {
  props: ["isCollapsed"],
  computed: {
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    }
  },
  methods: {
    check(name) {
      const route = this.$router.options.routes.find(
        r => r.name.trim() === name.trim()
      );

      if (
        typeof route.meta.auth === "boolean" ||
        typeof route.meta.auth === "undefined"
      ) {
        return !route.meta.auth || this.$auth.check();
      } else {
        return this.$auth.check(route.meta.auth);
      }
    }
  }
};
</script>

<style scoped>
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 90px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
</style>