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
    }
  }
  // plugins: [createLogger()]
});
