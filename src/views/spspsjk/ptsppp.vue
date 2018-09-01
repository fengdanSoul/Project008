<template lang="html">

  <div class="app-container">
    <div class="filter-container">
      <div class="bg_white serchadd">
        <span class="color_six top_label">平台商品品牌</span>
        <el-input  style="width: 200px;" class="filter-item  search_ipt" v-model="like_name" placeholder="">
        </el-input>
        <el-button class="filter-item search_btn" type="primary" @click="searchData" icon="el-icon-search" >搜索</el-button>

        <el-button class="filter-item right ggcxtjbtn add_btn" @click="createShop" style="margin-left: 10px;"  type="primary" icon="el-icon-edit">创建分类</el-button>
      </div>

      <el-table :data="tableData" border style="width: 100%">
        <el-table-column align='center' prop="id" label="ID" width="180">
        </el-table-column>
        <el-table-column align='center' prop="sort" label="分类权重" width="180">
        </el-table-column>

        <el-table-column align='center' prop="hot_flag" :formatter="formateFHotlag" label="热门推荐" width="180">
        </el-table-column>

        <el-table-column align='center' prop="img" label="品牌图片" width="180">
        </el-table-column>

        <el-table-column align='center' prop="brand_name" label="分类名称">
        </el-table-column>

        <el-table-column align='center' label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click.native.prevent="handleEdit(scope.$index)">编辑</el-button>
            <el-button type="danger" size="mini" @click.native.prevent="handleDelete(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-container">
        <el-pagination @current-change="handleCurrentChange" :current-page="page"  :page-size="10" layout="total, prev, pager, next, jumper" :total="count">
        </el-pagination>
      </div>

      <el-dialog title="创建品牌" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <div class="form_part center">
          <el-form ref="form" :model="form" label-width="130px">
            <el-form-item label="品牌权重：">
              <el-select v-model="form.sort" placeholder="请选择">
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="2"></el-option>
                <el-option label="3" value="3"></el-option>
                <el-option label="4" value="4"></el-option>
                <el-option label="5" value="5"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="热门推荐：">
              <el-select v-model="form.hot_flag" placeholder="请选择">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="品牌名称：">
              <el-input v-model="form.brand_name"></el-input>
            </el-form-item>

            <div class="part_top">
                <p class="color_zywz">品牌图片</p>
            </div>
            <hr style="margin-bottom:18px">
            <el-upload
              class="avatar-uploader"
              action=""
              :show-file-list="false"
              :accept="accepts"
              :http-request="uploadImage"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>


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
  import { brandList, brandAdd, brandModify, brandDelete } from '@/api/adminGoodsDB'
  import { uploadDisplayImage } from '@/api/upload'

  export default {
    data() {
      return {
        dialogVisible: false,
        isAdd: true,
        loading: false,
        accepts: 'image/jpeg,image/jpg,image/png,image/gif',
        imageUrl: '',
        tableData: [
        ],
        form: {
          brand_name: '',
          hot_flag: '',
          sort: 1,
          brand_img: ''
        },
        imgForm: {
          img: ''
        },
        formRules: {
          sort: [{ required: true, message: '选择分类权重' }],
          brand_name: [{ required: true, message: '输入商品品牌名称' }],
          hot_flag: [{ required: true, message: '是否热门' }]
        },
        page: 1,
        count: 0,
        like_name: ''
      }
    },
    created() {
      this.fetchShopList(1, '')
    },
    methods: {
      fetchShopList(currentPage, like_name) {
        brandList({ page: currentPage, like_name: like_name }).then(response => {
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
        this.form.category_name = ''
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
            brandDelete({ id: data.id }).then(response => {
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
          brandAdd(this.form).then(response => {
            this.dialogVisible = false
            this.$message({
              message: '创建商品品牌成功',
              type: 'success'
            })
            this.fetchShopList(1, '')
          }).catch(error => {
            console.log(error)
          })
        } else {
          brandModify(this.form).then(response => {
            this.dialogVisible = false
            this.$message({
              message: '修改商品品牌成功',
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
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw)
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isLt2M
      },
      uploadImage(params) {
        uploadDisplayImage(params.file).then(response => {
          console.log(response)
        }).catch(error => {
          console.log(error)
        })
      },
      formateFHotlag(row) {
        return row.hot_flag === '1' ? '是' : '否'
      }
    }

  }
</script>


<style lang="css">

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
