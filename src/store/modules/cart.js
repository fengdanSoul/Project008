import shopCart from '@/api/shopCart'

const state = {
  items: [],
  checkoutStatus: null,
  count: 0,
  product_total_count: 0,
  vip_total_price: 0,
  gold_total_price: 0,
  diamond_total_price: 0
}

// getters
const getters = {
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
    return state.items.reduce((total, product) => {
      return total + product.quantity
    }, 0)
  }
}

// actions
const actions = {
  getCartProducts({ state, commit }) {
    shopCart.shopProductCarList().then(res => {
      commit('setCartItems', { items: res.data.list })
    })
  },
  addProductToCart({ state, commit }, product) {
    // commit('setCheckoutStatus', null)
    if (product.inventory > 0) {
      const cartItem = state.items.find(item => item.shop_product_sku_id === product.shop_product_sku_id)
      if (!cartItem) {
        shopCart.shopProductCarAdd({ shop_product_sku_id: product.shop_product_sku_id }).then(res => {
          if (res.status === 'ok') {
            commit('pushProductToCart', product)
          }
        })
      } else {
        shopCart.shopProductCarSetInc({ product_car_id: product.product_car_id }).then(res => {
          if (res.status === 'ok') {
            commit('incrementItemQuantity', cartItem)
          }
        })
      }
      // remove 1 item from stock
      // commit('products/decrementProductInventory', { shop_product_sku_id: product.shop_product_sku_id }, { root: true })
    }
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
