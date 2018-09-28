<template lang="html">

  <div class="sp_container">
    <div class="bg_white">
      <div class="part_top">

          <p class="color_zywz top_label">创建陈列任务</p>


      </div>

      <hr>

      <div class="form_part center">
          <el-form ref="form"  :model="form" :rules="formRules" label-width="100px">

            <el-form-item label="所属门店：" prop="member_id">
              <el-select v-model="form.member_id" placeholder="请选择">
                <el-option
                  v-for="item in memberList"
                  :key="item.member_id"
                  :label="item.shop_name"
                  :value="item.member_id">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="陈列主题：" prop="title">
              <el-input v-model="form.title"></el-input>
            </el-form-item>

            <el-form-item label="陈列内容：" prop="content">
              <el-input type="textarea" v-model="form.content"></el-input>
            </el-form-item>
            <el-form-item label="反馈图片" prop="display_img">

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
            <br/><br/>
            <el-form-item>
              <el-button type="primary" @click="submitForm">创建</el-button>
              <el-button @click="resetForm">重置</el-button>
             </el-form-item>


          </el-form>
      </div>

    </div>
  </div>

</template>

<script>
  import adminReportForm from '@/api/adminReportForm'
  import { uploadDisplayImage } from '@/api/upload'
  export default {
    data() {
      return {
        form: {
          member_id: '',
          title: '',
          content: '',
          display_img: ''
        },
        formRules: {
          member_id: [{ required: true, message: '选择门店' }],
          title: [{ required: true, message: '输入标题' }],
          content: [{ required: true, message: '输入商内容' }],
          display_img: [{ required: true, message: '添加陈列图片' }]
        },
        fileList: [
        ],
        fileUrlList: [
        ],
        memberList: []
      }
    },
    created() {
      this.fecthData()
    },
    methods: {
      fecthData() {
        adminReportForm.getMemberList().then(res => {
          this.memberList = res.data
        })
      },
      submitForm(formName) {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.loading = true
            adminReportForm.displayAdd(this.form).then(response => {
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
        this.$set(this.form, 'display_img', arr.join(';'))
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
