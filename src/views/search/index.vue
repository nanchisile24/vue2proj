<template>
  <div class="search">
    <div class="searchHead">
      <van-nav-bar title="商品搜索" left-arrow @click-left="$router.go(-1)"/>
      <van-search v-model="search" show-action placeholder="请输入搜索关键词">
        <template #action>
          <div @click="goSearch(search)">搜索</div>
        </template>
      </van-search>
    </div>

    <div class="search-history" v-if="history.length > 0">
      <div class="title">
        <span>最近搜索</span>
        <van-icon @click="clear" name="delete-o" size="16" />
      </div>
      <div class="list">
        <div v-for="item in history" :key="item" class="list-item" @click="goSearch(item)">
          {{ item }}
        </div>
      </div>
    </div>
    <div class="rankingList">
      <div class="ranking">
        <van-nav-bar title="今日热搜" >
          <template #left>
            <van-icon name="hot" size="30" />
          </template>
          <template #right>
            <span style="font-size: 15px;">更多</span>
            <van-icon name="arrow" size="18" />
          </template>
        </van-nav-bar>
          <ul>
            <li v-for="item in hotsearch" :key="item" @click="goSearch(item)">{{ item }}</li>
          </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getHistoryList, setHistoryList } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  data () {
    return {
      search: '',
      history: getHistoryList(),
      hotsearch: ['0.01抢iPhone14', '新西兰进口奶粉', '瓜分10亿红包', '9块99抢百元券', '1分钱抢大额券', '运动装备 年终放价', '元旦钜惠 不止五折']
    }
  },
  methods: {

    goSearch (key) {
      if (key.length === 0) {
        this.$toast('请输入搜索关键词')
        return
      }
      const index = this.history.indexOf(key)
      if (index !== -1) {
        // 存在相同的项，将原有关键字移除
        // splice(从哪开始, 删除几个, 项1, 项2)
        this.history.splice(index, 1)
      }
      this.history.unshift(key)
      setHistoryList(this.history)

      this.$router.push(`/searchlist?search=${key}`)
    },
    clear () {
      this.history = []
      setHistoryList([])
    }
  }
}
</script>

<style lang="less" scoped>

.search {
  .searchHead {
    .van-nav-bar {
  background-image: linear-gradient(120deg, #a6c0fe 0%, #f68084 100%);
  }
  ::v-deep .van-ellipsis {
        color: #ffffff;
        font-size: 20px;
      }
    ::v-deep .van-hairline--bottom::after{
            border:none
          }
  .searchBtn {
    background-color: #fa2209;
    color: #fff;
  }
  }
    .van-search__content {
    border: 1px solid #CE8784;
    margin-right: 2px;
  }
  ::v-deep .van-search__action {
    background-color: #c21401;
    color: #fff;
    padding: 0 20px;
    border-radius: 0 5px 5px 0;
    margin-right: 10px;
  }
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .title {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
  }
  .list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 10px;
    gap: 5%;
  }
  .list-item {
    width: 30%;
    text-align: center;
    padding: 7px;
    line-height: 15px;
    border-radius: 50px;
    background: #fff;
    font-size: 13px;
    border: 1px solid#BDA5AB;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 10px;
    transition: all 0.5s;
  }
  .list-item:hover {
    background-color: #BDA5AB;
    color:white;
  }
  .rankingList{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    border: 1px solid #BDA5AB;
    width: 80%;
    margin-left: 10%;
    overflow: hidden;
    border-radius: 5px;
    .van-nav-bar{
      background-image: linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%);
    }
    ::v-deep .van-ellipsis {
        color: #ffffff;
        font-size: 15px;
      }

  }
  .ranking {
    width:100%;
    background-color: white;
    ul {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    li {
      width: 60%;
      text-align: center;
      transition: all 0.5s;
      margin-bottom: 2px;
    }
    li:hover {
      width: 80%;
      color:white;
      background-color: #c21401;
      border-radius: 10px;
    }
  }}
}
</style>
