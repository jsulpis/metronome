import { createStore } from "vuex";

const getDefaultState = () => ({
  bpm: {
    value: 120,
    min: 40,
    max: 180
  },
  beat: {
    current: 0,
    count: 4
  }
});

export default createStore({
  state: getDefaultState(),
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
    },
    addBeat(state) {
      state.beat.count = Math.min(state.beat.count + 1, 6);
    },
    removeBeat(state) {
      state.beat.count = Math.max(state.beat.count - 1, 1);
    },
    resetState(state) {
      Object.assign(state, getDefaultState());
    }
  },
  strict: true
  // plugins: [createLogger()]
});
