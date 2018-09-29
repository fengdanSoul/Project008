<template lang="html">
  <div class="app-container">
    <div class="filter-container ">
      <el-row :gutter="20">
        <!--"product_car_id": "1",-->
        <!--"product_spu_id": "17",-->
        <!--"shop_product_sku_id": "1",-->
        <!--"shop_id": "9",-->
        <!--"member_id": "0",-->
        <!--"product_number": "3",-->
        <!--"product_name": "蒙牛牛奶",-->
        <!--"product_description": "中国第一好牛奶",-->
        <!--"brand_id": "1",-->
        <!--"category_id": "19",-->
        <!--"shop_category_id": "25",-->
        <!--"start_day": "88",-->
        <!--"remark": "要进行冷藏保存",-->
        <!--"promotion_msg": "买五送一",-->
        <!--"product_code": "2018080611",-->
        <!--"product_specification": "180g*10",-->
        <!--"auxiliary_code": "2018080611",-->
        <!--"inventory": "3000",-->
        <!--"vip_price": "30.00",-->
        <!--"gold_price": "28.00",-->
        <!--"diamond_price": "26.00",-->
        <!--"this_vip_total_price": 90,-->
        <!--"this_gold_total_price": 84,-->
        <!--"this_diamond_total_price": 78,-->
        <!--"product_img":-->
        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6" v-for='item in items' :key="item.product_car_id">
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

                      <el-input-number @change="handleChangeProductNumber" style="width:150px; margin-top:10px" v-model="item.product_number"  :min="1" :max="100" label="描述文字"></el-input-number>
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
        <el-button style="margin-left:20px" :disabled="!items.length" >删除</el-button>

        <span style="margin-left:50px">合计：{{vip_total_price}}</span>

        <el-button type='primary' @click="addOrder" class="right" :disabled="!items.length" >加单</el-button>
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
import { mapGetters, mapActions } from 'vuex'
import shopCart from '@/api/shopCart'
import { shopMemberList, shopOrderAdd } from '@/api/shopOrder' //, shopOrderDelivery, shopOrderFlag,

export default {
  data() {
    return {
      // count: '',
      // product_total_count: '',
      // vip_total_price: '',
      // gold_total_price: '',
      // diamond_total_price: '',
      checkAll: true,
      isIndeterminate: true,
      memberList: [
      ],
      member_id: '',
      product_car_id: ''

    }
  },
  computed: {
    ...mapGetters([
      'items',
      'count',
      'product_total_count',
      'vip_total_price',
      'gold_total_price',
      'diamond_total_price',
      'product_car_ids'
    ])
  },
  created() {
    // this.fetchProductCarList()
    this.getCartProducts()
    this.fetchShopMemberList()
  },
  methods: {
    ...mapActions([
      'getCartProducts',
      'deleteProductFromCar',
      'handleCheckAllChange',
      'handleCheckedProductChange'
    ]),
    fetchProductCarList() {
      shopCart.shopProductCarList().then(response => {
        this.products = response.data.list
        this.products.forEach(item => {
          this.product_car_id += item.product_car_id + ';'
        })
      })
    },
    fetchShopMemberList() {
      shopMemberList({}).then(res => {
        this.memberList = res.data.list
      })
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
      // console.log(item)
      console.log(value)
    }
  }
}
</script>

<style lang="css">


</style>
