import { render, fireEvent } from "@testing-library/vue";
import store from "@/store/index";
import App from "@/App.vue";
import { Howl } from "howler";

const mockUseRegisterSW = jest.fn();

jest.mock("virtual:pwa-register/vue", () => ({
  useRegisterSW: () => mockUseRegisterSW()
}));

Howl.prototype.play = jest.fn();

describe("App.vue", () => {
  describe("Tempo Section", () => {
    beforeEach(() => {
      store.commit("setBpmValue", 120);
    });

    it("should update the wheel when changing the bpm with the buttons", async () => {
      const { getByText, getByRole } = render(App, {
        global: {
          plugins: [store]
        }
      });

      const btnPlusOne = getByText("+1", { selector: "button" });
      const wheel = getByRole("slider");

      // Initial State
      expect(getByText("120")).toBeVisible();
      expect(wheel.getAttribute("aria-valuenow")).toBe("120");

      // Increment by 1 using the button
      await fireEvent.click(btnPlusOne);

      // Then: update the display and the wheel
      expect(getByText("121")).toBeVisible();
      expect(wheel.getAttribute("aria-valuenow")).toBe("121");
    });

    it("should update the display when changing the bpm with the wheel", async () => {
      const { getByText, getByRole } = render(App, {
        global: {
          plugins: [store]
        }
      });

      const wheel = getByRole("slider");

      // Initial State
      expect(getByText("120")).toBeVisible();
      expect(wheel.getAttribute("aria-valuenow")).toBe("120");

      // Decrement by 1 using the wheel
      await fireEvent.keyDown(wheel, { key: "ArrowDown" });

      // Then: update the display and the wheel
      expect(getByText("119")).toBeVisible();
      expect(wheel.getAttribute("aria-valuenow")).toBe("119");
    });
  });

  it("should register a service worker for PWA", () => {
    mockUseRegisterSW.mockClear();

    render(App, {
      global: {
        plugins: [store]
      }
    });

    expect(mockUseRegisterSW).toHaveBeenCalledTimes(1);
  });
});
