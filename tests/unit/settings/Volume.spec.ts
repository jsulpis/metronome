import { fireEvent, render } from "@testing-library/vue";
import Volume from "@/components/settings/Volume.vue";
import store from "@/store/index";

describe("Volume.vue", () => {
  it("should forward the volume setting from the store to the slider", async () => {
    const { getByRole } = render(Volume, {
      global: {
        plugins: [store]
      }
    });

    const slider = getByRole("slider", { name: "volume" }) as HTMLInputElement;
    expect(slider.value).toBe(store.state.settings.volume.toString());
  });

  it("should store the volume when the value changes", async () => {
    const { getByRole } = render(Volume, {
      global: {
        plugins: [store]
      }
    });

    const slider = getByRole("slider", { name: "volume" }) as HTMLInputElement;
    slider.value = "12";
    await fireEvent(slider, new Event("input"));
    expect(store.state.settings.volume).toBe(12);
  });
});
