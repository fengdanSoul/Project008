<template >
  <div class="sp_container">
    <p class="warn-content sp_title ">
      支付方式（多选）
    </p>
    <div class="fkfsxz">
      <el-checkbox v-model="checkbox.offline_transfer_flag" label="线下转账"></el-checkbox>
      <el-checkbox v-model="checkbox.pay_delivery_flag" label="货到付款"></el-checkbox>
      <el-checkbox v-model="checkbox.tally_flag" label="赊销"></el-checkbox>
      <!--<el-checkbox-group v-model="checkList">-->
        <!--<el-checkbox label="线下转账"></el-checkbox>-->
        <!--<el-checkbox label="货到付款"></el-checkbox>-->
        <!--<el-checkbox label="赊销"></el-checkbox>-->
        <!-- <el-checkbox label="禁用" disabled></el-checkbox>
        <el-checkbox label="选中且禁用" disabled></el-checkbox> -->
      <!--</el-checkbox-group>-->
    </div>

    <br>

    <div class="bg_white">


      <div class="part_top">
          <p class="color_zywz top_label">线下商家交易 </p>
      </div>
      <hr>
      <div class="form_part center">
        <el-form ref="form"  :model="form" label-width="100px">
          <el-form-item label="支付宝账号">
            <el-input v-model="form.account"></el-input>
          </el-form-item>

          <el-form-item label="银行卡号">
            <el-input v-model="form.cardno"></el-input>
          </el-form-item>

          <el-form-item label="开户行名称">
            <el-input v-model="form.bankname"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <!--<el-button >取消</el-button>-->
          </el-form-item>

        </el-form>

      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import { mapGetters } from 'vuex'
  import { payModify } from '@/api/shop'
  export default{
    data() {
      return {
        checkbox: {
          offline_transfer_flag: false,
          pay_delivery_flag: false,
          tally_flag: false
        },
        form: {
          account: '',
          cardno: '',
          bankname: ''
        }
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
        const params = {
          uuid: this.uuid,
          token: this.token,
          offline_transfer_flag: this.checkbox.pay_delivery_flag ? 1 : 0,
          pay_delivery_flag: this.checkbox.pay_delivery_flag ? 1 : 0,
          tally_flag: this.checkbox.tally_flag ? 1 : 0,
          alipay_number: this.form.account,
          bank_number: this.form.cardno,
          bank_name: this.form.bankname
        }
        payModify(params).then(response => {
          const data = response.data
          console.log(data)
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }

</script>

<style media="screen">

</style>
