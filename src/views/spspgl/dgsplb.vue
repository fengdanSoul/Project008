<template lang="html">
  <div class="app-container">
    <div class="filter-container">
      <div class="bg_white serchadd">
        <p class="color_zywz inline_block top_label">平台商品编号  </p>

        <a :href="'#/spspgl/dpcjsp/'+ product_spu_id">
          <el-button class="filter-item right ggcxtjbtn add_btn" style="margin-left: 10px;" type="primary" icon="el-icon-edit">创建商品</el-button>
        </a>
        <div class="clear">
        </div>
      </div>

      <div class="bg_white serchadd">

        <div class="comimgtitie">
            <div class="comimg left">
              <img :src="tableData.productSpuImg[0]" alt="商品图片">
            </div>
            <div class="comtitle right">
                <p>
                  {{tableData.product_name}}
                </p>
                <p class="color_six">商品详情：{{tableData.product_description}}</p>
            </div>
            <div class="clear">
            </div>
        </div>

      </div>
      <!--"shop_product_sku_id": "1",-->
      <!--"shop_product_info_id": "1",-->
      <!--"product_code": "2018080611",-->
      <!--"product_specification": "180g*10",-->
      <!--"auxiliary_code": "2018080611",-->
      <!--"inventory": "2997",-->
      <!--"vip_price": "30.00",-->
      <!--"gold_price": "28.00",-->
      <!--"diamond_price": "26.00",-->
      <!--"sku_flag": "1"-->
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6" v-for='item in tableData.productSkuList' :key="item.shop_product_sku_id" class="splb_box" >
          <div class="gwcsp_box box_shadow">
              <div class="spcheck">
                <p class="ptsmbh">商品编码：{{item.product_code}}/辅助码：{{item.auxiliary_code}} <span class="right color_nine">{{item.sfsj}}</span> </p>
              </div>

              <hr>
              <div class="comimgtitie">
                  <!--<div class="comimg left">-->
                    <!--<img :src="tableData.productSpuImg[0]" alt="商品图片">-->
                  <!--</div>-->
                  <div class="comtitle center">
                      <p>
                        {{tableData.product_name}}
                      </p>
                      <div class="spvip">
                          <span>VIP:￥{{item.vip_price}}</span>
                          <span>黄金:￥{{item.gold_price}}</span>
                          <span>钻石:￥{{item.diamond_price}}</span>
                          <span>库存:{{item.inventory}}</span>
                      </div>
                  </div>
                  <div class="clear">
                  </div>
              </div>
              <hr>
              <div class="spamount">


                <el-button type='primary' class="right" @click="stopSale(item.shop_product_sku_id)"  style='margin-left:10px' v-if="item.sku_flag === '1'" >下架
                </el-button>
                <el-button type='primary' class="right" @click="onSale(item.shop_product_sku_id)"  style='margin-left:10px' v-else >上架
                </el-button>

                <el-button type='primary' class="right" @click="deleteCurrentRow(item.shop_product_sku_id)" style='margin-left:10px'  >删除
                </el-button>
                <a :href="'#/spspgl/dpspxq/'+ item.shop_product_sku_id">
                  <el-button type='primary' class="right" style='margin-left:10px'>查看</el-button>
                </a>
                  <div class="clear">

                  </div>
              </div>
          </div>
        </el-col>
      </el-row>



    </div>
  </div>

</template>

<script>
import { shopProductSpuSkuList, shopProductSkuDelete, shopProductSkuFlag } from '@/api/shopGoodsManage'
export default {
  data() {
    return {
      tableData: {}
    }
  },
  computed: {
    product_spu_id() {
      return this.$route.params.id
    }
  },
  created() {
    this.fetchSPUData(this.product_spu_id)
  },
  methods: {
    fetchSPUData(product_spu_id) {
      shopProductSpuSkuList({ product_spu_id }).then(res => {
        this.tableData = res.data
      })
    },
    createGoods() {
      this.$router.push({ name: 'dpcjsp', params: { id: this.product_spu_id }})
    },
    stopSale(shop_product_sku_id) {
      this.$confirm('确认下架商品：')
        .then(_ => {
          shopProductSkuFlag({ shop_product_sku_id, skuFlag: 99 }).then(response => {
            this.$message({
              message: '下架成功',
              type: 'success'
            })
            this.fetchSPUData(this.product_spu_id)
          }).catch(error => {
            console.log(error)
          })
        })
        .catch(_ => {})
    },
    onSale(shop_product_sku_id) {
      this.$confirm('确认上架商品：')
        .then(_ => {
          shopProductSkuFlag({ shop_product_sku_id, skuFlag: 1 }).then(response => {
            this.$message({
              message: '上架成功',
              type: 'success'
            })
            this.fetchSPUData(this.product_spu_id)
          }).catch(error => {
            console.log(error)
          })
        })
        .catch(_ => {})
    },
    deleteCurrentRow(shop_product_sku_id) {
      this.$confirm('确认删除商品：')
        .then(_ => {
          shopProductSkuDelete(shop_product_sku_id).then(response => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.fetchSPUData(this.product_spu_id)
          }).catch(error => {
            console.log(error)
          })
        })
        .catch(_ => {})
    },
    editCurrent(shop_product_sku_id) {
      // this.$router.push({ name: 'dpspxq', params: { id: shop_product_sku_id }})
      this.$router.push({ path: '/dpspxq', query: { id: shop_product_sku_id }})
    }
  }
}
</script>

<style lang="css">
</style>
