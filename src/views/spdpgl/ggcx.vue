<template >
<div class="app-container">
  <div class="filter-container">

    <div class="bg_white serchadd">
      <p class="color_zywz inline_block top_label">公告促销 </p>
      <el-button class="filter-item right ggcxtjbtn add_btn" style="margin-left: 10px;" @click="createShopMessage" type="primary" icon="el-icon-edit">创建促销</el-button>
      <div class="clear">

      </div>
    </div>

    <div class="bg_white">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="全部" name=""></el-tab-pane>
        <el-tab-pane label="预报公告" name="1"></el-tab-pane>
        <el-tab-pane label="店铺促销" name="2"></el-tab-pane>

      </el-tabs>
    </div>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column align='center' prop="create_time" label="创建时间">
      </el-table-column>
      <el-table-column align='center' prop="sort" label="权重">
      </el-table-column>
      <el-table-column align='center' prop="promotion_type" :formatter="formatterPromotionType" label="分类">
      </el-table-column>
      <el-table-column align='center' prop="title" label="标题">
      </el-table-column>
      <el-table-column align='center' prop="content" label="内容">
      </el-table-column>
      <el-table-column align='center' label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="editCurrentRow(scope.$index)">编辑</el-button>
          <el-button type="danger" size="mini" @click="deleteCurrentRow(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- <div class="pagination-container">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div> -->
    <div class="pagination-container">
      <el-pagination @current-change="handleCurrentChange" :current-page="page"  :page-size="10" layout="total, prev, pager, next, jumper" :total="count">
      </el-pagination>
    </div>


    <el-dialog title="创建公告促销" :visible.sync="dialogVisible" width="35%" :before-close="handleClose">

      <div class="form_part center">
        <el-form ref="form" :model="form" :rules="formRules" label-width="100px">
          <el-form-item label="促销权重：" prop="sort">
            <el-input v-model.number="form.sort"></el-input>

          </el-form-item>

          <el-form-item label="促销分类：" prop="promotion_type">
            <el-select v-model="form.promotion_type" placeholder="请选择">
              <el-option label="预告" value="1"></el-option>
              <el-option label="促销" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="促销标题：" prop="title">
            <el-input v-model="form.title" ></el-input>
          </el-form-item>

          <el-form-item label="内容详情：" prop="content">
            <el-input type="textarea" v-model="form.content"></el-input>
          </el-form-item>

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
  import { shopMessageList, shopMessageAdd, shopMessageDelete, shopMessageModify } from '@/api/shop'
  export default {
    data() {
      return {
        dialogVisible: false,
        isAdd: true,
        loading: false,
        tableData: [
        ],
        form: {
          promotion_type: '',
          title: '',
          content: '',
          sort: '',
          id: ''
        },
        formRules: {
          sort: [{ required: true, message: '请输入数字0-999' }],
          title: [{ required: true, message: '输入标题', trigger: 'blur' }],
          content: [{ required: true, message: '输入内容', trigger: 'blur' }],
          promotion_type: [{ required: true, message: '选择促销分类', trigger: 'blur' }]
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
      this.fectchShopMessageList(1)
    },
    methods: {
      fectchShopMessageList(page) {
        shopMessageList({ page }).then(response => {
          const data = response.data
          this.count = Number(data.count)
          this.tableData = data.list
        }).catch(error => {
          console.log(error)
        })
      },
      selectPromotionType() {
        this.fectchShopMessageList(1)
      },
      editCurrentRow(index) {
        this.dialogVisible = true
        this.form = this.tableData[index]
        this.isAdd = false
      },
      deleteCurrentRow(index) {
        const data = this.tableData[index]
        this.$confirm('确认删除促销信息：')
          .then(_ => {
            shopMessageDelete({ id: data.id }).then(response => {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.page = 1
              this.fectchShopMessageList(1)
            }).catch(error => {
              console.log(error)
            })
          })
          .catch(_ => {})
      },
      createShopMessage() {
        this.dialogVisible = true
        this.$delete(this.form, 'id')
        this.$delete(this.form, 'content')
        this.$delete(this.form, 'title')
        this.$delete(this.form, 'sort')
        this.$delete(this.form, 'promotion_type')
        this.$set(this.form, 'shop_id', this.shopId)
        this.isAdd = true
      },
      onSubmit() {
        this.$refs.form.validate(valid => {
          if (valid) {
            if (this.isAdd) {
              shopMessageAdd(this.form).then(response => {
                this.dialogVisible = false
                this.$message({
                  message: '添加促销公告成功',
                  type: 'success'
                })
                this.page = 1
                this.fectchShopMessageList(1)
              }).catch(error => {
                console.log(error)
              })
            } else {
              shopMessageModify(this.form).then(response => {
                this.dialogVisible = false
                this.$message({
                  message: '修改促销公告成功',
                  type: 'success'
                })
                this.page = 1
                this.fectchShopMessageList(1)
              }).catch(error => {
                console.log(error)
              })
            }
          }
        })
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`)
        this.fectchShopMessageList(val)
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
