<template >
<div class="app-container">
  <div class="filter-container">
    <!-- <div class="bg_white serchadd">
      <span class="color_six top_label">反馈搜索：</span>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="" v-model="listQuery.title">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" >搜索</el-button>
    </div> -->
    <div class="bg_white ss_box">
      <div class=" ss_part">
        <span class="color_six top_label">反馈搜索：</span>
        <el-input @keyup.enter.native="handleFilter" v-model="like_name" style="width: 200px;" class="filter-item" placeholder="" >
        </el-input>
        <el-button class="filter-item" type="primary" @click="handleFilter" icon="el-icon-search" >搜索</el-button>
      </div>
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
    </div>

    <div class="bg_white">
      <el-tabs v-model="deal_flag" type="card" @tab-click="selectDealFlag">
        <el-tab-pane label="全部" name="a"></el-tab-pane>
        <el-tab-pane label="未处理" name="0"></el-tab-pane>
        <el-tab-pane label="已处理" name="1"></el-tab-pane>

      </el-tabs>
    </div>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column align='center' prop="create_time" label="反馈时间" width="180">
      </el-table-column>
      <el-table-column align='center' prop="shop_name" label="门店名称" width="180">
      </el-table-column>
      <el-table-column align='center' prop="title" label="反馈主题">
      </el-table-column>
      <el-table-column align='center' prop="content" label="反馈内容">
      </el-table-column>
      <el-table-column align='center' prop="feedback_img" label="反馈图片">
        <template slot-scope="scope">
          <img  :src="scope.row.feedback_img[0]" alt="" style="width: 50px;height: 50px">
        </template>
      </el-table-column>
      <el-table-column align='center' label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleDealFlag(scope.row.id)" :disabled="scope.row.deal_flag === '1'">{{scope.row.deal_flag === '1' ? '已处理' : '处理'}}</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row.id)" >删除</el-button>

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
  import { feedbackList, feedbackFlag, feedbackDelete } from '@/api/shop'
  export default {
    data() {
      return {
        dialogVisible: false,
        isAdd: true,
        loading: false,
        tableData: [
        ],
        form: {
          promotion_type: '',
          title: '',
          content: '',
          sort: '',
          id: ''
        },
        formRules: {
          sort: [
            { required: true, message: '请输入数字0-999', trigger: 'blur' },
            { type: 'number', message: '请输入数字', trigger: 'blur' }
          ],
          title: [{ required: true, message: '输入标题', trigger: 'blur' }],
          content: [{ required: true, message: '输入内容', trigger: 'blur' }],
          promotion_type: [{ required: true, message: '选择促销分类', trigger: 'blur' }]
        },
        count: 0,
        page: 1,
        start_time: '',
        end_time: '',
        like_name: '',
        deal_flag: 'a'
      }
    },
    computed: {
      ...mapGetters({
        shopId: 'shop_id'
      })
    },
    created() {
      this.fectchFeedbackList('', '', '', '', 1)
    },
    methods: {
      fectchFeedbackList(start_time, end_time, deal_flag, like_name, page) {
        feedbackList({ start_time, end_time, deal_flag, like_name, page }).then(response => {
          const data = response.data
          this.count = Number(data.count)
          this.tableData = data.list
        }).catch(error => {
          console.log(error)
        })
      },
      handleFilter() {
        this.page = 1
        this.fectchFeedbackList('', '', '', this.like_name, this.page)
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
        this.fectchFeedbackList(this.start_time, this.end_time, this.deal_flag, this.like_name, this.page)
      },
      resetDate() {
        this.start_time = ''
        this.end_time = ''
        this.page = 1
        this.fectchFeedbackList(this.start_time, this.end_time, this.deal_flag, this.like_name, this.page)
      },
      selectDealFlag() {
        this.page = 1
        this.fectchFeedbackList(this.start_time, this.end_time, this.deal_flag, this.like_name, this.page)
      },
      handleDelete(id) {
        this.$confirm('确认删除？').then(_ => {
          feedbackDelete({ id }).then(response => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.page = 1
            this.fectchFeedbackList(this.start_time, this.end_time, this.deal_flag, this.like_name, this.page)
          }).catch(error => {
            console.log(error)
          })
        })
      },
      handleDealFlag(id) {
        feedbackFlag({ id, dealFlag: 1 }).then(response => {
          this.$message({
            message: '处理成功',
            type: 'success'
          })
          this.page = 1
          this.fectchFeedbackList(this.start_time, this.end_time, this.deal_flag, this.like_name, this.page)
        }).catch(error => {
          console.log(error)
        })
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`)
        this.fectchShopMessageList(val)
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {})
      }
    }
  }
</script>
