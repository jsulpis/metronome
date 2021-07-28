import store from "@/store";

const DEFAULT_STATE = JSON.parse(JSON.stringify(store.state)); // deep clone

describe("store mutations", () => {
  beforeEach(() => {
    store.replaceState(JSON.parse(JSON.stringify(DEFAULT_STATE)));
  });

  describe("nextBeat", () => {
    it("should increment the current beat and reset to 1 after reaching the beat count", () => {
      store.commit("nextBeat");
      expect(store.state.beat.current).toBe(1); // the current beat is 0 initially
      store.commit("nextBeat");
      expect(store.state.beat.current).toBe(2);
      store.commit("nextBeat");
      expect(store.state.beat.current).toBe(3);
      store.commit("nextBeat");
      expect(store.state.beat.current).toBe(4); // default beat count is 4
      store.commit("nextBeat");
      expect(store.state.beat.current).toBe(1);
      store.commit("nextBeat");
      expect(store.state.beat.current).toBe(2);
    });
  });

  describe("addBeat", () => {
    it("should increment the beat count with a maximum of 6 beats", () => {
      store.commit("addBeat");
      expect(store.state.beat.count).toBe(5);
      store.commit("addBeat");
      expect(store.state.beat.count).toBe(6);
      store.commit("addBeat");
      expect(store.state.beat.count).toBe(6);
    });
  });

  describe("removeBeat", () => {
    it("should decrement the beat count with a minimum of 1 beat", () => {
      store.commit("removeBeat");
      expect(store.state.beat.count).toBe(3);
      store.commit("removeBeat");
      expect(store.state.beat.count).toBe(2);
      store.commit("removeBeat");
      expect(store.state.beat.count).toBe(1);
      store.commit("removeBeat");
      expect(store.state.beat.count).toBe(1);
    });
  });

  describe("resetState", () => {
    it("should reset the default state", () => {
      // Given
      store.commit("addBeat");
      store.commit("nextBeat");
      store.commit("setBpmValue", 140);

      // When
      store.commit("resetState");

      // Then
      expect(store.state).toEqual({
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
      store.commit("addBeat");
      expect(store.state.beat.count).toBe(5);
    });
  });
});
