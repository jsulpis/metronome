import { createStore } from "vuex";

export default createStore({
  state: {
    bpm: {
      value: 120,
      min: 40,
      max: 180
    },
    beat: {
      current: 1,
      count: 4
    }
  },
  mutations: {
    incrementBpmBy(state, value) {
      state.bpm.value = Math.min(state.bpm.value + value, state.bpm.max);
    },
    decrementBpmBy(state, value) {
      state.bpm.value = Math.max(state.bpm.value - value, state.bpm.min);
    },
    setBpmValue(state, value) {
      if (value >= state.bpm.min && value <= state.bpm.max) {
        state.bpm.value = value;
      }
    },
    nextBeat(state) {
      state.beat.current = (state.beat.current + 1) % (state.beat.count + 1) || 1;
    }
  },
  strict: true
  // plugins: [createLogger()]
});
