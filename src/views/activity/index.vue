<template>
<div class="container" :key="id">
  <el-form ref="form" :model="form" label-width="120px">
  <el-form-item label="活动标题">
    <el-input v-model="form.title"></el-input>
  </el-form-item>
  <el-form-item label="开始时间">
    <el-date-picker
      v-model="form.start_time"
      type="datetime"
      placeholder="选择日期时间">
    </el-date-picker>
  </el-form-item>
  <el-form-item label="结束时间">
    <el-date-picker
      v-model="form.end_time"
      type="datetime"
      placeholder="选择日期时间">
    </el-date-picker>
  </el-form-item>
  <el-form-item label="报名截止时间">
    <el-date-picker
      v-model="form.end_join_time"
      type="datetime"
      placeholder="选择日期时间">
    </el-date-picker>
  </el-form-item>
  <el-form-item label="活动地点">
    <el-input v-model="form.address"></el-input>
  </el-form-item>
  <el-form-item label="金额">
    <el-input  type="number" v-model="form.join_fee"></el-input>
  </el-form-item>
   <el-form-item label="报名人数上限">
     <el-row>
       <el-col :span="2"><el-switch v-model="isLimit" @change="handleSwitch"></el-switch></el-col>
        <el-col :span="3">
          <el-input v-show="isLimit" type="number" v-model="form.join_limit_number"></el-input>
        </el-col>
      </el-row>
     </el-form-item>
  <el-form-item label="开通在线报名">
    <el-switch v-model="form.can_join_online" :active-value="1" :inactive-value="0"></el-switch>
  </el-form-item>
<el-form-item label="封面图片" >
  <el-upload
    class="cover-uploader"
    :action="`/${role}/common/upload`"
    name="files[]"
    :headers="{isAjax: 1}"
    :with-credentials="true"
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
  <!-- <el-form-item label="添加视频">
    <el-input v-model="form.video_url"></el-input>
  </el-form-item> -->
  
  <el-form-item label="报名设置">
    <el-tag
    :key="'basic-tag' + i"
    v-for="(tag, i) in basicForm"
    :disable-transitions="false"
    @close="handleClose(tag)">
    {{tag.name}}
  </el-tag>
    <el-tag
    :key="'tag' + i"
    v-for="(tag, i) in form.join_form"
    closable
    :disable-transitions="false"
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
  <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新增报名项</el-button>
    </el-form-item>
    <el-form-item label="活动描述">
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
import api from '../../api/activity'
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
  title: '',
  content: '',
  start_time: '',
  end_time: '',
  address: '',
  cover_image: '',
  end_join_time: '',
  video_url: '',
  can_join_online: 0,
  join_form: [],
  join_fee: '',
  join_limit_number: -1,
  images: []
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
      basicForm: [{ name: '姓名' }, { name: '手机' }],
      fileList: [],
      form: ini
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
      this.fileList = this.form.images.map(v => ({
        name: '',
        url: v
      }))
    },
    async onSubmit() {
      // this.form.start_time = new Date(this.form.start_time).getTime()
      // this.form.end_time = new Date(this.form.end_time).getTime()
      // this.form.end_join_time = new Date(this.form.end_join_time).getTime()
      try {
        await api.addActivity(this.form)
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
      this.form.images.push(res.data)
    },
    handleImagesRemove(file) {
      const i = this.fileList.indexOf(file)
      this.form.images.splice(i, 1)
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


