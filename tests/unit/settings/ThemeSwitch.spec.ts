import { fireEvent, render } from "@testing-library/vue";
import ThemeSwitch from "@/components/settings/theme-switch/ThemeSwitch.vue";
import store from "@/store/index";

describe("ThemeSwitch.vue", () => {
  it("should get the current theme from the store", async () => {
    store.commit("setTheme", "dark");

    const { getByRole } = render(ThemeSwitch, {
      global: {
        plugins: [store]
      }
    });

    const checkedRadio = getByRole("radio", { checked: true }) as HTMLInputElement;
    expect(checkedRadio.value).toBe("dark");
  });

  it("should store the new theme when it changes", async () => {
    store.commit("setTheme", "dark");

    const { getByLabelText } = render(ThemeSwitch, {
      global: {
        plugins: [store]
      }
    });

    const lightRadio = getByLabelText("light") as HTMLInputElement;

    await fireEvent.click(lightRadio);

    expect(store.state.settings.theme).toBe("light");
  });
});
