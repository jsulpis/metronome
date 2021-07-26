import store from "@/store/index";
import BeatIndicator from "@/components/beat/BeatIndicator.vue";
import { fireEvent, render, waitFor } from "@testing-library/vue";

const DEFAULT_STATE = JSON.parse(JSON.stringify(store.state)); // deep clone

describe("BeatIndicator.vue", () => {
  beforeEach(() => {
    store.replaceState(JSON.parse(JSON.stringify(DEFAULT_STATE)));
  });

  it("should display the current beat", async () => {
    const { getByText, baseElement } = render(BeatIndicator, {
      global: {
        plugins: [store]
      }
    });

    expect(getByText(1)).toBeVisible();

    expect(baseElement.querySelectorAll(".dots span.active").length).toBe(1); // one dot active
    expect(baseElement.querySelectorAll(".dots span")[0]).toHaveClass("active"); // it's the first one

    store.commit("nextBeat");

    waitFor(() => {
      expect(baseElement.querySelectorAll(".dots span.active").length).toBe(1); // one dot active
      expect(baseElement.querySelectorAll(".dots span")[1]).toHaveClass("active"); // it's the second one
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
