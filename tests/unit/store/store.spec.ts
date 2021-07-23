import store from "@/store";

const DEFAULT_STATE = JSON.parse(JSON.stringify(store.state)); // deep clone

describe("store mutations", () => {
  beforeEach(() => {
    store.replaceState(JSON.parse(JSON.stringify(DEFAULT_STATE)));
  });

  describe("nextBeat", () => {
    it("should increment the current beat and reset to 1 after reaching the beat count", () => {
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
    it("should increment the beat count with a maximum of 9 beats", () => {
      store.commit("addBeat");
      expect(store.state.beat.count).toBe(5);
      store.commit("addBeat");
      expect(store.state.beat.count).toBe(6);
      store.commit("addBeat");
      expect(store.state.beat.count).toBe(7);
      store.commit("addBeat");
      expect(store.state.beat.count).toBe(8);
      store.commit("addBeat");
      expect(store.state.beat.count).toBe(9);
      store.commit("addBeat");
      expect(store.state.beat.count).toBe(9);
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
});
