<template>
  <div>
    <el-button
      style="margin-bottom: 20px"
      type="primary"
      icon="el-icon-plus"
      @click="addTradeMark"
    >添加</el-button>
    <el-table :data="list" border>
      <el-table-column label="序号" type="index" width="80" align="center" />
      <el-table-column label="品牌名称" prop="tmName" />
      <el-table-column label="品牌LOGO">
        <template slot-scope="{row}">
          <img :src="row.logoUrl" style="width: 80px;height: 40px;">
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{row}">
          <el-button type="warning" icon="el-icon-edit" @click="updateTradeMark(row)">修改</el-button>
          <el-button type="danger" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      style="text-align: center; margin-top: 20px;"
      :total="total"
      :current-page="currentPage"
      :page-size="pageSize"
      :page-sizes="[5, 10, 20, 50, 100]"
      layout="prev, pager, next, total, jumper,->,sizes"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <el-dialog :title="tmForm.id?'修改品牌':'添加品牌'" :visible.sync="dialogFormVisible">
      <el-form :model="tmForm" label-width="160px" style="width: 80%;">
        <el-form-item label="品牌名称" prop="tmName">
          <el-input v-model="tmForm.tmName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="品牌LOGO">
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="summit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'TradeMark',
  data() {
    return {
      // 展示数据
      list: [],
      // 分页器
      total: 50,
      currentPage: 1,
      pageSize: 5,
      // tmForm表单
      dialogFormVisible: false,
      tmForm: {
        tmName: '',
        logoUrl: ''
      }
    }
  },
  mounted() {
    this.getTradeMarkList()
  },
  methods: {
    // 添加
    addTradeMark() {
      this.tmForm = { tmName: '', logoUrl: '' }
      this.dialogFormVisible = true
    },
    // 修改
    updateTradeMark(row) {
      this.tmForm = { ...row }// 浅拷贝
      this.dialogFormVisible = true
    },
    // 表单提交
    async summit() {
      this.dialogFormVisible = false
      await this.$API.tradeMark.reqAddOrUpdateTradeMark(this.tmForm)
      this.getTradeMarkList()
    },
    // 获取品牌数据
    async getTradeMarkList() {
      const result = await this.$API.tradeMark.reqTradeMarkList(this.currentPage, this.pageSize)
      this.list = result.data.records
      this.total = result.data.total
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.getTradeMarkList()
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      this.getTradeMarkList()
    },
    handleAvatarSuccess(res, file) {
      this.tmForm.logoUrl = res.data
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

<style>
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

