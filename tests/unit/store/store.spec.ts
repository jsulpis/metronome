import store from "@/store";

const { state, commit } = store;

const DEFAULT_STORE_VALUE = {
  bpm: {
    value: 120,
    min: 40,
    max: 180
  },
  beat: {
    current: 0,
    count: 4
  },
  settings: {
    volume: 100,
    sound: "click",
    accentuateFirstBeat: true,
    largeIncrement: 5
  }
};

describe("store mutations", () => {
  beforeEach(() => {
    commit("resetState");
  });

  it("should have a default state", () => {
    expect(store.state).toEqual(DEFAULT_STORE_VALUE);
  });

  describe("nextBeat", () => {
    it("should increment the current beat and reset to 1 after reaching the beat count", () => {
      commit("nextBeat");
      expect(state.beat.current).toBe(1); // the current beat is 0 initially
      commit("nextBeat");
      expect(state.beat.current).toBe(2);
      commit("nextBeat");
      expect(state.beat.current).toBe(3);
      commit("nextBeat");
      expect(state.beat.current).toBe(4); // default beat count is 4
      commit("nextBeat");
      expect(state.beat.current).toBe(1);
      commit("nextBeat");
      expect(state.beat.current).toBe(2);
    });
  });

  describe("addBeat", () => {
    it("should increment the beat count with a maximum of 6 beats", () => {
      commit("addBeat");
      expect(state.beat.count).toBe(5);
      commit("addBeat");
      expect(state.beat.count).toBe(6);
      commit("addBeat");
      expect(state.beat.count).toBe(6);
    });
  });

  describe("removeBeat", () => {
    it("should decrement the beat count with a minimum of 1 beat", () => {
      commit("removeBeat");
      expect(state.beat.count).toBe(3);
      commit("removeBeat");
      expect(state.beat.count).toBe(2);
      commit("removeBeat");
      expect(state.beat.count).toBe(1);
      commit("removeBeat");
      expect(state.beat.count).toBe(1);
    });
  });

  describe("setVolume", () => {
    it("should set the volume with a min of 0 and a max of 100", () => {
      commit("setVolume", 42);
      expect(state.settings.volume).toBe(42);
      commit("setVolume", -1);
      expect(state.settings.volume).toBe(0);
      commit("setVolume", 101);
      expect(state.settings.volume).toBe(100);
    });
  });

  describe("setSound", () => {
    it("should set the sound", () => {
      commit("setSound", "sticks");
      expect(state.settings.sound).toBe("sticks");
      commit("setSound", "hi-hat");
      expect(state.settings.sound).toBe("hi-hat");
    });
  });

  describe("setAccentuateFirstBeat", () => {
    it("should set the option to accentuate the first beat", () => {
      commit("setAccentuateFirstBeat", true);
      expect(state.settings.accentuateFirstBeat).toBe(true);
      commit("setAccentuateFirstBeat", false);
      expect(state.settings.accentuateFirstBeat).toBe(false);
    });
  });

  describe("setLargeIncrement", () => {
    it("should set the value of the large increment", () => {
      commit("setLargeIncrement", 6);
      expect(state.settings.largeIncrement).toBe(6);
      commit("setLargeIncrement", 2);
      expect(state.settings.largeIncrement).toBe(2);
    });
  });

  describe("resetState", () => {
    it("should reset the default state", () => {
      // Given
      commit("addBeat");
      commit("nextBeat");
      commit("setBpmValue", 140);

      // When
      commit("resetState");

      // Then
      expect(state).toEqual(DEFAULT_STORE_VALUE);

      // Then: state is still reactive
      commit("addBeat");
      expect(state.beat.count).toBe(5);
    });
  });
});
