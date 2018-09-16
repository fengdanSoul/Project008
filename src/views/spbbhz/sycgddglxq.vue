<template lang="html">
  <div class="app-container">
    <!--order_id	17-->
    <!--order_number	ST2018082720142636480-->
    <!--member_id	21-->
    <!--shop_id	8-->
    <!--order_state	wait_receive-->
    <!--order_total_price	2690.00-->
    <!--delivery_distributor	马云-->
    <!--delivery_mobile	18288886666-->
    <!--delivery_vehicle_number	沪A8888666-->
    <!--delivery_time	2018-08-28 00:00:00-->
    <!--order_time	2018-08-27 20:14:26-->
    <!--order_type	2-->
    <!--pay_type	1-->
    <!--remark-->
    <!--shop_name	特色大镇-->
    <!--member_name	周老二-->
    <!--district_id	5011-->
    <!--receiving_address	上海市浦东新区新阳大厦-->
    <!--orderDetails	[…]-->


    <div class="filter-container">
      <div class="bg_white serchadd">
        <p class="color_zywz inline_block top_label">常规订单信息  </p>
        <span class="color_six right inline_block ddxxzt"  >状态：{{order_state}}</span>
        <span class="color_six right inline_block ddxxzt" style='margin-right:20px' >店铺名：{{orderDetail.shop_name}}</span>
        <div class="clear">
        </div>
      </div>

      <div class="bg_white ss_box">
        <div class="ss_part">
          <span  class="color_six top_label" style="margin-right:20px">订单号:{{orderDetail.order_number}}</span>

          <span  class="color_six top_label">下单时间：{{orderDetail.order_time}}</span>
        </div>
        <div  class="ss_part">
          <span  class="color_six top_label">预期送货日：</span>
          <el-date-picker class="filter-item" style="width:160px" v-model="orderDetail.delivery_time" type="date" placeholder="开始时间" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
          </el-date-picker>
        </div>

        <div class="ss_part">
          <span  class="color_six  top_label ">配送信息：</span>
          <el-select v-model="orderDetail.delivery_distributor">
          <el-option :label="orderDetail.delivery_distributor"></el-option>
          </el-select>
          <!--<el-select v-model="orderDetail.delivery_distributor" placeholder="请选择">-->
          <!--<el-option-->
              <!--v-for="item in peisongxx"-->
              <!--:key="item.value"-->
              <!--:label="item.label"-->
              <!--:value="item.value">-->
            <!--</el-option>-->
          <!--</el-select>-->

          <span  class="color_nine  ddxq_span">联系方式：{{orderDetail.delivery_mobile}} &nbsp;&nbsp;&nbsp;{{orderDetail.delivery_vehicle_number}}</span>
        </div>

        <div class="ss_part">
          <span  class="color_six  top_label ">会员信息：</span>
          <!--<el-select>-->
            <!--<el-option-->
              <!--:label="orderDetail.member_name">-->
            <!--</el-option>-->
          <!--</el-select>-->
          <!--<el-select v-model="value2" placeholder="请选择">-->
            <!--<el-option-->
              <!--v-for="item in huiyuanxx"-->
              <!--:key="item.value"-->
              <!--:label="item.label"-->
              <!--:value="item.value">-->
            <!--</el-option>-->
          <!--</el-select>-->

          <span  class="color_nine  ddxq_span"> &nbsp;&nbsp;&nbsp;{{orderDetail.member_name}}</span>

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
      <el-table :data="tableData" border style="width: 100%">
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
        <el-table-column align='center' prop="product_number" label="商品数量">
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
        <el-button type='primary' class="right" disabled="true">编辑/保存</el-button>

        <div class="clear">

        </div>
      </div>
    </div>
  </div>

</template>

<script>
import adminOrder from '@/api/adminOrder'

export default {
  data() {
    return {
      tableData: [
      ],
      tatol: '66',
      tatolamt: '999.99',
      orderDetail: {}
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
        return '签收'
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
    adminOrder.adminAppOrderDetail({ order_id: this.$route.params.id }).then(res => {
      // console.log(res)
      this.orderDetail = res.data
      this.tableData = res.data.orderDetails
    })
  }
}
</script>

<style lang="css">
</style>
