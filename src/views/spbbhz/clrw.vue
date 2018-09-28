<template lang="html">
  <div class="app-container">
    <div class="filter-container">
      <div class="bg_white serchadd">
        <span class="color_six top_label">搜索：</span>
        <el-input  style="width: 200px;" class="filter-item" v-model="like_name" placeholder="">
        </el-input>
        <el-button class="filter-item" type="primary" @click="searchData" icon="el-icon-search" >搜索</el-button>

        <!--<el-button class="filter-itemer-item right ggcxtjbtn add_btn" style="margin-left: 10px;"  type="primary" icon="el-icon-edit">陈列拍照</el-button>-->

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
        </div>

        <div class="ss_part">
          <span  class="color_six  top_label ">陈列筛选：</span>
          <el-select v-model="member_id" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option
              v-for="item in memberList"
              :key="item.member_id"
              :label="item.shop_name"
              :value="item.member_id">
            </el-option>
          </el-select>
          <el-select v-model="displayer_id" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option
              v-for="item in displayerList"
              :key="item.displayer_id"
              :label="item.displayer"
              :value="item.displayer_id">
            </el-option>
          </el-select>

        </div>
        <div  class="ss_part">
          <el-button  class="filter-item" type="primary" @click="checkWithDate" align="top">查询</el-button>
          <el-button class="filter-item" @click="resetDate" align="top">重置</el-button>
        </div>

      </div>

      <!--id	10-->
      <!--member_id	21-->
      <!--title	反馈标题-->
      <!--content	反馈内容-->
      <!--displayer_id	21-->
      <!--display_type	2-->
      <!--create_time	2018-08-31 00:00:00-->
      <!--shop_name	特色大镇-->
      <!--displayer_name	周老二-->
      <!--displayImg	[…]-->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column align='center' prop="create_time" label="陈列时间" >
        </el-table-column>
        <el-table-column align='center' prop="shop_name" label="门店名称" >
        </el-table-column>
        <el-table-column align='center' prop="title" label="陈列主题">
        </el-table-column>
        <el-table-column align='center' prop="content" label="陈列内容">
        </el-table-column>
        <el-table-column align='center' prop="img" label="陈列图片">
          <template slot-scope="scope">
            <el-carousel trigger="click" height="100px">
              <el-carousel-item v-for="item in scope.row.displayImg" :key="item">
                <img  :src="item" alt="" style="width: 50px;height: 100px">
              </el-carousel-item>
            </el-carousel>
          </template>
        </el-table-column>
        <el-table-column align='center' prop="displayer_name" label="陈列人">
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
import adminReportForm from '@/api/adminReportForm'
export default {
  data() {
    return {
      tableData: [

      ],
      count: 0,
      page: 1,
      member_id: '',
      displayer_id: '',
      start_time: '',
      end_time: '',
      like_name: '',
      memberList: [],
      displayerList: []
    }
  },
  created() {
    this.fecthData()
    this.fetchDisplayList(1, '', '', '', '', '')
  },
  methods: {
    fecthData() {
      adminReportForm.getMemberList().then(res => {
        this.memberList = res.data
      })
      adminReportForm.getDisplayerList().then(res => {
        this.displayerList = res.data
      })
    },
    fetchDisplayList(page, member_id, displayer_id, start_time, end_time, like_name) {
      adminReportForm.displayList({ page, member_id, displayer_id, start_time, end_time, like_name }).then(res => {
        const data = res.data
        this.count = Number(data.count)
        this.tableData = data.list
      })
    },
    checkWithDate() {
      this.page = 1
      this.like_name = ''
      this.fetchDisplayList(this.page, this.member_id, this.displayer_id, this.start_time, this.end_time, this.like_name)
    },
    resetDate() {
      this.start_time = ''
      this.end_time = ''
      this.member_id = ''
      this.displayer_id = ''
      this.like_name = ''
      this.page = 1
      this.fetchDisplayList(this.page, this.member_id, this.displayer_id, this.start_time, this.end_time, this.like_name)
    },
    searchData() {
      this.start_time = ''
      this.end_time = ''
      this.member_id = ''
      this.displayer_id = ''
      this.page = 1
      this.fetchDisplayList(this.page, this.member_id, this.displayer_id, this.start_time, this.end_time, this.like_name)
    }
  }

}
</script>

<style lang="css">


</style>
