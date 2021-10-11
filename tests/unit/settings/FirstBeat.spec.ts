import { fireEvent, render } from "@testing-library/vue";
import Sound from "@/components/settings/FirstBeat.vue";
import store from "@/store/index";

describe("FirstBeat.vue", () => {
  it("should check the checkbox depending on the sound in the store", async () => {
    store.commit("setAccentuateFirstBeat", true);

    const { getByRole } = render(Sound, {
      global: {
        plugins: [store]
      }
    });

    const checkbox = getByRole("checkbox") as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it("should store the new value when the value changes", async () => {
    const { getByRole } = render(Sound, {
      global: {
        plugins: [store]
      }
    });

    const checkbox = getByRole("checkbox") as HTMLInputElement;

    // Check the initial value
    expect(checkbox.checked).toBe(true);
    expect(store.state.settings.accentuateFirstBeat).toBe(true);

    checkbox.click();

    expect(checkbox.checked).toBe(false);
    expect(store.state.settings.accentuateFirstBeat).toBe(false);
  });
});
