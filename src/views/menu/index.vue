<template>
  <div>
    <ky-menu style="padding-left: 60px;margin-bottom: 10px;" theme="dark" :default-active="activeIndex" class="el-menu-demo"
             mode="horizontal">
      <ky-menu-item index="1" @click="goView('/project')">
        我的项目
      </ky-menu-item>
      <ky-menu-item index="2" @click="goView('/document')">
        <i class="el-icon-documen"></i>文档
      </ky-menu-item>
      <!--<ky-menu-item index="4" @click="goView('/auditProject')">审核</ky-menu-item>-->
    </ky-menu>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1'
      };
    },
    methods: {
      goView: function (path) {
        this.$router.replace({path: path})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .ky-menu--dark{
    background-color:#4285F4;
  }
  .ky-menu--dark .ky-menu-item, .ky-menu--dark .ky-submenu__title{
    color: white;
  }
  .ky-menu--horizontal.ky-menu--dark .ky-menu-item:hover, .ky-menu--horizontal.ky-menu--dark .ky-submenu__title:hover{
    background-color:#4285F4;
    color: black;
  }
  .nav-sub {
    background-color: #e0e0e0;
    height: 60px;
    margin: 0 auto;
    width: 100%;
    &
    __btn {
      width: 90%;
    }
  }
  .menu_nav{
    height: 50px;
    margin-top: 50px;
    background-color: #f9fafc;
    line-height: 50px;
  }
</style>
