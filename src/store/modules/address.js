export default {
  namespaced: true,
  state () {
    return {
      addressList: [
        { username: '张三', tel: '1300130013', address: '浙江省杭州市西湖区文三路' }
      ]
    }
  },
  mutation: {
    addAddress (state, obj) {
      state.addressList.push(obj)
    },
    removeAddress (state, index) {
      state.addressList.splice(index, 1)
    }
  },
  getters: {
    getAddressList (state) {
      return state.addressList
    }
  }
}
