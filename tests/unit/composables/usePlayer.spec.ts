import usePlayer from "@/composables/usePlayer";
import { Howl } from "howler";
import store from "@/store";

// only mock the useStore function
jest.mock("vuex", () => {
  const original = jest.requireActual("vuex");
  return {
    ...original,
    useStore: () => store
  };
});

const playSpy = jest.fn();
const rateSpy = jest.fn();
const volumeSpy = jest.fn();
Howl.prototype.play = playSpy;
Howl.prototype.rate = rateSpy;
Howl.prototype.volume = volumeSpy;

describe("usePlayer", () => {
  beforeEach(() => {
    store.commit("resetState");
    jest.clearAllMocks();
  });

  const { isPlaying, play } = usePlayer();

  it("should play a sound", () => {
    expect(isPlaying.value).toBe(false);

    // When
    play();

    // Then
    expect(isPlaying.value).toBe(true);
    expect(playSpy).toHaveBeenCalledTimes(1);
  });

  it("should play a louder sound on the first beat if accentuateFirstBeat = true (default)", async () => {
    // When
    play();

    // Then: louder
    expect(rateSpy).toHaveBeenCalledWith(1.4);
    expect(volumeSpy).toHaveBeenCalledWith(1);

    // Then When
    store.commit("nextBeat");
    play();

    // Then: normal
    expect(rateSpy).toHaveBeenCalledWith(1);
    expect(volumeSpy).toHaveBeenCalledWith(0.8);
  });

  it("should NOT play a louder sound on the first beat if accentuateFirstBeat = false", async () => {
    store.commit("setAccentuateFirstBeat", false);

    // When
    play();

    // Then: normal
    expect(rateSpy).toHaveBeenCalledWith(1);
    expect(volumeSpy).toHaveBeenCalledWith(0.8);
  });
});
