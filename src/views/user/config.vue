<template>
<div class="container" :key="id">
  <el-form ref="form" :model="form" label-width="120px">
    <el-form-item label="用户标签">
      <el-upload
        list-type="picture-card"
        :action="`/${role}/common/upload`"
        name="files[]"
        :headers="{isAjax: 1}"
        :file-list="UTfileList"
        :with-credentials="true"
        :on-success="handleUTSuccess"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible" size="tiny">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </el-form-item>
    
    <el-form-item>
      <el-button type="primary" @click="onSubmit(0)">确定</el-button>
    </el-form-item>
  </el-form>
</div>
</template>
<script>
import Tinymce from '@/components/Tinymce'
import api from '../../api/config'
import { mapState } from 'vuex'

const transformItem = item => {
  return {
    ...item,
    start_time: item.start_time * 1000,
    end_time: item.end_time * 1000,
    end_join_time: item.end_join_time * 1000,
    join_form: JSON.parse(item.join_form),
    images: item.images.split(',')
  }
}
const ini = {
  UT: []
}
const genIni = () => Object.assign({}, ini)

export default {
  components: { Tinymce },
  name: 'add',
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      id: 0,
      isLimit: false,
      inputVisible: false,
      inputValue: '',
      UTfileList: [],
      form: genIni()
    }
  },
  mounted() {
    // api.UT.get()
    this.handleData()
  },
  computed: {
    ...mapState({
      role: state => state.user.roles
    })
  },
  methods: {
    async handleData(id) {
      const res = await api.UT.get()
      // this.form = transformItem(res.data)
      this.UTfileList = res.data.map(v => ({
        ...v,
        url: v.image_url
      }))
    },
    async onSubmit(i) {
      // this.form.start_time = new Date(this.form.start_time).getTime()
      // this.form.end_time = new Date(this.form.end_time).getTime()
      // this.form.end_join_time = new Date(this.form.end_join_time).getTime()

      // try {
      //   await api.addActivity(this.form)
      //   this.$message('发布成功')
      // } catch (e) {
      //   //
      // }
      await api.UT.set(this.form.UT[i])
      if (i < this.form.UT.length - 1) {
        this.onSubmit(i + 1)
      }
      if (i === this.form.UT.length - 1) {
        this.handleData()
        return this.$message('发布成功')
      }
    },
    handleClose(tag) {
      this.form.join_form.splice(this.form.join_form.indexOf(tag), 1)
    },

    handleUTSuccess(res, file) {
      this.UTfileList.push(file)
      const origin = file.name
      let index = origin.indexOf('@')
      if (index === -1) {
        index = origin.indexOf('.')
      }
      const name = file.name.slice(0, index)
      this.form.UT.push({ image_url: res.data., name, sort: 1 })
    },
    handleATSuccess(res, file) {
      this.ATfileList.push(file)
      this.form.AT.push({ image_url: res.data, name: file.name })
    },
    handleUTRemove(file) {
      const i = this.fileList.indexOf(file)
      this.form.UT.splice(i, 1)
      this.UTfileList.splice(i, 1)
    },
    handleATRemove(file) {
      const i = this.fileList.indexOf(file)
      this.form.AT.splice(i, 1)
      this.ATfileList.splice(i, 1)
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    reset() {
      this.form = genIni()
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
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
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


