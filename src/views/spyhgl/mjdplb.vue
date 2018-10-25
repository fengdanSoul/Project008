<template lang="html">

  <div class="app-container">
    <div class="filter-container">
      <div class="bg_white serchadd">
        <span class="color_six top_label">店铺管理员列表</span>
        <el-input  style="width: 200px;" class="filter-item search_ipt" v-model="like_name" placeholder="">
        </el-input>
        <el-button class="filter-item search_btn" type="primary"  @click="searchData" icon="el-icon-search" >搜索</el-button>

        <!--<el-button class="filter-item right ggcxtjbtn add_btn" style="margin-left: 10px;"  type="primary" icon="el-icon-edit">创建店铺管理员</el-button>-->

      </div>
      <div class="bg_white ss_box">

        <div class="ss_part">
          <span class="color_six top_label top_sslabel">管理员状态：</span>
          <el-radio-group v-model="attestation_status" @change="selectAttestationStatus">
            <el-radio label="" border>全部</el-radio>
            <el-radio label="0" border>未激活</el-radio>
            <el-radio label="1" border>已激活</el-radio>
            <el-radio label="99" border>已冻结</el-radio>
          </el-radio-group>
        </div>

      </div>

      <!--"role": "2",-->
      <!--"class_id": "3",-->
      <!--"district_id": "5002",-->
      <!--"company_name": "",-->
      <!--"admin_name": "",-->
      <!--"shop_type": "1",-->
      <!--"shop_mobile": "",-->
      <!--"start_money": "0.00",-->
      <!--"business_scope": "",-->
      <!--"shop_address": "",-->
      <!--"shop_img": "",-->
      <!--"business_img": "",-->
      <!--"attestation_status": "1",-->
      <!--"create_time": "2018-08-05 12:49:08",-->
      <!--"district_name": "上海徐汇",-->
      <!--"class_name": "豆汁食品"-->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column align='center' prop="create_time" label="注册时间" >
        </el-table-column>
        <el-table-column align='center' prop="shop_id" label="管理员ID" >
        </el-table-column>
        <el-table-column align='center' prop="company_name" label="门店铺名称" >
        </el-table-column>
        <el-table-column align='center' prop="admin_name" label="店铺管理员" >
        </el-table-column>
        <el-table-column align='center' prop="class_name" label="店铺性质" >
        </el-table-column>
        <el-table-column align='center' prop="shop_mobile" label="联系方式" >
        </el-table-column>
        <el-table-column align='center' prop="shop_address" label="公司地址">
        </el-table-column>
        <el-table-column align='center' prop="attestation_status" :formatter="formatAttestationStatus" label="状态">
        </el-table-column>
        <el-table-column align='center' label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="editCurrentRow(scope.$index)">编辑</el-button>
            <el-button type="danger" size="mini" @click="deleteCurrentRow(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
        <el-table-column align='center' label="状态操作">
          <template slot-scope="scope">
            <el-button type="success" size="mini" @click="dealAttestationStatus(scope.$index)" >{{scope.row.attestation_status === 1 ? '冻结' : '激活'}}</el-button>
           </template>
        </el-table-column>
      </el-table>

      <div class="pagination-container">
        <el-pagination @current-change="handleCurrentChange" :current-page="page"  :page-size="10" layout="total, prev, pager, next, jumper" :total="count">
        </el-pagination>
      </div>

      <el-dialog title="创建公告促销" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">

        <div class="form_part center">
          <el-form ref="form" :model="form" label-width="100px">

            <el-form-item label="店铺名称">
              <el-input v-model="form.storename"></el-input>
            </el-form-item>
            <el-form-item label="店铺管理员">
              <el-input v-model="form.admin"></el-input>
            </el-form-item>
            <el-form-item label="店铺性质">
                <el-radio-group v-model="form.nature">
                  <el-radio label="1">预售</el-radio>
                  <el-radio label="2">日配</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="店铺所属分类">
                <el-select v-model="form.storeclass" placeholder="请选择分类">
                  <el-option label="乳制品" value="1"></el-option>
                  <el-option label="乳制品2" value="2"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="店铺联系方式">
                <el-input v-model="form.phone"></el-input>
              </el-form-item>

              <el-form-item label="起送金额">
                <el-input v-model="form.startamt"></el-input>
              </el-form-item>
              <el-form-item label="所在区域">
                <el-select v-model="form.area" placeholder="请选择分类">
                  <el-option label="区域1" value="1"></el-option>
                  <el-option label="区域2" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="主营范围">
                <el-input type="textarea" v-model="form.scope"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input type="textarea" v-model="form.remarks"></el-input>
              </el-form-item>
              <el-form-item label="详细地址">
                <el-input type="textarea" v-model="form.address"></el-input>
              </el-form-item>
              <div class="part_top">
                  <p class="color_zywz">店铺展示图片    </p>
              </div>
              <hr style="margin-bottom:18px">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>

              <div class="part_top">
                  <p class="color_zywz">营业执照    </p>
              </div>
              <hr style="margin-bottom:18px">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <br/><br/>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
                <el-button>取消</el-button>
               </el-form-item>

          </el-form>
        </div>

      </el-dialog>

    </div>
  </div>

</template>

<script>
import { adminShopList, adminShopDelete, adminShopFlag } from '@/api/adminUserManagement'
export default {
  data() {
    return {
      dialogVisible: false,
      tableData: [
      ],
      form: {
        storename: '',
        name: '',
        nature: '',
        storeclass: '',
        phone: '',
        startamt: '',
        area: '',
        remarks: '',
        address: ''
      },
      count: 0,
      page: 1,
      attestation_status: '',
      like_name: ''
    }
  },
  created() {
    this.fectchAdminShopList(1, '', '')
  },
  methods: {
    fectchAdminShopList(page, attestation_status, like_name) {
      adminShopList({ page, attestation_status, like_name }).then(response => {
        const data = response.data
        this.count = Number(data.count)
        this.tableData = data.list
      }).catch(error => {
        console.log(error)
      })
    },
    selectAttestationStatus() {
      this.like_name = ''
      this.fectchAdminShopList(1, this.attestation_status, '')
    },
    editCurrentRow(index) {
      this.dialogVisible = true
      this.form = this.tableData[index]
      // this.isAdd = false
    },
    deleteCurrentRow(index) {
      const data = this.tableData[index]
      this.$confirm('确认删除会员：' + data.company_name)
        .then(_ => {
          adminShopDelete(data.shop_id).then(response => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.page = 1
            this.fectchAdminShopList(1, '', '')
          }).catch(error => {
            console.log(error)
          })
        })
        .catch(_ => {})
    },
    dealAttestationStatus(index) {
      const data = this.tableData[index]
      if (data.attestation_status === '1') {
        this.frozenCurrentRow(index)
      } else {
        this.activeCurrentRow(index)
      }
    },
    activeCurrentRow(index) {
      const data = this.tableData[index]
      this.$confirm('确认激活')
        .then(_ => {
          adminShopFlag({ shop_id: data.shop_id, attestation_status: 1 }).then(response => {
            this.$message({
              message: '激活成功',
              type: 'success'
            })
            this.page = 1
            this.fectchAdminShopList(1, '', '')
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
          adminShopFlag({ shop_id: data.shop_id, attestation_status: 99 }).then(response => {
            this.$message({
              message: '冻结成功',
              type: 'success'
            })
            this.page = 1
            this.fectchAdminShopList(1, '', '')
          }).catch(error => {
            console.log(error)
          })
        })
        .catch(_ => {})
    },
    updateMember() {
      // adminMemberModify(this.form).then(response => {
      //   this.dialogVisible = false
      //   this.$message({
      //     message: '修改会员信息成功',
      //     type: 'success'
      //   })
      //   this.page = 1
      //   this.fectchAdminShopList(1, '', '')
      // }).catch(error => {
      //   console.log(error)
      // })
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.fectchAdminShopList(val, '', this.like_name)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    searchData() {
      this.attestation_status = ''
      this.page = 1
      this.fectchAdminShopList(1, '', this.like_name)
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
    },
    onSubmit() {
      console.log('submit!')
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style lang="css">
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
