<template lang="html">
  <div class="app-container">
    <div class="filter-container">
      <div class="bg_white serchadd">
        <span class="color_six top_label">平台商品列表</span>
        <el-input  style="width: 200px;" v-model="like_name" class="filter-item search_ipt" placeholder="">
        </el-input>
        <el-button class="filter-item search_btn" type="primary" @click="searchData" icon="el-icon-search" >搜索</el-button>
        <!--#/spspsjk/ptcjsp-->
        <!--<el-button class="filter-item right ggcxtjbtn add_btn" style="margin-left: 10px;"  type="primary" icon="el-icon-edit">创建平台商品</el-button>-->
        <!--<el-menu class="el-menu-demo right"  router>-->
          <!--<el-menu-item index="ptcjsp">-->
            <!--<el-button class="filter-item right ggcxtjbtn add_btn" style="margin-left: 10px;"  type="primary" icon="el-icon-edit">创建平台商品</el-button>-->
          <!--</el-menu-item>-->
        <!--</el-menu>-->
      </div>

      <div class="bg_white ss_box">
        <div class="ss_part">
          <span class="color_six top_label top_sslabel">平台商品分类：</span>
          <el-radio-group v-model="category_id" @change="selectCategoryId" size="small">
            <el-radio label="" border>全部</el-radio>
            <el-radio v-for="item in categoryList" :label="item.id" border :key="item.id">{{item.category_name}}</el-radio>
          </el-radio-group>
        </div>
        <div class="ss_part">
          <span class="color_six top_label top_sslabel">平台商品品牌：</span>
          <el-radio-group v-model="brand_id" @change="selectBrandId" size="small">
            <el-radio label="" border>全部</el-radio>
            <el-radio v-for="item in brandList" :label="item.id" border :key="item.id">{{item.brand_name}}</el-radio>
          </el-radio-group>
        </div>
        <div class="ss_part">
          <span class="color_six top_label top_sslabel">平台商品状态：</span>
          <el-radio-group v-model="product_flag" @change="selectProductFlag" size="small">
            <el-radio label="" border>全部</el-radio>
            <el-radio label="0" border>未上架</el-radio>
            <el-radio label="1" border>已上架</el-radio>
            <el-radio label="99" border>已下架</el-radio>
          </el-radio-group>
        </div>
      </div>

      <!--"id": "16",-->
      <!--"product_name": "伊利牛奶",-->
      <!--"product_description": "中国第一好牛奶",-->
      <!--"product_code": "20180804000",-->
      <!--"brand_id": "2",-->
      <!--"category_id": "20",-->
      <!--"sort": "1",-->
      <!--"product_flag": "1",-->
      <!--"audit_flag": "1",-->
      <!--"delete_flag": "1",-->
      <!--"create_time": "2018-08-04 11:58:46",-->
      <!--"update_time": "0000-00-00 00:00:00",-->
      <!--"brand_name": "品牌2",-->
      <!--"category_name": "分类二",-->
      <!--"product_img":-->
      <!--[-->
      <!--"/uploads///image/20180803/be74d5f7cc7b134fe701c628948a8982.jpg",-->
      <!--"/uploads///image/20180803/be74d5f7cc7b134fe701c628948a8982.jpg",-->
      <!--"/uploads///image/20180803/be74d5f7cc7b134fe701c628948a8982.jpg"-->
      <!--]-->
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6" v-for='item in tableData' :key="item.id" class="splb_box" >
          <div class="gwcsp_box box_shadow">
              <div class="spcheck">
                <p class="ptsmbh">商品编码：{{item.product_code}}
                  <span class="right color_nine" v-if="item.product_flag === 0">未上架</span>
                  <span class="right color_nine" v-else-if="item.product_flag === 1">已上架</span>
                  <span class="right color_nine" v-else-if="item.product_flag === 99">已下架</span>
                  <span class="right color_nine" v-else>未知</span>

                </p>
              </div>

              <hr>
              <div class="comimgtitie" style="height: 150px">
                  <div class="comimg left">
                    <img :src="item.product_img[0]" alt="商品图片">
                  </div>
                  <div class="comtitle right">
                      <p>
                        {{item.product_name}}
                      </p>
                      <p class="color_six">商品详情：{{item.product_description}}</p>
                  </div>
                  <div class="clear">
                  </div>
              </div>
              <hr>

              <div class="spamount">

                  <el-button type='primary' class="right" @click="stopSale(item.id, item.product_name)"  style='margin-left:10px' v-if="item.product_flag === 1" >下架
                  </el-button>
                <el-button type='primary' class="right" @click="onSale(item.id, item.product_name)"  style='margin-left:10px' v-else >上架
                </el-button>

                  <el-button type='primary' class="right" @click="deleteCurrentRow(item.id, item.product_name)" style='margin-left:10px'  >删除
                  </el-button>

                  <el-button type='primary' class="right" @click="editCurrentRow(item)">编辑
                  </el-button>

                  <div class="clear">
                  </div>
              </div>
          </div>
        </el-col>
      </el-row>

      <div class="pagination-container">
        <el-pagination @current-change="handleCurrentChange" :current-page="page"  :page-size="10" layout="total, prev, pager, next, jumper" :total="count">
        </el-pagination>
      </div>


      <el-dialog title="会员信息查看" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <div class="form_part center">
          <el-form ref="form" :rules="formRules" :model="form" label-width="130px">

            <el-form-item label="平台商品分类" prop="category_id">
              <el-select v-model="form.category_id" placeholder="请选择">
                <el-option
                  v-for="item in categoryList"
                  :key="item.id"
                  :label="item.category_name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="平台商品品牌" prop="brand_id">
              <el-select v-model="form.brand_id" placeholder="请选择">
                <el-option
                  v-for="item in brandList"
                  :key="item.id"
                  :label="item.brand_name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="商品名称" prop="product_name">
              <el-input v-model="form.product_name"></el-input>
            </el-form-item>
            <el-form-item label="商品编码" prop="product_code">
              <el-input v-model="form.product_code"></el-input>
            </el-form-item>

            <el-form-item label="详情描述" prop="product_description">
              <el-input type="textarea" v-model="form.product_description"></el-input>
            </el-form-item>

            <el-form-item label="商品照片" prop="product_img">
              <!--<el-upload-->
              <!--class="avatar-uploader"-->
              <!--accept="image/jpeg,image/jpg,image/png,image/gif"-->
              <!--action=""-->
              <!--:show-file-list="false"-->
              <!--:before-upload="beforeAvatarUpload">-->
              <!--<img v-if="form.product_img" :src="form.product_img" class="avatar">-->
              <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
              <!--</el-upload>-->

              <el-upload
                class="upload-demo"
                accept="image/jpeg,image/jpg,image/png,image/gif"
                action=""
                :http-request="uploadImage"
                :on-remove="handleRemove"
                :before-upload="beforeAvatarUpload"
                :file-list="fileList"
                list-type="picture">
                <el-button size="small" type="success">点击上传图片</el-button>
                <div slot="tip" class="el-upload__tip">只能上传小于2M的图片文件</div>
              </el-upload>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" :loading="loading"  @click="submitForm('form')">确认</el-button>
              <el-button @click="cancelEdit">取消</el-button>

              <!--<el-button type="primary" :loading="loading" @click="submitForm('form')">创建</el-button>-->
              <!--<el-button @click="resetForm('form')">重置</el-button>-->
            </el-form-item>

          </el-form>
        </div>

      </el-dialog>


    </div>
  </div>



</template>
<script>
  import { productSpuList, brandList, categoryList, productSpuDelete, productSpuFlag, productSpuModify } from '@/api/adminGoodsDB'
  import { uploadDisplayImage } from '@/api/upload'
  export default {
    data() {
      return {
        dialogVisible: false,
        tableData: [
        ],
        form: {
          category_id: '',
          brand_id: '',
          product_name: '',
          product_img: '',
          product_code: '',
          product_description: '',
          id: ''
        },
        formRules: {
          category_id: [{ required: true, message: '选择商品类型' }],
          brand_id: [{ required: true, message: '选择品牌类型' }],
          product_name: [{ required: true, message: '输入商品名称' }],
          product_img: [{ required: true, message: '添加商品图片' }],
          product_code: [{ required: true, message: '输入商品编码' }],
          product_description: [{ required: true, message: '输入商品描述' }]
        },
        fileList: [
        ],
        fileUrlList: [
        ],
        count: 0,
        page: 1,
        category_id: '',
        brand_id: '',
        product_flag: '',
        like_name: '',
        brandList: [],
        categoryList: [],
        loading: false
      }
    },
    created() {
      this.fetchProductSpuList(1, '', '', '', '')
      this.fetchBrandList()
      this.fetchCategoryList()
    },
    methods: {
      fetchProductSpuList(page, category_id, brand_id, product_flag, like_name) {
        productSpuList({ page, category_id, brand_id, product_flag, like_name }).then(response => {
          const data = response.data
          this.count = Number(data.count)
          this.tableData = data.list
        }).catch(error => {
          console.log(error)
        })
      },
      fetchBrandList() {
        brandList({ page: 0, like_name: '' }).then(response => {
          const data = response.data
          this.brandList = data.list
        }).catch(error => {
          console.log(error)
        })
      },
      fetchCategoryList() {
        categoryList({ page: 0, like_name: '' }).then(response => {
          const data = response.data
          this.categoryList = data.list
        }).catch(error => {
          console.log(error)
        })
      },
      selectBrandId() {
        this.like_name = ''
        this.page = 1
        this.fetchProductSpuList(1, this.category_id, this.brand_id, this.product_flag, '')
      },
      selectCategoryId() {
        this.like_name = ''
        this.fetchProductSpuList(1, this.category_id, this.brand_id, this.product_flag, '')
      },
      selectProductFlag() {
        this.like_name = ''
        this.page = 1
        this.fetchProductSpuList(1, this.category_id, this.brand_id, this.product_flag, '')
      },
      editCurrentRow(item) {
        this.dialogVisible = true
        this.form = item
        // this.fileUrlList.push({ name: params.file.name, uid: params.file.uid, url: response.data })
        var arr = []
        item.product_img.forEach(item => {
          const filePathArr = item.split('/')
          const len = filePathArr.length
          arr.push({ name: filePathArr[len - 1], uid: filePathArr[len - 1].split('.')[0], url: item })
        })
        this.fileUrlList = arr
        this.fileList = arr
      },
      stopSale(id, name) {
        this.$confirm('确认下架商品：' + name)
          .then(_ => {
            productSpuFlag(id, 99).then(response => {
              this.$message({
                message: '下架成功',
                type: 'success'
              })
              this.page = 1
              this.fetchProductSpuList(1, '', '', '', '')
            }).catch(error => {
              console.log(error)
            })
          })
          .catch(_ => {})
      },
      onSale(id, name) {
        this.$confirm('确认上架商品：' + name)
          .then(_ => {
            productSpuFlag(id, 1).then(response => {
              this.$message({
                message: '上架成功',
                type: 'success'
              })
              this.page = 1
              this.fetchProductSpuList(1, '', '', '', '')
            }).catch(error => {
              console.log(error)
            })
          })
          .catch(_ => {})
      },
      deleteCurrentRow(id, product_name) {
        this.$confirm('确认删除商品：' + product_name)
          .then(_ => {
            productSpuDelete(id).then(response => {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.page = 1
              this.fetchProductSpuList(1, '', '', '', '')
            }).catch(error => {
              console.log(error)
            })
          })
          .catch(_ => {})
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`)
        this.fetchProductSpuList(val, this.category_id, this.brand_id, this.product_flag, this.like_name)
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {})
      },
      searchData() {
        this.category_id = ''
        this.brand_id = ''
        this.product_flag = ''
        this.page = 1
        this.fetchProductSpuList(1, '', '', '', this.like_name)
      },
      cancelEdit() {
        this.dialogVisible = false
      },
      submitForm(formName) {
        this.setBrandImg()
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true
            productSpuModify(this.form).then(response => {
              const data = response
              this.loading = false
              if (data.status === 'ok') {
                this.resetForm(formName)

                this.dialogVisible = false
                this.$message({
                  message: '修改商品信息成功',
                  type: 'success'
                })
                this.page = 1
                this.fetchProductSpuList(1, '', '', '', '')
              }
            }).catch(error => {
              this.$message({
                message: error,
                type: 'error',
                duration: 2.5 * 1000
              })
              this.loading = false
            })
          } else {
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
        this.fileList = []
        this.fileUrlList = []
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isLt2M
      },
      handleRemove(file, fileList) {
        this.fileList = fileList
        this.fileUrlList = this.fileUrlList.filter(t => {
          return t.uid !== file.uid
        })
        this.setBrandImg()
      },
      uploadImage(params) {
        uploadDisplayImage(params.file).then(response => {
          this.fileList.push(params.file)
          this.fileUrlList.push({ name: params.file.name, uid: params.file.uid, url: response.data })
          this.setBrandImg()
        }).catch(error => {
          console.log(error)
        })
      },
      setBrandImg() {
        var arr = []
        this.fileUrlList.forEach(item => {
          arr.push(item.url)
        })
        this.$set(this.form, 'product_img', arr.join(';'))
      }
    }

  }
</script>
<!--<script>-->
<!--export default {-->
  <!--data() {-->
    <!--return {-->
      <!--gwcsps: [{-->
        <!--comcode: '20180811',-->
        <!--addcode: '20180813',-->
        <!--sfsj: '已上架',-->
        <!--src: 'https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png',-->
        <!--name: '(1月121批次)光明莫斯利安钻石装简装200g',-->
        <!--details: '商品详情商品详情商品详情'-->
      <!--},-->
      <!--{-->
        <!--comcode: '20180811',-->
        <!--addcode: '20180813',-->
        <!--sfsj: '已上架',-->
        <!--src: 'https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png',-->
        <!--name: '(1月121批次)光明莫斯利安钻石装简装200g',-->
        <!--details: '商品详情商品详情商品详情'-->
      <!--},-->
      <!--{-->
        <!--comcode: '20180811',-->
        <!--addcode: '20180813',-->
        <!--sfsj: '已上架',-->
        <!--src: 'https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png',-->
        <!--name: '(1月121批次)光明莫斯利安钻石装简装200g',-->
        <!--details: '商品详情商品详情商品详情'-->
      <!--},-->
      <!--{-->
        <!--comcode: '20180811',-->
        <!--addcode: '20180813',-->
        <!--sfsj: '已上架',-->
        <!--src: 'https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png',-->
        <!--name: '(1月121批次)光明莫斯利安钻石装简装200g',-->
        <!--details: '商品详情商品详情商品详情'-->
      <!--},-->
      <!--{-->
        <!--comcode: '20180811',-->
        <!--addcode: '20180813',-->
        <!--sfsj: '已上架',-->
        <!--src: 'https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png',-->
        <!--name: '(1月121批次)光明莫斯利安钻石装简装200g',-->
        <!--details: '商品详情商品详情商品详情'-->
      <!--}-->
      <!--],-->
      <!--listQuery: {-->
        <!--page: 1,-->
        <!--limit: 20,-->
        <!--importance: undefined,-->
        <!--title: undefined,-->
        <!--type: undefined,-->
        <!--sort: '+id'-->
      <!--}-->
    <!--}-->
  <!--}-->
<!--}-->
<!--</script>-->

<style lang="css">
</style>
