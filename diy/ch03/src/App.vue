<template>
  <div>
    <puzzles @puzzle-changed="selectedPuzzleId = $event" />
    <records />
    <slider-puzzle :puzzleId="selectedPuzzleId" />
  </div>
</template>

<script>
import Puzzles from './components/Puzzles.vue';
import Records from './components/Records.vue';
import SliderPuzzle from './components/SliderPuzzle.vue';

export default {
  name: 'App',
  components: { Puzzles, Records, SliderPuzzle },
  data() {
    return { selectedPuzzleId: 'cut-blue' };
  },
};
</script>

<style></style>
