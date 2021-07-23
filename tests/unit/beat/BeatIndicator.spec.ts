import { render, waitFor } from "@testing-library/vue";
import store from "@/store/index";
import BeatIndicator from "@/components/beat/BeatIndicator.vue";

describe("BeatIndicator.vue", () => {
  it("should display the current beat", async () => {
    const { getByText } = render(BeatIndicator, {
      global: {
        plugins: [store]
      }
    });

    expect(getByText(1)).toBeVisible();

    store.commit("nextBeat");

    waitFor(() => expect(getByText(2)).toBeVisible());
  });
});
