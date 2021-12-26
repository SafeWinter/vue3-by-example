<template>
  <div>
    <Puzzles @puzzle-changed="selectedPuzzleId = $event" />
    <Records />
    <SliderPuzzle :puzzleId="selectedPuzzleId" />
  </div>
</template>

<script>
import Puzzles from "./components/Puzzles.vue";
import Records from "./components/Records.vue";
import SliderPuzzle from "./components/SliderPuzzle.vue";

export default {
  name: "App",
  components: {
    Puzzles,
    Records,
    SliderPuzzle,
  },
  data() {
    return {
      selectedPuzzleId: "cut-blue",
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
