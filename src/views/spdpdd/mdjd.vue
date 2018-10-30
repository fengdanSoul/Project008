<template lang="html">
  <div class="app-container">
    <div class="filter-container">
      <div class="bg_white serchadd">
        <span class="color_six top_label">特殊订单：</span>
        <el-input  style="width: 200px;" v-model="like_name" class="filter-item" placeholder="">
        </el-input>
        <el-button class="filter-item" type="primary" @click="handleFilter" icon="el-icon-search" >搜索</el-button>
      </div>
      <div class="bg_white ss_box">
        <div  class="ss_part">
          <span  class="color_six top_label">时间范围：</span>
          <el-date-picker class="filter-item"
                          style="width:160px"
                          v-model="start_time"
                          type="date"
                          placeholder="开始时间"
                          format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd">
          </el-date-picker>
          <span class="color_zwwz">至</span>
          <el-date-picker class="filter-item"
                          style="width:160px"
                          v-model="end_time"
                          type="date"
                          format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd"
                          placeholder="结束时间">
          </el-date-picker>
          <el-button  class="filter-item" type="primary" @click="checkWithDate" align="top">确定</el-button>
          <el-button class="filter-item" @click="resetDate" align="top">重置</el-button>
        </div>
        <div  class="ss_part">
          <span class="color_six top_label top_sslabel">订单状态：</span>
          <!--wait_pay:待付款; wait_affirm:待确认;wait_send:待发货 ;wait_receive：待确认收货;end：完成 ',）-->
          <el-radio-group v-model="order_state" @change="selectOrderState" size="small">
            <el-radio label="" border>全部</el-radio>
            <el-radio label="wait_pay" border>待付款</el-radio>
            <el-radio label="wait_affirm" border>待确认</el-radio>
            <el-radio label="wait_send" border>待发货</el-radio>
            <el-radio label="wait_receive" border>待签收</el-radio>
            <el-radio label="end" border>已完成</el-radio>
          </el-radio-group>

        </div>
        <div  class="ss_part">
          <span class="color_six top_label top_sslabel">支付方式：</span>
          <el-radio-group v-model="pay_type" @change="selectPayType" size="small">
            <el-radio label="" border>全部</el-radio>
            <el-radio label="1" border>货到付款</el-radio>
            <el-radio label="2" border>线下转账</el-radio>
            <el-radio label="3" border>赊账</el-radio>
          </el-radio-group>
        </div>
      </div>

      <!--order_id	1-->
      <!--order_number	20180814D45789-->
      <!--member_id	1-->
      <!--shop_id	9-->
      <!--order_state	wait_affirm-->
      <!--order_total_price	18000.00-->
      <!--delivery_distributor	周晓刚-->
      <!--delivery_mobile	18221695965-->
      <!--delivery_vehicle_number	沪B7894588-->
      <!--delivery_time	2018-08-14 17:26:03-->
      <!--order_time	2018-08-08 00:00:00-->
      <!--order_type	1-->
      <!--pay_type	1-->
      <!--remark	（1月18批次）光明莫斯利安钻石装简装200g-->
      <!--shop_name	欣凯医药-->
      <!--member_name	安慕希-->
      <!--district_id	5002-->
      <!--receiving_address	上海浦东新区13号-->
      <!--product_total	0-->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column align='center' prop="order_time" label="下单时间" width="180">
        </el-table-column>
        <el-table-column align='center'  label="订单号" width="180">
          <template slot-scope="scope">
            <a class="table_href" :href="'#/spdpdd/dpddxq/'+scope.row.order_id">{{scope.row.order_number}}</a>
          </template>
        </el-table-column>
        <el-table-column align='center' prop="remark" label="订单内容">
        </el-table-column>
        <el-table-column align='center' prop="product_total" label="商品数量">
        </el-table-column>
        <el-table-column align='center' prop="order_total_price" label="订单金额(元)">
        </el-table-column>
        <el-table-column align='center' prop="pay_type" :formatter="formatPayType" label="支付方式">
        </el-table-column>
        <el-table-column align='center' prop="order_state" :formatter="formatOrderState" label="状态">
        </el-table-column>
        <el-table-column align='center' prop="member_name" label="会员名">
        </el-table-column>
        <el-table-column align='center' prop="delivery_distributor" label="配送信息">
        </el-table-column>
        <el-table-column align='center' prop="delivery_id" label="选择配送">
          <template slot-scope="scope">
            <el-select v-model="scope.row.delivery_id">
              <el-option v-for="item in deliveryList" :key="item.id" :value="item.id" :label="item.distributor"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column align='center' label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleSend(scope.row)">发货</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-container">
        <el-pagination @current-change="handleCurrentChange" :current-page="page"  :page-size="10" layout="total, prev, pager, next, jumper" :total="count">
        </el-pagination>
      </div>


    </div>
  </div>


</template>

<script>
  import { mapGetters } from 'vuex'
  import { shopDeliveryList } from '@/api/shop'
  import { shopOrderList, shopOrderDelivery } from '@/api/shopOrder' //, shopOrderDelivery, shopOrderFlag, shopOrderDetails
  export default {
    data() {
      return {
        dialogVisible: false,
        loading: false,
        tableData: [
        ],
        count: 0,
        page: 1,
        order_state: '',
        pay_type: '',
        start_time: '',
        end_time: '',
        like_name: '',
        deliveryList: []
      }
    },
    computed: {
      ...mapGetters({
        shopId: 'shop_id'
      })
    },
    created() {
      this.fectchShopOrderList('', '', '', '', '', 1)
      this.fetchShopDeliveryList()
    },
    methods: {
      fectchShopOrderList(start_time, end_time, order_state, pay_type, like_name, page) {
        shopOrderList({ start_time, end_time, order_state, pay_type, like_name, page }).then(response => {
          const data = response.data
          this.count = Number(data.count)
          this.tableData = data.list
        }).catch(error => {
          console.log(error)
        })
      },
      fetchShopDeliveryList() {
        shopDeliveryList({ page: 0 }).then(res => {
          this.deliveryList = res.data.list
        })
      },
      handleFilter() {
        this.page = 1
        this.fectchShopOrderList('', '', '', '', this.like_name, this.page)
      },
      checkWithDate() {
        if (!this.start_time.length) {
          this.$message.error('请选择开始日期')
          return
        }
        if (!this.end_time.length) {
          this.$message.error('请选择截止日期')
          return
        }
        this.page = 1
        this.fectchShopOrderList(this.start_time, this.end_time, this.order_state, this.pay_type, this.like_name, this.page)
      },
      resetDate() {
        this.start_time = ''
        this.end_time = ''
        this.page = 1
        this.fectchShopOrderList(this.start_time, this.end_time, this.order_state, this.pay_type, this.like_name, this.page)
      },
      selectOrderState() {
        this.page = 1
        this.fectchShopOrderList(this.start_time, this.end_time, this.order_state, this.pay_type, this.like_name, this.page)
      },
      selectPayType() {
        this.page = 1
        this.fectchShopOrderList(this.start_time, this.end_time, this.order_state, this.pay_type, this.like_name, this.page)
      },
      handleSend(item) {
        shopOrderDelivery({ order_id: item.order_id, delivery_id: item.delivery_id }).then(res => {
          this.$message.success(res.message)
          this.page = 1
          this.fectchShopOrderList(this.start_time, this.end_time, this.order_state, this.pay_type, this.like_name, this.page)
        })
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`)
        this.fectchShopOrderList(this.start_time, this.end_time, this.order_state, this.pay_type, this.like_name, val)
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {})
      },
      formatPayType(row) {
        if (row.pay_type === 1) {
          return '货到付款'
        } else if (row.pay_type === 2) {
          return '线下转账'
        } else if (row.pay_type === 3) {
          return '赊账'
        }
        return '未知'
      },
      formatOrderState(row) {
        if (row.order_state === 'wait_pay') {
          return '待付款'
        } else if (row.order_state === 'wait_affirm') {
          return '待确认'
        } else if (row.order_state === 'wait_send') {
          return '待发货'
        } else if (row.order_state === 'wait_receive') {
          return '待签收'
        } else if (row.order_state === 'end') {
          return '已完成'
        }
        return '未知'
      }
    }
  }
</script>


<style lang="css">


</style>
