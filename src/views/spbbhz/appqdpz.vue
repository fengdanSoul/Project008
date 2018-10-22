<template lang="html">

  <div class="sp_container">
    <div class="bg_white">
      <div class="part_top">
          <p class="color_zywz top_label">APP启动页图片</p>
      </div>

      <hr>
      <el-table :data="bannerList" border style="width: 100%">
        <el-table-column align='center' prop="update_time" label="更新时间" width="180">
        </el-table-column>
        <el-table-column align='center' prop="id" label="id">
        </el-table-column>
        <el-table-column align='center' prop="boot_src" label="启动图">
          <template slot-scope="scope">
            <img  :src="scope.row.boot_src" alt="" style="width: 50px;height: 100px">
          </template>
        </el-table-column>
        <el-table-column align='center' label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click.native.prevent="handleEdit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--<el-container style="margin-top: 20px">-->
        <!--<el-aside width="300px">-->
          <!--<div class="form_part">-->
            <!--<el-form ref="form"  :model="form" >-->
              <!--<el-form-item>-->
                <!--<el-upload-->
                  <!--class="avatar-uploader"-->
                  <!--action=""-->
                  <!--:http-request="uploadImage"-->
                  <!--:show-file-list="false"-->
                  <!--accept="image/jpeg,image/jpg,image/png,image/gif"-->
                  <!--:before-upload="beforeAvatarUpload">-->
                  <!--<i class="el-icon-plus avatar-uploader-icon"></i>-->
                <!--</el-upload>-->
              <!--</el-form-item>-->

              <!--<el-form-item>-->

                <!--<el-button type="primary" @click="onSubmit" :disabled="form.boot_src.length<=0">确定</el-button>-->
              <!--</el-form-item>-->

            <!--</el-form>-->
          <!--</div>-->
        <!--</el-aside>-->
        <!--<el-main >-->
          <!--<img v-if="form.boot_src" :src="form.boot_src" class="avatar">-->
        <!--</el-main>-->
      <!--</el-container>-->



      <div v-if="bannerList.length>0" class="bottom center" style="width: 414px;margin-top: 20px">
        <el-carousel height="736px" >
          <el-carousel-item v-for="item in bannerList" :key="item.id">
            <img width="100%" :src="item.boot_src" alt="">
          </el-carousel-item>
        </el-carousel>
      </div>
      <!--http://life.tstmobile.com/uploads/image/boot/20180901/a3fea27db5a6fd973e9ccd085bd42080.jpg-->
      <!--<div v-if="bannerList.length>0" class="bottom center" style="width: 414px">-->
        <!--<el-carousel height="736px" >-->
          <!--<el-carousel-item >-->
            <!--<img width="100%" src="http://life.tstmobile.com/uploads/image/boot/20180901/a3fea27db5a6fd973e9ccd085bd42080.jpg" alt="">-->
          <!--</el-carousel-item>-->
          <!--<el-carousel-item>-->
            <!--<img width="100%" src="http://life.tstmobile.com/uploads/image/boot/20180901/a3fea27db5a6fd973e9ccd085bd42080.jpg" alt="">-->
          <!--</el-carousel-item>-->
        <!--</el-carousel>-->
      <!--</div>-->
    </div>
    <el-dialog title="编辑启动图" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <div class="form_part center">
        <el-form ref="form" :rules="formRules" :model="form" label-width="130px">

          <el-form-item label="id：" prop="id">
            <el-input v-model="form.id"></el-input>
          </el-form-item>
          <!--<el-form-item label="路径：" prop="boot_src">-->
            <!--<el-input v-model="form.boot_src"></el-input>-->
          <!--</el-form-item>-->

          <el-form-item label="启动图片：" prop="boot_src">
            <el-upload
              class="avatar-uploader"
              action=""
              :http-request="uploadImage"
              :show-file-list="false"
              accept="image/jpeg,image/jpg,image/png,image/gif"
              :before-upload="beforeAvatarUpload">
              <img v-if="form.boot_src" :src="form.boot_src" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <!--action="http://life.tstmobile.com/api/UploadImage/uploadDisplayImage"-->
          <!--:http-request="uploadImage"-->


          <el-form-item>
            <el-button type="primary" @click="addAndUpdateData">确认</el-button>
            <el-button @click="dialogVisible = false">取消</el-button>
          </el-form-item>

        </el-form>
      </div>

    </el-dialog>
  </div>

</template>

<script>
  import { uploadBannerImage } from '@/api/upload'
  import adminReportForm from '@/api/adminReportForm'
  export default {
    data() {
      return {
        dialogVisible: false,
        form: {
          id: '',
          boot_src: ''
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
      },
      handleEdit(form) {
        this.dialogVisible = true
        this.form = form
      },
      addAndUpdateData() {
        adminReportForm.bootModify(this.form).then(response => {
          this.dialogVisible = false
          this.$message({
            message: '编辑成功',
            type: 'success'
          })
          adminReportForm.bootList().then(res => {
            this.bannerList = res.data
          })
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
