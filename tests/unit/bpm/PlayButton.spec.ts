import { render, fireEvent } from "@testing-library/vue";
import store from "@/store/index";
import PlayButton from "@/components/bpm/PlayButton.vue";
import { Howl } from "howler";

describe("PlayButton.vue", () => {
  it("should play a sound and change the visible icon when clicking on the button", async () => {
    const playSpy = jest.fn();
    Howl.prototype.play = playSpy;
    Howl.prototype.once = (arg, callback) => {
      callback(0, 0);
      return new Howl({ src: ["dummy.mp3"] });
    };

    const { getByTitle, getByRole } = render(PlayButton, {
      global: {
        plugins: [store]
      }
    });

    const button = getByRole("button");
    const playIcon = getByTitle("Play Icon").parentElement;
    const stopIcon = getByTitle("Stop Icon").parentElement;

    // Initial state
    expect(playIcon).toBeVisible();
    expect(stopIcon).not.toBeVisible();

    // When
    await fireEvent.click(button);

    // Then
    expect(playIcon).not.toBeVisible();
    expect(stopIcon).toBeVisible();

    expect(playSpy).toHaveBeenCalled();

    // When : back to pause
    await fireEvent.click(button);

    // Then
    expect(playIcon).toBeVisible();
    expect(stopIcon).not.toBeVisible();
  });

  it("should play a sound and change the visible icon when hitting the space bar", async () => {
    const playSpy = jest.fn();
    Howl.prototype.play = playSpy;
    Howl.prototype.once = (arg, callback) => {
      callback(0, 0);
      return new Howl({ src: ["dummy.mp3"] });
    };

    const { getByTitle } = render(PlayButton, {
      global: {
        plugins: [store]
      }
    });

    const playIcon = getByTitle("Play Icon").parentElement;
    const stopIcon = getByTitle("Stop Icon").parentElement;

    // Initial state
    expect(playIcon).toBeVisible();
    expect(stopIcon).not.toBeVisible();

    // When
    await fireEvent.keyPress(document.documentElement, { code: "Space" });

    // Then
    expect(playIcon).not.toBeVisible();
    expect(stopIcon).toBeVisible();

    expect(playSpy).toHaveBeenCalled();

    // When : back to pause
    await fireEvent.keyPress(document.documentElement, { code: "Space" });

    // Then
    expect(playIcon).toBeVisible();
    expect(stopIcon).not.toBeVisible();
  });
});
