<template lang="html">
  <div class="app-container">
    <div class="filter-container ">
      <el-row :gutter="20">

        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6" v-for='item in products' :key="item.product_car_id">
          <div class="gwcsp_box box_shadow">
              <div class="spcheck">
                <el-checkbox v-model="item.check_status" @change="handleCheckedProductChange(item)">商品编码：{{item.product_code}}/辅助码：{{item.auxiliary_code}}</el-checkbox>
              </div>

              <hr>
              <div class="comimgtitie">
                  <div class="comimg left">
                    <img :src="item.product_img[0]" alt="商品图片">
                  </div>
                  <div class="comtitle right">
                      <p>
                        {{item.product_name}}
                      </p>
                      <p class="color_six">VIP单价：￥{{item.vip_price}}</p>
                      <p class="color_six">库存数量：{{item.inventory}}</p>

                    <div class="counter">
                      <el-button @click="handleDec(item)" size="mini">-</el-button>
                      <p class="num">{{item.product_number}}</p>
                      <el-button @click="handleInc(item)" size="mini">+</el-button>
                    </div>
                      <!--<el-input-number @change="handleChangeProductNumber(item)" style="width:150px; margin-top:10px" v-model="item.last_product_number"  :min="1" :max="1000" label="描述文字"></el-input-number>-->
                  </div>
                  <div class="clear">
                  </div>
              </div>
              <hr>
              <div class="spamount">
                  <span class="amtspan">金额：￥ {{item.this_vip_total_price}}</span>
                  <el-button class="right" :disabled="item.product_number<=0" @click="deleteProductFromCar(item)">删除
                  </el-button>
                  <div class="clear">
                  </div>
              </div>
          </div>
        </el-col>
      </el-row>

      <div class=" cz_btm bg_white">
        <el-checkbox v-model="checkAll"  @change="handleCheckAllChange">全选</el-checkbox>
        <el-button style="margin-left:20px" @click="clearCart" >删除</el-button>

        <span style="margin-left:50px">合计（¥）：{{vip_total_price}}</span>

        <el-button type='primary' @click="addOrder" class="right"  >加单</el-button>
        <el-select v-model="member_id" placeholder="请绑定会员" class="right" style="margin-right:10px">
          <el-option
            v-for="item in memberList"
            :key="item.member_id"
            :label="item.member_name"
            :value="item.member_id">
          </el-option>
        </el-select>


      </div>

    </div>
  </div>

</template>

<script>
import shopCart from '@/api/shopCart'
import { shopMemberList, shopOrderAdd } from '@/api/shopOrder' //, shopOrderDelivery, shopOrderFlag,

export default {
  data() {
    return {
      count: '',
      product_total_count: '',
      vip_total_price: '',
      gold_total_price: '',
      diamond_total_price: '',
      cartData: {},
      products: [],
      checkAll: true,
      isIndeterminate: true,
      memberList: [
      ],
      member_id: '',
      product_car_ids: ''

    }
  },
  computed: {
  },
  created() {
    this.init()
    this.fetchShopMemberList()
  },
  methods: {
    init: function() {
      shopCart.shopProductCarList().then(response => {
        this.cartData = response.data
        this.products = response.data.list
        this.products.forEach(item => {
          item.check_status = true
        })
        if (this.products.length > 0) {
          this.checkAll = true
        } else {
          this.checkAll = false
        }
        const data = response.data
        this.count = data.count
        this.product_total_count = data.product_total_count
        this.vip_total_price = data.vip_total_price
        this.gold_total_price = data.gold_total_price
        this.diamond_total_price = data.diamond_price
      })
    },
    refreshData() {
      shopCart.shopProductCarList().then(response => {
        this.cartData = response.data
        const temp = this.products
        this.products = response.data.list
        temp.forEach((item, index) => {
          this.$set(this.products[index], 'check_status', item.check_status)
        })
        this.totalPrice()
      })
    },
    fetchShopMemberList() {
      shopMemberList({}).then(res => {
        this.memberList = res.data.list
      })
    },
    deleteProductFromCar(product) {
      shopCart.shopProductCarDelete({ product_car_id: product.product_car_id }).then(res => {
        this.products = this.products.filter(item => {
          return item.product_car_id !== product.product_car_id
        })
        this.refreshData()
      })
    },
    handleCheckAllChange() {
      this.products.forEach(item => {
        item.check_status = this.checkAll
      })
      if (this.checkAll) {
        this.vip_total_price = this.cartData.vip_total_price
      } else {
        this.vip_total_price = 0
      }
    },
    handleCheckedProductChange() {
      const cartItem = this.products.find(item => item.check_status === false)
      if (cartItem) {
        this.checkAll = false
        this.vip_total_price = 0
        this.products.forEach(item => {
          if (item.check_status) {
            this.vip_total_price += parseFloat(item.this_vip_total_price)
          }
        })
      } else {
        this.checkAll = true
        this.vip_total_price = this.cartData.vip_total_price
      }
    },
    totalPrice() {
      this.vip_total_price = 0
      this.products.forEach(item => {
        console.log(item.check_status)
        if (item.check_status) {
          console.log(item.this_vip_total_price)
          this.vip_total_price += parseFloat(item.this_vip_total_price)
        }
      })
    },
    addOrder() {
      if (!this.products) {
        return
      }
      this.product_car_ids = ''
      this.products.forEach(item => {
        if (item.check_status) {
          this.product_car_ids += item.product_car_id + ';'
        }
      })
      if (this.product_car_ids.length <= 0) {
        this.$message.error('请选择商品')
        return
      }
      if (this.member_id.length <= 0) {
        this.$message.error('请选择会员')
        return
      }
      shopOrderAdd({ product_car_id: this.product_car_ids, member_id: this.member_id }).then(res => {
        this.$message.success('加单成功')
        this.init()
        this.vip_total_price = 0
      })
    },
    handleDec(item) { // 递减
      if (item.product_number <= 1) {
        // this.$message.success('加单成功')
        return
      }
      item.product_number--
      shopCart.shopProductCarSetDec({ product_car_id: item.product_car_id }).then(res => {
        this.refreshData()
      }).catch(error => {
        console.log(error)
        item.product_number++
      })
    },
    handleInc(item) { // 递增
      // if (item.product_number <= 0) {
      //   return
      // }
      item.product_number++
      shopCart.shopProductCarSetInc({ product_car_id: item.product_car_id }).then(res => {
        this.refreshData()
      }).catch(error => {
        console.log(error)
        item.product_number--
      })
    },
    clearCart() {
      if (!this.products) {
        return
      }
      this.deleteCart(_ => {
        this.products = []
        this.vip_total_price = 0
      })
    },
    deleteCart(cb) {
      const num = this.products.length
      this.products.forEach((item, index) => {
        shopCart.shopProductCarDelete({ product_car_id: item.product_car_id }).then(res => {
          if (num - 1 === index) {
            cb()
          }
        })
      })
    }
  }
}
</script>

<style lang="css">
  .counter {
    margin-top: 10px;
  }
  .num{
    display: inline-block;
    width: 35px;
    text-align: center;
  }

</style>
