<template>
  <div class="content">
    <!--用户头像-->
    <img :src="item.user.avatarUrl" alt="" class="avatar" />

    <!--评论信息-->
    <div class="text">
      <div>
        <span class="nickname">{{ item.user.nickname }}</span>
        : {{ item.content }}
      </div>

      <!--子评论-->
      <div v-if="item.beReplied.length > 0" class="reply_cont">
        <div
          v-for="(citem, index) in item.beReplied"
          :key="index"
          class="reply_text"
        >
          <span class="nickname">@{{ citem.user.nickname }}</span>
          : {{ citem.content }}
        </div>
      </div>

      <p class="time">
        {{ item.time | dateFormat }}
      </p>

    </div>
    
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang='less' scoped>
.content {
  display: flex;
  .text {
    margin-left: 10px;
    width: 100%;
    .nickname {
      color: #4d99de;
    }
    .reply_cont{
      margin-top: 12px;
    }
    .reply_text {
      background-color: rgb(241, 241, 244);
      padding: 7px;
      border-radius: 5px;
    }
    .time {
      display: block;
      font-size: 13px;
      color: rgb(160, 160, 160);
    }
  }
}
.avatar {
  display: inline;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>