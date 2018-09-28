<template lang="html">

  <div class="sp_container">
    <div class="bg_white">
      <div class="part_top">
          <p class="color_zywz top_label">APP banner图片</p>
      </div>
      <hr>
      <el-table :data="bannerList" border style="width: 100%">
        <el-table-column align='center' prop="sort" label="权重">
        </el-table-column>
        <el-table-column align='center' prop="id" label="id">
        </el-table-column>
        <el-table-column align='center' prop="banner_src" label="启动图">
          <template slot-scope="scope">
            <!--http://life.tstmobile.com/uploads/image/boot/20180901/a3fea27db5a6fd973e9ccd085bd42080.jpg-->
            <img  :src="scope.row.banner_src" alt="" style="width: 100px;height: 50px">
          </template>
        </el-table-column>
        <el-table-column align='center' label="操作">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="form_part center">
          <el-form ref="form"  :model="form" :rules="formRules" label-width="150px">
            <el-form-item label="banner权重：" prop="sort" >
              <el-input v-model.number="form.sort" placeholder="请输入数字0-999"></el-input>
            </el-form-item>
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
              <img v-show="form.banner_src.length>0" :src="form.banner_src" class="avatar center">
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit" :disabled="form.banner_src.length<=0">确定</el-button>
              <el-button @click="resetForm" >重置</el-button>
             </el-form-item>
          </el-form>
      </div>

      <div v-if="bannerList.length>0" class="bottom center" style="width: 828px">
        <el-carousel type="card" height="200px" >
          <el-carousel-item v-for="item in bannerList" :key="item.id">
            <img width="100%" :src="item.banner_src" alt="">
          </el-carousel-item>
        </el-carousel>
      </div>

    </div>
  </div>

</template>

<script>
  import adminReportForm from '@/api/adminReportForm'
  import { uploadBannerImage } from '@/api/upload'
  export default {
    data() {
      return {
        form: {
          sort: '',
          banner_src: ''
        },
        formRules: {
          sort: [
            { required: true, message: '请输入数字0-999', trigger: 'blur' },
            { type: 'number', message: '请输入数字', trigger: 'blur' }
          ],
          banner_src: [{ required: true, message: '上传图片', trigger: 'blur' }]
        },
        bannerList: []
      }
    },
    created() {
      adminReportForm.bannerList().then(res => {
        this.bannerList = res.data.list
      })
    },
    methods: {
      onSubmit() {
        adminReportForm.bannerAdd(this.form).then(res => {
          this.$message.success('添加成功成功')
          adminReportForm.bannerList().then(res => {
            this.bannerList = res.data.list
          })
        })
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
          this.$set(this.form, 'banner_src', response.data)
        }).catch(error => {
          console.log(error)
        })
      },
      resetForm() {
        this.$refs.form.resetFields()
      },
      handleDelete(id) {
        adminReportForm.bannerDelete({ id }).then(res => {
          this.$message.success('删除成功')
          adminReportForm.bannerList().then(res => {
            this.bannerList = res.data.list
          })
        })
      }
    }
  }

</script>

<style lang="css">
  .el-carousel__item img {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    height: 100%;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
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
    height: 200px;
    display: block;
    margin-top: 20px;
  }
</style>
