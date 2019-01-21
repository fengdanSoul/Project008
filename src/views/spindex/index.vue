<template>
  <div class="sp_container">
    <p class="warn-content sp_title">
      今日提醒
    </p>
    <el-row :gutter='20'>
      <el-col :span="12" v-if="jrtxs.promotion_1">
        <el-card shadow="always">
          <div class="jrtx_box">
              <div class="jrtx_left">
                    {{jrtxs.promotion_1.title}}
              </div>
              <div class="jrtx_right">
                    {{jrtxs.promotion_1.content}}
              </div>
              <div class="clear_both">
              </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12" v-if="jrtxs.promotion_2">
        <el-card shadow="always">
          <div class="jrtx_box">
            <div class="jrtx_left">
              {{jrtxs.promotion_2.title}}
            </div>
            <div class="jrtx_right">
              {{jrtxs.promotion_2.content}}
            </div>
            <div class="clear_both">
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <p class="warn-content sp_title">
      待处理订单
    </p>
    <el-row :gutter='20'>

      <el-col :span="4" >
        <div class="a_hover_box">


        <el-card shadow="always">
          <div class="dcl_part a_hover_box">
            <p>待付款</p>
            <span >({{orderInfo.wait_pay}})</span>


          </div>

        </el-card>
        <a class="a_hover" href="#"></a>
        </div>
      </el-col>
      <el-col :span="4" >
        <div class="a_hover_box">


        <el-card shadow="always">
          <div class="dcl_part a_hover_box">
            <p>待确认</p>
            <span>({{orderInfo.wait_affirm}})</span>

          </div>
        </el-card>
        <a class="a_hover" href="#"></a>
        </div>
      </el-col>
      <el-col :span="4" >
        <div class="a_hover_box">


        <el-card shadow="always">
          <div class="dcl_part a_hover_box">
          <p>待发货</p>
          <span>({{orderInfo.wait_send}})</span>
        </div>
        </el-card>
          <a class="a_hover" href="#"></a>
          </div>
      </el-col>
      <el-col :span="4" >
        <div class="a_hover_box">
        <el-card shadow="always">
          <div class="dcl_part ">
          <p>待签收</p>
          <span>({{orderInfo.wait_receive}})</span>

        </div>
        </el-card>
        <a class="a_hover" href="#"></a>
      </div>
      </el-col>
      <el-col :span="4" >
        <div class="a_hover_box">
          <el-card shadow="always">
            <div class="dcl_part ">
            <p>已完成</p>
            <span>({{orderInfo.wait_finish}})</span>
            <a class="a_hover" href="#"></a>
          </div>
          </el-card>
          <a href="#" class="a_hover"></a>
        </div>


      </el-col>

    </el-row>



    <p class="warn-content sp_title">
      平台信息提醒
    </p>

    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="信息类型"
        width="180">
      </el-table-column>
      <el-table-column
        prop="sort"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="content"
        label="信息详情">
      </el-table-column>
    </el-table>

  </div>


</template>

<script>
import { mapGetters } from 'vuex'
import { todayRemind, shopOrder } from '@/api/homeInfo'
import { shopMessageList, shopMessageDetails } from '@/api/shop'

export default {
  data() {
    return {
      jrtxs: {},
      orderInfo: {},
      tableData: []

    }
  },
  computed: {
    ...mapGetters({
      role: 'role'
    })
  },
  created() {
    this.fetchData()
    this.fetchShopOrder()
    this.fectchShopMessageList(1, '')
    // if (!this.roles.includes('admin')) {
    //   this.currentRole = 'editorDashboard'
    // }
  },
  methods: {
    fetchData() {
      todayRemind().then(response => {
        const data = response.data
        this.jrtxs = data
      }).catch(error => {
        console.log(error)
      })
    },
    fetchShopOrder() {
      shopOrder().then(response => {
        this.orderInfo = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    fectchShopMessageList(page, promotion_type) {
      shopMessageList({ page, promotion_type }).then(response => {
        const data = response.data.list
        shopMessageDetails({ id: data[0]['id'] }).then(response => {
          this.$set(this.tableData, 0, response.data)
        })
      }).catch(error => {
        console.log(error)
      })
    }
  }
}

</script>

<style>
.dcl_part{
  text-align: center;
}
.dcl_part p{
  font-size: 20px;
  margin-bottom: 6px;
  margin-top: 0px;
  color: #606266
}

.jrtx_left{
  width: 22%;
  float: left;
  color: #666666
}
.jrtx_right{
  width: 78%;
  float: right;
  font-size: 14px;
  line-height: 20px;
  color: #999999
}
.clear_both{
  clear: both;
}
.spjrtx_box{
  padding-left: 20px;
  padding-right: 20px

}
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .sp_border{
    border: 1px solid #cccccc;
  }
  .box_yy{
    box-shadow: 1px 1px 6px  rgba(0, 0, 0, 0.1);
  }


</style>
