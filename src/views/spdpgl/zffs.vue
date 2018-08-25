<template >
  <div class="sp_container">
    <br>

    <div class="bg_white">

      <div class="part_top">
          <p class="color_zywz top_label">线下商家交易 </p>
      </div>
      <hr>
      <div class="form_part center">
        <el-form ref="form" :rules="formRules" :model="form" label-width="100px">

          <el-form-item label="支付方式" prop="type">
            <el-checkbox-group v-model="form.type" :min="1" :max="3">
              <el-checkbox label="offline_transfer_flag" name="type">线下转账</el-checkbox>
              <el-checkbox label="pay_delivery_flag" name="type">货到付款</el-checkbox>
              <el-checkbox label="tally_flag" name="type">赊销</el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="支付宝账号" prop="alipay_number">
            <el-input name="alipay_number" v-model="form.alipay_number"></el-input>
          </el-form-item>

          <el-form-item label="银行卡号" prop="bank_number">
            <el-input name="bank_number" v-model.number="form.bank_number"></el-input>
          </el-form-item>

          <el-form-item label="开户行名称" prop="bank_name">
            <el-input name="bank_name" v-model="form.bank_name"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" size="medium" v-bind:loading="loading" @click="onSubmit">保存</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>

        </el-form>

      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import { mapGetters } from 'vuex'
  import { payModify } from '@/api/shop'
  const payType = ['offline_transfer_flag', 'pay_delivery_flag', 'tally_flag']
  export default{
    data() {
      return {
        form: {
          type: ['offline_transfer_flag'],
          alipay_number: '',
          bank_number: '',
          bank_name: '',
          remark: ''
        },
        formRules: {
          type: [{ required: true, message: '选择支付方式' }],
          alipay_number: [{ required: true, message: '输入支付宝账号' }],
          bank_number: [{ required: true, message: '输入银行卡卡号' },
            { type: 'number', message: '卡号为数字值' }],
          bank_name: [{ required: true, message: '输入银行名称' }]
        },
        loading: false
      }
    },
    computed: {
      ...mapGetters({
        uuid: 'uuid',
        token: 'token'
      })
    },
    methods: {
      onSubmit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.getPayWay()
            this.loading = true
            const _this = this
            console.log(this.form)
            payModify(this.form).then(response => {
              const data = response
              this.loading = false
              if (data.status === 'ok') {
                _this.resetForm()
                _this.$message({
                  message: data.message,
                  type: 'success',
                  duration: 2 * 1000
                })
              }
            }).catch(error => {
              _this.$message({
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
      resetForm() {
        this.$refs.form.resetFields()
      },
      getPayWay() {
        payType.forEach(type => {
          this.$set(this.form, type, 0)
        })
        this.form.type.forEach((item) => {
          this.$set(this.form, item + '', 1)
        })
      }
    }
  }

</script>

<style media="screen">

</style>
