import { createStore } from "vuex";

export default createStore({
  state: {
    bpm: 120,
    min: 40,
    max: 180
  },
  mutations: {
    incrementBpmBy(state, value) {
      state.bpm = Math.min(state.bpm + value, state.max);
    },
    decrementBpmBy(state, value) {
      state.bpm = Math.max(state.bpm - value, state.min);
    },
    setBpmValue(state, value) {
      if (value >= state.min && value <= state.max) {
        state.bpm = value;
      }
    }
  },
  strict: true
  // plugins: [createLogger()]
});
