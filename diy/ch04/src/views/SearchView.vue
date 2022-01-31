<template>
  <div>
    <h1>Search</h1>
    <form @submit.prevent="submit">
      <div>
        <label for="keyword">Keyword</label>
        <br />
        <input
          type="text"
          name="keyword"
          id="keyword"
          class="form-field"
          v-model="keyword"
        />
      </div>
      <div>
        <input type="submit" value="Search" />
      </div>
    </form>
    <div v-for="p of photos" :key="p.id" class="row">
      <div>
        <img :src="p.photoFile" />
      </div>
      <div>{{ p.name }}</div>
      <div>{{ p.description }}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { APIURL } from '../constant';

export default {
  name: 'SearchPage',
  data() {
    return {
      keyword: '',
      photos: [],
    };
  },
  methods: {
    submit() {
      console.log(this.keyword);
      this.$router.push({ path: '/search', query: { q: this.keyword } });
    },
    async search() {
      const { data: photos } = await axios.get(
        `${APIURL}/photos?name_like=${this.$route.query.q}`
      );
      this.photos = photos;
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        this.keyword = this.$route.query.q;
        this.search();
      },
    },
  },
};
</script>

<style>
.form-field {
  width: 100%;
}
.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.row div {
  width: 25%;
}

.row img {
  width: 100px;
}
</style>
