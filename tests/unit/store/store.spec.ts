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

  describe("setMinBpmValue", () => {
    it("should set the min bpm value with a min of 40", () => {
      commit("setMinBpmValue", 42);
      expect(state.bpm.min).toBe(42);
      commit("setMinBpmValue", 39);
      expect(state.bpm.min).toBe(40);
    });

    it("should not allow to set a min bpm value above the max bpm value", () => {
      commit("setMaxBpmValue", 120);
      commit("setMinBpmValue", 121);
      expect(state.bpm.min).toBe(120);
    });

    it("should increase the current bpm value if it is lower than the new min", () => {
      commit("setBpmValue", 60);
      commit("setMinBpmValue", 80);
      expect(state.bpm.value).toBe(80);
    });
  });

  describe("setMaxBpmValue", () => {
    it("should set the max bpm value with a max of 180", () => {
      commit("setMaxBpmValue", 128);
      expect(state.bpm.max).toBe(128);
      commit("setMaxBpmValue", 181);
      expect(state.bpm.max).toBe(180);
    });

    it("should not allow to set a max bpm value below the min bpm value", () => {
      commit("setMinBpmValue", 80);
      commit("setMaxBpmValue", 79);
      expect(state.bpm.max).toBe(80);
    });

    it("should decrease the current bpm value if it is higher than the new max", () => {
      commit("setBpmValue", 130);
      commit("setMaxBpmValue", 120);
      expect(state.bpm.value).toBe(120);
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
