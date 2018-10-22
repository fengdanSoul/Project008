<template >
<div class="sp_container">
  <div class="bg_white">
    <div class="part_top">
      <p class="color_zywz top_label">店铺商品基本信息</p>
    </div>
    <hr>
    <div class="form_part center">
      <el-form ref="form" :rules="formRules" :model="form" label-width="130px" :disabled="true">
        <el-form-item label="店铺商品分类" prop="shop_category_id">
          <el-select v-model="form.shop_category_id" placeholder="请选择分类">
            <el-option v-for="item in categoryList" :label="item.category_name" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="起售天数" prop="start_day">
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
  <div class="bg_white" style='margin-top:20px'>
    <div class="part_top">
      <p class="color_zywz top_label">商品库存价格 </p>
    </div>
    <hr>
    <!--product_code: '',-->
    <!--product_specification: '',-->
    <!--auxiliary_code: '',-->
    <!--inventory: '',-->
    <!--vip_price: '',-->
    <!--gold_price: '',-->
    <!--diamond_price: '',-->
    <!--sku_flag: ''-->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column align='center' label="商品编码" >
        <template slot-scope="scope">
          <!-- <a class="table_href" href="#/spdpdd/dpddxq">{{scope.row.orderno}}</a> -->
            <el-input v-model="scope.row.product_code" placeholder="请输入"></el-input>
        </template>
      </el-table-column>
      <el-table-column align='center' label="辅助码" >
        <template slot-scope="scope">
          <!-- <a class="table_href" href="#/spdpdd/dpddxq">{{scope.row.orderno}}</a> -->
            <el-input v-model="scope.row.auxiliary_code" placeholder="请输入"></el-input>
        </template>
      </el-table-column>
      <el-table-column align='center' label="商品规格" >
        <template slot-scope="scope">
          <!-- <a class="table_href" href="#/spdpdd/dpddxq">{{scope.row.orderno}}</a> -->
            <el-input v-model="scope.row.product_specification" placeholder="请输入"></el-input>
        </template>
      </el-table-column>
      <el-table-column align='center' label="VIP" >
        <template slot-scope="scope">
          <!-- <a class="table_href" href="#/spdpdd/dpddxq">{{scope.row.orderno}}</a> -->
            <el-input v-model="scope.row.vip_price" placeholder="请输入"></el-input>
        </template>
      </el-table-column>
      <el-table-column align='center' label="黄金" >
        <template slot-scope="scope">
          <!-- <a class="table_href" href="#/spdpdd/dpddxq">{{scope.row.orderno}}</a> -->
            <el-input v-model="scope.row.gold_price" placeholder="请输入"></el-input>
        </template>
      </el-table-column>
      <el-table-column align='center' label="钻石" >
        <template slot-scope="scope">
          <!-- <a class="table_href" href="#/spdpdd/dpddxq">{{scope.row.orderno}}</a> -->
            <el-input v-model="scope.row.diamond_price" placeholder="请输入"></el-input>
        </template>
      </el-table-column>
      <el-table-column align='center' label="库存数量" >
        <template slot-scope="scope">
          <!-- <a class="table_href" href="#/spdpdd/dpddxq">{{scope.row.orderno}}</a> -->
            <el-input v-model="scope.row.inventory" placeholder="请输入"></el-input>
        </template>
      </el-table-column>
      <el-table-column align='center' label="操作" >
        <template slot-scope="scope">
          <el-button class="plusminus"  type='success' icon="el-icon-plus" @click="addTableForm" circle v-if="scope.$index === 0"></el-button>
          <el-button class="plusminus"  type="danger" icon="el-icon-minus" @click="deleteTableForm(scope.$index)" circle v-else></el-button>
        </template>
      </el-table-column>

    </el-table>


  </div>
  <div class="bg_white" style='margin-top:20px'>
    <div class="form_part center text_center">
      <el-button type="primary" @click="onSubmit" style="width: 220px; height: 44px;font-size: 16px">创建</el-button>
    </div>
  </div>
</div>
</template>

<script type="text/javascript">
import { shopCategoryList, shopProductSpuSkuList } from '@/api/shopGoodsManage'
import { shopProductAdd } from '@/api/shopGoodsManage'

export default {
  data() {
    return {
      form: {
        shop_category_id: '',
        start_day: '',
        remark: '',
        promotion_msg: ''

      },
      formRules: {
        shop_category_id: [
          { required: true, message: '选择商品分类', trigger: 'blur' }
        ],
        start_day: [
          { required: true, message: '输入起售天数', trigger: 'blur' }
        ]

      },
      tableData: [
        {
          product_code: '',
          product_specification: '',
          auxiliary_code: '',
          inventory: '',
          vip_price: '',
          gold_price: '',
          diamond_price: '',
          sku_flag: '0'
        }
      ],
      categoryList: []
    }
  },
  computed: {
    product_spu_id() {
      return this.$route.params.id
    }
  },
  created() {
    this.fetchShopCategoryList(0, '')
  },
  methods: {
    onSubmit() {
      if (!this.product_spu_id.length) {
        this.$message.error('数据错误')
        return
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$set(this.form, 'product_sku', JSON.stringify(this.tableData))
          this.$set(this.form, 'product_spu_id', this.product_spu_id)
          shopProductAdd(this.form).then(res => {
            this.$message.success('创建商品成功')
          })
        }
      })
    },
    fetchShopCategoryList(page, like_name) {
      shopCategoryList({ page, like_name }).then(response => {
        const data = response.data
        this.categoryList = data.list
        this.fetchSPUData(this.product_spu_id)
      }).catch(error => {
        console.log(error)
      })
    },
    fetchSPUData(product_spu_id) {
      // product_spu_id	16
      // shop_prdouct_info_id	4
      // product_name	伊利牛奶
      // product_description	中国第一好牛奶
      // brand_id	2
      // category_id	20
      // brand_name	品牌2
      // category_name	分类二
      // shop_id	9
      // shop_category_id	25
      // start_day	90
      // remark	常温保存三十天
      // promotion_msg	促销信息 购物网站 上1号店 底价狂欢 物美更超值
      // shop_category_name	热门推荐
      shopProductSpuSkuList({ product_spu_id }).then(res => {
        // shop_category_id: '',
        //   start_day: '',
        //   remark: '',
        //   promotion_msg: ''
        this.form.shop_category_id = res.data.shop_category_id
        this.form.start_day = res.data.start_day
        this.form.remark = res.data.remark
        this.form.promotion_msg = res.data.promotion_msg
      })
    },
    addTableForm() {
      this.tableData.push({
        product_code: '',
        product_specification: '',
        auxiliary_code: '',
        inventory: '',
        vip_price: '',
        gold_price: '',
        diamond_price: '',
        sku_flag: '0'
      })
    },
    deleteTableForm(index) {
      this.tableData.splice(index, 1)
    }
  }
}
</script>

<style media="screen">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
