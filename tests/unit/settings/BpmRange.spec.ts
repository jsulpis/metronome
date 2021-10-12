import { render } from "@testing-library/vue";
import BpmRange from "@/components/settings/BpmRange.vue";
import store from "@/store/index";
import { fireEvent } from "@testing-library/dom";

describe("BpmRange.vue", () => {
  it("should forward the value of min and max from the store to the inputs", async () => {
    store.commit("setMinBpmValue", 50);
    store.commit("setMaxBpmValue", 140);

    const { getByRole } = render(BpmRange, {
      global: {
        plugins: [store]
      }
    });

    const inputMin = getByRole("spinbutton", { name: "minimum bpm value" }) as HTMLInputElement;
    const inputMax = getByRole("spinbutton", { name: "maximum bpm value" }) as HTMLInputElement;

    expect(inputMin.value).toBe("50");
    expect(inputMax.value).toBe("140");
  });

  it("should not allow to set a max value below the min value", async () => {
    store.commit("setMinBpmValue", 50);

    const { getByRole } = render(BpmRange, {
      global: {
        plugins: [store]
      }
    });

    const inputMax = getByRole("spinbutton", { name: "maximum bpm value" }) as HTMLInputElement;

    expect(inputMax.min).toBe("50");
  });

  it("should not allow to set a min value above the max value", async () => {
    store.commit("setMaxBpmValue", 140);

    const { getByRole } = render(BpmRange, {
      global: {
        plugins: [store]
      }
    });

    const inputMin = getByRole("spinbutton", { name: "minimum bpm value" }) as HTMLInputElement;

    expect(inputMin.max).toBe("140");
  });

  it("should store the new values when they change", async () => {
    const { getByRole } = render(BpmRange, {
      global: {
        plugins: [store]
      }
    });

    const inputMin = getByRole("spinbutton", { name: "minimum bpm value" }) as HTMLInputElement;
    const inputMax = getByRole("spinbutton", { name: "maximum bpm value" }) as HTMLInputElement;

    inputMin.value = "58";
    fireEvent.change(inputMin);

    expect(store.state.bpm.min).toBe(58);

    inputMax.value = "143";
    fireEvent.change(inputMax);

    expect(store.state.bpm.max).toBe(143);
  });
});
