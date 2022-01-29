<template>
  <div>
    <h1>Select a Puzzle</h1>
    <div v-for="p of puzzles" :key="p.id" class="row">
      <div>
        <img
          :src="require(`../assets/${p.image}`)"
          alt="`${p.title}`"
          title="`${p.title}`"
        />
      </div>
      <div>
        <h2>{{ p.title }}</h2>
      </div>
      <div class="play-button">
        <button @click="selectPuzzle(p)">Play</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      puzzles: [
        { id: 'cut-pink', image: 'pink.jpg', title: 'Pink Flower' },
        { id: 'cut-purple', image: 'purple.jpg', title: 'Purple Flower' },
        { id: 'cut-red', image: 'red.jpg', title: 'Red Flower' },
        { id: 'cut-blue', image: 'blue.jpg', title: 'Blue Flower' },
      ],
    };
  },
  methods: {
    selectPuzzle(puzzle) {
      this.$emit('puzzle-changed', puzzle.id);
    },
  },
};
</script>

<style>
.row {
  display: flex;
  flex-wrap: wrap;
  max-width: 90vw;
  justify-content: space-between;
}

.row img {
  width: 100px;
}
.row .play-button {
  padding-top: 25px;
}
</style>
