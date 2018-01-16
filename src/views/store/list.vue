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
      label="商户封面"
      width="400">
      <template slot-scope="scope">
        <div class="cover">
          <img :src="scope.row.cover_image" alt="">
        </div>
      </template>
    </el-table-column>
    <el-table-column
      prop="store_name"
      label="商户名称"
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
      prop="allAddress"
      label="商户地址"
      width="200"
      >
    </el-table-column>
    
    <el-table-column
      label="操作"
      width="200">
      <template slot-scope="scope">
        <el-button @click="handleEdit(scope.row.id)" type="text" size="small">编辑</el-button>
        <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

    
  </div>
</template>
<script>
import format from '../../utils/format'
import api from '../../api/store'
import { mapState } from 'vuex'

const transformList = item => {
  return {
    ...item,
    time: format.formatTime(item.create_time),
    allAddress: item.province + item.city + item.address
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
      role: state => state.app.role
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
        name: 'store-edit',
        params: {
          id
        }
      })
    },
    async handleDelete({ id, store_name }) {
      try {
        await this.$confirm(`确定删除 「${store_name}」 吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await api.del(id)
        this.handleData(this.currentPage)
      } catch (e) {
        //
      }
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


