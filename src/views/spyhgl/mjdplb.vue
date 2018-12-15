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
        <el-table-column align='center' prop="shop_type" :formatter="formatShoptype" label="店铺性质" >
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

      <el-dialog title="店铺编辑" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">

        <div class="form_part center">
          <el-form ref="form"  :model="form" label-width="100px">
            <el-form-item label="店铺名称" prop="company_name">
              <el-input v-model="form.company_name"></el-input>
            </el-form-item>
            <el-form-item label="店铺管理员" prop="admin_name">
              <el-input v-model="form.admin_name"></el-input>
            </el-form-item>
            <el-form-item label="店铺性质" prop="shop_type">
              <el-radio-group v-model="form.shop_type">
                <el-radio :label="1">预售</el-radio>
                <el-radio :label="2">日配</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="店铺所属分类" prop="class_id">
              <el-select v-model="form.class_id" placeholder="请选择分类">
                <el-option v-for="item in shopClassList" :label="item.class_name" :key="item.id" :value="item.id"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="店铺联系方式" prop="shop_mobile">
              <el-input v-model.number="form.shop_mobile"></el-input>
            </el-form-item>

            <el-form-item label="起送金额" prop="start_money">
              <el-input v-model="form.start_money"></el-input>
            </el-form-item>
            <el-form-item label="所在区域" prop="district_id">
              <el-select v-model="form.district_id" placeholder="请选择分类">
                <el-option v-for="item in districtList" :key="item.id" :label="item.district_name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="主营范围" prop="business_scope">
              <el-input type="textarea" v-model="form.business_scope"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input type="textarea" v-model="form.remark"></el-input>
            </el-form-item>
            <el-form-item label="详细地址" prop="shop_address">
              <el-input type="textarea" v-model="form.shop_address"></el-input>
            </el-form-item>
            <!--<div class="part_top">-->
            <!--<p class="color_zywz">    </p>-->
            <!--</div>-->
            <hr style="margin-bottom:18px">
            <el-form-item label="店铺展示图片" prop="shop_img">
              <el-upload
                class="avatar-uploader"
                accept="image/jpeg,image/jpg,image/png,image/gif"
                action=""
                :http-request="uploadShopImg"
                :show-file-list="false"
                :before-upload="beforeAvatarUpload">
                <img v-if="form.shop_img" :src="form.shop_img" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>

            <!--<div class="part_top">-->
            <!--<p class="color_zywz">    </p>-->
            <!--</div>-->
            <hr style="margin-bottom:18px">
            <el-form-item label="营业执照" prop="business_img">
              <el-upload
                class="avatar-uploader"
                accept="image/jpeg,image/jpg,image/png,image/gif"
                action=""
                :http-request="uploadBusinessImg"
                :show-file-list="false"
                :before-upload="beforeAvatarUpload">
                <img v-if="form.business_img" :src="form.business_img" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>

            <br/><br/>
            <el-form-item>
              <el-button type="primary" @click="onSubmit" style="width: 200px; height: 44px; font-size: 17px" >保 存</el-button>
              <!--<el-button>取消</el-button>-->
            </el-form-item>

          </el-form>
        </div>

      </el-dialog>

    </div>
  </div>

</template>

<script>
import { adminShopList, adminShopDelete, adminShopFlag, shopList, shopDistrictList, adminShopModify } from '@/api/adminUserManagement'
import { uploadShopImage } from '@/api/upload'

export default {
  data() {
    return {
      dialogVisible: false,
      tableData: [
      ],
      form: {
        shop_id: '',
        district_id:	'',
        class_id:	'',
        company_name:	'',
        admin_name:	'',
        shop_type:	'',
        shop_mobile: '',
        start_money: '',
        business_scope:	'',
        shop_address:	'',
        shop_img:	'',
        business_img:	'',
        remark: ''
      },
      formRules: {
        district_id: [{ required: true, message: '选择店铺区域', trigger: 'blur' }],
        class_id: [{ required: true, message: '选择店铺分类', trigger: 'blur' }],
        company_name: [{ required: true, message: '输入店铺名称', trigger: 'blur' }],
        admin_name: [{ required: true, message: '输入店铺管理员姓名', trigger: 'blur' }],
        shop_type: [{ required: true, message: '选择店铺性质', trigger: 'blur' }],
        shop_mobile: [
          { required: true, message: '输入手机号', trigger: 'blur' },
          { type: 'number', message: '手机号为数字', trigger: 'blur' }
        ],
        start_money: [{ required: true, message: '输入起送金额', trigger: 'blur' }],
        business_scope: [{ required: true, message: '输入店铺经营范围', trigger: 'blur' }],
        shop_address: [{ required: true, message: '输入店铺地址', trigger: 'blur' }],
        shop_img: [{ required: true, message: '请上传店铺图片', trigger: 'blur' }],
        business_img: [{ required: true, message: '请上传店铺营业执照', trigger: 'blur' }]
      },
      shopClassList: [],
      districtList: [],
      count: 0,
      page: 1,
      attestation_status: '',
      like_name: ''
    }
  },
  created() {
    this.fetchShopClassList()
    this.fetchShopDistrictList()
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
    fetchShopClassList() {
      shopList().then(response => {
        this.shopClassList = response.data.list
      }).catch(error => {
        console.log(error)
      })
    },
    fetchShopDistrictList() {
      shopDistrictList().then(response => {
        this.districtList = response.data.list
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
    formatShoptype(row) {
      if (row.shop_type === 1) {
        return '预售'
      } else if (row.shop_type === 2) {
        return '日配'
      }
      return '未知'
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          adminShopModify(this.form).then(response => {
            this.$message.success('修改店铺信息成功')
            this.dialogVisible = false
            this.fetchShopDetails()
          }).catch(error => {
            console.log(error)
          })
        }
      })
    },
    handleAvatarSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    uploadShopImg(params) {
      uploadShopImage(params.file).then(response => {
        this.$set(this.form, 'shop_img', response.data)
      }).catch(error => {
        console.log(error)
      })
    },
    uploadBusinessImg(params) {
      uploadShopImage(params.file).then(response => {
        this.$set(this.form, 'business_img', response.data)
      }).catch(error => {
        console.log(error)
      })
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
