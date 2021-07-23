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

describe("usePlayer", () => {
  const { isPlaying, play } = usePlayer();

  it("should play a sound", () => {
    // Given
    const playSpy = jest.fn();
    Howl.prototype.play = playSpy;

    expect(isPlaying.value).toBe(false);

    // When
    play();

    // Then
    expect(isPlaying.value).toBe(true);
    expect(playSpy).toHaveBeenCalledTimes(1);
  });

  it("should play a louder sound on the first beat", () => {
    // Given
    const rateSpy = jest.fn();
    const volumeSpy = jest.fn();
    Howl.prototype.rate = rateSpy;
    Howl.prototype.volume = volumeSpy;

    // When
    play();

    // Then: louder
    expect(rateSpy).toHaveBeenCalledWith(1.5);
    expect(volumeSpy).toHaveBeenCalledWith(1);

    // Then When
    store.commit("nextBeat");
    play();

    // Then: normal
    expect(rateSpy).toHaveBeenCalledWith(1);
    expect(volumeSpy).toHaveBeenCalledWith(0.8);
  });
});
