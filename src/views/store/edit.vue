<template>
<div class="container" :key="id">
  <el-form ref="form" :model="form" label-width="120px">
  <el-form-item label="商户名称">
    <el-input v-model="form.store_name"></el-input>
  </el-form-item>
  <el-form-item label="商户密码">
    <el-input v-model="form.password"></el-input>
  </el-form-item>
  <el-form-item label="联系电话">
    <el-input v-model="form.phone"></el-input>
  </el-form-item>
  <el-form-item label="商户地址">
    <el-cascader
    :options="city"
    value="cityArray"
    v-model="cityArray"
  >
  </el-cascader>
  </el-form-item>

  <el-form-item label="详细地址">
    <el-input v-model="form.address"></el-input>
  </el-form-item>
  
<el-form-item label="封面图片" >
  <el-upload
    class="cover-uploader"
    :action="`/${role}/common/upload`"
    :headers="{isAjax: 1}"
    :with-credentials="true"
    name="files[]"
    :show-file-list="false"
    :on-success="handleCoverSuccess"
    >
    <img v-if="form.cover_image" :src="form.cover_image" class="cover">
    <i v-else class="el-icon-plus cover-uploader-icon"></i>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
  </el-upload>
</el-form-item>
  <el-form-item label="顶部滚动图">
    <el-upload
      name="files[]"
      :action="`/${role}/common/upload`"
      list-type="picture"
      :headers="{isAjax: 1}"
      :with-credentials="true"
      :file-list="fileList"
      :on-success="handleImagesSuccess"
      :on-remove="handleImagesRemove"
      >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
    </el-upload>
  </el-form-item>
  <el-form-item label="添加视频">
    <el-input v-model="form.video_url"></el-input>
  </el-form-item>
  
  
  
  
  
    <el-form-item label="商户简介">
    <tinymce :height="400" v-model="form.content"></tinymce>
    </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button @click="reset">清空</el-button>
  </el-form-item>
</el-form>
</div>
</template>
<script>
import Tinymce from '@/components/Tinymce'
import city from '../../utils/city'
import api from '../../api/store'
import { mapState } from 'vuex'

const transformItem = item => {
  return {
    ...item
  }
}
const ini = {
  store_name: '',
  phone: '',
  password: '',
  province: '',
  city: '',
  address: '',
  cover_image: '',
  video_url: '',
  head_images: [],
  content: ''
}
export default {
  components: { Tinymce },
  name: 'add',
  data() {
    return {
      id: 0,
      isLimit: false,
      inputVisible: false,
      inputValue: '',
      fileList: [],
      form: ini,
      city,
      cityArray: []
    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.id = this.$route.params.id

      this.handleData(this.id)
    }
  },
  computed: {
    ...mapState({
      role: state => state.user.roles
    })
  },
  methods: {
    async handleData(id) {
      const res = await api.getDetail(id)
      this.form = transformItem(res.data)
      this.cityArray.push(this.form.province)
      this.cityArray.push(this.form.city)
      this.fileList = this.form.head_images.map(v => ({
        name: '',
        url: v
      }))
    },
    async onSubmit() {
      // this.form.start_time = new Date(this.form.start_time).getTime()
      // this.form.end_time = new Date(this.form.end_time).getTime()
      // this.form.end_join_time = new Date(this.form.end_join_time).getTime()
      const [province, city] = this.cityArray
      const form = {
        ...this.form,
        province,
        city
      }
      try {
        await api.add(form)
        this.$message('发布成功')
      } catch (e) {
        //
      }
    },
    handleClose(tag) {
      this.form.join_form.splice(this.form.join_form.indexOf(tag), 1)
    },
    handleCoverSuccess(res, file) {
      this.form.cover_image = res.data
    },
    handleImagesSuccess(res, file) {
      this.fileList.push(file)
      this.form.head_images.push(res.data)
    },
    handleImagesRemove(file) {
      const i = this.fileList.indexOf(file)
      this.form.head_images.splice(i, 1)
      this.fileList.splice(i, 1)
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    reset() {
      this.form = ini
    },
    handleInputConfirm() {
      const inputValue = this.inputValue
      if (inputValue) {
        this.form.join_form.push({ name: inputValue })
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    handleSwitch(v) {
      if (!v) {
        this.form.join_limit_number = -1
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  width: 80%;
  min-width: 400px;
  margin: 0 auto;
  padding-top: 50px;
}
.line {
  text-align: center;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

.cover-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.cover-uploader .el-upload:hover {
  border-color: #409eff;
}
.cover-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 316px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.cover-uploader-icon:hover {
  border-color: #409eff;
}
.cover {
  width: 316px;
  height: auto;
  display: block;
}
</style>


