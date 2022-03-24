import store from "@/store";

const { state, getters, commit } = store;

const DEFAULT_STORE_VALUE = {
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

  describe("resetBeat", () => {
    it("should reset the current beat to zero", () => {
      commit("nextBeat");
      expect(state.beat.current).toBe(1);
      commit("resetBeat");
      expect(state.beat.current).toBe(0);
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

  describe("setRythm", () => {
    it("should set the rythm amongst valid values", () => {
      ["quarter", "eighth", "sixteenth", "triplet", "triplet-rest"].forEach((rythm) => {
        commit("setRythm", rythm);
        expect(state.beat.rythm).toBe(rythm);
      });
      commit("setRythm", "wrong");
      expect(state.beat.rythm).toBe("triplet-rest");
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

  describe("setTheme", () => {
    it("should store the current theme", () => {
      commit("setTheme", "dark");
      expect(state.settings.theme).toBe("dark");
      commit("setTheme", "auto");
      expect(state.settings.theme).toBe("auto");
    });
  });

  describe("getters", () => {
    it("intermediateBeats - should return an array of intermediate beats for the current rythm", () => {
      commit("setRythm", "quarter");
      expect(getters.intermediateBeats).toEqual([]);
      commit("setRythm", "eighth");
      expect(getters.intermediateBeats).toEqual([1 / 2]);
      commit("setRythm", "sixteenth");
      expect(getters.intermediateBeats).toEqual([1 / 4, 2 / 4, 3 / 4]);
      commit("setRythm", "triplet");
      expect(getters.intermediateBeats).toEqual([1 / 3, 2 / 3]);
      commit("setRythm", "triplet-rest");
      expect(getters.intermediateBeats).toEqual([2 / 3]);
    });
  });
});

describe("persistence", () => {
  let mockStorage: any;

  beforeAll(() => {
    global.Storage.prototype.setItem = vi.fn((key, value) => {
      mockStorage[key] = value;
    });
    global.Storage.prototype.getItem = vi.fn((key) => mockStorage[key]);
  });

  beforeEach(() => {
    mockStorage = {};
  });

  it("should persist the state in the LocalStorage", () => {
    commit("setVolume", 42);
    commit("setRythm", "sixteenth");
    expect(JSON.parse(mockStorage.vuex).settings.volume).toBe(42);
    expect(JSON.parse(mockStorage.vuex).beat.rythm).toBe("sixteenth");
  });

  it("should NOT persist the current beat", () => {
    commit("nextBeat");
    expect(state.beat.current).toBe(1);
    expect(JSON.parse(mockStorage.vuex).beat.current).toBe(undefined);
  });

  afterAll(() => {
    (global.Storage.prototype.setItem as jest.Mock).mockReset();
    (global.Storage.prototype.getItem as jest.Mock).mockReset();
  });
});
