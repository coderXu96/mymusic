<template>
    <el-container>
        <!-- 官方榜 -->
        <el-header height="auto" class="title">官方榜</el-header>
        <el-main>
            <el-row :gutter="20" class="RankList" type="flex" justify="space-around" v-for="(item,index) in official" :key="index">
                <el-col :span='4'>
                    <el-image :src="item.coverImgUrl" @click="toSongListPage(item.id)"></el-image>
                </el-col>
                 <el-col :span='20'>
                    <el-table :data="item.tracks" stripe :show-header="false">
                        <el-table-column type="index">
                            <template scope="scope">
                                <span style="color: red;font-weight: 400">{{scope.$index+1}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="first" ></el-table-column>
                        <el-table-column prop="second" align='right' class-name='second'></el-table-column>
                    </el-table>
                </el-col>
            </el-row>
            <el-row :gutter="20" class="RankList" type="flex" justify="space-around"  singerRankInfo>
                <el-col :span='4'>
                    <el-image :src="singerRankInfo.coverUrl" @click="toSongListPage(singerRankInfo.id)"></el-image>
                </el-col>
                 <el-col :span='20'>
                    <el-table :data="singerRankInfo.artists" stripe :show-header="false">
                        <el-table-column type="index">
                            <template scope="scope">
                                <span style="color: red;font-weight: 400">{{scope.$index+1}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="first" ></el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </el-main>

        <!-- 全球榜 -->
        <el-header height="auto" class="title">全球榜</el-header>
        <el-main>
              <el-row :gutter="20" class="row-flex"> 
                <el-col v-for="(item,index) in globa" :key="index" class="mark-img five-eq">
                    <el-image :src="item.coverImgUrl"></el-image>
                    <div class="name">{{item.name}}</div>
                    <span class="playCount"><i class="el-icon-caret-right"></i>{{item.playCount >= 10000 ? (item.playCount/10000).toFixed(0)+'万' : item.playCount}}</span>
                    <!-- 默认不显示 -->
                    <el-image :src="playhover" class="playhover" v-show="false"></el-image>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        data() {
            return {
                //排行榜的所有数据
                musicRankList: [
                    {
                        coverImgUrl: ''
                    },
                    {
                        coverImgUrl: ''
                    },
                    {
                        coverImgUrl: ''
                    },
                    {
                        coverImgUrl: ''
                    }
                ],
                //歌手榜的信息
                singerRankInfo: {
                    coverUrl: '',
                    artists: []
                },
                playhover:require("@/assets/images/play.png"),
            }
        },
        computed:{
            official(){
                return this.musicRankList.slice(0,4)
            },
            globa(){
                return this.musicRankList.slice(4,30)
            }
        },
        created() {
            //获取官方榜单的数据
            this.getOfficialRankList()
        },
        mounted(){
            console.log(this)
        },
        methods: {
            //获得官方榜单的数据
            getOfficialRankList() {
                this.$http.get('toplist/detail').then(res => {
                    this.musicRankList = res.data.list
                    this.singerRankInfo = res.data.artistToplist
                })
            },
            //点击歌单跳转界面
            toSongListPage(id) {
                this.$router.push('/songlist/' + id)
            },
            //双击歌曲添加数据进去,并循环播放(向父组件传递参数)
            playMusicList(row) {
                this.$emit('setSongListInfo', window.localStorage.getItem('playlist'), row.id)
            },
        }
    }
</script>

<style lang='less' scoped>
    .title{
        font-size: 1.2rem;
        font-weight: bold;
    }
    .RankList{
        margin: 0px 0px 50px 0px;
        align-items: center;
        .el-image{
            border-radius: 15px;
            cursor:pointer;
        }
        /deep/.second{
            color: #909399 !important;
        }
    }
</style>
