<template>
<el-container>
  <el-header>
    <div id="logo">
      <a>
        <img src="../../image/logo.png">
      </a>
    </div>
    <div id="link-button">
      <div class="nav-menu" @click="toHomePage"><i class="icon-home"></i> 首页</div>
      <div class="nav-menu" @click="toSelfPage"><i class="icon-user"></i> 我的</div>
      <div class="nav-menu"><i class="icon-folder"></i> 收藏夹</div>
      <div class="nav-menu"><i class="icon-heart"></i> 关注</div>
    </div>
  </el-header>

  <el-main>
    <div class="activity-information">
      <div
          class="activity"
          v-for="activity in activities"
          :key="activity.id"
      >
        <div class="organizer">
          <img :src="activity.organizer.avatar" :alt="activity.organizer.name" />
          <h2>{{ activity.organizer.name }}</h2>
        </div>
        <div class="content">
          <h3>{{ activity.title }}</h3>
          <p>{{ activity.description }}</p>
          <img :src="activity.poster" :alt="activity.title" />
        </div>
        <div class="interactions">
          <button @click="like(activity.id)">Like</button>
          <button @click="comment(activity.id)">Comment</button>
          <button @click="favorite(activity.id)">Favorite</button>
        </div>
      </div>
    </div>

  </el-main>
</el-container>
</template>

<script>
export default {
  name: "ActivityInformation",
  data() {
    return {
      activities: [], // Should be fetched from an API
    };
  },
  methods: {
    like(id) {
      // Implement like functionality
    },
    comment(id) {
      // Implement comment functionality
    },
    favorite(id) {
      // Implement favorite functionality
    },
  },
};
</script>

<style scoped>
.activity-information {
  /* Your styles here */
}

.organizer {
  /* Your styles here */
}

.content {
  /* Your styles here */
}

.interactions {
  /* Your styles here */
}
</style>