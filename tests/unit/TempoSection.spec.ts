import { fireEvent, render } from "@testing-library/vue";
import TempoSection from "@/components/TempoSection.vue";
import store from "@/store/index";

describe("TempoSection.vue", () => {
  it("should play a sound and change the visible icon when clicking on the button", async () => {
    const { getByText } = render(TempoSection, {
      global: {
        plugins: [store]
      }
    });

    // 120 bpm by default
    expect(getByText("120")).toBeVisible();

    const btnPlusOne = getByText("+1", { selector: "button" });
    const btnMinusOne = getByText("-1", { selector: "button" });

    // Increment by 1
    await fireEvent.click(btnPlusOne);
    expect(getByText("121")).toBeVisible();
    await fireEvent.click(btnPlusOne);
    expect(getByText("122")).toBeVisible();

    // Decrement by 1
    await fireEvent.click(btnMinusOne);
    expect(getByText("121")).toBeVisible();
    await fireEvent.click(btnMinusOne);
    expect(getByText("120")).toBeVisible();
  });
});
