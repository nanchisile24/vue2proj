<template>
  <div>
    <!-- <keep-alive> -->
      <router-view></router-view>
    <!-- </keep-alive> -->
    <van-tabbar v-model="active">
      <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/category" icon="search">分类</van-tabbar-item>
      <van-tabbar-item to="/cart" icon="cart-o">购物车</van-tabbar-item>
      <van-tabbar-item to="/user" icon="smile-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data () {
    return {
      active: ''
    }
  },
  created () {
    this.refresh()
  },
  watch: {
    $route: function () {
      this.refresh()
    }
  },
  methods: {
    refresh () {
      const tabbarActive = window.location.hash
      if (tabbarActive.includes('#/home')) {
        this.active = 0
      } else if (tabbarActive.includes('#/category')) {
        this.active = 1
      } else if (tabbarActive.includes('#/cart')) {
        this.active = 2
      } else if (tabbarActive.includes('#/user')) {
        this.active = 3
      }
    }
  }

}
</script>

<style lang="less" scoped>
  ::v-deep .van-tabbar-item--active {
    color:white;
    background-color: #CF9EAC;
    border-radius: 40px;
    transition: all 1s;
  }

</style>
