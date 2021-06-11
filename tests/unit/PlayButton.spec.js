import { render, fireEvent } from "@testing-library/vue";

import PlayButton from "@/components/PlayButton.vue";

describe("PlayButton.vue", () => {
  it("should play a sound and change the visible icon when clicking on the button", async () => {
    const playSpy = jest.fn();
    HTMLMediaElement.prototype.play = playSpy;

    const { getByTitle, getByRole } = render(PlayButton);

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

    expect(playSpy).toHaveBeenCalledTimes(1);

    // When : back to pause
    await fireEvent.click(button);

    // Then
    expect(playIcon).toBeVisible();
    expect(stopIcon).not.toBeVisible();

    expect(playSpy).toHaveBeenCalledTimes(1);
  });
});
