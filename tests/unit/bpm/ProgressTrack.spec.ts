import { mount } from "@vue/test-utils";
import ProgressTrack from "@/components/bpm/ProgressTrack.vue";

describe("ProgressTrack.vue", () => {
  it("should match snapshot with progress = 0", async () => {
    const wrapper = mount(ProgressTrack, {
      props: {
        progress: 0
      }
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it("should match snapshot with progress = 60", async () => {
    const wrapper = mount(ProgressTrack, {
      props: {
        progress: 0.6
      }
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it("should match snapshot with progress = 100", async () => {
    const wrapper = mount(ProgressTrack, {
      props: {
        progress: 1
      }
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
