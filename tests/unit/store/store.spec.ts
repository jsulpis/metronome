import store from "@/store";

describe("store mutations", () => {
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
});
