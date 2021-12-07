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
Howl.prototype.once = (arg, callback) => {
  callback(0, 0);
  return new Howl({ src: ["dummy.mp3"] });
};

describe("usePlayer", () => {
  beforeEach(() => {
    store.commit("resetState");
    jest.clearAllMocks();
  });

  const { isPlaying, play, stop } = usePlayer();

  it("should play a sound", async () => {
    expect(isPlaying.value).toBe(false);

    // When
    await play();

    // Then
    expect(isPlaying.value).toBe(true);
    expect(playSpy).toHaveBeenCalledTimes(2); // one time to "wake up" the AudioContext, one second time to actually play the sound
  });

  it("should reset the current beat to zero when stopping", async () => {
    expect(store.state.beat.current).toBe(0);

    // When
    await play();

    // Then
    expect(store.state.beat.current).toBe(1);

    // Then When
    stop();

    // Then
    expect(store.state.beat.current).toBe(0);
  });

  it("should play a louder sound on the first beat if accentuateFirstBeat = true (default)", async () => {
    // When
    await play();

    // Then: louder
    expect(rateSpy).toHaveBeenCalledWith(1.4);
    expect(volumeSpy).toHaveBeenCalledWith(1);

    // Then When
    store.commit("nextBeat");
    await play();

    // Then: normal
    expect(rateSpy).toHaveBeenCalledWith(1);
    expect(volumeSpy).toHaveBeenCalledWith(0.8);
  });

  it("should NOT play a louder sound on the first beat if accentuateFirstBeat = false", async () => {
    store.commit("setAccentuateFirstBeat", false);

    // When
    await play();

    // Then: normal
    expect(rateSpy).toHaveBeenCalledWith(1);
    expect(volumeSpy).toHaveBeenCalledWith(0.8);
  });
});
