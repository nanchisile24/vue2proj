<template>
  <div>
    <div class="topnav">
      <van-nav-bar title="主页"/>
      <van-search v-model="value" placeholder="请输入搜索关键词" @click="$router.push('/search')"/>
    </div>
      <van-swipe class="my-swipe" :autoplay="2500" indicator-color="white">
        <van-swipe-item v-for="item in bannerList" :key="item.imgUrl">
          <img :src="item.imgUrl"/>
        </van-swipe-item>
      </van-swipe>
      <van-grid :column-num="5" icon-size="40">
        <van-grid-item
          v-for="item in navList" :key="item.imgUrl"
          :icon="item.imgUrl"
          text="新品首发"
          @click="$router.push('/category')"
        />
      </van-grid>
    <!-- 登录提示悬浮窗 -->
      <div class="logintoast" v-if="!this.$store.getters.token">
        <span>
          您还没有登录哦
        </span>
        <div class="loginBtn" @click="goLogin">
          立即登录
        </div>
      </div>
    <div class="guess">
      <p style="text-align: center;">—— 猜你喜欢 ——</p>

      <div class="goods-list">
        <GoodsItem v-for="item in proList" :key="item.goods_id" :item="item"></GoodsItem>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsItem from '@/components/GoodsItem.vue'
import { getHomeData } from '@/api/home'
export default {
  name: 'HomePage',
  components: {
    GoodsItem
  },
  data () {
    return {
      bannerList: [],
      navList: [],
      proList: []
    }
  },
  async created () {
    const { data: { pageData } } = await getHomeData()
    this.bannerList = pageData.items[1].data
    this.navList = pageData.items[3].data
    this.proList = pageData.items[6].data
  },
  methods: {
    goLogin () {
      this.$router.push({
        path: '/login',
        query: {
          backUrl: this.$route.fullPath
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .topnav {
    background-image: linear-gradient(120deg, #fccb90 0%, #d57eeb 100%);
    position: sticky;
    top: 0px; left: 0px;
    z-index: 2;
    display: flex;
    flex-direction: column;
    font-size: 0px;
    .van-nav-bar {
      background: transparent;
    }
    ::v-deep .van-hairline--bottom::after{
    border:none
    }
    ::v-deep .van-ellipsis {
      color: #ffffff;
      font-size: 20px;
    }
    .van-search {
      background: transparent;
    }
  }
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 0px;
    text-align: center;
    background-color: #39a9ed;
    img {
      width: auto;
      height: 210px;
      overflow: hidden;
    }
  }
  .logintoast {
    position: fixed;
    bottom:50px; left: 0px;
    width: 100%;
    height: 38px;
    background-color: black;
    opacity: 0.8;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 15px;
    span {
      color: white;
    }
    .loginBtn{
      color:black;
      width:90px;
      height: 26px;
      background-color: #E2B659;
      line-height: 26px;
      text-align: center;
      cursor: pointer;
    }
  }
</style>
