import store from "@/store/index";
import BeatIndicator from "@/components/beat/BeatIndicator.vue";
import { flushPromises, mount } from "@vue/test-utils";

describe("BeatIndicator.vue", () => {
  it("should display the current beat", async () => {
    const wrapper = mount(BeatIndicator, {
      global: {
        plugins: [store]
      }
    });

    expect(wrapper.element.innerHTML).toMatchInlineSnapshot(`
      <div class="beat">
        <p class="value">1</p>
        <p class="label">beat</p>
      </div>
      <div class="beat-indicator"><span class="active"></span><span class=""></span><span class=""></span><span class=""></span></div>
    `);

    store.commit("nextBeat");
    await flushPromises();

    expect(wrapper.element.innerHTML).toMatchInlineSnapshot(`
      <div class="beat">
        <p class="value">2</p>
        <p class="label">beat</p>
      </div>
      <div class="beat-indicator"><span class=""></span><span class="active"></span><span class=""></span><span class=""></span></div>
    `);
  });
});
