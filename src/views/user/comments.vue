<template>
  <div class="container">

    <div class="block">
      <el-date-picker
        v-model="date"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <el-button @click="handleQuery">查询</el-button>
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
      >
      <template slot-scope="scope">
        <div class="head">
          <img :src="scope.row.headimgurl" alt="">
          <div class="nickname">{{scope.row.nickname}}</div>
        </div>
      </template>
      
    </el-table-column>
    <el-table-column
      label="姓名"
      width="200"
      >
      <template slot-scope="scope">
        对 {{scope.row.title}} 进行评论
      </template>
    </el-table-column>
    <el-table-column
      prop="content"
      label="评论内容"
      width="200"
      >
    </el-table-column>
    <el-table-column
      prop="time"
      label="评论时间"
      width="200"
      >
    </el-table-column>
    
    <el-table-column
      label="操作"
      width="300">
      <template slot-scope="scope">
        <!-- <div v-show="scope.row.status === 1 || scope.row.status === 4">

        <el-button @click="handleVerify(scope.row.id)" type="text" size="small">验票</el-button>
        <el-button @click="handleCancel(scope.row.id)" type="text" size="small">取消</el-button>
        </div>
        <div v-show="scope.row.status === 0">未支付</div>
        <div v-show="scope.row.status === 2">已取消</div>
        <div v-show="scope.row.status === 3">已验票</div> -->
        <el-button @click="handleBlock(scope.row.id, (scope.row.is_show + 1) % 2)" type="text" size="small">{{scope.row.is_show === 0 ? '取消屏蔽' : '屏蔽'}}</el-button>
      </template>
    </el-table-column>
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
    time: format.formatTimeWithM(item.create_time)
  }
}

export default {
  data() {
    return {
      tableData: [],
      total: 0,
      currentPage: 1,
      date: ''
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
    async handleData(page, s, e) {
      this.currentPage = page
      this.id = this.$route.params.id
      const res = await api.getComment(page, s, e)
      const data = res.data
      this.total = data.total
      this.tableData = data.list.map(v => transformList(v))
    },
    handleQuery() {
      const [s, e] = this.date
      this.handleData(this.currentPage, s, e)
    },
    async handleBlock(id, show) {
      await api.block(id, show)
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


