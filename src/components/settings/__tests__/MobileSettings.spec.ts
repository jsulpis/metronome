import { render, fireEvent } from "@testing-library/vue";
import MobileSettings from "@/components/settings/MobileSettings.vue";
import store from "@/store/index";

describe("MobileSettings.vue", () => {
  it("should open the settings panel with a button", async () => {
    const { getByRole, container } = render(MobileSettings, {
      global: {
        plugins: [store]
      }
    });

    const panel = container.querySelector(".mobile-settings");
    const backdrop = container.querySelector(".backdrop");

    expect(panel).not.toHaveClass("visible");
    expect(backdrop).not.toHaveClass("visible");

    const button = getByRole<HTMLButtonElement>("button", { name: "open settings" });
    await fireEvent(button, new Event("click"));

    expect(panel).toHaveClass("visible");
    expect(backdrop).toHaveClass("visible");
  });

  it("should close the settings panel when clicking on the backdrop", async () => {
    const { getByRole, container } = render(MobileSettings, {
      global: {
        plugins: [store]
      }
    });
    const panel = container.querySelector(".mobile-settings");
    const backdrop = container.querySelector(".backdrop");

    const button = getByRole<HTMLButtonElement>("button", { name: "open settings" });
    await fireEvent(button, new Event("click"));

    expect(panel).toHaveClass("visible");
    expect(backdrop).toHaveClass("visible");

    if (backdrop == null) {
      fail("backdrop not found");
    }
    await fireEvent(backdrop, new Event("click"));

    expect(panel).not.toHaveClass("visible");
    expect(backdrop).not.toHaveClass("visible");
  });

  it("should close the settings panel when clicking on the handle", async () => {
    const { getByRole, container } = render(MobileSettings, {
      global: {
        plugins: [store]
      }
    });
    const panel = container.querySelector(".mobile-settings");
    const backdrop = container.querySelector(".backdrop");

    const button = getByRole<HTMLButtonElement>("button", { name: "open settings" });
    await fireEvent(button, new Event("click"));

    expect(panel).toHaveClass("visible");
    expect(backdrop).toHaveClass("visible");

    const handle = getByRole<HTMLButtonElement>("button", { name: "close settings" });
    if (handle == null) {
      fail("handle not found");
    }
    await fireEvent(handle, new Event("click"));

    expect(panel).not.toHaveClass("visible");
    expect(backdrop).not.toHaveClass("visible");
  });
});
