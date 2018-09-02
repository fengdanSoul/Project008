<template lang="html">

  <div class="sp_container">
    <div class="bg_white">
      <div class="part_top">
          <p class="color_zywz top_label">平台商品基本信息（SPU）</p>
      </div>
      <hr>

      <div class="form_part center">
          <el-form ref="form" :rules="formRules" :model="form" label-width="130px">

            <el-form-item label="平台商品分类" prop="category_id">
              <el-select v-model="form.category_id" placeholder="请选择">
                <el-option
                  v-for="item in categoryList"
                  :key="item.id"
                  :label="item.category_name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="平台商品品牌" prop="brand_id">
              <el-select v-model="form.brand_id" placeholder="请选择">
                <el-option
                  v-for="item in brandList"
                  :key="item.id"
                  :label="item.brand_name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="商品名称" prop="product_name">
              <el-input v-model="form.product_name"></el-input>
            </el-form-item>
            <el-form-item label="商品编码" prop="product_code">
              <el-input v-model="form.product_code"></el-input>
            </el-form-item>

            <el-form-item label="详情描述" prop="product_description">
              <el-input type="textarea" v-model="form.product_description"></el-input>
            </el-form-item>

            <el-form-item label="商品照片" prop="product_img">
              <!--<el-upload-->
                <!--class="avatar-uploader"-->
                <!--accept="image/jpeg,image/jpg,image/png,image/gif"-->
                <!--action=""-->
                <!--:show-file-list="false"-->
                <!--:before-upload="beforeAvatarUpload">-->
                <!--<img v-if="form.product_img" :src="form.product_img" class="avatar">-->
                <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
              <!--</el-upload>-->

              <el-upload
                class="upload-demo"
                accept="image/jpeg,image/jpg,image/png,image/gif"
                action=""
                :http-request="uploadImage"
                :on-remove="handleRemove"
                :before-upload="beforeAvatarUpload"
                :file-list="fileList"
                list-type="picture">
                <el-button size="small" type="success">点击上传图片</el-button>
                <div slot="tip" class="el-upload__tip">只能上传小于2M的图片文件</div>
              </el-upload>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" :loading="loading" @click="submitForm('form')">创建</el-button>
              <el-button @click="resetForm('form')">重置</el-button>
            </el-form-item>

          </el-form>
      </div>

    </div>
  </div>

</template>

<script>
  import { productSpuAdd, brandList, categoryList } from '@/api/adminGoodsDB'
  import { uploadDisplayImage } from '@/api/upload'

  export default {
    data() {
      return {
        form: {
          category_id: '',
          brand_id: '',
          product_name: '',
          product_img: '',
          product_code: '',
          product_description: ''
        },
        formRules: {
          category_id: [{ required: true, message: '选择商品类型' }],
          brand_id: [{ required: true, message: '选择品牌类型' }],
          product_name: [{ required: true, message: '输入商品名称' }],
          product_img: [{ required: true, message: '添加商品图片' }],
          product_code: [{ required: true, message: '输入商品编码' }],
          product_description: [{ required: true, message: '输入商品描述' }]
        },
        brandList: [],
        categoryList: [],
        fileList: [
        ],
        fileUrlList: [
        ],
        loading: false
      }
    },
    created() {
      this.fetchBrandList()
      this.fetchCategoryList()
    },
    methods: {
      fetchBrandList() {
        brandList({ page: 0, like_name: '' }).then(response => {
          const data = response.data
          this.brandList = data.list
        }).catch(error => {
          console.log(error)
        })
      },
      fetchCategoryList() {
        categoryList({ page: 0, like_name: '' }).then(response => {
          const data = response.data
          this.categoryList = data.list
        }).catch(error => {
          console.log(error)
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true
            productSpuAdd(this.form).then(response => {
              const data = response
              this.loading = false
              if (data.status === 'ok') {
                this.resetForm(formName)
                this.$message({
                  message: data.message,
                  type: 'success',
                  duration: 2 * 1000
                })
              }
            }).catch(error => {
              this.$message({
                message: error,
                type: 'error',
                duration: 2.5 * 1000
              })
              this.loading = false
            })
          } else {
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
        this.fileList = []
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isLt2M
      },
      handleRemove(file, fileList) {
        this.fileList = fileList
        this.fileUrlList = this.fileUrlList.filter(t => {
          return t.uid !== file.uid
        })
        this.setBrandImg()
      },
      uploadImage(params) {
        uploadDisplayImage(params.file).then(response => {
          this.fileList.push(params.file)
          this.fileUrlList.push({ name: params.file.name, uid: params.file.uid, url: response.data })
          this.setBrandImg()
        }).catch(error => {
          console.log(error)
        })
      },
      setBrandImg() {
        var arr = []
        this.fileUrlList.forEach(item => {
          arr.push(item.url)
        })
        this.$set(this.form, 'product_img', arr.join(';'))
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
