<template >
<div class="app-container">
  <div class="filter-container">

    <div class="bg_white serchadd">
      <p class="color_zywz inline_block top_label">配送信息列表 </p>
      <el-button class="filter-item right ggcxtjbtn add_btn" style="margin-left: 10px;" @click="createShopMessage" type="primary" icon="el-icon-edit">创建配送</el-button>
      <div class="clear">

      </div>
    </div>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column align='center' prop="create_time" label="创建时间" width="180">
      </el-table-column>
      <el-table-column align='center' prop="id" label="ID" width="180">
      </el-table-column>
      <el-table-column align='center' prop="distributor" label="配送人">
      </el-table-column>
      <el-table-column align='center' prop="mobile" label="联系方式">
      </el-table-column>
      <el-table-column align='center' prop="vehicle_number" label="车牌号">
      </el-table-column>
      <el-table-column align='center' label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="editCurrentRow(scope.$index)">编辑</el-button>
          <el-button type="danger" size="mini" @click="deleteCurrentRow(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination @current-change="handleCurrentChange" :current-page="page"  :page-size="10" layout="total, prev, pager, next, jumper" :total="count">
      </el-pagination>
    </div>

    <el-dialog title="创建配送信息" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <div class="form_part center">
        <el-form ref="form" :model="form" :rules="formRules" label-width="100px">
          <!-- <el-form-item label="促销权重：">
          <el-select v-model="form.storeclass" placeholder="请选择">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
          </el-select>
        </el-form-item> -->

          <el-form-item label="配送人：" prop="distributor">
            <el-input v-model="form.distributor"></el-input>
          </el-form-item>

          <el-form-item label="联系方式：" prop="mobile">
            <el-input v-model.number="form.mobile"></el-input>
          </el-form-item>
          <el-form-item label="车牌号：" prop="vehicle_number">
            <el-input v-model="form.vehicle_number"></el-input>
          </el-form-item>

          <!-- <el-form-item label="内容详情：">
          <el-input type="textarea" v-model="form.remarks"></el-input>
        </el-form-item> -->

          <el-form-item>
            <el-button type="primary" @click="onSubmit">确认</el-button>
            <el-button @click="dialogVisible = false">取消</el-button>
          </el-form-item>



        </el-form>
      </div>

    </el-dialog>




  </div>
</div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { shopDeliveryList, shopDeliveryAdd, shopDeliveryDelete, shopDeliveryModify } from '@/api/shop'
  export default {
    data() {
      return {
        dialogVisible: false,
        isAdd: true,
        loading: false,
        tableData: [
        ],
        form: {
          distributor: '',
          mobile: '',
          vehicle_number: ''
        },
        formRules: {
          distributor: [{ required: true, message: '输入配送人姓名', trigger: 'blur' }],
          mobile: [
            { required: true, message: '输入配送人手机号', trigger: 'blur' },
            { type: 'number', message: '手机号为数字', trigger: 'blur' }
          ],
          vehicle_number: [{ required: true, message: '输入配送人车牌号', trigger: 'blur' }]
        },
        count: 0,
        page: 1
      }
    },
    computed: {
      ...mapGetters({
        shopId: 'shop_id'
      })
    },
    created() {
      this.fectchShopDeliveryList(1)
    },
    methods: {
      fectchShopDeliveryList(page) {
        shopDeliveryList({ page }).then(response => {
          const data = response.data
          this.count = Number(data.count)
          this.tableData = data.list
        }).catch(error => {
          console.log(error)
        })
      },
      selectPromotionType() {
        this.fectchShopDeliveryList(1)
      },
      editCurrentRow(index) {
        this.dialogVisible = true
        this.form = this.tableData[index]
        this.isAdd = false
      },
      deleteCurrentRow(index) {
        const data = this.tableData[index]
        this.$confirm('确认删除配送信息：')
          .then(_ => {
            shopDeliveryDelete({ id: data.id }).then(response => {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.page = 1
              this.fectchShopDeliveryList(1)
            }).catch(error => {
              console.log(error)
            })
          })
          .catch(_ => {})
      },
      createShopMessage() {
        this.dialogVisible = true
        this.$delete(this.form, 'distributor')
        this.$delete(this.form, 'mobile')
        this.$delete(this.form, 'vehicle_number')
        // this.$set(this.form, 'shop_id', this.shopId)
        this.isAdd = true
      },
      onSubmit() {
        this.$refs.form.validate(valid => {
          if (valid) {
            if (this.isAdd) {
              shopDeliveryAdd(this.form).then(response => {
                this.dialogVisible = false
                this.$message({
                  message: '添加配送成功',
                  type: 'success'
                })
                this.page = 1
                this.fectchShopDeliveryList(1)
              }).catch(error => {
                console.log(error)
              })
            } else {
              shopDeliveryModify(this.form).then(response => {
                this.dialogVisible = false
                this.$message({
                  message: '修改配送信息成功',
                  type: 'success'
                })
                this.page = 1
                this.fectchShopDeliveryList(1)
              }).catch(error => {
                console.log(error)
              })
            }
          }
        })
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`)
        this.fectchShopDeliveryList(val)
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {})
      },
      formatterPromotionType(row) {
        if (row.promotion_type === '1') {
          return '预告分类'
        } else if (row.promotion_type === '2') {
          return '店铺促销'
        }
        return '其他'
      }
    }
  }
</script>

  <style media="screen">

  </style>
