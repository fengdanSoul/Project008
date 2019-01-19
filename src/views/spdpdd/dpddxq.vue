<template lang="html">
  <div class="app-container">

    <div class="filter-container">
      <div class="bg_white serchadd">
        <div class="inline_block">
          <p class="color_zywz inline_block top_label"  style="margin-right: 50px">订单信息  </p>
          <span class="color_six right inline_block ddxxzt"  >状态：{{order_state}}</span>
          <span class="color_six right inline_block ddxxzt" style='margin-right:20px' >店铺名：{{orderDetail.shop_name}}</span>
        </div>
        <el-button type="primary" class="right inline_block ddxxzt" @click="handleSend(orderDetail)" v-if="orderDetail.order_state === 'wait_pay'">付款</el-button>
        <el-button type="primary" class="right inline_block ddxxzt" @click="handleSend(orderDetail)" v-else-if="orderDetail.order_state === 'wait_affirm'">确认</el-button>
        <el-button type="primary" class="right inline_block ddxxzt" @click="handleSend(orderDetail)" v-else-if="orderDetail.order_state === 'wait_send'">发货</el-button>
        <el-button type="primary" class="right inline_block ddxxzt" @click="handleSend(orderDetail)" v-else-if="orderDetail.order_state === 'wait_receive'">签收</el-button>
        <el-button type="primary" class="right inline_block ddxxzt" @click="handleSend(orderDetail)" v-else-if="orderDetail.order_state === 'end'" :disabled="orderDetail.order_state === 'end'">已完成</el-button>
        <!--<el-button type='primary' class="right inline_block ddxxzt" @click="cancelOrder">取消</el-button>-->

        <div class="clear">
        </div>
      </div>

      <div class="bg_white ss_box">
        <el-button class="filter-item right" type="primary" @click="dialogPrintVisible = true" >打印/导出Excel</el-button>

        <div class="ss_part">
          <span  class="color_six top_label" style="margin-right:20px">订单号:{{orderDetail.order_number}}</span>

          <span  class="color_six top_label">下单时间：{{orderDetail.order_time}}</span>
        </div>
        <div  class="ss_part">
          <span  class="color_six top_label">预期送货日：</span>
          <el-date-picker class="filter-item" style="width:160px" v-model="orderDetail.delivery_time" type="date" placeholder="开始时间" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
          </el-date-picker>
        </div>

        <div class="ss_part" v-if="orderDetail.order_state === 'wait_receive' || orderDetail.order_state === 'end'">
          <span  class="color_six  top_label ">配送信息：</span>
          <span  class="color_nine  ddxq_span">{{orderDetail.delivery_distributor}}</span>

          <span  class="color_nine  ddxq_span">联系方式：{{orderDetail.delivery_mobile}} &nbsp;&nbsp;&nbsp;{{orderDetail.delivery_vehicle_number}}</span>
        </div>

        <div class="ss_part">
          <span  class="color_six  top_label ">会员信息：</span>
          <span  class="color_nine  ddxq_span"> &nbsp;&nbsp;&nbsp;{{orderDetail.member_name}}</span>
        </div>
        <div class="ss_part">
          <span  class="color_six  top_label ">联系方式：</span>
          <span  class="color_nine  ddxq_span"> &nbsp;&nbsp;&nbsp;{{orderDetail.phone}}</span>
        </div>
        <div class="ss_part">
          <span  class="color_six  top_label ">收货地址：</span>
          <span  class="color_nine  ddxq_span"> &nbsp;&nbsp;&nbsp;{{orderDetail.receiving_address}}</span>
        </div>
      </div>
      <!--0	{…}-->
      <!--child_order_id	62-->
      <!--order_id	17-->
      <!--product_spu_id	17-->
      <!--product_info_id	1-->
      <!--product_price	50.00-->
      <!--product_number	7-->
      <!--product_total_price	350.00-->
      <!--product_code	A2018080622-->
      <!--auxiliary_code	2018080622-->
      <!--product_specification	件-->
      <!--product_description	中国第一好牛奶-->
      <!--product_name	蒙牛牛奶-->
      <!--product_img	[…]-->
      <!--0	/uploads///image/20180803/be74d5f7cc7b134fe701c628948a8982.jpg-->
      <!--1	/uploads///image/20180803/be74d5f7cc7b134fe701c628948a8982.jpg-->
      <!--2	/uploads///image/20180803/be74d5f7cc7b134fe701c628948a8982.jpg-->
      <el-table :data="tableData" border style="width: 100%" >
        <el-table-column align='center' prop="child_order_id" label="ID">
        </el-table-column>
        <el-table-column align='center' prop="product_code" label="商品编码">
        </el-table-column>
        <el-table-column align='center' prop="auxiliary_code" label="辅助码">
        </el-table-column>
        <el-table-column align='center' prop="product_name" label="商品详情">
        </el-table-column>
        <el-table-column align='center' prop="product_specification" label="规格">
        </el-table-column>
        <el-table-column align='center' prop="product_number" label="商品数量" width="150">
          <template slot-scope="scope">
            <div class="counter">
              <!--v-if="orderDetail.order_state === 'wait_affirm'"-->
              <el-button @click="handleDec(scope.row)" size="mini" v-if="orderDetail.order_state === 'wait_affirm'">-</el-button>
              <p class="num">{{scope.row.product_number}}</p>
              <el-button @click="handleInc(scope.row)" size="mini" v-if="orderDetail.order_state === 'wait_affirm'">+</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column align='center' prop="product_price" label="商品单价">
        </el-table-column>
        <el-table-column align='center' prop="product_total_price" label="总金额">
        </el-table-column>
        <el-table-column align='center'  label="商品图片" >
          <template slot-scope="scope">
            <!-- <a class="table_href" href="#/spdpdd/dpddxq">{{scope.row.orderno}}</a> -->
            <img class='tableimg' :src="scope.row.product_img[0]" alt="">
          </template>
        </el-table-column>

      </el-table>

      <div class=" cz_btm bg_white">

        <p class="inline_block" style="margin-left:50px">合计数量：<span class="color_danger">{{total_num}}</span>   </p>
        <p class="inline_block" style="margin-left:50px">合计金额：<span class="color_danger">{{orderDetail.order_total_price}}</span></p>

        <!--<el-button type='primary' class="right" @click="shopOrderModify" v-if="orderDetail.order_state === 'wait_pay' || orderDetail.order_state === 'wait_affirm'">编辑/保存</el-button>-->

        <div class="clear">

        </div>
      </div>
    </div>

    <el-dialog title="订单确认" :visible.sync="dialogConfirmVisible">
      <el-form ref="payForm" :model="payForm" :rules="payFormRules">
        <el-form-item label="支付方式" label-width="120px" prop="pay_type">
          <el-select v-model="payForm.pay_type" placeholder="请选择支付方式" v-if="payForm">
            <!--<el-option value="1" :label="payType['1'][0]" v-if="payType['1'].length"></el-option>-->
            <!--<el-option value="2" :label="payType['2'][0]" v-if="payType['2'].length"></el-option>-->
            <!--<el-option value="3" :label="payType['3'][0]" v-if="payType['3'].length"></el-option>-->
            <el-option value="1" label="线下转账"></el-option>
            <el-option value="2" label="货到付款"></el-option>
            <el-option value="3" label="赊销"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="支付类型" label-width="120px" prop="pay_method">
          <el-select v-model="payForm.pay_method" placeholder="请选择支付类型">
            <el-option value="bank" label="银行卡"></el-option>
            <el-option value="alipay" label="支付宝"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogConfirmVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmOrder">确 认</el-button>
      </div>
    </el-dialog>

    <el-dialog title="选择配送人员" :visible.sync="dialogdeliveryVisible">
      <el-form ref="deliveryForm" :model="deliveryForm" :rules="deliveryFormRules">
        <el-form-item label="配送人" label-width="120px" prop="id">
          <el-select v-model="deliveryForm.id">
            <el-option v-for="item in deliveryList" :key="item.id" :value="item.id" :label="item.distributor"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogdeliveryVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmDelivery">确 认</el-button>
      </div>
    </el-dialog>



    <el-dialog title="订单" :visible.sync="dialogPrintVisible"  width="80%">
        <vue-easy-print tableShow ref="easyPrint" >
          <div style="width: 800px; margin: auto">
            <p style="text-align: center">销货单</p>
            <el-row>
              <el-col :span="8">
                <div class="grid-content">
                  店铺名：{{orderDetail.shop_name}}
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content ">
                  下单日期：{{orderDetail.order_time}}
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content ">
                </div>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <div class="grid-content">
                  订单编号：{{orderDetail.order_number}}
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content ">
                  预期送货日期：{{orderDetail.delivery_time}}
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content ">
                </div>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <div class="grid-content">
                  送货地址：{{orderDetail.receiving_address}}
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content ">
                  联系人：{{orderDetail.member_name}}
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content ">
                  联系电话：{{orderDetail.phone}}
                </div>
              </el-col>
            </el-row>



            <el-table :data="tableData" show-summary :summary-method="getSummaries" border  >
              <el-table-column align='center' prop="product_code" label="商品编码">
              </el-table-column>
              <el-table-column align='center' prop="product_name" label="商品名称">
              </el-table-column>
              <el-table-column align='center' prop="product_specification" label="规格">
              </el-table-column>
              <el-table-column align='center' prop="product_unit" label="单位">
                <!--<template slot-scope="scope">-->
                  <!--<span>件</span>-->
                <!--</template>-->
              </el-table-column>
              <el-table-column align='center' prop="product_number" label="商品数量">
              </el-table-column>
              <el-table-column align='center' prop="product_price" label="商品单价">
              </el-table-column>
              <el-table-column align='center' prop="product_total_price" label="金额">
              </el-table-column>
            </el-table>

            <el-row>
              <el-col :span="8">
                <div class="grid-content">
                  制单人：{{admin_name}}
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content ">
                  送货人：{{orderDetail.delivery_distributor}}
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content ">
                  收货人：{{orderDetail.member_name}}
                </div>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <div class="grid-content">
                  打印日期：{{dateFormat(new Date(), "yyyy/mm/dd")}}
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content ">
                  打印人：{{admin_name}}
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content ">
                </div>
              </el-col>
            </el-row>
          </div>
        </vue-easy-print>

      <table id="tableExcel" v-show="false">
        <!--头部-->
        <thead>
        <tr>
          <td>店铺名：</td>
          <td>{{orderDetail.shop_name}}</td>
          <td>下单日期：</td>
          <td>{{orderDetail.order_time}}</td>
        </tr>
        <tr>
          <td>订单编号：</td>
          <td>{{orderDetail.order_number}}</td>
          <td>预期送货日期：</td>
          <td>{{orderDetail.delivery_time}}</td>
        </tr>
        <tr>
          <td>送货地址：</td>
          <td>{{orderDetail.receiving_address}}</td>
          <td>联系人：</td>
          <td>{{orderDetail.member_name}}</td>
          <td>联系电话：</td>
          <td>{{orderDetail.phone}}</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        </thead>
        <!--内容-->
        <tbody>
        <tr>
          <td>商品编码</td>
          <td>商品名称</td>
          <td>规格</td>
          <td>单位</td>
          <td>商品数量</td>
          <td>商品单价</td>
          <td>金额</td>
        </tr>
        <tr v-for="item in tableData">
          <td>{{ item.product_code }}</td>
          <td>{{ item.product_name }}</td>
          <td>{{ item.product_specification }}</td>
          <td>{{ item.product_unit }}</td>
          <td>{{ item.product_number }}</td>
          <td>{{ item.product_price }}</td>
          <td>{{ item.product_total_price }}</td>
        </tr>
        <tr>
          <td>总价</td>
          <td></td>
          <td></td>
          <td></td>
          <td>{{ total_num }}</td>
          <td></td>
          <td>{{orderDetail.order_total_price}}</td>
        </tr>
        </tbody>
        <!--底部-->
        <tfoot>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>制单人：</td>
          <td>{{admin_name}}</td>
          <td>送货人：</td>
          <td>{{orderDetail.delivery_distributor}}</td>
          <td>收货人：</td>
          <td>{{orderDetail.member_name}}</td>
        </tr>
        <tr>
          <td>打印日期：</td>
          <td>{{dateFormat(new Date(), "yyyy/mm/dd")}}</td>
          <td>打印人：</td>
          <td>{{admin_name}}</td>
        </tr>
        </tfoot>
      </table>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPrintVisible = false">取 消</el-button>
        <el-button type="primary" @click="print">确认打印</el-button>
        <el-button  :loading="downloadLoading" type="primary" @click="handleDownload">导出Excel</el-button>

      </div>
    </el-dialog>
  </div>

</template>

<script>
import { parseTime } from '@/utils'
import { shopDetails } from '@/api/shop'
import { shopOrderDetails, shopOrderCancel } from '@/api/shopOrder' //, shopOrderDelivery, shopOrderFlag,
import { shopDeliveryList } from '@/api/shop'
import { shopPayType, shopPayNumber, shopOrderPay, shopOrderDelivery, shopOrderFlag, shopOrderInventoryModify } from '@/api/shopOrder' // shopOrderDelivery, shopOrderDelivery, shopOrderFlag, shopOrderDetails
import vueEasyPrint from 'vue-easy-print'
var tableExport = require('table-export')
var dateFormat = require('dateformat')
export default {
  components: {
    vueEasyPrint
  },
  data() {
    return {
      company_name:	'',
      admin_name:	'',
      tableData: [
      ],
      dateFormat: dateFormat,
      tatol: '66',
      tatolamt: '999.99',
      orderDetail: {},
      deliveryList: [],
      dialogVisible: false,
      loading: false,
      payType: {},
      payForm: {
        order_id: '',
        pay_type: '',
        pay_method: ''
      },
      payFormRules: {
        pay_type: [{ required: true, message: '选择支付方式', trigger: 'blur' }],
        pay_method: [{ required: true, message: '选择支付类型', trigger: 'blur' }]
      },
      deliveryForm: {
        order_id: '',
        id: '',
        distributor: ''
      },
      deliveryFormRules: {
        id: [{ required: true, message: '选择配送员', trigger: 'blur' }]
      },
      count: 0,
      page: 1,
      pay_type: '',
      start_time: '',
      end_time: '',
      like_name: '',
      dialogConfirmVisible: false,
      dialogdeliveryVisible: false,
      dialogPrintVisible: false,
      filename: '',
      autoWidth: true,
      bookType: 'xlsx',
      downloadLoading: false
    }
  },
  computed: {
    order_state() {
      const state = this.orderDetail.order_state
      if (state === 'wait_pay') {
        return '待付款'
      } else if (state === 'wait_affirm') {
        return '待确认'
      } else if (state === 'wait_send') {
        return '待发货'
      } else if (state === 'wait_receive') {
        return '待收货'
      } else if (state === 'end') {
        return '已签收'
      }
      return '未知'
    },
    total_num() {
      var num = 0
      this.tableData.forEach(item => {
        num += parseInt(item.product_number)
      })
      return num
    }
  },
  created() {
    this.fetchShopDetails()
    this.fetchShopOrderDetails()
  },
  methods: {
    fetchShopDetails() {
      shopDetails().then(response => {
        this.company_name = response.data.company_name
        this.admin_name = response.data.admin_name
      }).catch(error => {
        console.log(error)
      })
    },
    fetchShopOrderDetails() {
      shopOrderDetails({ order_id: this.$route.params.id }).then(res => {
        this.orderDetail = res.data
        this.tableData = res.data.orderDetails

        this.tableData.forEach(item => {
          this.$set(item, 'product_unit', '件')
        })
        this.filename = this.orderDetail.order_number
      })
    },
    cancelOrder() {
      shopOrderCancel({ order_id: this.$route.params.id }).then(res => {
        this.$message.success('取消成功')
      })
    },
    fetchShopDeliveryList() {
      shopDeliveryList({ page: 0 }).then(res => {
        this.deliveryList = res.data.list
      })
    },
    handleSend(item) {
      if (item.order_state === 'wait_pay') { // 确认
        // shopOrderFlag({ order_id: item.order_id, order_state: 'wait_affirm' }).then(res => {
        //   this.$message.success('签收成功')
        //   this.page = 1
        // })
        // this.fetchShopOrderDetails()
        // return
        this.payForm.order_id = item.order_id
        shopPayType().then(res => {
          this.payType = res.data
          this.dialogConfirmVisible = true
        })
        shopPayNumber().then(res => {
          console.log(res)
        })
      } else if (item.order_state === 'wait_affirm' || item.order_state === 'wait_send') {
        this.fetchShopDeliveryList()
        this.dialogdeliveryVisible = true
        this.deliveryForm.order_id = item.order_id
      } else if (item.order_state === 'wait_receive') {
        shopOrderFlag({ order_id: item.order_id, order_state: 'end' }).then(res => {
          this.$message.success('签收成功')
          this.page = 1
        })
        this.fetchShopOrderDetails()
      }
    },
    confirmOrder() {
      this.$refs.payForm.validate(valid => {
        if (valid) {
          shopOrderPay(this.payForm).then(response => {
            this.dialogConfirmVisible = false
            this.$message({
              message: '确认成功',
              type: 'success'
            })
            this.page = 1
            this.fetchShopOrderDetails()
          }).catch(error => {
            console.log(error)
          })
        }
      })
    },
    confirmDelivery() {
      this.$refs.deliveryForm.validate(valid => {
        if (valid) {
          shopOrderDelivery({ order_id: this.deliveryForm.order_id, delivery_id: this.deliveryForm.id }).then(res => {
            this.dialogdeliveryVisible = false
            this.deliveryForm = {
              order_id: '',
              id: '',
              distributor: ''
            }
            this.$message.success(res.message)
            this.page = 1
            this.fetchShopOrderDetails()
          })
        }
      })
    },
    handleDec(item) { // 递减
      if (item.product_number <= 0) {
        // this.$message.success('加单成功')
        return
      }
      item.product_number--
      shopOrderInventoryModify({ child_order_id: item.child_order_id, product_number: item.product_number }).then(res => {
        this.fetchShopOrderDetails()
      }).catch(error => {
        console.log(error)
        item.product_number++
      })
    },
    handleInc(item) { // 递增
      item.product_number++
      shopOrderInventoryModify({ child_order_id: item.child_order_id, product_number: item.product_number }).then(res => {
        this.fetchShopOrderDetails()
      }).catch(error => {
        console.log(error)
        item.product_number--
      })
    },
    shopOrderModify() {
      // shopOrderInventoryModify().
    },
    print() {
      // Pass the element id here
      this.$refs.easyPrint.print()
    },
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总价'
          return
        } else if (index === 1 || index === 2 || index === 3 || index === 5) {
          sums[index] = ''
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
        } else {
          sums[index] = ''
        }
      })

      return sums
    },
    handleDownload() {
      console.log('-----------------')
      // dom id, filename, type: json, txt, csv, xml, doc, xsl, image, pdf
      tableExport('tableExcel', this.filename, 'xls')

      // this.downloadLoading = true
      // import('@/vendor/Export2Excel').then(excel => {
      //   const tHeader = ['商品编码', '商品名称', '规格', '单位', '商品数量', '商品单价', '金额']
      //   const filterVal = ['product_code', 'product_name', 'product_specification', 'product_unit', 'product_number', 'product_price', 'product_total_price']
      //   const list = this.tableData
      //   const data = this.formatJson(filterVal, list)
      //   excel.export_json_to_excel({
      //     header: tHeader,
      //     data,
      //     filename: this.filename,
      //     autoWidth: this.autoWidth,
      //     bookType: this.bookType
      //   })
      //   this.downloadLoading = false
      // })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>

<style lang="css">
  .grid-content {
    min-height: 30px;
  }
</style>
