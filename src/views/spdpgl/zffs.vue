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
  import { payModify, shopDetails } from '@/api/shop'
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
    created() {
      this.fetchShopDetails()
    },
    methods: {
      onSubmit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.getPayWay()
            this.loading = true
            const _this = this
            payModify(this.form).then(response => {
              const data = response
              this.loading = false
              if (data.status === 'ok') {
                // this.fetchShopDetails()
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
      },
      fetchShopDetails() {
        shopDetails().then(response => {
          const data = response.data
          this.form.type = []
          if (data.offline_transfer_flag === 1) {
            this.form.type.push('offline_transfer_flag')
          }
          if (data.pay_delivery_flag === 1) {
            this.form.type.push('pay_delivery_flag')
          }
          if (data.tally_flag === 1) {
            this.form.type.push('tally_flag')
          }
          this.form.alipay_number = data.alipay_number
          this.form.bank_number = parseInt(data.bank_number)
          this.form.bank_name = data.bank_name
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
  // "district_id": "5002",
  //   "class_id": "3",
  //   "company_name": "光明支公司",
  //   "admin_name": "周辉",
  //   "shop_type": "1",
  //   "shop_mobile": "18221568888",
  //   "start_money": "999.00",
  //   "business_scope": "水果，蔬菜，牛奶等",
  //   "shop_address": "上海市浦东新区杨南路1899弄",
  //   "shop_img": "/uploads///image/20180803/be74d5f7cc7b134fe701c628948a8982.jpg",
  //   "business_img": "/uploads///image/20180803/be74d5f7cc7b134fe701c628948a8982.jpg",
  //   "attestation_status": "0",
  //   "attestation_time": "0000-00-00 00:00:00",
  //   "offline_transfer_flag": "0",
  //   "pay_delivery_flag": "0",
  //   "tally_flag": "0",
  //   "remark": "我的店全球销量第一",
  //   "alipay_number": "",
  //   "bank_number": "",
  //   "bank_name": "",
  //   "class_name": "豆汁食品",
  //   "district_name": "上海徐汇"
</script>

<style media="screen">

</style>
