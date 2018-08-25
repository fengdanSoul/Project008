<template lang="html">
  <div class="sp_container">
    <p class="warn-content sp_title">
      密码修改
    </p>

    <div class="bg_white">
      <hr>
      <div class="form_part center">

        <el-form :model="form" status-icon :rules="formRules" ref="form" label-width="100px" class="demo-ruleForm">
          <el-form-item label="旧密码" prop="oldPassword">
            <el-input type="password" v-model="form.oldPassword" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="password">
            <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="repassword">
            <el-input type="password" v-model="form.repassword" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :loading="loading" @click="submitForm('form')">提交</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>




</template>

<script>
  import { updatePassword } from '@/api/accountSetting'
  export default{
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.form.repassword !== '') {
            this.$refs.form.validateField('repassword')
          }
          callback()
        }
      }
      var validateCheckPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        loading: false,
        form: {
          oldPassword: '',
          password: '',
          repassword: ''
        },
        formRules: {
          oldPassword: [{ required: true, message: '请输入旧密码' }],
          password: [
            { required: true, validator: validatePass, trigger: 'blur' }
          ],
          repassword: [
            { required: true, validator: validateCheckPass, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true
            updatePassword(this.form).then(response => {
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
      }
    }
  }

</script>

<style lang="css">
</style>
