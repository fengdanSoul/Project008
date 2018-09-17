<template lang="html">

  <div class="app-container">
    <div class="filter-container">

      <div class="bg_white serchadd">
          <p class="color_zywz inline_block top_label"  >平台信息通知 </p>
          <el-button class="filter-item right ggcxtjbtn add_btn"  @click="createShop" style="margin-left: 10px;"  type="primary" icon="el-icon-edit">创建信息</el-button>
          <div class="clear">

          </div>
      </div>

      <el-table :data="tableData" border style="width: 100%">
        <el-table-column align='center' prop="create_time" label="创建时间" >
        </el-table-column>
        <el-table-column align='center' prop="sort" label="权重" >
        </el-table-column>
        <el-table-column align='center' prop="title" label="标题" >
        </el-table-column>
        <el-table-column align='center' prop="content" label="内容">
        </el-table-column>

        <el-table-column align='center' label="操作">
          <template slot-scope="scope">
                <el-button type="primary" size="mini"  @click.native.prevent="handleEdit(scope.$index)">编辑</el-button>
                <el-button type="danger" size="mini" @click.native.prevent="handleDelete(scope.$index)">删除</el-button>
            </template>
        </el-table-column>
      </el-table>

      <div class="pagination-container">
        <el-pagination @current-change="handleCurrentChange" :current-page="page"  :page-size="10" layout="total, prev, pager, next, jumper" :total="count">
        </el-pagination>
      </div>

      <el-dialog title="创建信息" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <div class="form_part center">
          <el-form ref="form" :model="form" :rules="formRules" label-width="130px">
            <el-form-item label="平台信息权重：" prop="sort" >
              <el-input v-model.number="form.sort" placeholder="请输入数字0-999"></el-input>
            </el-form-item>
            <el-form-item label="平台信息标题：" prop="title">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="平台信息详情：" prop="content">
              <el-input type="textarea" v-model="form.content"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addAndUpdateData">确认</el-button>
              <el-button @click="dialogVisible = false">取消</el-button>
            </el-form-item>

          </el-form>
        </div>

      </el-dialog>

    </div>
  </div>

</template>

<script>
  import adminReportForm from '@/api/adminReportForm'
  export default {
    data() {
      return {
        dialogVisible: false,
        isAdd: true,
        loading: false,
        tableData: [
        ],
        form: {
          sort: '',
          title: '',
          content: ''
        },
        formRules: {
          sort: [
            { required: true, message: '请输入数字0-999', trigger: 'blur' },
            { type: 'number', message: '请输入数字', trigger: 'blur' }
          ],
          title: [{ required: true, message: '输入信息标题', trigger: 'blur' }],
          content: [{ required: true, message: '输入信息内容', trigger: 'blur' }]
        },
        page: 1,
        count: 0,
        like_name: ''
      }
    },
    created() {
      this.fetchMessageList(1)
    },
    methods: {
      fetchMessageList(page) {
        adminReportForm.messageList({ page }).then(response => {
          const data = response.data
          this.count = Number(data.count)
          this.tableData = data.list
        }).catch(error => {
          console.log(error)
        })
      },
      createShop() {
        this.dialogVisible = true
        this.form.sort = ''
        this.form.content = ''
        this.form.title = ''
        this.isAdd = true
      },
      handleEdit(index) {
        this.dialogVisible = true
        this.form = this.tableData[index]
        this.isAdd = false
      },
      handleDelete(index) {
        const data = this.tableData[index]
        this.$confirm('确认删除？')
          .then(_ => {
            adminReportForm.messageDelete({ id: data.id }).then(response => {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.tableData.splice(index, 1)
              this.page = 1
              this.fetchMessageList(1)
            }).catch(error => {
              console.log(error)
            })
          })
          .catch(_ => {})
      },
      addAndUpdateData() {
        this.$refs.form.validate(valid => {
          if (valid) {
            if (this.isAdd) {
              adminReportForm.messageAdd(this.form).then(response => {
                this.dialogVisible = false
                this.$message({
                  message: '创建信息成功',
                  type: 'success'
                })
                this.page = 1
                this.fetchMessageList(1)
              }).catch(error => {
                console.log(error)
              })
            } else {
              adminReportForm.messageModify(this.form).then(response => {
                this.dialogVisible = false
                this.$message({
                  message: '修改信息成功',
                  type: 'success'
                })
                this.page = 1
                this.fetchMessageList(1)
              }).catch(error => {
                console.log(error)
              })
            }
          }
        })
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`)
        this.fetchMessageList(val)
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

<style lang="css">
</style>
