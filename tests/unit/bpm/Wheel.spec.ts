import { fireEvent, render } from "@testing-library/vue";
import Wheel from "@/components/bpm/Wheel.vue";

describe("Wheel.vue", () => {
  it("should update the value when pressing the arrow keys", async () => {
    const { getByRole } = render(Wheel);
    const wheel = getByRole("slider");

    expect(wheel.getAttribute("aria-valuenow")).toBe("120");

    await fireEvent.keyDown(wheel, { key: "ArrowDown" });
    expect(wheel.getAttribute("aria-valuenow")).toBe("119");

    await fireEvent.keyDown(wheel, { key: "ArrowLeft" });
    expect(wheel.getAttribute("aria-valuenow")).toBe("118");

    await fireEvent.keyDown(wheel, { key: "ArrowUp" });
    expect(wheel.getAttribute("aria-valuenow")).toBe("119");

    await fireEvent.keyDown(wheel, { key: "ArrowRight" });
    expect(wheel.getAttribute("aria-valuenow")).toBe("120");
  });

  it("should update the internal value when the value property is updated", async () => {
    const { getByRole, rerender } = render(Wheel);
    const wheel = getByRole("slider");

    expect(wheel.getAttribute("aria-valuenow")).toBe("120");

    // update the "value" property
    await rerender({ value: 115 });

    expect(wheel.getAttribute("aria-valuenow")).toBe("115");
  });

  it("should not decrease the value below the min value", async () => {
    const { getByRole } = render(Wheel, { props: { value: 50, min: 50 } });
    const wheel = getByRole("slider");

    expect(wheel.getAttribute("aria-valuenow")).toBe("50");
    expect(wheel.getAttribute("aria-valuemin")).toBe("50");

    await fireEvent.keyDown(wheel, { key: "ArrowLeft" });
    expect(wheel.getAttribute("aria-valuenow")).toBe("50");
  });

  it("should not increase the value above the max value", async () => {
    const { getByRole } = render(Wheel, { props: { value: 150, max: 150 } });
    const wheel = getByRole("slider");

    expect(wheel.getAttribute("aria-valuenow")).toBe("150");
    expect(wheel.getAttribute("aria-valuemax")).toBe("150");

    await fireEvent.keyDown(wheel, { key: "ArrowRight" });
    expect(wheel.getAttribute("aria-valuenow")).toBe("150");
  });
});
