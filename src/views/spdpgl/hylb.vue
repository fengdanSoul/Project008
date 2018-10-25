<template >
<div class="app-container">
  <div class="filter-container">
    <div class="bg_white serchadd">
      <span class="color_six top_label">搜索会员：</span>
      <el-input  style="width: 200px;" class="filter-item search_ipt" v-model="like_name" placeholder="">
      </el-input>
      <el-button class="filter-item search_btn" type="primary" @click="searchData" icon="el-icon-search" >搜索</el-button>

      <!--<el-button class="filter-item right ggcxtjbtn add_btn"  @click="dialogVisible = true" style="margin-left: 10px;"  type="primary" icon="el-icon-edit">创建会员</el-button>-->

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
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column align='center' prop="crate_time" label="注册时间" width="180">
      </el-table-column>
      <el-table-column align='center' prop="member_id" label="会员ID" width="180">
      </el-table-column>
      <el-table-column align='center' prop="shop_name" label="门店名称">
      </el-table-column>
      <el-table-column align='center' prop="member_name" label="店主姓名">
      </el-table-column>
      <el-table-column align='center' prop="sex" :formatter="formatSex" label="性别" >
      </el-table-column>
      <el-table-column align='center' prop="member_mobile" label="联系方式">
      </el-table-column>
      <el-table-column align='center' prop="receiving_address" label="门店地址">
      </el-table-column>
      <el-table-column align='center' prop="district_name" label="所在区域">
      </el-table-column>
      <el-table-column align='center' prop="member_level" :formatter="formatMemberevel" label="等级">
      </el-table-column>

      <!--<el-table-column align='center' label="操作">-->
        <!--<template slot-scope="scope">-->
          <!--<el-button type="text" size="mini" @click="editCurrentRow(scope.$index)">查看</el-button>-->
        <!--</template>-->
      <!--</el-table-column>-->
    </el-table>

    <div class="pagination-container">
      <el-pagination @current-change="handleCurrentChange" :current-page="page"  :page-size="10" layout="total, prev, pager, next, jumper" :total="count">
      </el-pagination>
    </div>

    <!--"member_id": "1",-->
    <!--"shop_name": "欣凯医药",-->
    <!--"member_name": "安慕希",-->
    <!--"sex": "1",-->
    <!--"member_mobile": "18221691130",-->
    <!--"member_level": "1",-->
    <!--"receiving_address": "上海浦东新区13号",-->
    <!--"district_name": "上海徐汇"-->
    <el-dialog title="会员信息查看" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <div class="form_part center">
        <el-form ref="form" :model="form" :rules="formRules" label-width="100px">

          <el-form-item label="会员ID：" prop="member_id">
            <el-input v-model="form.member_id"></el-input>
          </el-form-item>
          <el-form-item label="买家店铺名称：">
            <el-input v-model="form.shop_name"></el-input>
          </el-form-item>
          <el-form-item label="店主名称">
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
            <el-select v-model="form.district_name" placeholder="请选择">
              <el-option label="徐汇区" value="1"></el-option>
              <el-option label="宝山区" value="2"></el-option>
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
  import { shopMemberList, shopMemberDetails } from '@/api/shop'
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
      this.fetchShopMemberList(1, '', '')
      this.fetchDistrictList()
    },
    methods: {
      fetchShopMemberList(page, member_level, like_name) {
        shopMemberList({ page, member_level, like_name }).then(response => {
          const data = response.data
          this.count = Number(data.count)
          this.tableData = data.list
        }).catch(error => {
          console.log(error)
        })
      },
      selectMemberLever() {
        this.like_name = ''
        this.page = 1
        this.fetchShopMemberList(1, this.member_level, '')
      },
      editCurrentRow(index) {
        this.dialogVisible = true
        this.form = this.tableData[index]
        // this.isAdd = false
      },
      updateMember() {
        shopMemberDetails(this.form).then(response => {
          this.dialogVisible = false
          this.$message({
            message: '修改会员信息成功',
            type: 'success'
          })
          this.page = 1
          this.adminMemberList(1, '', '', '', '')
        }).catch(error => {
          console.log(error)
        })
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`)
        this.adminMemberList(val, '', this.like_name)
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
        this.page = 1
        this.fetchShopMemberList(1, '', this.like_name)
      },
      formatSex(row) {
        return row.sex === 1 ? '男' : row.sex === 2 ? '女' : '未知'
      },
      formatMemberevel(row) {
        if (row.member_level === 1) {
          return 'VIP'
        } else if (row.member_level === 2) {
          return '黄金'
        } else if (row.member_level === 3) {
          return '钻石'
        }
        return '未知'
      },
      formatAttestationStatus(row) {
        if (row.attestation_status === 0) {
          return '未激活'
        } else if (row.attestation_status === 1) {
          return '已激活'
        } else if (row.attestation_status === 99) {
          return '已冻结'
        }
        return '未知'
      }
    }

  }
</script>

<style lang="css">
</style>
