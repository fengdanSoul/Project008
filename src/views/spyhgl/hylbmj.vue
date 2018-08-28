<template lang="html">

  <div class="app-container">
    <div class="filter-container">
      <div class="bg_white serchadd">
        <span class="color_six top_label">搜索会员：</span>
        <el-input  style="width: 200px;" class="filter-item search_ipt" v-model="like_name" placeholder="">
        </el-input>
        <el-button class="filter-item search_btn" type="primary" @click="searchData" icon="el-icon-search" >搜索</el-button>

        <el-button class="filter-item right ggcxtjbtn add_btn"  @click="dialogVisible = true" style="margin-left: 10px;"  type="primary" icon="el-icon-edit">创建会员</el-button>

      </div>
      <div class="bg_white ss_box">
        <div class="ss_part">
          <span class="color_six top_label top_sslabel">会员等级：</span>
          <el-radio-group v-model="member_level" @change="selectMemberLever">
            <el-radio label="" border>全部</el-radio>
            <el-radio label="1" border>VIP</el-radio>
            <el-radio label="2" border>黄金</el-radio>
            <el-radio label="3" border>钻石</el-radio>
          </el-radio-group>
        </div>
        <div class="ss_part">
          <span class="color_six top_label top_sslabel">会员状态：</span>
          <el-radio-group v-model="attestation_status" @change="selectAttestationStatus">
            <el-radio label="" border>全部</el-radio>
            <el-radio label="0" border>未激活</el-radio>
            <el-radio label="1" border>已激活</el-radio>
            <el-radio label="99" border>已冻结</el-radio>
          </el-radio-group>

        </div>
        <div class="ss_part">
          <span class="color_six top_label top_sslabel">会员区域：</span>
          <el-select v-model="district_id" placeholder="请选择" @change="selectDistrictName">
            <el-option
              label="全部"
              value="">
            </el-option>
            <el-option
              v-for="item in districtList"
              :key="item.id"
              :label="item.district_name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>

      </div>


      <el-table :data="tableData" border style="width: 100%">
        <el-table-column align='center' prop="crate_time" label="注册时间" >
        </el-table-column>
        <el-table-column align='center' prop="id" label="会员ID" >
        </el-table-column>
        <el-table-column align='center' prop="shop_name" label="门店名称" >
        </el-table-column>
        <el-table-column align='center' prop="member_name" label="店主姓名" >
        </el-table-column>
        <el-table-column align='center' prop="sex" :formatter="formatSex" label="性别" >
        </el-table-column>
        <el-table-column align='center' prop="member_mobile" label="联系方式" >
        </el-table-column>
        <el-table-column align='center' prop="receiving_address" label="门店地址">
        </el-table-column>
        <el-table-column align='center' prop="district_name" label="区域">
        </el-table-column>
        <el-table-column align='center' prop="member_level" :formatter="formatMemberevel" label="等级">
        </el-table-column>
        <el-table-column align='center' prop="attestation_status" :formatter="formatAttestationStatus" label="状态">
        </el-table-column>

        <el-table-column align='center' width="200" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="activeCurrentRow(scope.$index)" >激活</el-button>
            <el-button type="text" size="mini" @click="frozenCurrentRow(scope.$index)" >冻结</el-button>
            <el-button type="text" size="mini" @click="editCurrentRow(scope.$index)">编辑</el-button>
            <el-button type="danger" size="mini" @click="deleteCurrentRow(scope.$index)">删除</el-button>

          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-container">
        <el-pagination @current-change="handleCurrentChange" :current-page="page"  :page-size="10" layout="total, prev, pager, next, jumper" :total="count">
        </el-pagination>
      </div>

      <el-dialog title="会员信息编辑" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">

        <div class="form_part center">
          <el-form ref="form" :model="form" :rules="formRules" label-width="120px">
            <el-form-item label="会员ID：">
              <el-input v-model="form.id" disabled="false"></el-input>
            </el-form-item>
            <el-form-item label="买家店铺名称：">
              <el-input v-model="form.shop_name"></el-input>
            </el-form-item>
            <el-form-item label="店主名称：">
              <el-input v-model="form.member_name"></el-input>
            </el-form-item>

            <el-form-item label="店主性别：">
              <el-select v-model="form.sex" placeholder="请选择">
                <el-option label="男" value="1"></el-option>
                <el-option label="女" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="联系方式：">
              <el-input v-model="form.member_mobile"></el-input>
            </el-form-item>
            <el-form-item label="店铺收货地址：">
              <el-input type="textarea" v-model="form.receiving_address"></el-input>
            </el-form-item>


            <el-form-item label="所在区域：">
              <el-select v-model="form.district_id" placeholder="请选择">
                <el-option
                  v-for="item in districtList"
                  :key="item.id"
                  :label="item.district_name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="会员等级：">
              <el-select v-model="form.member_level" placeholder="请选择">
                <el-option label="VIP" value="1"></el-option>
                <el-option label="黄金" value="2"></el-option>
                <el-option label="钻石" value="3"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="updateMember">确认</el-button>
              <el-button @click="dialogVisible = false">取消</el-button>
            </el-form-item>

          </el-form>
        </div>

      </el-dialog>

    </div>
  </div>

</template>

<script>
import { adminMemberList, shopDistrictList, adminMemberFlag, adminMemberDelete, adminMemberModify } from '@/api/adminUserManagement'
export default {
  data() {
    return {
      dialogVisible: false,
      tableData: [
      ],
      form: {
        sex: '',
        district_id: '',
        shop_name: '',
        member_name: '',
        member_mobile: '',
        member_level: '',
        receiving_address: '',
        district_name: ''
      },
      formRules: {
        district_id: [{ required: true, message: '选择所在区域' }],
        shop_name: [{ required: true, message: '输入门店名称' }],
        member_name: [{ required: true, message: '输入店主姓名' }],
        member_mobile: [{ required: true, message: '输入联系电话' }],
        member_level: [{ required: true, message: '选择会员等级' }],
        receiving_address: [{ required: true, message: '输入收货地址' }]
      },
      count: 0,
      page: 1,
      member_level: '',
      attestation_status: '',
      district_id: '',
      like_name: '',
      districtList: []
    }
  },
  created() {
    this.adminMemberList(1, '', '', '', '')
    this.fetchDistrictList()
  },
  methods: {
    adminMemberList(page, member_level, attestation_status, district_id, like_name) {
      adminMemberList({ page, member_level, attestation_status, district_id, like_name }).then(response => {
        const data = response.data
        this.count = Number(data.count)
        this.tableData = data.list
      }).catch(error => {
        console.log(error)
      })
    },
    fetchDistrictList() {
      shopDistrictList({ page: 0, like_name: '' }).then(response => {
        const data = response.data
        this.districtList = data.list
      }).catch(error => {
        console.log(error)
      })
    },
    selectMemberLever() {
      this.like_name = ''
      this.adminMemberList(1, this.member_level, this.attestation_status, this.district_id, '')
    },
    selectAttestationStatus() {
      this.like_name = ''
      this.adminMemberList(1, this.member_level, this.attestation_status, this.district_id, '')
    },
    selectDistrictName() {
      this.like_name = ''
      this.adminMemberList(1, this.member_level, this.attestation_status, this.district_id, '')
    },
    editCurrentRow(index) {
      this.dialogVisible = true
      this.form = this.tableData[index]
      // this.isAdd = false
    },
    deleteCurrentRow(index) {
      const data = this.tableData[index]
      this.$confirm('确认删除会员：' + data.member_name)
        .then(_ => {
          adminMemberDelete(data.id).then(response => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.adminMemberList(1, '', '', '', '')
          }).catch(error => {
            console.log(error)
          })
        })
        .catch(_ => {})
    },
    activeCurrentRow(index) {
      const data = this.tableData[index]
      this.$confirm('确认激活')
        .then(_ => {
          adminMemberFlag({ id: data.id, adminMemberFlag: 1 }).then(response => {
            this.$message({
              message: '激活成功',
              type: 'success'
            })
            this.adminMemberList(1, '', '', '', '')
          }).catch(error => {
            console.log(error)
          })
        })
        .catch(_ => {})
    },
    frozenCurrentRow(index) {
      const data = this.tableData[index]
      this.$confirm('确认冻结')
        .then(_ => {
          adminMemberFlag({ id: data.id, adminMemberFlag: 99 }).then(response => {
            this.$message({
              message: '激活成功',
              type: 'success'
            })
            this.adminMemberList(1, '', '', '', '')
          }).catch(error => {
            console.log(error)
          })
        })
        .catch(_ => {})
    },
    updateMember() {
      adminMemberModify(this.form).then(response => {
        this.dialogVisible = false
        this.$message({
          message: '修改会员信息成功',
          type: 'success'
        })
        this.adminMemberList(1, '', '', '', '')
      }).catch(error => {
        console.log(error)
      })
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.adminMemberList(val, '', '', '', this.like_name)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    searchData() {
      this.member_level = ''
      this.attestation_status = ''
      this.district_id = ''
      this.adminMemberList(1, '', '', '', this.like_name)
    },
    formatSex(row) {
      return row.sex === '1' ? '男' : row.sex === '2' ? '女' : '未知'
    },
    formatMemberevel(row) {
      if (row.member_level === '1') {
        return 'VIP'
      } else if (row.member_level === '2') {
        return '黄金'
      } else if (row.member_level === '3') {
        return '钻石'
      }
      return '未知'
    },
    formatAttestationStatus(row) {
      if (row.attestation_status === '0') {
        return '未激活'
      } else if (row.member_level === '1') {
        return '已激活'
      } else if (row.member_level === '99') {
        return '已冻结'
      }
      return '未知'
    }
  }

}
</script>

<style lang="css">
</style>
