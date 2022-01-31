<template>
  <div class="form">
    <h1>{{ edit ? 'Edit' : 'Add' }} Photo</h1>
    <form @submit.prevent="submit">
      <div>
        <label for="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          class="form-field"
          v-model="form.name"
        />
      </div>
      <div>
        <label for="description">Description</label>
        <textarea
          id="description"
          name="description"
          class="form-field"
          v-model="form.description"
        ></textarea>
      </div>
      <div>
        <label for="dateTaken">Date Taken</label>
        <input
          type="datetime-local"
          id="dateTaken"
          name="dateTaken"
          class="form-field"
          v-model="form.dateTaken"
        />
      </div>
      <div>
        <label for="photoFile">Photo</label>
        <br />
        <input type="file" name="photoFile" id="photoFile" @change="onChange" />
        <br />
        <img :src="form.photoFile" alt="" id="photo-preview" />
      </div>
      <div>
        <input type="submit" />
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { APIURL } from '../constant';

export default {
  name: 'PhotoForm',
  data() {
    return {
      form: {
        name: '',
        description: '',
        dateTaken: '',
        photoFile: undefined,
      },
    };
  },
  computed: {
    edit() {
      return this.$route.params && typeof this.$route.params.id !== 'undefined';
    },
  },
  methods: {
    async submit() {
      const { name, description, dateTaken, photoFile } = this.form;
      if (!name || !description || !dateTaken || !photoFile) {
        return alert('All fields are required');
      }
      const { id } = this.$route.params;
      if (this.edit) {
        await axios.put(`${APIURL}/photos/${id}`, this.form);
      } else {
        await axios.post(`${APIURL}/photos`, this.form);
      }
      this.$router.push('/');
    },
    onChange(ev) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(ev.target.files[0]);
      fileReader.onload = () => {
        this.form.photoFile = fileReader.result;
      };
    },
  },
  async beforeMount() {
    const { id } = this.$route.params;
    if (this.edit) {
      const { data: form } = await axios.get(`${APIURL}/photos/${id}`);
      this.form = form;
    }
  },
};
</script>

<style scoped>
.form {
  margin: 0 auto;
  width: 70vw;
}

.form-field {
  width: 100%;
}

#photo-preview {
  width: 200px;
}
</style>
