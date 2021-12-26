<template>
  <div>
    <h1>Github App</h1>
    <GitHubTokenForm />
    <DemoUser />
    <DemoRepos />
  </div>
</template>

<script>
import GitHubTokenForm from "./components/GitHubTokenForm.vue";
import DemoRepos from "./components/Repos.vue";
import DemoUser from "./components/User.vue";

export default {
  name: "App",
  components: {
    GitHubTokenForm,
    DemoRepos,
    DemoUser,
  },
};
</script>
