import store from "@/store/index";
import BeatIndicator from "@/components/beat/BeatIndicator.vue";
import { fireEvent, render, waitFor } from "@testing-library/vue";

describe("BeatIndicator.vue", () => {
  beforeEach(() => {
    store.commit("resetState");
  });

  it("should display the current beat", async () => {
    const { getByText, baseElement } = render(BeatIndicator, {
      global: {
        plugins: [store]
      }
    });

    expect(getByText(1)).toBeVisible(); // Display "1" initially even if the current beat is 0

    expect(baseElement.querySelectorAll(".dots span.active").length).toBe(0); // no dot active initially

    store.commit("nextBeat");

    waitFor(() => {
      expect(baseElement.querySelectorAll(".dots span.active").length).toBe(1); // one dot active
      expect(baseElement.querySelectorAll(".dots span")[0]).toHaveClass("active"); // it's the first one
    });
  });

  it("should have a button to increment the beat count", async () => {
    const { getByText, baseElement } = render(BeatIndicator, {
      global: {
        plugins: [store]
      }
    });

    const btnAddBeat = getByText("+", { selector: "button" });

    // Add 1 beat
    await fireEvent.click(btnAddBeat);

    expect(baseElement.querySelectorAll("span").length).toBe(5);
  });

  it("should have a button to descrement the beat count", async () => {
    const { getByText, baseElement } = render(BeatIndicator, {
      global: {
        plugins: [store]
      }
    });

    const btnRemoveBeat = getByText("-", { selector: "button" });

    // Remove 1 beat
    await fireEvent.click(btnRemoveBeat);

    expect(baseElement.querySelectorAll("span").length).toBe(3);
  });
});
