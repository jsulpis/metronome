import { fireEvent, render } from "@testing-library/vue";
import Slider from "@/components/settings/Slider.vue";

describe("Slider.vue", () => {
  it("should forward properties to the native input", async () => {
    const { getByRole } = render(Slider, {
      props: {
        modelValue: 12,
        min: 0,
        max: 100,
        label: "volume"
      }
    });

    const nativeInput = getByRole<HTMLInputElement>("slider");
    expect(nativeInput.value).toBe("12");
    expect(nativeInput.getAttribute("min")).toBe("0");
    expect(nativeInput.getAttribute("max")).toBe("100");
    expect(nativeInput.getAttribute("aria-label")).toBe("volume");
  });

  it("should update the value of the native input when the property changes", async () => {
    const { getByRole, rerender } = render(Slider, {
      props: {
        modelValue: 12,
        min: 0,
        max: 100,
        label: "volume"
      }
    });

    const nativeInput = getByRole<HTMLInputElement>("slider");
    expect(nativeInput.value).toBe("12");

    await rerender({ modelValue: 20 });

    expect(nativeInput.value).toBe("20");
  });

  it("should emit the value of the input when it changes", async () => {
    const { getByRole, emitted } = render(Slider, {
      props: {
        modelValue: 12,
        min: 0,
        max: 100,
        label: "volume"
      }
    });

    const nativeInput = getByRole<HTMLInputElement>("slider");
    nativeInput.value = "40";
    await fireEvent(nativeInput, new Event("input"));

    expect(emitted()["update:modelValue"].length).toBe(1);
    expect(emitted()["update:modelValue"][0]).toEqual([40]);
  });
});
