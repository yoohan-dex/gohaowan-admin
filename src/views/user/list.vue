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
      label="微信昵称"
      width="200"
      prop="nickname"
      >
      
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="50"
      >
    </el-table-column>
    <el-table-column
      prop="phone"
      label="手机"
      width="200"
      >
    </el-table-column>
    
    <!-- <el-table-column
      fixed="right"
      label="操作"
      width="300">
      <template slot-scope="scope">
        <div v-show="scope.row.status === 1 || scope.row.status === 4">

        <el-button @click="handleVerify(scope.row.id)" type="text" size="small">验票</el-button>
        <el-button @click="handleCancel(scope.row.id)" type="text" size="small">取消</el-button>
        </div>
        <div v-show="scope.row.status === 0">未支付</div>
        <div v-show="scope.row.status === 2">已取消</div>
        <div v-show="scope.row.status === 3">已验票</div>
      </template>
    </el-table-column> -->
  </el-table>

    
  </div>
</template>
<script>
import { mapState } from 'vuex'
import format from '../../utils/format'
import api from '../../api/user'
const transformList = item => {
  return {
    ...item,
    date:
      format.formatTime(item.start_time) +
      '  -  ' +
      format.formatTime(item.end_time),
    member: `${item.joined_number}${
      item.join_limit_number === -1 ? '' : '/' + item.join_limit_number
    }`
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
      role: state => state.user.role
    })
  },
  methods: {
    async handleData(page) {
      this.currentPage = page
      this.id = this.$route.params.id
      const res = await api.get(page)
      const data = res.data
      this.total = data.total
      this.tableData = data.list.map(v => transformList(v))
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
.head {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 50px;
    height: 50px;
  }
}
</style>


