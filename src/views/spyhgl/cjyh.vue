<template lang="html">
  <div class="sp_container">
    <p class="warn-content sp_title">
      创建用户
    </p>

    <div class="bg_white">
      <hr>
      <div class="form_part center">
        <el-form ref="form" :rules="formRules"  :model="form" label-width="100px">
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input type='password' v-model="form.password"></el-input>
          </el-form-item>

          <el-form-item label="确认密码" prop="repassword">
            <el-input type='password' v-model="form.repassword"></el-input>
          </el-form-item>

          <el-form-item label="用户角色" prop="role">
            <el-radio-group v-model="form.role">
              <el-radio label="3">业务员</el-radio>
              <el-radio label="2">店铺管理员</el-radio>
              <el-radio label="99">会员</el-radio>
            </el-radio-group>

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
import { isPhone } from '@/utils/validate'
import { memberAdd } from '@/api/adminUserManagement'
export default{
  data() {
    var phonePass = (rule, value, callback) => {
      if (!isPhone(value)) {
        callback(new Error('请输入正确手机号'))
      } else {
        callback()
      }
    }
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
        phone: '',
        password: '',
        repassword: '',
        role: ''
      },
      formRules: {
        phone: [{ required: true, trigger: 'blur', validator: phonePass }],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        repassword: [
          { required: true, validator: validateCheckPass, trigger: 'blur' }
        ],
        role: [
          { required: true, message: '请选择角色' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          memberAdd(this.form).then(response => {
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
