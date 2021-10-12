import { fireEvent, render } from "@testing-library/vue";
import TempoControls from "@/components/bpm/TempoControls.vue";
import store from "@/store/index";

describe("TempoControls.vue", () => {
  beforeEach(() => {
    store.commit("resetState");
  });

  it("should allow to change the tempo with increments of 1 bpm", async () => {
    const { getByText } = render(TempoControls, {
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

  it("should allow to change the tempo with increments of 5 bpm", async () => {
    const { getByText } = render(TempoControls, {
      global: {
        plugins: [store]
      }
    });

    // 120 bpm by default
    expect(getByText("120")).toBeVisible();

    const btnPlusFive = getByText("+5", { selector: "button" });
    const btnMinusFive = getByText("-5", { selector: "button" });

    // Increment by 5
    await fireEvent.click(btnPlusFive);
    expect(getByText("125")).toBeVisible();
    await fireEvent.click(btnPlusFive);
    expect(getByText("130")).toBeVisible();

    // Decrement by 5
    await fireEvent.click(btnMinusFive);
    expect(getByText("125")).toBeVisible();
    await fireEvent.click(btnMinusFive);
    expect(getByText("120")).toBeVisible();
  });

  it("should use the value of the store for the large increment", async () => {
    store.commit("setLargeIncrement", 7);

    const { getByText } = render(TempoControls, {
      global: {
        plugins: [store]
      }
    });

    // 120 bpm by default
    expect(getByText("120")).toBeVisible();

    const btnPlusFive = getByText("+7", { selector: "button" });
    const btnMinusFive = getByText("-7", { selector: "button" });

    // Increment by 7
    await fireEvent.click(btnPlusFive);
    expect(getByText("127")).toBeVisible();
    await fireEvent.click(btnPlusFive);
    expect(getByText("134")).toBeVisible();

    // Decrement by 7
    await fireEvent.click(btnMinusFive);
    expect(getByText("127")).toBeVisible();
    await fireEvent.click(btnMinusFive);
    expect(getByText("120")).toBeVisible();
  });

  it("cannot decrement the bpm below the min value", async () => {
    store.commit("setBpmValue", store.state.bpm.min + 2);

    const { getByText } = render(TempoControls, {
      global: {
        plugins: [store]
      }
    });
    const btnMinusOne = getByText("-1", { selector: "button" });
    const btnMinusFive = getByText("-5", { selector: "button" });
    // Initial state
    expect(getByText(store.state.bpm.min + 2)).toBeVisible();

    // Try to decrement by 5
    await fireEvent.click(btnMinusFive);
    // Only - 2 bpm before hitting the min value
    expect(getByText(store.state.bpm.min)).toBeVisible();

    // Try to decrement by 1
    await fireEvent.click(btnMinusOne);
    // No change
    expect(getByText(store.state.bpm.min)).toBeVisible();
  });

  it("cannot increment the bpm above the max value", async () => {
    store.commit("setBpmValue", store.state.bpm.max - 3);

    const { getByText } = render(TempoControls, {
      global: {
        plugins: [store]
      }
    });
    const btnPlusOne = getByText("+1", { selector: "button" });
    const btnPlusFive = getByText("+5", { selector: "button" });
    // Initial state
    expect(getByText(store.state.bpm.max - 3)).toBeVisible();

    // Try to increment by 5
    await fireEvent.click(btnPlusFive);
    // Only + 3 bpm before hitting the max value
    expect(getByText(store.state.bpm.max)).toBeVisible();

    // Try to increment by 1
    await fireEvent.click(btnPlusOne);
    // No change
    expect(getByText(store.state.bpm.max)).toBeVisible();
  });
});
