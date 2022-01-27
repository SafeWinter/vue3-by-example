const { Octokit } = require('@octokit/rest');
export const octokitMixin = {
  methods: {
    createOctokitClient() {
      return new Octokit({
        auth: localStorage.getItem('github-token'),
      });
    },
  },
};
