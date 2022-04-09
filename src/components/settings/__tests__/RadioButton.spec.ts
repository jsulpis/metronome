import { fireEvent, render } from "@testing-library/vue";
import RadioButton from "@/components/RadioButton.vue";

describe("RadioButton.vue", () => {
  it("should forward the name and value props to the native input", async () => {
    const { getByRole } = render(RadioButton, {
      props: {
        name: "sound-group",
        value: "sound-value"
      }
    });

    const input = getByRole("radio") as HTMLInputElement;

    expect(input.value).toBe("sound-value");
    expect(input.name).toBe("sound-group");
  });

  it("should emit a change event when clicking on the label", async () => {
    const { container, emitted } = render(RadioButton, {
      props: {
        name: "my-group",
        value: "my-value"
      }
    });

    const label = container.querySelector("label") as HTMLLabelElement;

    await fireEvent.click(label);

    expect(emitted()["change"].length).toBe(1);
  });
});
