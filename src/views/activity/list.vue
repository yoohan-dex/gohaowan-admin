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
      label="活动封面"
      width="320">
      <template slot-scope="scope">
        <div class="cover">
          <img :src="scope.row.cover_image" alt="">
        </div>
      </template>
    </el-table-column>
    <el-table-column
      prop="date"
      label="活动时间"
      width="300"
      >
    </el-table-column>
    <el-table-column
      prop="title"
      label="活动名称"
      width="200"
      >
    </el-table-column>
    <el-table-column
      prop="join_fee"
      label="活动费用">
    </el-table-column>
    <el-table-column
      prop="member"
      label="报名人数">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="300">
      <template slot-scope="scope">
        <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
        <el-button @click="handleEdit(scope.row.id)" type="text" size="small">详情</el-button>
        <el-button @click="handleMgr(scope.row.id)" type="text" size="small">报名管理</el-button>
        <el-button v-show="role === 'admin'" @click="handleBlock(scope.row.id, (scope.row.is_show + 1) % 2)" type="text" size="small">{{scope.row.is_show === 0 ? '取消屏蔽' : '屏蔽'}}</el-button>
        <el-button v-show="role === 'admin'" @click="handleTop(scope.row.id, (scope.row.top + 1) % 2)" type="text" size="small">{{scope.row.is_show === 0 ? '置顶' : '取消置顶'}}</el-button>
      </template>
    </el-table-column>
  </el-table>

    
  </div>
</template>
<script>
import { mapState } from 'vuex'
import format from '../../utils/format'
import api from '../../api/activity'
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
      const res = await api.getActivityList(page)
      const data = res.data
      this.total = data.total
      this.tableData = data.list.map(v => transformList(v))
    },
    async handleBlock(id, show) {
      await api.block({ id, show })
      this.handleData(this.currentPage)
    },
    async handleTop(id, top) {
      await api.setTop(id)(top)
      this.handleData(this.currentPage)
    },
    handleEdit(id) {
      this.$router.push({
        name: 'edit-activity',
        params: {
          id
        }
      })
    },
    handleMgr(id) {
      this.$router.push({
        name: 'action',
        params: {
          id
        }
      })
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


