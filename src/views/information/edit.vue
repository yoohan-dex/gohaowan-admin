<template>
  <div class="container">
    <el-form ref="form" label-width="120px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
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
      <el-form-item label="微信分享描述">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入内容"
          v-model="form.share_text">
        </el-input>
      </el-form-item>
      <el-form-item label="资讯内容">
        <tinymce :height="400"  type="information" v-model="form.content"></tinymce>
        </el-form-item>
        <el-form-item>
      <el-button type="primary" @click="onSubmit">立即修改</el-button>
    </el-form-item>
    </el-form>
    </div>  
</template>
<script>
import Tinymce from '@/components/Tinymce'
import api from '../../api/information'
import format from '../../utils/format'
import { mapState } from 'vuex'

const transformItem = item => {
  return {
    ...item,
    add_time: format.formatCommonTime(item.add_time)
  }
}
const ini = {
  title: '',
  cover_image: '',
  content: '',
  share_text: ''
}
export default {
  name: 'information-add',
  components: { Tinymce },
  data() {
    return {
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

      if (this.form.join_limit_number > -1) {
        this.isLimit = true
      }
    },
    handleCoverSuccess(res, file) {
      this.form.cover_image = res.data
    },
    reset() {
      this.form = ini
    },
    async onSubmit() {
      try {
        await api.edit(this.form)
        this.$message('发布成功')
      } catch (e) {
        //
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
</style>


