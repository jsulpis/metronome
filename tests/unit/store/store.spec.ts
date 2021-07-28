import store from "@/store";

const { state, commit } = store;

describe("store mutations", () => {
  beforeEach(() => {
    commit("resetState");
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

  describe("resetState", () => {
    it("should reset the default state", () => {
      // Given
      commit("addBeat");
      commit("nextBeat");
      commit("setBpmValue", 140);

      // When
      commit("resetState");

      // Then
      expect(state).toEqual({
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

      // Then: state is still reactive
      commit("addBeat");
      expect(state.beat.count).toBe(5);
    });
  });
});
