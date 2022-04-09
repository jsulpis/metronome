import { fireEvent, render } from "@testing-library/vue";
import Sound from "@/components/settings/Sound.vue";
import store from "@/store/index";

describe("Sound.vue", () => {
  it("should check the right radio button depending on the sound in the store", async () => {
    store.commit("setSound", "hi-hat");

    const { container } = render(Sound, {
      global: {
        plugins: [store]
      }
    });

    const hiHatRadio = container.querySelector("input[value=hi-hat]") as HTMLInputElement;
    expect(hiHatRadio.checked).toBe(true);
  });

  it("should store the new sound when the value changes", async () => {
    const { container } = render(Sound, {
      global: {
        plugins: [store]
      }
    });

    const sticksRadio = container.querySelector("input[value=sticks]") as HTMLInputElement;
    await fireEvent(sticksRadio, new Event("change", { bubbles: true }));
    expect(store.state.settings.sound).toBe("sticks");
  });

  it("should have a property to change the group name", async () => {
    const { container } = render(Sound, {
      props: {
        context: "desktop"
      },
      global: {
        plugins: [store]
      }
    });

    const radioButtons = container.querySelectorAll(
      "input[type=radio]"
    ) as NodeListOf<HTMLInputElement>;

    expect(radioButtons.length).toBe(4);
    radioButtons.forEach((radio) => expect(radio.name).toBe("desktop-sound"));
  });
});
