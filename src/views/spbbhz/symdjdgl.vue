<template lang="html">
  <div class="app-container">
    <div class="filter-container">
      <div class="bg_white serchadd">
        <span class="color_six top_label">非常规订单：</span>
        <el-input @keyup.enter.native="handleFilter" v-model="like_name" style="width: 200px;" class="filter-item" placeholder="" >
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
          <el-button  class="filter-item" type="primary" @click="checkWithDate" align="top">查询</el-button>
          <el-button class="filter-item" @click="resetDate" align="top">重置</el-button>
        </div>

        <div class="ss_part">
          <!--wait_pay:待付款; wait_affirm:待确认;wait_send:待发货 ;wait_receive：待确认收货;end：完成 '-->
          <span class="color_six top_label top_sslabel">订单状态：</span>
          <el-radio-group v-model="order_state" @change="filterOrder" size="mini">
            <el-radio label="" border>全部</el-radio>
            <el-radio label="wait_pay" border>待付款</el-radio>
            <el-radio label="wait_affirm" border>待确认</el-radio>
            <el-radio label="wait_send" border>待发货</el-radio>
            <el-radio label="wait_receive" border>待收货</el-radio>
            <el-radio label="end" border>签收</el-radio>

          </el-radio-group>
        </div>
        <div class="ss_part">
          <span class="color_six top_label top_sslabel">支付方式：</span>
          <!--1：线下转账；2：货到付款；3：赊销-->
          <el-radio-group v-model="pay_type" @change="filterOrder" size="mini">
            <el-radio label="" border>全部</el-radio>
            <el-radio label="1" border>线下转账</el-radio>
            <el-radio label="2" border>货到付款</el-radio>
            <el-radio label="3" border>赊销</el-radio>
          </el-radio-group>
        </div>
        <div class="ss_part">
          <span class="color_six top_label top_sslabel">店铺筛选：</span>
          <el-radio-group v-model="shop_id" @change="filterOrder" size="mini">
            <el-radio label="" border>全部</el-radio>
            <el-radio v-for="item in shopList" :key="item.shop_id" :label="item.shop_id" border>{{item.company_name}}</el-radio>
          </el-radio-group>
        </div>


      </div>
      <!--"order_id": "17",-->
      <!--"order_number": "ST2018082720142636480",-->
      <!--"member_id": "21",-->
      <!--"shop_id": "8",-->
      <!--"order_state": "wait_receive",-->
      <!--"order_total_price": "2690.00",-->
      <!--"delivery_distributor": "马云",-->
      <!--"delivery_mobile": "18288886666",-->
      <!--"delivery_vehicle_number": "沪A8888666",-->
      <!--"delivery_time": "2018-08-28 00:00:00",-->
      <!--"order_time": "2018-08-27 20:14:26",-->
      <!--"order_type": "2",-->
      <!--"pay_type": "1",-->
      <!--"remark": "",-->
      <!--"shop_name": "特色大镇",-->
      <!--"member_name": "周老二",-->
      <!--"district_id": "5011",-->
      <!--"receiving_address": "上海市浦东新区新阳大厦",-->
      <!--"product_total": "4"-->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column align='center' prop="order_time" label="下单时间" width="180">
        </el-table-column>
        <el-table-column align='center'  label="订单号" width="180">
          <template slot-scope="scope">
            <a class="table_href" href="#/spbbhz/sycgddglxq">{{scope.row.order_number}}</a>
          </template>
        </el-table-column>
        <el-table-column align='center' prop="remark" label="订单内容">
        </el-table-column>
        <el-table-column align='center' prop="product_total" label="商品数量">
        </el-table-column>
        <el-table-column align='center' prop="order_total_price" label="订单金额(元)">
        </el-table-column>
        <el-table-column align='center' prop="member_name" label="会员名">
        </el-table-column>
        <el-table-column align='center' prop="shop_name" label="店铺名">
        </el-table-column>
        <!--<el-table-column align='center' label="操作">-->
        <!--<template slot-scope="scope">-->
        <!--<el-button type="primary" size="mini" @click="handleUpdate(scope.row)">查看</el-button>-->
        <!--</template>-->
        <!--</el-table-column>-->
      </el-table>

      <div class="pagination-container">
        <el-pagination @current-change="handleCurrentChange" :current-page="page"  :page-size="10" layout="total, prev, pager, next, jumper" :total="count">
        </el-pagination>
      </div>


    </div>
  </div>


</template>

<script>
  import { adminShopList } from '@/api/adminUserManagement'

  import adminOrder from '@/api/adminOrder'
  export default {
    data() {
      return {
        shopList: [],
        tableData: [
        ],
        count: 0,
        page: 1,
        start_time: '',
        end_time: '',
        like_name: '',
        order_state: '',
        pay_type: '',
        shop_id: ''
      }
    },
    created() {
      this.fectchAdminShopList()
      this.fetchOrderList(this.like_name, this.start_time, this.end_time, this.order_state, this.pay_type, this.shop_id, this.page)
    },
    methods: {
      fetchOrderList(like_name, start_time, end_time, order_state, pay_type, shop_id, page) {
        adminOrder.adminShopOrderAllList({ like_name, start_time, end_time, order_state, pay_type, shop_id, page }).then(res => {
          const data = res.data
          this.count = Number(data.count)
          this.tableData = data.list
        })
      },
      fectchAdminShopList() {
        adminShopList({ page: 0, attestation_status: '', like_name: '' }).then(response => {
          const data = response.data
          this.count = Number(data.count)
          this.shopList = data.list
        }).catch(error => {
          console.log(error)
        })
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
        this.fetchOrderList(this.like_name, this.start_time, this.end_time, this.order_state, this.pay_type, this.shop_id, this.page)
      },
      resetDate() {
        this.start_time = ''
        this.end_time = ''
        this.page = 1
        this.fetchOrderList(this.like_name, this.start_time, this.end_time, this.order_state, this.pay_type, this.shop_id, this.page)
      },
      handleFilter() {
        this.page = 1
        this.fetchOrderList(this.like_name, this.start_time, this.end_time, this.order_state, this.pay_type, this.shop_id, this.page)
      },
      filterOrder() {
        this.like_name = ''
        this.page = 1
        this.fetchOrderList(this.like_name, this.start_time, this.end_time, this.order_state, this.pay_type, this.shop_id, this.page)
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`)
        this.fectchShopMessageList(val)
      }
    }
  }
</script>

<style lang="css">


</style>
