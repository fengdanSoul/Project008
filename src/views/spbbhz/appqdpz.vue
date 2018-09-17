<template lang="html">

  <div class="sp_container">
    <div class="bg_white">
      <div class="part_top">
          <p class="color_zywz top_label">APP启动页图片</p>
      </div>

      <hr>

      <el-container style="margin-top: 20px">
        <el-aside width="300px">
          <div class="form_part">
            <el-form ref="form"  :model="form" >
              <el-form-item>
                <el-upload
                  class="avatar-uploader"
                  action=""
                  :http-request="uploadImage"
                  :show-file-list="false"
                  accept="image/jpeg,image/jpg,image/png,image/gif"
                  :before-upload="beforeAvatarUpload">
                  <i class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="onSubmit" :disabled="form.boot_src.length<=0">确定</el-button>
              </el-form-item>

            </el-form>
          </div>
        </el-aside>
        <el-main >
          <img v-if="form.boot_src" :src="form.boot_src" class="avatar">
        </el-main>
      </el-container>



      <div v-if="bannerList.length>0" class="bottom center" style="width: 414px">
        <el-carousel height="736px" >
          <el-carousel-item v-for="item in bannerList" :key="item.id">
            <img :src="item.banner_src" alt="">
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>

</template>

<script>
  import { uploadBannerImage } from '@/api/upload'
  import adminReportForm from '@/api/adminReportForm'
  export default {
    data() {
      return {
        form: {
          sort: '',
          boot_src: ''
        },
        formRules: {
          sort: [
            { required: true, message: '请输入数字0-999', trigger: 'blur' },
            { type: 'number', message: '请输入数字', trigger: 'blur' }
          ],
          boot_src: [{ required: true, message: '上传图片', trigger: 'blur' }]
        },
        bannerList: []
      }
    },
    created() {
      adminReportForm.bootList().then(res => {
        this.bannerList = res.data
      })
    },
    methods: {
      onSubmit() {
        console.log('submit!')
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isLt2M
      },
      uploadImage(params) {
        uploadBannerImage(params.file).then(response => {
          this.$set(this.form, 'boot_src', response.data)
        }).catch(error => {
          console.log(error)
        })
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
    width: 414px;
    height: 736px;
    display: inline-block;
  }
</style>
