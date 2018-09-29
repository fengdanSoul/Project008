<template lang="html">
  <div class="app-container">
    <div class="filter-container ">
      <el-row :gutter="20">

        <el-col v-if="products.length" :xs="24" :sm="24" :md="12" :lg="8" :xl="6" v-for='item in products' :key="item.product_car_id">
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

                      <el-input-number @change="handleChangeProductNumber" style="width:150px; margin-top:10px" v-model="item.product_number"  :min="1" :max="1000" label="描述文字"></el-input-number>
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
        <el-checkbox v-model="checkAll"  @change="handleCheckAllChange(checkAll)">全选</el-checkbox>
        <!--<el-checkbox v-model="checked" >全选</el-checkbox>-->
        <el-button style="margin-left:20px" :disabled="!products.length" >删除</el-button>

        <span style="margin-left:50px">合计：{{vip_total_price}}</span>

        <el-button type='primary' @click="addOrder" class="right" :disabled="!products.length" >加单</el-button>
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
      products: [],
      checkAll: true,
      isIndeterminate: true,
      memberList: [
      ],
      member_id: '',
      product_car_id: ''

    }
  },
  computed: {
  },
  created() {
    // this.fetchProductCarList()
    this.getCartProducts()
    this.fetchShopMemberList()
  },
  methods: {
    fetchProductCarList() {
      shopCart.shopProductCarList().then(response => {
        this.products = response.data.list
        this.products.forEach(item => {
          this.product_car_id += item.product_car_id + ';'
        })
        const data = response.data
        this.count = data.count
        this.product_total_count = data.product_total_count
        this.vip_total_price = data.vip_total_price
        this.gold_total_price = data.gold_total_price
        this.diamond_total_price = data.diamond_price
      })
    },
    fetchShopMemberList() {
      shopMemberList({}).then(res => {
        this.memberList = res.data.list
      })
    },
    deleteProductFromCar(product) {
      shopCart.shopProductCarDelete({ product_car_id: product.product_car_id }).then(res => {
        this.fetchProductCarList()
      })
    },
    handleCheckAllChange() {
    },
    handleCheckedProductChange() {
    },
    addOrder() {
      if (this.product_car_ids.length <= 0) {
        this.$message.error('请选择商品')
        return
      }
      shopOrderAdd({ product_car_id: this.product_car_ids, member_id: this.member_id }).then(res => {
        this.$message.success('加单成功')
      })
    },
    handleChangeProductNumber(value) {
      console.log(value)
    }
  }
}
</script>

<style lang="css">


</style>
