import { fireEvent, render } from "@testing-library/vue";
import Rythm from "@/components/beat/Rythm.vue";
import store from "@/store/index";

describe("Rythm.vue", () => {
  it("should check the right radio button depending on the Rythm in the store", async () => {
    store.commit("setRythm", "quarter");

    const { container } = render(Rythm, {
      global: {
        plugins: [store]
      }
    });

    const quarterRadio = container.querySelector("input[value=quarter]") as HTMLInputElement;
    expect(quarterRadio.checked).toBe(true);
  });

  it("should store the new Rythm when the value changes", async () => {
    const { container } = render(Rythm, {
      global: {
        plugins: [store]
      }
    });

    const heighthRadio = container.querySelector("input[value=eighth]") as HTMLInputElement;
    await fireEvent(heighthRadio, new Event("change", { bubbles: true }));
    expect(store.state.beat.rythm).toBe("eighth");
  });
});
