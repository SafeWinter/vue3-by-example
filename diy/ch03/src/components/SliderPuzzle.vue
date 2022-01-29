<template>
  <div>
    <h1>Click to Swap the Images to Win</h1>
    <button @click="start" id="start-button">Start Game</button>
    <button @click="stop" id="quit-button">Quit</button>
    <p>Elapsed Time: {{ elapsedTime }}</p>
    <p v-if="isWinning" class="win">You win</p>

    <div class="row">
      <div
        class="column"
        v-for="(s, index) of shuffledPuzzleArray"
        :key="s"
        @click="swap(index)"
      >
        <img :src="require(`../assets/${puzzleId}/${s}`)" />
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
const correctPuzzleArray = Array.from(
  { length: 9 },
  (e, i) => `image_part_00${i + 1}.jpg`
);

export default {
  name: 'SlidePuzzle',
  props: {
    puzzleId: { type: String, default: 'cut-blue' },
  },
  data() {
    const now = new Date();
    return {
      correctPuzzleArray,
      shuffledPuzzleArray: this.getPuzzleArray(false),
      timer: undefined,
      startDateTime: now,
      currentDateTime: now,
      indexesToSwap: [],
    };
  },
  computed: {
    isWinning() {
      const shuffle = this.shuffledPuzzleArray;
      return correctPuzzleArray.every((c, i) => c === shuffle[i]);
    },
    elapsedDiff() {
      return moment(this.currentDateTime).diff(moment(this.startDateTime));
    },
    elapsedTime() {
      return moment.utc(this.elapsedDiff).format('HH:mm:ss');
    },
  },
  methods: {
    getPuzzleArray(shuffle = true) {
      return shuffle
        ? [...correctPuzzleArray].sort(() => Math.random() - 0.5)
        : [...correctPuzzleArray];
    },
    start() {
      this.resetTime();
      this.indexesToSwap = [];
      this.shuffledPuzzleArray = this.getPuzzleArray();

      this.timer = setInterval(() => {
        this.currentDateTime = new Date();
        if (this.isWinning) {
          this.recordSpeedRecords();
          this.stop();
        }
      }, 1000);
    },
    stop() {
      this.resetTime();
      clearInterval(this.timer);
    },
    resetTime() {
      this.startDateTime = this.currentDateTime = new Date();
    },
    recordSpeedRecords() {
      const records = JSON.parse(localStorage.getItem('records')) || [];
      const { elapsedDiff, elapsedTime } = this;
      const sortedRecords = records
        .concat({ elapsedDiff, elapsedTime })
        .sort((a, b) => a.elapsedDiff - b.elapsedDiff)
        .slice(0, 10);
      localStorage.setItem('records', JSON.stringify(sortedRecords));
    },
    swap(index) {
      if (!this.timer) return;
      if (this.indexesToSwap.length < 2) {
        this.indexesToSwap.push(index);
      }
      if (this.indexesToSwap.length === 2) {
        const [idx1, idx2] = this.indexesToSwap;
        const arr = this.shuffledPuzzleArray;
        [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
        this.indexesToSwap = [];
      }
    },
  },
};
</script>

<style>
.row {
  display: flex;
  flex-wrap: wrap;
  max-width: 90vw;
}
.column {
  flex-grow: 1;
  width: 33%;
}

.column img {
  width: 100%;
}

.win {
  color: red;
  font-weight: bolder;
  font-style: italic;
  text-transform: capitalize;
}
</style>
