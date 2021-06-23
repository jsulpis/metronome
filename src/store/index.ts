import { createStore } from "vuex";

export default createStore({
  state: {
    bpm: 120
  },
  mutations: {
    incrementBpmByOne(state) {
      state.bpm++;
    },
    decrementBpmByOne(state) {
      state.bpm--;
    },
    incrementBpmByFive(state) {
      state.bpm += 5;
    },
    decrementBpmByFive(state) {
      state.bpm -= 5;
    },
    setBpmValue(state, payload) {
      state.bpm = payload;
    }
  }
  // plugins: [createLogger()]
});
