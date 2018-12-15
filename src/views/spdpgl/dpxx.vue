<template >
  <div class="sp_container">
    <div class="bg_white">
        <div class="part_top">
            <p class="color_zywz top_label">店铺状态：
              <span class="color_warning" v-if="form.attestation_status === 0">待激活</span>
              <span class="color_success" v-else-if="form.attestation_status === 1">已激活</span>
              <span class="color_danger" v-else-if="form.attestation_status === 99">已冻结</span>
              <span class="color_info" v-else>未知</span>

            </p>
        </div>
        <hr>
        <div class="form_part center">
          <el-form ref="form"  :model="form" label-width="100px" :disabled="form.attestation_status !== 0">
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
                <el-button type="primary" @click="onSubmit" style="width: 200px; height: 44px; font-size: 17px"  v-if="form.attestation_status === 0">保 存</el-button>
                <!--<el-button>取消</el-button>-->
               </el-form-item>

          </el-form>
        </div>


    </div>
  </div>
</template>

<script type="text/javascript">
  import { shopList, shopDistrictList } from '@/api/adminUserManagement'
  import { shopDetails, shopModify } from '@/api/shop'
  import { uploadShopImage } from '@/api/upload'
  export default {
    data() {
      return {
        form: {
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
        districtList: []
      }
    },
    created() {
      this.fetchShopClassList()
    },
    methods: {
      fetchShopDetails() {
        shopDetails().then(response => {
          this.form = Object.assign({}, this.form, response.data)
        }).catch(error => {
          console.log(error)
        })
      },
      fetchShopClassList() {
        shopList().then(response => {
          this.shopClassList = response.data.list
          this.fetchShopDistrictList()
        }).catch(error => {
          console.log(error)
        })
      },
      fetchShopDistrictList() {
        shopDistrictList().then(response => {
          this.districtList = response.data.list
          this.fetchShopDetails()
        }).catch(error => {
          console.log(error)
        })
      },
      onSubmit() {
        this.$refs.form.validate(valid => {
          if (valid) {
            shopModify(this.form).then(response => {
              this.$message.success('修改店铺信息成功')
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

<style media="screen">
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
