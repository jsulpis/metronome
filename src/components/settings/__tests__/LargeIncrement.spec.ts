import { fireEvent, render } from "@testing-library/vue";
import LargeIncrement from "@/components/settings/LargeIncrement.vue";
import store from "@/store/index";

describe("LargeIncrement.vue", () => {
  it("should forward the largeIncrement setting from the store to the slider", async () => {
    const { getByRole } = render(LargeIncrement, {
      global: {
        plugins: [store]
      }
    });

    const slider = getByRole("slider", { name: "large increment" }) as HTMLInputElement;
    expect(slider.value).toBe(store.state.settings.largeIncrement.toString());
  });

  it("should store the largeIncrement when the value changes", async () => {
    const { getByRole } = render(LargeIncrement, {
      global: {
        plugins: [store]
      }
    });

    const slider = getByRole("slider", { name: "large increment" }) as HTMLInputElement;
    slider.value = "6";
    await fireEvent(slider, new Event("input"));
    expect(store.state.settings.largeIncrement).toBe(6);
  });
});
