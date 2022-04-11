import { RYTHMS } from "../models/rythms";
import type { Rythm } from "../models/rythms";
import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

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
    largeIncrement: 5,
    theme: "auto"
  }
});

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
    resetBeat(state) {
      state.beat.current = 0;
    },
    addBeat(state) {
      state.beat.count = Math.min(state.beat.count + 1, 6);
    },
    removeBeat(state) {
      state.beat.count = Math.max(state.beat.count - 1, 1);
    },
    setRythm(state, rythm: Rythm) {
      if (Object.keys(RYTHMS).includes(rythm)) {
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
    setTheme(state, payload: "lith" | "dark" | "auto") {
      state.settings.theme = payload;
    },
    resetState(state) {
      Object.assign(state, getDefaultState());
    }
  },
  getters: {
    intermediateBeats(state) {
      return RYTHMS[state.beat.rythm as Rythm];
    }
  },
  strict: true,
  plugins: [createPersistedState({ paths: ["settings", "bpm", "beat.count", "beat.rythm"] })] // persist everything except the current beat
});
