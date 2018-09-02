<template lang="html">

  <!--"product_spu_id": "19",-->
  <!--"shop_prdouct_info_id": "3",-->
  <!--"shop_product_sku_id": "14",-->
  <!--"product_name": "安慕希",-->
  <!--"product_description": "中国第一好牛奶安慕希",-->
  <!--"brand_id": "2",-->
  <!--"category_id": "20",-->
  <!--"brand_name": "品牌2",-->
  <!--"category_name": "分类二",-->
  <!--"shop_id": "9",-->
  <!--"shop_category_id": "25",-->
  <!--"start_day": "90",-->
  <!--"remark": "常温保存三十天",-->
  <!--"promotion_msg": "促销信息 购物网站 上1号店 底价狂欢 物美更超值 ",-->
  <!--"shop_category_name": "热门推荐",-->
  <!--"product_code": "20180807155",-->
  <!--"product_specification": "100g*3箱",-->
  <!--"auxiliary_code": "F2018080710090",-->
  <!--"inventory": "30",-->
  <!--"vip_price": "80.00",-->
  <!--"gold_price": "60.00",-->
  <!--"diamond_price": "40.00",-->
  <!--"sku_flag": "99",-->
  <!--"imgData":-->
  <div class="sp_container">
    <div class="bg_white">
      <div class="part_top">
        <p class="color_zywz top_label">店铺商品基本信息 </p>
      </div>
      <hr>
      <div class="form_part center">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="店铺商品分类" prop="shop_category_id">
            <el-select v-model="form.shop_category_id" placeholder="请选择分类">
              <el-option v-for="item in categoryList" :label="item.category_name" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="起售天数">
            <el-input v-model="form.start_day"></el-input>
          </el-form-item>
          <el-form-item label="促销信息">
            <el-input type="textarea" v-model="form.promotion_msg"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="form.remark"></el-input>
          </el-form-item>
          <!-- <el-form-item>
                  <el-button type="primary" @click="onSubmit">保存</el-button>
                  <el-button>取消</el-button>
                 </el-form-item> -->
        </el-form>
      </div>
    </div>

    <div class="bg_white" style="margin-top:20px">
      <div class="part_top">
        <p class="color_zywz top_label">商品库存价格信息</p>
      </div>
      <hr>
      <div class="form_part center">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="商品编码">
            <el-input v-model="form.product_code"></el-input>
          </el-form-item>
          <el-form-item label="辅助码">
            <el-input v-model="form.auxiliary_code"></el-input>
          </el-form-item>
          <el-form-item label="商品规格">
            <el-input v-model="form.product_specification"></el-input>
          </el-form-item>
          <el-form-item label="VIP">
            <el-input v-model="form.vip_price"></el-input>
          </el-form-item>
          <el-form-item label="黄金">
            <el-input v-model="form.gold_price"></el-input>
          </el-form-item>
          <el-form-item label="钻石">
            <el-input v-model="form.diamond_price"></el-input>
          </el-form-item>
          <el-form-item label="库存数量">
            <el-input v-model="form.inventory"></el-input>
          </el-form-item>

        </el-form>
      </div>
    </div>

    <div class="bg_white" style='margin-top:20px'>
      <div class="form_part center text_center">
        <el-button type="primary" @click="onsubmit" style="width: 200px; height: 44px;font-size: 17px">编辑/保存</el-button>
      </div>
    </div>


  </div>


</template>

<script>
import { shopProductSkuDetails, shopCategoryList, shopProductSkuModify } from '@/api/shopGoodsManage'
export default {
  data() {
    return {
      form: {
        product_code: '',
        product_specification: '',
        auxiliary_code: '',
        inventory: '',
        remark: '',
        vip_price: '',
        gold_price: '',
        diamond_price: ''
      },
      categoryList: []
    }
  },
  computed: {
    shop_product_sku_id() {
      return this.$route.params.id
    }
  },
  created() {
    this.fetchCategoryList()
    this.fetchShopProductSkuDetails()
  },
  methods: {
    fetchShopProductSkuDetails() {
      shopProductSkuDetails({ shop_product_sku_id: this.shop_product_sku_id }).then(res => {
        this.form = res.data
      })
    },
    fetchCategoryList() {
      shopCategoryList({ page: 0, like_name: '' }).then(response => {
        const data = response.data
        this.categoryList = data.list
      }).catch(error => {
        console.log(error)
      })
    },
    onsubmit() {
      this.$set(this.form, 'shop_product_sku_id', this.shop_product_sku_id)
      shopProductSkuModify(this.form).then(res => {
        this.$message.success('编辑成功')
      })
    }
  }
}
</script>

<style lang="css">
</style>
