import shopCart from '@/api/shopCart'
import { Message } from 'element-ui'

const state = {
  items: [],
  checkoutStatus: null,
  count: 0,
  product_total_count: 0,
  vip_total_price: 0,
  gold_total_price: 0,
  diamond_total_price: 0,
  itemStatus: [],
  allStatus: true,
  product_car_ids: ''
}

// getters
const getters = {
  items: state => state.items,
  count: state => state.count,
  product_total_count: state => state.product_total_count,
  vip_total_price: state => state.vip_total_price,
  gold_total_price: state => state.gold_total_price,
  diamond_total_price: state => state.diamond_total_price,
  allStatus: state => state.allStatus,
  product_car_ids: (state) => {
    let _ids = ''
    state.items.forEach(item => {
      _ids += item.product_car_id + ';'
    })
    return _ids
  },
  // checkAllStats: state =>
  // cartProducts: (state, getters, rootState) => {
  //   return state.items.map(({ id, quantity }) => {
  //     const product = rootState.products.all.find(product => product.id === id)
  //     return {
  //       title: product.title,
  //       price: product.price,
  //       quantity
  //     }
  //   })
  // },
  // cartTotalPrice: (state, getters) => {
  //   return getters.cartProducts.reduce((total, product) => {
  //     return total + product.price * product.quantity
  //   }, 0)
  // },
  cartTotalQuantity: (state, getters) => {
    if (!state.items.length) {
      return 0
    }
    return state.items.reduce((total, product) => {
      return total + product.quantity
    }, 0)
  }
}

// actions
const actions = {
  getCartProducts({ state, commit }) {
    shopCart.shopProductCarList().then(res => {
      commit('setCartInfo', { data: res.data })
    })
  },
  addProductToCart({ state, commit }, product) {
    // commit('setCheckoutStatus', null)
    if (product.inventory > 0 && product.sku_flag === '1') {
      const cartItem = state.items.find(item => item.shop_product_sku_id === product.shop_product_sku_id)
      if (!cartItem) {
        shopCart.shopProductCarAdd({ shop_product_sku_id: product.shop_product_sku_id }).then(res => {
          if (res.status === 'ok') {
            shopCart.shopProductCarList().then(res => {
              commit('setCartInfo', { data: res.data })
            })
            // commit('pushProductToCart', product)
          }
        })
      } else {
        shopCart.shopProductCarSetInc({ product_car_id: product.product_car_id }).then(res => {
          if (res.status === 'ok') {
            shopCart.shopProductCarList().then(res => {
              commit('setCartInfo', { data: res.data })
            })
            // commit('incrementItemQuantity', cartItem)
          }
        })
      }
      // remove 1 item from stock
      // commit('products/decrementProductInventory', { shop_product_sku_id: product.shop_product_sku_id }, { root: true })
    } else {
      Message({
        message: '确认还有库存或者已上架',
        type: 'info',
        duration: 3.6 * 1000
      })
    }
  },
  deleteProductFromCar({ state, commit }, product) {
    shopCart.shopProductCarDelete({ product_car_id: product.product_car_id }).then(res => {
      if (res.status === 'ok') {
        shopCart.shopProductCarList().then(res => {
          commit('setCartInfo', { data: res.data })
        })
        // commit('incrementItemQuantity', cartItem)
      }
    })
  },
  handleCheckedProductChange({ state, commit }, product) {
    commit('handleCheckedProductChange', product)
  },
  handleCheckAllChange({ state, commit }, val) {
    commit('handleCheckAllChange', val)
  },
  handleProductCarSetInc({ state, commit }, product) {
    shopCart.shopProductCarSetInc({ product_car_id: product.product_car_id }).then(res => {})
  },
  handleProductCarSetDec({ state, commit }, product) {
    shopCart.shopProductCarSetDec({ product_car_id: product.product_car_id }).then(res => {})
  },
  checkout({ commit, state }, products) {
    const savedCartItems = [...state.items]
    commit('setCheckoutStatus', null)
    // empty cart
    commit('setCartItems', { items: [] })
    shopCart.shopProductCarAdd(
      products,
      () => commit('setCheckoutStatus', 'successful'),
      () => {
        commit('setCheckoutStatus', 'failed')
        // rollback to the cart saved before sending the request
        commit('setCartItems', { items: savedCartItems })
      }
    )
  }
}

// mutations
const mutations = {
  pushProductToCart(state, product) {
    product.quantity = 1
    state.items.push(product)
  },

  incrementItemQuantity(state, product) {
    const cartItem = state.items.find(item => item.shop_product_sku_id === product.shop_product_sku_id)
    cartItem.quantity++
  },

  setCartItems(state, { items }) {
    state.items = items
  },
  setCartInfo(state, { data }) {
    state.items = data.list
    state.items.forEach(p => {
      p.check_status = true
    })
    state.count = data.count
    state.product_total_count = data.product_total_count
    state.vip_total_price = data.vip_total_price
    state.gold_total_price = data.gold_total_price
    state.diamond_total_price = data.diamond_price
  },
  handleCheckedProductChange(state, product) {
    console.log(product.check_status)
    // product.check_status = !product.check_status
    // state.items.forEach(item => {
    //   if (item.product_car_id	 === product.product_car_id) {
    //     item.check_status = product.check_status
    //   }
    // })
    // const cartItem = state.items.find(item => item.check_status === false)
    // if (cartItem) {
    //   state.allStatus = false
    // } else {
    //   state.allStatus = true
    // }
    // cartItem.check_status = !cartItem.check_status
  },
  handleCheckAllChange(state, val) {
    state.allStatus = val
    state.items.forEach(item => {
      item.check_status = val
    })
  },
  setCheckoutStatus(state, status) {
    state.checkoutStatus = status
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
