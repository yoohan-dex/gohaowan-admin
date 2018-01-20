<template>
<div class="container" :key="id">
  <el-form ref="form" :model="form" label-width="120px">
    <el-form-item label="用户标签">
      <el-tag
        :key="i"
        v-for="(tag, i) in form.AT"
        :closable="!tag.id"
        :disable-transitions="true"
        @close="handleClose(tag)">
        {{tag.name}}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
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
  AT: []
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
      ATfileList: [],
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
      const res = await api.AT.get()
      // const res = await api.getDetail(id)
      // this.form = transformItem(res.data)
      this.form.AT = res.data
    },
    async onSubmit(i) {
      // this.form.start_time = new Date(this.form.start_time).getTime()
      // this.form.end_time = new Date(this.form.end_time).getTime()
      // this.form.end_join_time = new Date(this.form.end_join_time).getTime()
      // this.UTfileList.map((v, i) => ({
      //   ...v,
      //   sort: i
      // }))
      // try {
      //   await api.addActivity(this.form)
      //   this.$message('发布成功')
      // } catch (e) {
      //   //
      // }
      const AT = this.form.AT.filter(v => !v.id).map(v => ({ ...v, sort: 1 }))
      await api.AT.set(AT[i])
      if (i < AT.length - 1) {
        this.onSubmit(i + 1)
      }
      if (i === AT.length - 1) {
        this.handleData()
        return this.$message('发布成功')
      }
    },
    handleClose(tag) {
      this.form.AT.splice(this.form.AT.indexOf(tag), 1)
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
        this.form.AT.push({ name: inputValue })
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


