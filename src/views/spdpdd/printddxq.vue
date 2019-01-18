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
        <el-button class="filter-item right" type="primary" @click="print" >打印</el-button>

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
      <el-table :data="tableData" border style="width: 100%" id="printMe">
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
  </div>

</template>

<script>
    export default {
      name: 'printddxq'
    }
</script>

<style scoped>

</style>
