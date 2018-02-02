<template>
  <div class="container">
    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        @current-change="handleData">
      </el-pagination>
    </div>
    <el-table
    :data="tableData"
    height="700"
    border
    style="width: 100%">
    <el-table-column
      label="资讯封面"
      width="400">
      <template slot-scope="scope">
        <div class="cover">
          <img :src="scope.row.cover_image" alt="">
        </div>
      </template>
    </el-table-column>
    <el-table-column
      prop="title"
      label="标题"
      width="300"
      >
    </el-table-column>
    <el-table-column
      prop="time"
      label="创建时间"
      width="200"
      >
    </el-table-column>
    
    <el-table-column
      label="操作"
      width="200">
      <template slot-scope="scope">
        <el-button @click="handleTop(scope.row.id, (scope.row.top + 1) % 2)" type="text" size="small">{{scope.row.top === 0 ? '置顶' : '取消置顶'}}</el-button>
        <el-button @click="handleEdit(scope.row.id)" type="text" size="small">编辑</el-button>
        <el-button @click="handleDelete(scope.row.id)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

    
  </div>
</template>
<script>
import format from '../../utils/format'
import api from '../../api/information'
import { mapState } from 'vuex'

const transformList = item => {
  return {
    ...item,
    time: format.formatTime(item.add_time)
  }
}

export default {
  data() {
    return {
      tableData: [],
      total: 0,
      currentPage: 1
    }
  },
  async mounted() {
    this.handleData(1)
  },
  computed: {
    ...mapState({
      role: state => state.user.roles
    })
  },
  methods: {
    async handleData(page) {
      this.currentPage = page
      const res = await api.get(page)
      const data = res.data
      this.total = data.total
      this.tableData = data.list.map(v => transformList(v))
    },
    async handleTop(id, top) {
      await api.top(id, top)
      this.handleData(this.currentPage)
    },
    handleEdit(id) {
      this.$router.push({
        name: 'edit-information',
        params: {
          id
        }
      })
    },
    async handleDelete(id) {
      await api.del(id)
      this.handleData(this.currentPage)
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  width: 90%;
  margin: 20px auto;
}
.block {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 20px 0;
}
.cover {
  width: 300px;
  img {
    width: 100%;
  }
}
</style>


