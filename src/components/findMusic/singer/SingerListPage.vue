<template>
  <el-container>
    <el-header class="tag" height="auto">
      <el-row type="flex" justify="left" class="tagname">
        <el-col class="left">语种:</el-col>
        <el-col class="right">
          <div
            class="tagtext"
            v-for="(item, index) in singerLanguage"
            :key="index"
          >
            <span
              id="areas"
              :class="{ actived: areaId == item.id }"
              @click="changeMusicListTypes(item.id)"
            >
              {{ item.name }}
            </span>
          </div>
        </el-col>
      </el-row>

      <el-row type="flex" class="tagname">
        <el-col class="left">分类:</el-col>
        <el-col class="right">
          <div class="tagtext" v-for="(item, index) in singerType" :key="index">
            <span
              id="type"
              :class="{ actived: typeId == item.id }"
              @click="changeMusicListSex(item.id)"
            >
              {{ item.name }}
            </span>
          </div>
        </el-col>
      </el-row>

      <el-row type="flex" class="tagname">
        <el-col class="left">筛选:</el-col>
        <el-col class="right">
          <div
            class="tagtext"
            v-for="(item, index) in singerinitial"
            :key="index"
          >
            <span
              id="initial"
              :class="{ actived: initialId == item.id }"
              @click="changeMusicListinitial(item.id)"
            >
              {{ item.name }}
            </span>
          </div>
        </el-col>
      </el-row>
    </el-header>

    <el-main>
      <el-row v-show="toggle == 1" type="flex" justify="center">
        <i class="el-icon-loading" style="font-size: 20px"></i>数据加载中
      </el-row>
      <el-row :gutter="20" class="row-flex" v-show="toggle == 2">
        <el-col :span="4" v-for="(item, index) in singerList" :key="index">
          <el-image :src="item.img1v1Url"></el-image>
          <div class="name">{{ item.name }}</div>
        </el-col>
      </el-row>
      <!--分页-->
      <el-pagination
        class="pagination"
        v-show="toggle == 2"
        background
        layout="prev, next"
        :page-size="queryInfo.limit"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      //歌手分类查询条件
      queryInfo: {
        type: -1,
        area: -1,
        initial: -1,
        limit: 60,
        offset: 0,
      },
      //歌手类型分类标签
      singerType: [
        { id: -1, name: "全部" },
        { id: 1, name: "男歌手" },
        { id: 2, name: "女歌手" },
        { id: 3, name: "乐队" },
      ],
      //歌手语种分类
      singerLanguage: [
        { id: -1, name: "全部" },
        { id: 7, name: "华语" },
        { id: 96, name: "欧美" },
        { id: 8, name: "日本" },
        { id: 16, name: "韩国" },
        { id: 0, name: "其他" },
      ],
      //字段开头
      singerinitial: [
        { id: -1, name: "热门" },
        { id: "A", name: "A" },
        { id: "B", name: "B" },
        { id: "C", name: "C" },
        { id: "D", name: "D" },
        { id: "E", name: "E" },
        { id: "F", name: "F" },
        { id: "G", name: "G" },
        { id: "H", name: "H" },
        { id: "I", name: "I" },
        { id: "J", name: "J" },
        { id: "K", name: "K" },
        { id: "L", name: "L" },
        { id: "M", name: "M" },
        { id: "N", name: "N" },
        { id: "O", name: "O" },
        { id: "P", name: "P" },
        { id: "Q", name: "Q" },
        { id: "R", name: "R" },
        { id: "S", name: "S" },
        { id: "T", name: "T" },
        { id: "U", name: "U" },
        { id: "V", name: "V" },
        { id: "W", name: "W" },
        { id: "X", name: "X" },
        { id: "Y", name: "Y" },
        { id: "Z", name: "Z" },
        { id: 0, name: "#" },
      ],
      //用来显示加载数据,默认不显示
      toggle: 2,
      //分页器当前页码
      singerList: [],
      //上一次点击的语种分类(默认的是type-1)
      prevClickArea: "area-1",
      //上一次点击的语种分类(默认的是type-1)
      prevClickType: "type-1",
      //上一次点击的字段分类(默认的是type-1)
      prevClickinitial: "initial-1",

      // 分类默认id
      typeId: -1,
      areaId: -1,
      initialId: -1,
    };
  },
  created() {
    //获取歌手数据
    this.getSingerList();
  },
  methods: {
    //获取歌手数据
    async getSingerList() {
      this.toggle = 1;
      await this.$http
        .get("artist/list", { params: this.queryInfo })
        .then((res) => {
          this.singerList = res.data.artists;
        });
      this.toggle = 2;
    },
    //分页插件页数改变
    handleCurrentChange(newPage) {
      this.queryInfo.offset = (newPage - 1) * this.queryInfo.limit;
      this.getSingerList();
    },
    //改变语种分类
    changeMusicListTypes(areaId) {
      this.areaId = areaId;

      //赋值存储
      this.prevClickArea = "area" + areaId;
      //修改查询条件
      this.queryInfo.area = areaId;
      //将查询偏移量变成0
      this.queryInfo.offset = 0;
      this.getSingerList();
    },
    //改变歌手性别分类
    changeMusicListSex(typeId) {
      this.typeId = typeId;
      //赋值存储
      this.prevClickType = "type" + typeId;
      //修改查询条件
      this.queryInfo.type = typeId;
      //将查询偏移量变成0
      this.queryInfo.offset = 0;
      this.getSingerList();
    },
    //改变字段分类
    changeMusicListinitial(initialId) {
      this.initialId = initialId;
      //赋值存储
      this.prevClickinitial = "initial" + initialId;
      //修改查询条件
      this.queryInfo.initial = initialId;
      //将查询偏移量变成0
      this.queryInfo.offset = 0;
      this.getSingerList();
    },
    //跳转歌手详情页
    toSingerDetailPage(id) {
      this.$router.push("/singer/" + id);
    },
    load() {
      console.log("正在滚动");
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.el-main {
  height: 100% !important;
  overflow-y: hidden;
}
.tag {
  .el-row {
    line-height: 30px;
  }
}
</style>

