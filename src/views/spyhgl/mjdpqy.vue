<template lang="html">

  <div class="app-container">
    <div class="filter-container">
      <div class="bg_white serchadd">
        <span class="color_six top_label">店铺区域：</span>
        <el-input v-model="like_name" style="width: 200px;" class="filter-item search_ipt" placeholder="">
        </el-input>
        <el-button class="filter-item search_btn" type="primary" @click="searchData" icon="el-icon-search" >搜索</el-button>

        <el-button class="filter-item right ggcxtjbtn add_btn" @click="createShop" style="margin-left: 10px;"  type="primary" icon="el-icon-edit">创建店铺区域</el-button>
      </div>

      <el-table :data="tableData" border style="width: 100%">
        <el-table-column align='center' prop="id" label="ID" width="180">
        </el-table-column>
        <el-table-column align='center' prop="sort" label="分类权重" width="180">
        </el-table-column>
        <el-table-column align='center' prop="district_name" label="分类名称">
        </el-table-column>

        <el-table-column align='center' label="操作">
          <template slot-scope="scope">
                <el-button type="primary" size="mini" @click.native.prevent="handleEdit(scope.$index)">编辑</el-button>
                <el-button type="danger" size="mini" @click.native.prevent="handleDelete(scope.$index)">删除</el-button>
            </template>
        </el-table-column>
      </el-table>

      <div class="pagination-container">
        <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="total, prev, pager, next, jumper" :total="count">
        </el-pagination>
      </div>

      <el-dialog title="创建店铺区域" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <div class="form_part center">
          <el-form ref="form" :model="form" label-width="130px">
            <el-form-item label="店铺区域权重：">
              <el-select v-model="form.sort" placeholder="请选择">
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="店铺区域名称：">
              <el-input v-model="form.district_name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addAndUpdateData">确认</el-button>
              <el-button @click="dialogVisible = false">取消</el-button>
            </el-form-item>

          </el-form>
        </div>

      </el-dialog>

    </div>
  </div>

</template>

<script>
import { shopDistrictList, addShopDistrict, updateShopDistrict, deleteShopDistrict } from '@/api/adminUserManagement'
export default {
  data() {
    return {
      dialogVisible: false,
      isAdd: true,
      loading: false,
      tableData: [
      ],
      form: {
        sort: 1,
        district_name: ''
      },
      formRules: {
        sort: [{ required: true, message: '选择分类权重' }],
        district_name: [{ required: true, message: '输入商品分类名称' }]
      },
      currentPage: 1,
      count: 0,
      like_name: ''
    }
  },
  created() {
    this.fetchShopList(1, '')
  },
  methods: {
    fetchShopList(currentPage, like_name) {
      shopDistrictList({ page: currentPage, like_name: like_name }).then(response => {
        const data = response.data
        this.count = Number(data.count)
        this.tableData = data.list
      }).catch(error => {
        console.log(error)
      })
    },
    createShop() {
      this.dialogVisible = true
      this.form.sort = 1
      this.form.district_name = ''
      this.isAdd = true
    },
    handleEdit(index) {
      this.dialogVisible = true
      this.form = this.tableData[index]
      this.isAdd = false
    },
    handleDelete(index) {
      const data = this.tableData[index]
      this.$confirm('确认删除？')
        .then(_ => {
          deleteShopDistrict({ id: data.id }).then(response => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.tableData.splice(index, 1)
            this.fetchShopList(1, '')
          }).catch(error => {
            console.log(error)
          })
        })
        .catch(_ => {})
    },
    addAndUpdateData() {
      if (this.isAdd) {
        addShopDistrict(this.form).then(response => {
          this.dialogVisible = false
          this.$message({
            message: '创建店铺分类成功',
            type: 'success'
          })
          this.fetchShopList(1, '')
        }).catch(error => {
          console.log(error)
        })
      } else {
        updateShopDistrict(this.form).then(response => {
          this.dialogVisible = false
          this.$message({
            message: '修改店铺分类成功',
            type: 'success'
          })
          this.fetchShopList(1, '')
        }).catch(error => {
          console.log(error)
        })
      }
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.fetchShopList(val, this.like_name)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    searchData() {
      this.fetchShopList(1, this.like_name)
    }
  }

}
</script>

<style lang="css">
</style>
