<template lang="html">

  <div class="sp_container">
    <div class="bg_white">
      <div class="part_top">
        <p class="color_zywz top_label">店铺商品基本信息 </p>
      </div>
      <hr>
      <div class="form_part center">
        <el-form ref="baseForm" :model="baseForm" label-width="100px" >
          <el-form-item label="店铺商品分类" prop="shop_category_id">
            <el-select v-model="baseForm.shop_category_id" placeholder="请选择分类">
              <el-option v-for="item in categoryList" :label="item.category_name" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="起售天数">
            <el-input v-model="baseForm.start_day"></el-input>
          </el-form-item>
          <el-form-item label="促销信息">
            <el-input type="textarea" v-model="baseForm.promotion_msg"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="baseForm.remark"></el-input>
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
        <el-button type="primary" @click="onsubmit" style="width: 200px; height: 44px;font-size: 17px">创建</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { shopPrdouctSkuAddIndex, shopCategoryList, shopProductSkuAdd } from '@/api/shopGoodsManage'
export default {
  data() {
    return {
      baseForm: {
        shop_product_info_id: '',
        product_spu_id: '',
        shop_id: '',
        shop_category_id: '',
        start_day: '',
        promotion_msg: '',
        remark: ''
      },
      form: {
        product_code: '',
        product_specification: '',
        auxiliary_code: '',
        inventory: '',
        vip_price: '',
        gold_price: '',
        diamond_price: ''
      },
      categoryList: []
    }
  },
  computed: {
    product_spu_id() {
      return this.$route.params.id
    }
  },
  created() {
    this.fetchCategoryList()
    this.fetchSPUData(this.product_spu_id)
  },
  methods: {
    fetchSPUData(product_spu_id) {
      shopPrdouctSkuAddIndex({ product_spu_id }).then(res => {
        this.baseForm.shop_product_info_id = res.data.shop_product_info_id
        this.baseForm.shop_category_id = res.data.shop_category_id
        this.baseForm.start_day = res.data.start_day
        this.baseForm.remark = res.data.remark
        this.baseForm.promotion_msg = res.data.promotion_msg
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
      if (!this.product_spu_id.length) {
        this.$message.error('数据错误')
        return
      }
      this.$set(this.form, 'shop_product_info_id', this.baseForm.shop_product_info_id)
      shopProductSkuAdd(this.form).then(res => {
        this.$message.success('创建商品成功')
      })
      // this.$refs.form.validate(valid => {
      //   if (valid) {
      //
      //   }
      // })
    }
  }
}
</script>

<style lang="css">
</style>
