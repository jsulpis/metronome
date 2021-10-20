import { createStore } from "vuex";

const getDefaultState = () => ({
  bpm: {
    value: 120,
    min: 40,
    max: 180
  },
  beat: {
    current: 0,
    count: 4,
    rythm: "quarter"
  },
  settings: {
    volume: 100,
    sound: "click",
    accentuateFirstBeat: true,
    largeIncrement: 5
  }
});

const VALID_RYTHMS = ["quarter", "eighth", "sixteenth", "triplet", "triplet-rest"] as const;
type Rythm = typeof VALID_RYTHMS[number];

export default createStore({
  state: getDefaultState(),
  mutations: {
    incrementBpmBy(state, value: number) {
      state.bpm.value = Math.min(state.bpm.value + value, state.bpm.max);
    },
    decrementBpmBy(state, value: number) {
      state.bpm.value = Math.max(state.bpm.value - value, state.bpm.min);
    },
    setBpmValue(state, value: number) {
      if (value >= state.bpm.min && value <= state.bpm.max) {
        state.bpm.value = value;
      }
    },
    setMinBpmValue(state, value: number) {
      const newMin = Math.min(Math.max(value, 40), state.bpm.max);
      state.bpm.min = newMin;
      if (state.bpm.value < newMin) {
        state.bpm.value = newMin;
      }
    },
    setMaxBpmValue(state, value: number) {
      const newMax = Math.max(Math.min(value, 180), state.bpm.min);
      state.bpm.max = newMax;
      if (state.bpm.value > newMax) {
        state.bpm.value = newMax;
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
    setRythm(state, rythm: Rythm) {
      if (VALID_RYTHMS.includes(rythm)) {
        state.beat.rythm = rythm;
      }
    },
    setVolume(state, payload: number) {
      state.settings.volume = Math.min(100, Math.max(0, payload));
    },
    setSound(state, payload: string) {
      state.settings.sound = payload;
    },
    setAccentuateFirstBeat(state, payload: boolean) {
      state.settings.accentuateFirstBeat = payload;
    },
    setLargeIncrement(state, payload: number) {
      state.settings.largeIncrement = payload;
    },
    resetState(state) {
      Object.assign(state, getDefaultState());
    }
  },
  strict: true
  // plugins: [createLogger()]
});
