<template>
  <div class="tinymce-container editor-container">
    <textarea class="tinymce-textarea" :id="tinymceId"></textarea>
    <div class="editor-custom-btn-container">
     <!-- <editorImage  color="#20a0ff" class="editor-upload-btn" @successCBK="imageSuccessCBK"></editorImage> -->
     <el-row style="margin-right: 20px;">
       <el-col span="10">
        <el-upload
          :action="`/${role}/common/upload`"
          name="files[]"
          :show-file-list="false"
          :on-success="imageSuccessCBK"
          :headers="{isAjax: 1}"
        :with-credentials="true"
        >
          <el-button size="small" type="primary">添加图片</el-button>
        </el-upload>
       </el-col>
       <el-col span="10" offset="4">

        <el-popover
          ref="videouploader"
          placement="bottom"
          width="400"
          trigger="click">
          <el-row>
            <el-col span="19">
              <el-input v-model="video.url" placeholder="请输入内容"></el-input>
            </el-col>
            <el-col span="4" offset="1">
              <el-button size="small"  type="primary" @click="insertVideo">添加</el-button>
            </el-col>
          </el-row>
        </el-popover>
        <el-button size="small" v-popover:videouploader type="primary">添加视频</el-button>
       </el-col>
     </el-row>
    </div>
  </div>
</template>

<script>
import editorImage from './components/editorImage'
import { mapState } from 'vuex'
export default {
  name: 'tinymce',
  components: { editorImage },
  props: {
    type: {
      type: String,
      default: 'activity'
    },
    id: {
      type: String
    },
    value: {
      type: String,
      default: ''
    },
    toolbar: {
      type: Array,
      required: false,
      default() {
        return [
          'removeformat undo redo |  bullist numlist | outdent indent | forecolor | fullscreen code',
          'formatselect bold italic blockquote | link | alignleft aligncenter alignright'
        ]
      }
    },
    menubar: {
      default: ''
    },
    height: {
      type: Number,
      required: false,
      default: 360
    }
  },
  computed: {
    ...mapState({
      role: state => state.user.roles
    })
  },
  data() {
    return {
      hasChange: false,
      hasInit: false,
      tinymceId: this.id || 'vue-tinymce-' + +new Date(),
      video: {
        url: ''
      }
    }
  },
  watch: {
    value(val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() => window.tinymce.get(this.tinymceId).setContent(val))
      }
    }
  },
  mounted() {
    this.initTinymce()
  },
  activated() {
    this.initTinymce()
  },
  deactivated() {
    this.destroyTinymce()
  },
  methods: {
    initTinymce() {
      const _this = this
      window.tinymce.init({
        selector: `#${this.tinymceId}`,
        height: this.height,
        body_class: 'panel-body ',
        object_resizing: false,
        toolbar: this.toolbar,
        menubar: this.menubar,
        plugins:
          'advlist,autolink,code,paste,textcolor, colorpicker,fullscreen,link,lists,wordcount, imagetools',
        end_container_on_empty_block: true,
        powerpaste_word_import: 'clean',
        fontsize_formats: '12px 14px 15px 16p 18px 20px 28px',
        block_formats:
          'Paragraph=p;Heading 1=h1;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;Heading 6=h6',
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: 'square',
        advlist_number_styles: 'default',
        imagetools_cors_hosts: ['wpimg.wallstcn.com', 'wallstreetcn.com'],
        imagetools_toolbar: 'watermark',
        default_link_target: '_blank',
        link_title: false,
        textcolor_map: [
          '000000',
          'Black',
          '993300',
          'Burnt orange',
          '333300',
          'Dark olive',
          '003300',
          'Dark green',
          '003366',
          'Dark azure',
          '000080',
          'Navy Blue',
          '333399',
          'Indigo',
          '333333',
          'Very dark gray',
          '800000',
          'Maroon',
          'FF6600',
          'Orange',
          '808000',
          'Olive',
          '008000',
          'Green',
          '008080',
          'Teal',
          '0000FF',
          'Blue',
          '666699',
          'Grayish blue',
          '808080',
          'Gray',
          'FF0000',
          'Red',
          'FF9900',
          'Amber',
          '99CC00',
          'Yellow green',
          '339966',
          'Sea green',
          '33CCCC',
          'Turquoise',
          '3366FF',
          'Royal blue',
          '800080',
          'Purple',
          '999999',
          'Medium gray',
          'FF00FF',
          'Magenta',
          'FFCC00',
          'Gold',
          'FFFF00',
          'Yellow',
          '00FF00',
          'Lime',
          '00FFFF',
          'Aqua',
          '00CCFF',
          'Sky blue',
          '993366',
          'Red violet',
          'FFFFFF',
          'White',
          'FF99CC',
          'Pink',
          'FFCC99',
          'Peach',
          'FFFF99',
          'Light yellow',
          'CCFFCC',
          'Pale green',
          'CCFFFF',
          'Pale cyan',
          '99CCFF',
          'Light sky blue',
          'CC99FF',
          'Plum',
          'fdda06',
          '你要的颜色'
        ],
        media_filter_html: true,
        media_live_embeds: true,

        video_template_callback: function(data) {
          console.log('???')
          console.log(data)
          return `
            <video width=${data.width} height="${data.height}">
              <source src=${data.source1} type=${data.source1mime}>
            </video>
            `
          // '<video width="' +
          // data.width +
          // '" height="' +
          // data.height +
          // '"' +
          // (data.poster ? ' poster="' + data.poster + '"' : '') +
          // ' controls="controls">\n' +
          // '<source src="' +
          // data.source1 +
          // '"' +
          // (data.source1mime ? ' type="' + data.source1mime + '"' : '') +
          // ' />\n' +
          // (data.source2
          //   ? '<source src="' +
          //     data.source2 +
          //     '"' +
          //     (data.source2mime ? ' type="' + data.source2mime + '"' : '') +
          //     ' />\n'
          //   : '') +
          // '</video>'
        },
        init_instance_callback: editor => {
          if (_this.value) {
            editor.setContent(_this.value)
          }
          _this.hasInit = true
          editor.on('NodeChange Change KeyUp', () => {
            this.hasChange = true
            this.$emit('input', editor.getContent({ format: 'raw' }))
          })
        }
      })
    },
    // 整合七牛上传

    destroyTinymce() {
      if (window.tinymce.get(this.tinymceId)) {
        window.tinymce.get(this.tinymceId).destroy()
      }
    },
    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value)
    },
    getContent() {
      window.tinymce.get(this.tinymceId).getContent()
    },
    imageSuccessCBK(res, file) {
      const _this = this
      // arr.forEach(v => {
      window.tinymce
        .get(_this.tinymceId)
        .insertContent(`<img class="wscnph" src="${res.data}" >`)
      // })
    },
    insertVideo() {
      const _this = this
      window.tinymce.get(_this.tinymceId).insertContent(`
        <video controls="controls">
              <source src=${this.video.url} type="video/mp4">
            </video>
        `)
      this.video.url = ''
    }
  },
  destroyed() {
    this.destroyTinymce()
  }
}
</script>

<style scoped>
.tinymce-container {
  position: relative;
}
.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}
.editor-custom-btn-container {
  position: absolute;
  right: 15px;
  /*z-index: 2005;*/
  top: 18px;
}
.editor-upload-btn {
  display: inline-block;
}
</style>
